import type {ReactNode} from 'react';

import Styles from './formModal.module.css';

type TFormModalFieldProps = {
    label: ReactNode;
    htmlFor?: string;
    labelId?: string;
    required?: boolean;
    full?: boolean;
    error?: string;
    children: ReactNode;
};

/**
 * Поле формы внутри модального окна: подпись, контрол и текст ошибки.
 * @param label Текст подписи поля.
 * @param htmlFor Id связанного контрола (если подпись должна быть тегом `label`).
 * @param labelId Id подписи для `aria-labelledby` (если контрол не поддерживает `htmlFor`).
 * @param required Флаг отображения признака обязательного поля.
 * @param full Флаг растягивания поля на всю ширину сетки.
 * @param error Текст ошибки валидации.
 * @param children Контрол поля.
 */
export const FormModalField = ({label, htmlFor, labelId, required, full, error, children}: TFormModalFieldProps) => {
    const fieldClassName = `${Styles.formModal__field} ${full ? Styles['formModal__field--full'] : ''}`.trim();

    const labelContent = (
        <span className={Styles.formModal__label} id={labelId}>
            {label} {required && <span aria-hidden="true">*</span>}
        </span>
    );

    const errorContent = error && <span className={Styles.formModal__error}>{error}</span>;

    if (htmlFor) {
        return (
            <label className={fieldClassName} htmlFor={htmlFor}>
                {labelContent}
                {children}
                {errorContent}
            </label>
        );
    }

    return (
        <div className={fieldClassName}>
            {labelContent}
            {children}
            {errorContent}
        </div>
    );
};
