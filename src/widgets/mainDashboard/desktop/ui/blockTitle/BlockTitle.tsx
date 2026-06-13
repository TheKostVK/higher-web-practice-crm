import Styles from './blockTitle.module.css';

type TBlockTitleProps = {
  title: string;
};

export const BlockTitle = ({title}: TBlockTitleProps) => {
    return <h3 className={Styles.title}>{title}</h3>;
};
