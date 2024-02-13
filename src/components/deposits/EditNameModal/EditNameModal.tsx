'use client'

import styles from './EditNameModal.module.scss'
import {FC} from "react";

import React, {useState} from 'react';
import {Modal} from "@/ui/Modal";
import {Card} from "@/ui/Card/Card";
import {Button} from "@/ui/Button/Button";
import {SimpleInput} from "@/ui/SimpleInput/SimpleInput";
import {DepositServerType} from "@/types/types";
import {ModalTitle} from "@/components/deposits/ModalTitle/ModalTitle";

type EditNameModalType = {
    item: DepositServerType;
    onClose: () => void;
    onSave: (item: DepositServerType) => void;
}
export const EditNameModal:FC<EditNameModalType> = ({item, onClose, onSave}) => {
    const [currentName, setCurrentName] = useState(item.name);

    const handleSave = () => {
        onSave({...item, name: currentName});
        onClose();
    };

    return (
        <Modal onClose={onClose} isOpen={true}>
            <Card className={styles.editMode}>
                <ModalTitle>Редактировать Имя конверта</ModalTitle>
                <SimpleInput value={currentName} onChange={(e) => setCurrentName(e.target.value)}/>
                <Button variant={'white'}  onClick={handleSave}>Сохранить</Button>
            </Card>
        </Modal>
    );
};
