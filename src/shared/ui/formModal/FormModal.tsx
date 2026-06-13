import type {ReactNode} from 'react';
import {Modal} from 'antd';

import Styles from './formModal.module.css';

type TFormModalProps = {
    open: boolean;
    title: string;
    okText: string;
    cancelText?: string;
    confirmLoading?: boolean;
    width?: number;
    onOk: () => void;
    onCancel: () => void;
    children: ReactNode;
};

/**
 * Базовый шаблон модального окна для форм создания/редактирования сущностей.
 * @param open Флаг видимости модального окна.
 * @param title Заголовок модального окна.
 * @param okText Текст кнопки подтверждения.
 * @param cancelText Текст кнопки отмены.
 * @param confirmLoading Флаг отображения загрузки на кнопке подтверждения.
 * @param width Ширина модального окна.
 * @param onOk Колбэк подтверждения формы.
 * @param onCancel Колбэк закрытия модального окна.
 * @param children Содержимое формы.
 */
export const FormModal = ({
    open,
    title,
    okText,
    cancelText = 'Отменить',
    confirmLoading,
    width = 580,
    onOk,
    onCancel,
    children,
}: TFormModalProps) => (
    <Modal
        open={open}
        title={title}
        okText={okText}
        cancelText={cancelText}
        confirmLoading={confirmLoading}
        onOk={onOk}
        onCancel={onCancel}
        width={width}
        centered
        destroyOnHidden
    >
        <div className={Styles.formModal}>{children}</div>
    </Modal>
);
