'use client'

import styles from './ModalTitle.module.scss'
import {FC, ReactNode} from "react";

type ModalTitleType = {
    children: ReactNode
}

export const ModalTitle: FC<ModalTitleType> = ({children}) => {
    return (<div className={styles.modalTitle}>{children}</div>);
};