import {memo} from 'react';
import {Alert} from 'antd';

import Styles from './apiErrorMessage.module.css';

type TApiErrorMessageProps = {
    message?: string;
    className?: string;
};

/**
 * Показывает сообщение об ошибке загрузки данных.
 * @param message Текст сообщения.
 * @param className Дополнительный CSS-класс.
 */
export const ApiErrorMessage = memo(
    ({
        message = 'Не удалось загрузить данные. Попробуйте обновить страницу.',
        className = '',
    }: TApiErrorMessageProps) => (
        <Alert
            className={`${Styles.apiErrorMessage} ${className}`}
            message={message}
            type="error"
            showIcon
            role="alert"
        />
    ),
);
