
import {createPortal} from "react-dom";
import {FC, ReactNode, useEffect, useState} from "react";
import IconClose from "/public/svg/close-modal.svg";
import styles from "./Modal.module.scss";
import cn from "classnames";
import {ModalOverlay} from "@/ui/Modal/ModalOverlay";

type ModalType = {
    children: ReactNode,
    onClose: () => void
    isOpen: boolean

}

export const Modal: FC<ModalType> = ({children, onClose, isOpen}) => {

    const [mounted, setMounted] = useState(false);


    const keydownHandler = ({key} : KeyboardEvent) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
            default:
        }
    };
    useEffect(() => {
        setMounted(true)
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => document.removeEventListener("keydown", keydownHandler);
    });


    return mounted && isOpen ? createPortal(<>
        <ModalOverlay onClose={onClose}/>
        <div className={cn(styles.modal)}>
            <div className={styles.modalClose} onClick={onClose}>
                <IconClose/>
            </div>
            {children}
        </div>
    </>, document.body) : null;
}