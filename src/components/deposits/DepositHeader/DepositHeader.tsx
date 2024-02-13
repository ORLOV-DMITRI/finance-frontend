'use client'
import styles from './DepositHeader.module.scss'
import {FC, useState} from "react";
import {Title} from "@/ui/Title/Title";
import {Button} from "@/ui/Button/Button";
import {Modal} from "@/ui/Modal";
import {Card} from "@/ui/Card/Card";
import {SimpleInput} from "@/ui/SimpleInput/SimpleInput";
import {useAddDepositMutation} from "@/hooks/deposit/useAddDepositMutation";

type DepositHeaderType = {}

export const DepositHeader: FC<DepositHeaderType> = () => {
    const [addDepositMode, setAddDepositMode] = useState(false)
    const [newDepositName, setNewDepositName] = useState('')

    const addDeposit = useAddDepositMutation()

    const handleAddDeposit = () => {
        addDeposit({name: newDepositName});
        setAddDepositMode(false)
        setNewDepositName('')
    }
    const handleSetDepositName = (name: string) => {
        setNewDepositName(name)
    }
    return (
        <div className={styles.header}>
            <Title>Конверты</Title>
            <Button variant={'green'} size={'auto'} onClick={() => setAddDepositMode(true)}>Создать конверт</Button>

            <Modal onClose={() => setAddDepositMode(false)} isOpen={addDepositMode}>
                <Card className={styles.addModal}>
                    <div className={styles.addTitle}>Придумайте имя конверта</div>
                    <SimpleInput value={newDepositName} onChange={(event) => handleSetDepositName(event.target.value)}/>
                    <Button variant={'green'} size={'auto'} onClick={handleAddDeposit}>Создать конверт</Button>
                </Card>
            </Modal>
        </div>
    );
};