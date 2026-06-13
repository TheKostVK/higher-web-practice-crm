import type {HTMLAttributes, ReactNode} from 'react';

import Styles from './card.module.css';

type TCardProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    className?: string;
};

/**
 * Отображает базовую карточку.
 * @param props Параметры карточки.
 * @returns Карточка.
 */
export const Card = ({children, className = '', ...props}: TCardProps) => {
    return <div {...props} className={`${Styles.card} ${className}`.trim()}>{children}</div>;
};
