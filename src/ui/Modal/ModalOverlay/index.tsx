import styles from './ModalOverlay.module.scss'
import {FC} from "react";

type ModalType = {
    onClose: () => void

}

export const ModalOverlay: FC<ModalType> = ({onClose}) => {
    return (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
        </>
    )
}