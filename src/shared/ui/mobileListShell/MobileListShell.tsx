import type {ReactNode} from 'react';
import {Button, Input} from 'antd';

import {ApiErrorMessage} from '@/shared/ui/apiErrorMessage';
import {MainSection} from '@/shared/ui/mainSection';

import Styles from './mobileListShell.module.css';

type TMobileListShellProps = {
    search: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    searchAriaLabel?: string;
    isFetching?: boolean;
    isError?: boolean;
    errorMessage?: string;
    addButtonText: string;
    onAddClick: () => void;
    children: ReactNode;
};

/**
 * Оболочка мобильного списка: поиск, ошибка загрузки, список карточек и кнопка добавления.
 * @param props Параметры оболочки.
 */
export const MobileListShell = ({
    search,
    onSearchChange,
    searchPlaceholder = 'Искать',
    searchAriaLabel,
    isFetching,
    isError,
    errorMessage,
    addButtonText,
    onAddClick,
    children,
}: TMobileListShellProps) => (
    <MainSection>
        <Input
            className={Styles.mobileListShell__search}
            placeholder={searchPlaceholder}
            allowClear
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={searchAriaLabel ?? searchPlaceholder}
            disabled={isFetching}
            prefix={<span className={Styles.mobileListShell__searchIcon} aria-hidden="true"/>}
        />
        {isError && <ApiErrorMessage message={errorMessage}/>}

        <div className={Styles.mobileListShell__list}>
            {children}
        </div>

        <Button className={Styles.mobileListShell__addButton} type="primary" onClick={onAddClick}>
            {addButtonText}
        </Button>
    </MainSection>
);
