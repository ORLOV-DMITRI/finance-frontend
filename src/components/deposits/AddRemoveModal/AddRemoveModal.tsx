'use client'
import styles from './AddRemoveModal.module.scss'
import {FC, useState} from "react";
import {DepositServerType, RecordClientType} from "@/types/types";
import {Modal} from "@/ui/Modal";
import {Card} from "@/ui/Card/Card";
import {SimpleInput} from "@/ui/SimpleInput/SimpleInput";
import {Button} from "@/ui/Button/Button";
import {ModalTitle} from "@/components/deposits/ModalTitle/ModalTitle";
import {useAddCostMutation} from "@/hooks/cost/useAddCostMutation";
import {useAddTransMutation} from "@/hooks/transaction/useAddTransMutation";

type AddRemoveModalType = {
    mode: 'add' | 'remove';
    item: DepositServerType;
    onClose: () => void;
    onSave: (item: DepositServerType) => void;
}

export const AddRemoveModal: FC<AddRemoveModalType> = ({mode, item, onClose, onSave}) => {
    const [sum, setSum] = useState('');
    const [error, setError] = useState('');
    const [costName, setCostName] = useState('');

    const addCost = useAddCostMutation()
    const addTrans = useAddTransMutation()


    const handleSave = () => {
        let newSum = mode === 'add' ? item.sum + Math.abs(Number(sum)) : item.sum - Math.abs(Number(sum));
        if (newSum < 0) {
            setError('Нельзя снять больше текущей суммы');
            return;
        }
        if (mode === 'remove') {
            const newCost: RecordClientType = {
                name: costName,
                sum: Math.abs(Number(sum)),
                date: new Date()
            }
            addCost(newCost)
        }
        addTrans({depositId: item.id, sum:Math.abs(Number(sum)), type: mode })
        onSave({...item, sum: newSum});
        onClose();
    };

    return (
        <Modal onClose={onClose} isOpen={true}>
            <Card className={styles.editMode}>
                <ModalTitle>{mode === 'add' ? 'Пополнить конверт' : 'Снять с конверта'}</ModalTitle>
                {mode === 'remove' && (
                    <SimpleInput label={'Название расхода'} value={costName}
                                 onChange={(e) => setCostName(e.target.value)}/>
                )}
                <SimpleInput label={'Сумма'} type="number" value={sum} onChange={(e) => setSum(e.target.value)}/>
                {error && <div className={styles.removeSumError}>{error}</div>}
                <Button variant={mode === 'add' ? 'green' : 'delete'} onClick={handleSave}>
                    {mode === 'add' ? 'Пополнить' : 'Снять'}
                </Button>
            </Card>
        </Modal>
    );
};