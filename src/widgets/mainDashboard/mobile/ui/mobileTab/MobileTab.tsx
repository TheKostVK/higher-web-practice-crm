import Styles from './mobileTab.module.css';
import {Button, Skeleton} from "antd";
import type {ReactNode} from "react";
import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';

type TMobileTabProps = {
    children: ReactNode;
    isLoading: boolean;
    isError?: boolean;
    errorMessage?: string;
    tabTitle?: string;
    buttonText?: string;
    buttonOnClick?: () => void;
}

/**
 * Отображает мобильную вкладку dashboard с состояниями загрузки и ошибки.
 * @param props Свойства вкладки.
 */
export const MobileTab = ({children, isLoading, isError = false, errorMessage, tabTitle, buttonText, buttonOnClick}: TMobileTabProps) => {
    return (
        <div className={Styles.tab}>
            {tabTitle ? <h2 className={Styles.tab__title}>{tabTitle}</h2> : null}
            <div className={Styles.tab__content}>
                {isLoading ? <Skeleton active/> : isError ? <ApiErrorMessage message={errorMessage}/> : children}
            </div>
            {buttonText && buttonOnClick ?
                <Button
                    className={Styles.tab__button}
                    type="primary"
                    onClick={() => buttonOnClick()}
                >
                    {buttonText}
                </Button>
                :
                null
            }
        </div>
    );
};
