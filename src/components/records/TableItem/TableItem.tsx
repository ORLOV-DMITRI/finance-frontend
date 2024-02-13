'use client'
import styles from './TableItem.module.scss'
import {FC} from "react";
import cn from "classnames";
import {CheckBox} from "@/ui/CheckBox/CheckBox";
import {RecordServerType} from "@/types/types";
import {useFormatDate} from "@/hooks/formatDateToString";

type TableItemType = {
    item: RecordServerType
    isTitle?: boolean
    onClick?: (id: string) => void
    isActive?: boolean
    type: 'income' | 'cost'
}


export const TableItem: FC<TableItemType> = ({item, isTitle, onClick, isActive, type}) => {


    const formattedDate = useFormatDate(item.date)


    return (
        <div
            className={cn(styles.costItem, isTitle ? styles.title : styles.item, isActive && !isTitle && styles.active)}
            onClick={() => onClick && onClick(item?.id)}>
            <CheckBox checked={isActive} onChange={() => onClick && onClick(item.id)}/>
            <div className={styles.date}>{isTitle ? 'Дата' : `${formattedDate}`}</div>
            <div className={styles.name}>{isTitle ? 'Название' : `${item?.name}`}</div>
            <div className={cn(styles.price, styles[type])}>
                {isTitle ? 'Сумма' : <span>{item?.sum} Р</span> }
            </div>
        </div>)
};