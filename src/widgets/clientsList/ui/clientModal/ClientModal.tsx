import {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Input} from 'antd';

import {useCreateClientMutation, useUpdateClientMutation} from '@/entities/client';
import {selectorUserData} from '@/entities/user';
import {useAppSelector} from '@/app';
import type {TClient} from '@/entities/client';
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {FormModal, FormModalField} from '@/shared/ui/formModal';

import {clientSchema, type TClientFormValues} from './clientModalSchema';

type TClientModalProps = {
    open: boolean;
    client?: TClient;
    onClose: () => void;
};

/**
 * Модальное окно создания и редактирования клиента.
 * @param open Флаг видимости модального окна.
 * @param client Данные клиента для редактирования (если передан — режим редактирования).
 * @param onClose Колбэк закрытия модального окна.
 */
export const ClientModal = ({open, client, onClose}: TClientModalProps) => {
    const user = useAppSelector(selectorUserData);
    const [createClient, {isLoading: isCreating, isError: isCreateError}] = useCreateClientMutation();
    const [updateClient, {isLoading: isUpdating, isError: isUpdateError}] = useUpdateClientMutation();

    const isEdit = Boolean(client);
    const isLoading = isCreating || isUpdating;
    const isSubmitError = isCreateError || isUpdateError;

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<TClientFormValues>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            company: '',
            website: '',
            comment: '',
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                name: client?.name ?? '',
                phone: client?.phone ?? '',
                email: client?.email ?? '',
                company: client?.company ?? '',
                website: client?.website ?? '',
                comment: client?.comment ?? '',
            });
        }
    }, [open, client, reset]);

    const handleFormSubmit = async (values: TClientFormValues) => {
        try {
            if (isEdit && client) {
                await updateClient({id: client.id, data: values}).unwrap();
            } else {
                await createClient({...values, createdBy: user!.id}).unwrap();
            }
            onClose();
        } catch {
            // ошибка обрабатывается состоянием мутации
        }
    };

    return (
        <FormModal
            open={open}
            title={isEdit ? 'Карточка клиента' : 'Новый клиент'}
            okText={isEdit ? 'Сохранить' : 'Создать'}
            confirmLoading={isLoading}
            onOk={handleSubmit(handleFormSubmit)}
            onCancel={onClose}
        >
            {isSubmitError && <ApiErrorMessage message="Не удалось сохранить данные клиента." />}

            <FormModalField label="Имя" htmlFor="client-name" required full error={errors.name?.message}>
                <Controller
                    control={control}
                    name="name"
                    render={({field}) => (
                        <Input
                            {...field}
                            id="client-name"
                            placeholder="Иван Иванов"
                            status={errors.name ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Телефон" htmlFor="client-phone" required error={errors.phone?.message}>
                <Controller
                    control={control}
                    name="phone"
                    render={({field}) => (
                        <Input
                            {...field}
                            id="client-phone"
                            placeholder="+7 900 000-00-00"
                            status={errors.phone ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Компания" htmlFor="client-company" required error={errors.company?.message}>
                <Controller
                    control={control}
                    name="company"
                    render={({field}) => (
                        <Input
                            {...field}
                            id="client-company"
                            placeholder="ООО «Пример»"
                            status={errors.company ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Сайт" htmlFor="client-website" error={errors.website?.message}>
                <Controller
                    control={control}
                    name="website"
                    render={({field}) => (
                        <Input
                            {...field}
                            id="client-website"
                            placeholder="www.example.com"
                            status={errors.website ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Email" htmlFor="client-email" required error={errors.email?.message}>
                <Controller
                    control={control}
                    name="email"
                    render={({field}) => (
                        <Input
                            {...field}
                            id="client-email"
                            type="email"
                            placeholder="ivan@example.com"
                            status={errors.email ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>

            <FormModalField label="Комментарий" htmlFor="client-comment" full error={errors.comment?.message}>
                <Controller
                    control={control}
                    name="comment"
                    render={({field}) => (
                        <Input.TextArea
                            {...field}
                            id="client-comment"
                            placeholder="Дополнительная информация"
                            rows={3}
                            status={errors.comment ? 'error' : undefined}
                        />
                    )}
                />
            </FormModalField>
        </FormModal>
    );
};
