'use client'
import styles from './Table.module.scss'
import {TableItem} from "@/components/records/TableItem/TableItem";
import {useSelection} from "@/components/records/DisplayData/SelectionProvider/SelectionProvider";
import {RecordServerType} from "@/types/types";

const mok: RecordServerType = {
    id: '',
    name: '',
    sum: 0,
    date: new Date()
}

export const Table = () => {

    const {data, handleCheckItem, checkedItems, allChecked, handleAllCheckedItem, type} = useSelection();

    return (
        <>
            <div className={styles.tableTitle} onClick={handleAllCheckedItem}>
                <TableItem type={type} isTitle item={mok} isActive={allChecked}/>
            </div>
            <div className={styles.list}>
                {data?.map(item => (
                    <TableItem type={type} item={item} key={item.id} onClick={handleCheckItem}
                               isActive={allChecked ? true : checkedItems.includes(item.id)}/>
                ))}
            </div>
        </>)
};