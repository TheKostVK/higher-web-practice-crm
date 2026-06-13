import {memo, type ReactNode} from 'react';
import Styles from './formStatusMessage.module.css';

type TFormStatusMessageType = 'success' | 'error';

type TFormStatusMessageProps = {
    type: TFormStatusMessageType;
    className?: string;
    role?: string;
    children: ReactNode;
};

export const FormStatusMessage = memo(({type, className = '', role, children}: TFormStatusMessageProps) => (
    <p className={`${Styles.formStatusMessage} ${Styles[`formStatusMessage_${type}`]} ${className}`} role={role}>
        {children}
    </p>
));
