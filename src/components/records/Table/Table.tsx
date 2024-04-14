'use client'
import styles from './Table.module.scss'
import {TableItem} from "@/components/records/TableItem/TableItem";
import {useSelection} from "@/components/records/DisplayData/SelectionProvider/SelectionProvider";
import {RecordServerType} from "@/types/types";
import TableHead from "@/components/records/TableHead/TableHead";

const mok: RecordServerType = {
    id: '',
    name: '',
    sum: 0,
    date: new Date()
}

export const Table = () => {

    const {data, handleCheckItem, checkedItems, allChecked, handleAllCheckedItem, type} = useSelection();

    const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });
    type GroupedData = Record<string, RecordServerType[]>;

    const groupedData: GroupedData = sortedData.reduce((groups: GroupedData, item: RecordServerType) => {
        const dateString = item.date instanceof Date ? item.date.toISOString() : item.date;
        const date = dateString.split('T')[0];
        const now = new Date(dateString)
        const dateF = (new Intl.DateTimeFormat('ru-Ru', {
            dateStyle: 'full'
        }).format(now))

        groups[date] = groups[date] || [];
        groups[date].push(item);
        console.log(groups)
        return groups;
    }, {});

    const formatDateRu = (dateString: string) => {
        const now = new Date(dateString)
        return (new Intl.DateTimeFormat('ru-Ru', {
            dateStyle: 'full'
        }).format(now))
    }


    return (
        <>
            <div className={styles.tableTitle} onClick={handleAllCheckedItem}>
                <TableHead type={type} isTitle item={mok} isActive={allChecked}/>
            </div>
            <div className={styles.list}>
                {Object.entries(groupedData).map(([date, items]) => (
                    <div key={date} className={styles.group}>
                        <div className={styles.dateSeparator}>{formatDateRu(date)}</div>
                        {items.map(item => (
                            <TableItem
                                type={type}
                                item={item}
                                key={item.id}
                                onClick={() => handleCheckItem(item.id)}
                                isActive={allChecked ? true : checkedItems.includes(item.id)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>)
};
