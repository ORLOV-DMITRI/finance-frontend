'use client'

import styles from './DeleteModal.module.scss'
import {FC} from "react";
import {Modal} from "@/ui/Modal";
import {Card} from "@/ui/Card/Card";
import {Button} from "@/ui/Button/Button";
import {ModalTitle} from "@/components/deposits/ModalTitle/ModalTitle";

type DeleteModalType = {
    onClose: () => void;
    onDelete: () => void;
}

export const DeleteModal: FC<DeleteModalType> = ({onClose, onDelete}) => {
    return (
        <Modal onClose={onClose} isOpen={true}>
            <Card className={styles.editMode}>
                <ModalTitle>Вы действительно хотите удалить конверт?</ModalTitle>
                <Button size={'full'} variant="delete" onClick={onDelete}>Удалить</Button>
                <Button variant={'dark'} size={'full'} onClick={onClose}>Отмена</Button>
            </Card>
        </Modal>
    );
};