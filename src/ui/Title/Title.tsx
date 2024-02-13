import styles from './Title.module.scss'
import {FC, ReactNode} from "react";

type TitleType = {
    children: ReactNode
}

export const Title: FC<TitleType> = ({children}) => {
    return (
        <div className={styles.title}>{children}</div>
    );
};