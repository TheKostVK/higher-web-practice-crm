import {memo, type ChangeEventHandler, type FocusEventHandler} from 'react';
import {Input} from 'antd';
import {FormField} from './FormField.tsx';
import Styles from './formInput.module.css';

type TFormPasswordInputProps = {
    id: string;
    label: string;
    name?: string;
    value?: string;
    placeholder?: string;
    autoComplete?: string;
    error?: string;
    disabled?: boolean;
    className?: string;
    controlClassName?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
};

export const FormPasswordInput = memo(
    ({
        id,
        label,
        name,
        value,
        placeholder,
        autoComplete,
        error,
        disabled = false,
        className = '',
        controlClassName = '',
        onChange,
        onBlur,
    }: TFormPasswordInputProps) => {
        return (
            <FormField id={id} label={label} error={error} className={className}>
                <Input.Password
                    id={id}
                    name={name}
                    value={value}
                    className={`${Styles.formInput__control} ${controlClassName}`}
                    status={error ? 'error' : undefined}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </FormField>
        );
    },
);
