import {memo, type ChangeEventHandler, type FocusEventHandler, type ReactNode} from 'react';
import {Input} from 'antd';
import {FormField} from './FormField.tsx';
import Styles from './formInput.module.css';

type TFormTextInputProps = {
    id: string;
    label: string;
    name?: string;
    value?: string;
    placeholder?: string;
    autoComplete?: string;
    error?: string;
    isError?: boolean;
    disabled?: boolean;
    className?: string;
    controlClassName?: string;
    extra?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const FormTextInput = memo(({
                                       id,
                                       label,
                                       name,
                                       value,
                                       placeholder,
                                       autoComplete,
                                       error,
                                       isError = false,
                                       disabled = false,
                                       className = '',
                                       controlClassName = '',
                                       extra,
                                       onChange,
                                       onBlur,
                                   }: TFormTextInputProps) => {
    return (
        <FormField id={id} label={label} error={error} className={className} extra={extra}>
            <Input
                id={id}
                name={name}
                value={value}
                className={`${Styles.formInput__control} ${controlClassName}`}
                status={error || isError ? 'error' : undefined}
                autoComplete={autoComplete}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
            />
        </FormField>
    );
});
