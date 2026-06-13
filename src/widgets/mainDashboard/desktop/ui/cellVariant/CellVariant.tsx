import type {ReactNode} from 'react';

import Styles from './cellVariant.module.css';

type TCellVariantStyle = 'default' | 'primary' | 'secondary' | 'completed' | 'cancelled' | 'bold';

export interface CellVariantProps {
  children: ReactNode;
  variant: TCellVariantStyle;
}

export const CellVariant = ({children, variant = 'default'}: CellVariantProps) => {
  switch (variant) {
    case 'primary': {
      return <span className={`${Styles.cellValue} ${Styles['cellValue--primaryText']}`}>{children}</span>;
    }
    case 'secondary': {
      return <span className={`${Styles.cellValue} ${Styles['cellValue--secondaryText']}`}>{children}</span>;
    }
    case 'completed': {
      return <span className={`${Styles.cellValue} ${Styles['cellValue--secondaryText']}`}>{children}</span>;
    }
    case 'cancelled': {
      return <span className={`${Styles.cellValue} ${Styles['cellValue--secondaryText']}`}>{children}</span>;
    }
    case 'bold': {
      return <span className={`${Styles.cellValue} ${Styles['cellValue--boldText']}`}>{children}</span>;
    }
    default: {
      return <span className={`${Styles.cellValue}`}>{children}</span>;
    }
  }
};
