import type {HTMLAttributes, ReactNode} from 'react';

import {Card} from '@/shared/ui/card';

import Styles from './statusCard.module.css';

export type TStatusCardVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

type TStatusCardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    className?: string;
    variant?: TStatusCardVariant;
};

type TStatusTextProps = HTMLAttributes<HTMLSpanElement> & {
    children: ReactNode;
    className?: string;
    tone?: TStatusCardVariant;
};

const CARD_VARIANT_CLASS: Record<TStatusCardVariant, string> = {
    default: '',
    info: Styles['card--info'],
    success: Styles['card--success'],
    warning: Styles['card--warning'],
    danger: Styles['card--danger'],
};

const TEXT_TONE_CLASS: Record<TStatusCardVariant, string> = {
    default: '',
    info: Styles['text--info'],
    success: Styles['text--success'],
    warning: Styles['text--warning'],
    danger: Styles['text--danger'],
};

/**
 * Отображает карточку с визуальным вариантом состояния.
 * @param props Параметры карточки.
 * @returns Карточка состояния.
 */
export const StatusCard = ({children, className = '', variant = 'default', ...props}: TStatusCardProps) => (
    <Card {...props} className={[Styles.card, className, CARD_VARIANT_CLASS[variant]].filter(Boolean).join(' ')}>
        {children}
    </Card>
);

/**
 * Отображает текст с визуальным тоном состояния.
 * @param props Параметры текста.
 * @returns Текст состояния.
 */
export const StatusText = ({children, className = '', tone = 'default', ...props}: TStatusTextProps) => (
    <span {...props} className={[className, TEXT_TONE_CLASS[tone]].filter(Boolean).join(' ')}>
        {children}
    </span>
);
