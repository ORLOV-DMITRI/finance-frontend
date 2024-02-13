import styles from './HomeActions.module.scss'
import CostIcon from '/public/svg/cost.svg'
import IncomeIcon from '/public/svg/income.svg'
import DepositIcon from '/public/svg/deposit.svg'
import {Card} from "@/ui/Card/Card";
import cn from "classnames";
import toast from "react-hot-toast";
import {useState} from "react";

type HomeActionsType = {}

export default function HomeActions({}: HomeActionsType) {

    const [toastId, setToastId] = useState('')

    // Функция для отображения тоста с сохранением его ID
    const showToast = (message: string) => {
        // Возвращаем ID тоста для дальнейшего контроля
        return toast(message, {
            duration: Infinity, // Тост будет показан бесконечно, пока пользователь не уберет курсор
            className: 'custom-toast-container',
        });
    };

    // Функция для скрытия тоста по его ID
    const hideToast = (toastId: string) => {
        toast.dismiss(toastId);
    };

    // Обработчики событий
    const handleMouseEnter = (message: string) => {
        console.log(message)

        const toastId = showToast(message);
        // Сохраняем ID тоста в атрибуте элемента, чтобы иметь к нему доступ в handleMouseLeave
        setToastId(toastId)
    };

    const handleMouseLeave = () => {
        hideToast(toastId);
    };


    return (
        <div className={styles.actions}>
            <Card className={cn(styles.action, styles.deposit)}
                  onMouseEnter={() => handleMouseEnter('Создать быстрый конверт')}
                  onMouseLeave={() => handleMouseLeave()}>
                <DepositIcon/>
            </Card>
            <Card className={cn(styles.action, styles.income)}
                  onMouseEnter={() => handleMouseEnter('Создать быстрый доход')}
                  onMouseLeave={() => handleMouseLeave()}>
                <IncomeIcon/>
            </Card>
            <Card className={cn(styles.action, styles.cost)}
                  onMouseEnter={() => handleMouseEnter('Создать быстрый расход')}
                  onMouseLeave={() => handleMouseLeave()}>
                <CostIcon/>
            </Card>
        </div>
    );
};