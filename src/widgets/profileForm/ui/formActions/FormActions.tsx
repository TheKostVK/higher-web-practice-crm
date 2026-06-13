import {Button} from '@/shared/ui/button';
import {PROFILE_FORM_ID} from '../../lib';
import Styles from './formActions.module.css';

type TFormActionsProps = {
    isFormLoading: boolean;
    isDeleting: boolean;
    onLogout: () => void;
    onDelete: () => void;
};

export const FormActions = ({isFormLoading, isDeleting, onLogout, onDelete}: TFormActionsProps) => (
    <div className={Styles.formActions}>
        <Button
            className={Styles.formActions__submitButton}
            form={PROFILE_FORM_ID}
            htmlType="submit"
            loading={isFormLoading}
            disabled={isDeleting}
        >
            Сохранить изменения
        </Button>

        <Button
            className={Styles.formActions__logoutButton}
            view="outline"
            htmlType="button"
            loading={isDeleting}
            onClick={onLogout}
        >
            Выйти из аккаунта
        </Button>

        <Button
            className={Styles.formActions__deleteButton}
            view="outline"
            htmlType="button"
            loading={isDeleting}
            onClick={onDelete}
        >
            Удалить аккаунт
        </Button>
    </div>
);
