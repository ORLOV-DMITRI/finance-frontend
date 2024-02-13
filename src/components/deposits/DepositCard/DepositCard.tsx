'use client'
import styles from './DepositCard.module.scss'
import {FC, useCallback, useState} from "react";
import {DepositServerType} from "@/types/types";
import {useDeleteDepositMutation} from "@/hooks/deposit/useDeleteDepositMutation";
import {useUpdateDepositMutation} from "@/hooks/deposit/useUpdateDepositMutation";
import {Card} from "@/ui/Card/Card";
import {DepositActions} from "@/components/deposits/DepositActions/DepositActions";
import {DeleteModal} from "@/components/deposits/DeleteModal/DeleteModal";
import {AddRemoveModal} from "@/components/deposits/AddRemoveModal/AddRemoveModal";
import {EditNameModal} from "@/components/deposits/EditNameModal/EditNameModal";
import Link from "next/link";

type DepositCardType = {
    item: DepositServerType
}

export const DepositCard: FC<DepositCardType> = ({item}) => {

    const [modalType, setModalType] = useState('');

    const deleteDeposit = useDeleteDepositMutation();
    const updateDeposit = useUpdateDepositMutation();

    const handleDeleteDeposit = useCallback(() => {
        deleteDeposit(item.id);
        setModalType('')
    }, [deleteDeposit, item.id]);

    const handleUpdateDeposit = useCallback((updatedItem: DepositServerType) => {
        updateDeposit(updatedItem);
    }, [updateDeposit]);

    const closeModal = useCallback(() => setModalType(''), []);

    return (
        <Card className={styles.item}>
            <Link href={`#`}>
            <DepositActions
                item={item}
                onEdit={() => setModalType('edit')}
                onDelete={() => setModalType('delete')}
                onAddSum={() => setModalType('addSum')}
                onRemoveSum={() => setModalType('removeSum')}
            />
            {modalType === 'edit' && <EditNameModal item={item} onClose={closeModal} onSave={handleUpdateDeposit} />}
            {modalType === 'delete' && <DeleteModal onClose={closeModal} onDelete={handleDeleteDeposit} />}
            {modalType === 'addSum' && <AddRemoveModal mode="add" item={item} onClose={closeModal} onSave={handleUpdateDeposit} />}
            {modalType === 'removeSum' && <AddRemoveModal mode="remove" item={item} onClose={closeModal} onSave={handleUpdateDeposit} />}
            </Link>
        </Card>
    );
};