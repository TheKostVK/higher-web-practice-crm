import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Input, InputNumber, Select} from 'antd';

import {useCreateDealMutation, useUpdateDealMutation} from '@/entities/deal';
import type {TDeal, TDealListRow} from '@/entities/deal';
import {useGetClientsQuery} from '@/entities/client';
import {selectorUserData} from '@/entities/user';
import {useAppSelector} from '@/app';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {FormModal, FormModalField, formModalStyles as Styles} from '@/shared/ui/formModal';

import {dealSchema, type TDealFormValues} from './dealModalSchema';

const DEAL_STATUS_OPTIONS = [
    {value: 'new', label: 'Новая'},
    {value: 'in_progress', label: 'В работе'},
    {value: 'completed', label: 'Завершена'},
    {value: 'cancelled', label: 'Отменена'},
];

type TDealModalProps = {
    open: boolean;
    deal?: TDeal | TDealListRow;
    onClose: () => void;
};

/**
 * Модальное окно создания и редактирования сделки.
 * @param open Флаг видимости модального окна.
 * @param deal Данные сделки для редактирования (если передан — режим редактирования).
 * @param onClose Колбэк закрытия модального окна.
 */
export const DealModal = ({open, deal, onClose}: TDealModalProps) => {
    const user = useAppSelector(selectorUserData);
    const [createDeal, {isLoading: isCreating, isError: isCreateError}] = useCreateDealMutation();
    const [updateDeal, {isLoading: isUpdating, isError: isUpdateError}] = useUpdateDealMutation();
    const {
        data: clients = [],
        isFetching: isClientsFetching,
        isError: isClientsError,
    } = useGetClientsQuery({deleted: false});

    const isEdit = Boolean(deal);
    const isLoading = isCreating || isUpdating;
    const isSubmitError = isCreateError || isUpdateError;

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<TDealFormValues>({
        resolver: zodResolver(dealSchema),
        defaultValues: {
            title: '',
            clientId: '',
            description: '',
            amount: 0,
            status: 'new',
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                title: deal?.title ?? '',
                clientId: deal?.clientId ?? '',
                description: deal?.description ?? '',
                amount: deal?.amount ?? 0,
                status: deal?.status ?? 'new',
            });
        }
    }, [open, deal, reset]);

    const handleFormSubmit = async (values: TDealFormValues) => {
        try {
            if (isEdit && deal) {
                const becameCompleted = values.status === 'completed' && deal.status !== 'completed';
                await updateDeal({
                    id: deal.id,
                    data: becameCompleted ? {...values, completedAt: new Date().toISOString()} : values,
                }).unwrap();
            } else {
                await createDeal({
                    title: values.title,
                    clientId: values.clientId,
                    description: values.description,
                    amount: values.amount,
                    status: values.status,
                    createdBy: user!.id,
                }).unwrap();
            }

            onClose();
        } catch {
            // ошибка обрабатывается состоянием мутации
        }
    };

    const clientOptions = clients.map((client) => ({
        value: client.id,
        label: client.name,
    }));

    return (
        <FormModal
            open={open}
            title={isEdit ? 'Карточка сделки' : 'Новая сделка'}
            okText={isEdit ? 'Сохранить' : 'Создать'}
            confirmLoading={isLoading}
            onOk={handleSubmit(handleFormSubmit)}
            onCancel={onClose}
        >
            {isSubmitError && <ApiErrorMessage message="Не удалось сохранить данные сделки." />}
            {isClientsError && <ApiErrorMessage message="Не удалось загрузить список клиентов." />}

            <FormModalField label="Название" htmlFor="deal-title" required full error={errors.title?.message}>
                <Controller
                    control={control}
                    name="title"
                    render={({field}) => (
                        <Input
                            {...field}
                            id="deal-title"
                            placeholder="Название сделки"
                            status={errors.title ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Клиент" labelId="deal-client-label" required full error={errors.clientId?.message}>
                <Controller
                    control={control}
                    name="clientId"
                    render={({field}) => (
                        <Select
                            {...field}
                            aria-labelledby="deal-client-label"
                            placeholder="Выберите клиента"
                            options={clientOptions}
                            loading={isClientsFetching}
                            disabled={isClientsError}
                            showSearch
                            optionFilterProp="label"
                            status={errors.clientId ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Сумма" htmlFor="deal-amount" required error={errors.amount?.message}>
                <Controller
                    control={control}
                    name="amount"
                    render={({field}) => (
                        <InputNumber
                            {...field}
                            id="deal-amount"
                            min={0}
                            suffix="₽"
                            className={Styles.formModal__fullWidthControl}
                            placeholder="0"
                            status={errors.amount ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Этап" labelId="deal-status-label" required>
                <Controller
                    control={control}
                    name="status"
                    render={({field}) => (
                        <Select {...field} aria-labelledby="deal-status-label" options={DEAL_STATUS_OPTIONS} />
                    )}
                />
            </FormModalField>

            <FormModalField label="Описание" htmlFor="deal-description" full>
                <Controller
                    control={control}
                    name="description"
                    render={({field}) => (
                        <Input.TextArea {...field} id="deal-description" placeholder="Описание сделки" rows={3} />
                    )}
                />
            </FormModalField>
        </FormModal>
    );
};
