import styles from './TableHead.module.scss'
import {FC} from "react";
import cn from "classnames";
import {CheckBox} from "@/ui/CheckBox/CheckBox";
import {RecordServerType} from "@/types/types";
import {useFormatDate} from "@/hooks/formatDateToString";

type TableHeadType = {
    item: RecordServerType
    isTitle?: boolean
    onClick?: (id: string) => void
    isActive?: boolean
    type: 'income' | 'cost'
}

export default function TableHead({item, isTitle, onClick, isActive}: TableHeadType) {


    return (
        <div
            className={cn(styles.costItem, styles.title)}>
            <CheckBox checked={isActive}/>
            <div className={styles.date}>Дата</div>
            <div className={styles.name}>Название</div>
            <div className={cn(styles.price)}>Сумма</div>
        </div>)
};