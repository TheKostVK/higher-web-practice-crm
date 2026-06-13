import type {ReactNode} from 'react';

import Styles from './card.module.css';

type TCardProps = {
    children: ReactNode;
    className?: string;
};

export const Card = ({children, className = ''}: TCardProps) => {
    return <div className={`${Styles.card} ${className}`.trim()}>{children}</div>;
};
