import styles from './DepositModal.module.scss'
import {Card} from "@/ui/Card/Card";
import {SimpleInput} from "@/ui/SimpleInput/SimpleInput";
import {Button} from "@/ui/Button/Button";

type DepositModalType = {
    newDepositName: string
    handleAddDeposit: () => void
    handleSetDepositName: (event: string) => void
}

export default function DepositModal({newDepositName, handleAddDeposit, handleSetDepositName}: DepositModalType) {
    return (
        <Card className={styles.addModal}>
            <div className={styles.addTitle}>Придумайте имя конверта</div>
            <SimpleInput value={newDepositName} onChange={(event) => handleSetDepositName(event.target.value)}/>
            <Button variant={'green'} size={'auto'} onClick={handleAddDeposit}>Создать конверт</Button>
        </Card>
    );
};