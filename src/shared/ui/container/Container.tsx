import type {ReactNode} from "react";

import Styles from './constainer.module.css';

type TContainerProps = {
    children: ReactNode;
}

export const Container = ({children}: TContainerProps) => {
    return (
        <div className={Styles.container}>
            <>{children}</>
        </div>
    )
}