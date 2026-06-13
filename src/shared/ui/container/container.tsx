import type {ReactNode} from 'react';

import Styles from './container.module.css';

type TContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({children, className = ''}: TContainerProps) => {
  return (
    <div className={Styles.container}>
      <div className={`${Styles.container__content} ${className}`}>{children}</div>
    </div>
  );
};
