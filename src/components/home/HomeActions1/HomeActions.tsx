import styles from './HomeActions.module.scss'
import CostIcon from '/public/svg/cost.svg'
import IncomeIcon from '/public/svg/income.svg'
import DepositIcon from '/public/svg/deposit.svg'
import {Card} from "@/ui/Card/Card";
import cn from "classnames";
import {Modal} from "@/ui/Modal";
import {IForm} from "@/components/iForm/iForm";
import {useState} from "react";
import {SimpleInput} from "@/ui/SimpleInput/SimpleInput";
import {Button} from "@/ui/Button/Button";
import DepositModal from "@/components/deposits/DepositModal/DepositModal";
import {useAddDepositMutation} from "@/hooks/deposit/useAddDepositMutation";
import {useAddCostMutation} from "@/hooks/cost/useAddCostMutation";
import {useAddIncomeMutation} from "@/hooks/income/useAddIncomeMutation";
import {RecordClientType} from "@/types/types";


type HomeActionsType = {}

export default function HomeActions1({}: HomeActionsType) {

    const [isOpenModal, setIsModalOpen] = useState(false);
    const [addDepositMode, setAddDepositMode] = useState(false)
    const [newDepositName, setNewDepositName] = useState('')
    const [type, setType] = useState('')

    const addMutation = type === 'cost' ? useAddCostMutation() : useAddIncomeMutation();
    const addDeposit = useAddDepositMutation()


    const onOpenCostModal = () => {
        setIsModalOpen(true)
        setType('cost')
    }
    const onOpenIncomeModal = () => {
        setIsModalOpen(true)
        setType('income')
    }
    const onOpenDepositModal = () => {
        setAddDepositMode(true)
        setType('deposit')
    }

    const handleAdd = (values?: RecordClientType) => {
        if (type === 'deposit') {
            addDeposit({name: newDepositName});
            setAddDepositMode(false)
            setNewDepositName('')
        } else {
            if (values) {
                values.sum = Number.parseInt(String(values.sum))
                addMutation(values)
                setIsModalOpen(false)
            }
        }
    }

    return (
        <>
            <div className={styles.actions}>
                <Card className={cn(styles.action, styles.deposit)} onClick={onOpenDepositModal}>
                    <div className={styles.tooltip}>
                        Быстрый конверт
                    </div>
                    <DepositIcon/>
                </Card>
                <Card className={cn(styles.action, styles.income)} onClick={onOpenIncomeModal}>
                    <div className={styles.tooltip}>
                        Быстрый доход
                    </div>

                    <IncomeIcon/>
                </Card>
                <Card className={cn(styles.action, styles.cost)} onClick={onOpenCostModal}>
                    <div className={styles.tooltip}>
                        Быстрый расход
                    </div>
                    <CostIcon/>
                </Card>
            </div>
            <Modal
                onClose={() => setIsModalOpen(false)}
                isOpen={isOpenModal}
            >
                <IForm onSubmit={handleAdd} type={type} isVisibleRepeat={false}/>
            </Modal>
            <Modal onClose={() => setAddDepositMode(false)} isOpen={addDepositMode}>
                <DepositModal newDepositName={newDepositName} handleAddDeposit={handleAdd}
                              handleSetDepositName={(name: string) => setNewDepositName(name)}/>
            </Modal>
        </>
    );
};