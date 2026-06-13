import {memo, type ReactNode} from 'react';
import Styles from './formInput.module.css';

type TFormFieldProps = {
    id: string;
    label: string;
    error?: string;
    className?: string;
    children: ReactNode;
    extra?: ReactNode;
};

export const FormField = memo(({id, label, error, className = '', children, extra}: TFormFieldProps) => {
    return (
        <div className={`${Styles.formInput} ${className}`}>
            <label className={Styles.formInput__label} htmlFor={id}>
                {label}
            </label>
            {children}
            {error && <span className={Styles.formInput__error}>{error}</span>}
            {extra}
        </div>
    );
});
