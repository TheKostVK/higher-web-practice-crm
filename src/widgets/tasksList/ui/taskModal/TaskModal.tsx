import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {DatePicker, Input, Select} from 'antd';
import dayjs from 'dayjs';

import {useCreateTaskMutation, useUpdateTaskMutation} from '@/entities/task';
import type {TTask, TTaskListRow} from '@/entities/task';
import {useGetDealsQuery} from '@/entities/deal';
import {selectorUserData} from '@/entities/user';
import {useAppSelector} from '@/app';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {FormModal, FormModalField, formModalStyles as Styles} from '@/shared/ui/formModal';

import {taskSchema, type TTaskFormValues} from './taskModalSchema';

const TASK_STATUS_OPTIONS = [
    {value: 'new', label: 'Новая'},
    {value: 'in_progress', label: 'В работе'},
    {value: 'completed', label: 'Завершена'},
];

type TTaskModalProps = {
    open: boolean;
    task?: TTask | TTaskListRow;
    onClose: () => void;
};

/**
 * Модальное окно создания и редактирования задачи.
 * @param open Флаг видимости модального окна.
 * @param task Данные задачи для редактирования (если передан — режим редактирования).
 * @param onClose Колбэк закрытия модального окна.
 */
export const TaskModal = ({open, task, onClose}: TTaskModalProps) => {
    const user = useAppSelector(selectorUserData);
    const [createTask, {isLoading: isCreating, isError: isCreateError}] = useCreateTaskMutation();
    const [updateTask, {isLoading: isUpdating, isError: isUpdateError}] = useUpdateTaskMutation();
    const {data: deals = [], isFetching: isDealsFetching, isError: isDealsError} = useGetDealsQuery();

    const isEdit = Boolean(task);
    const isLoading = isCreating || isUpdating;
    const isSubmitError = isCreateError || isUpdateError;

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<TTaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: '',
            dealId: '',
            description: '',
            assigneeId: '',
            dueDate: '',
            status: 'new',
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                title: task?.title ?? '',
                dealId: task?.dealId ?? '',
                description: task?.description ?? '',
                assigneeId: task?.assigneeId ?? '',
                dueDate: task?.dueDate ?? '',
                status: task?.status ?? 'new',
            });
        }
    }, [open, task, reset]);

    const handleFormSubmit = async (values: TTaskFormValues) => {
        try {
            if (isEdit && task) {
                await updateTask({id: task.id, data: values}).unwrap();
            } else {
                await createTask({
                    title: values.title,
                    dealId: values.dealId,
                    description: values.description,
                    assigneeId: values.assigneeId,
                    dueDate: values.dueDate,
                    createdBy: user!.id,
                }).unwrap();
            }

            onClose();
        } catch {
            // ошибка обрабатывается состоянием мутации
        }
    };

    const dealOptions = deals.map((deal) => ({
        value: deal.id,
        label: deal.title,
    }));

    const userOption = user ? [{value: user.id, label: user.name}] : [];

    return (
        <FormModal
            open={open}
            title={isEdit ? 'Карточка задачи' : 'Новая задача'}
            okText={isEdit ? 'Сохранить' : 'Создать'}
            confirmLoading={isLoading}
            onOk={handleSubmit(handleFormSubmit)}
            onCancel={onClose}
        >
            {isSubmitError && <ApiErrorMessage message="Не удалось сохранить данные задачи." />}
            {isDealsError && <ApiErrorMessage message="Не удалось загрузить список сделок." />}

            <FormModalField label="Название" htmlFor="task-title" required full error={errors.title?.message}>
                <Controller
                    control={control}
                    name="title"
                    render={({field}) => (
                        <Input
                            {...field}
                            id="task-title"
                            placeholder="Название задачи"
                            status={errors.title ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Сделка" labelId="task-deal-label">
                <Controller
                    control={control}
                    name="dealId"
                    render={({field}) => (
                        <Select
                            {...field}
                            aria-labelledby="task-deal-label"
                            placeholder="Выберите сделку"
                            options={dealOptions}
                            loading={isDealsFetching}
                            disabled={isDealsError}
                            allowClear
                            showSearch
                            optionFilterProp="label"
                        />
                    )}
                />
            </FormModalField>

            <FormModalField
                label="Исполнитель"
                labelId="task-assignee-label"
                required
                error={errors.assigneeId?.message}
            >
                <Controller
                    control={control}
                    name="assigneeId"
                    render={({field}) => (
                        <Select
                            {...field}
                            aria-labelledby="task-assignee-label"
                            placeholder="Выберите исполнителя"
                            options={userOption}
                            showSearch
                            optionFilterProp="label"
                            status={errors.assigneeId ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Выполнить до" labelId="task-duedate-label">
                <Controller
                    control={control}
                    name="dueDate"
                    render={({field}) => (
                        <DatePicker
                            aria-labelledby="task-duedate-label"
                            className={Styles.formModal__fullWidthControl}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => field.onChange(date ? date.toISOString() : '')}
                        />
                    )}
                />
            </FormModalField>

            {isEdit && (
                <FormModalField label="Статус" labelId="task-status-label" required>
                    <Controller
                        control={control}
                        name="status"
                        render={({field}) => (
                            <Select {...field} aria-labelledby="task-status-label" options={TASK_STATUS_OPTIONS} />
                        )}
                    />
                </FormModalField>
            )}

            <FormModalField label="Описание" htmlFor="task-description" full>
                <Controller
                    control={control}
                    name="description"
                    render={({field}) => (
                        <Input.TextArea {...field} id="task-description" placeholder="Описание задачи" rows={3} />
                    )}
                />
            </FormModalField>
        </FormModal>
    );
};
