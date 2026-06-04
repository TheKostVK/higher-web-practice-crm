import {memo} from 'react';
import {Button as AntButton} from 'antd';
import type {ButtonProps} from 'antd';
import Styles from './button.module.css';

type TButtonView = 'primary' | 'outline' | 'link';

type TButtonProps = ButtonProps & {
    view?: TButtonView;
    fullWidth?: boolean;
};

const getViewClassName = (view: TButtonView) => {
    switch (view) {
        case 'outline':
            return Styles.button_outline;
        case 'link':
            return Styles.button_link;
        default:
            return Styles.button_primary;
    }
};

export const Button = memo(({
                                view = 'primary',
                                fullWidth = false,
                                className = '',
                                type,
                                ...props
                            }: TButtonProps) => {
    const buttonType = type || (view === 'link' ? 'link' : undefined);
    const classNames = [
        Styles.button,
        getViewClassName(view),
        fullWidth ? Styles.button_fullWidth : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <AntButton
            {...props}
            type={buttonType}
            className={classNames}
        />
    );
});
