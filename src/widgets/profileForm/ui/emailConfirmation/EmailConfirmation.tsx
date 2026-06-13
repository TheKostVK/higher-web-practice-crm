import {Button} from '@/shared/ui/button';
import Styles from './emailConfirmation.module.css';

type TEmailConfirmationProps = {
    onSendConfirmation: () => void;
};

export const EmailConfirmation = ({onSendConfirmation}: TEmailConfirmationProps) => (
    <div className={Styles.emailConfirmation}>
        <p className={Styles.emailConfirmation__hint}>
            Подтвердите почту, чтобы пользоваться всеми возможностями системы
        </p>

        <Button className={Styles.emailConfirmation__button} htmlType="button" onClick={onSendConfirmation}>
            Отправить ссылку
        </Button>
    </div>
);
