'use client'
import styles from './DisplayData.module.scss'
import {Card} from "@/ui/Card/Card";
import {SelectionProvider} from "@/components/records/DisplayData/SelectionProvider/SelectionProvider";
import {FC} from "react";
import {RecordServerType} from "@/types/types";
import {Table} from "@/components/records/Table/Table";
import {Aside} from "@/components/records/Aside/Aside";



type DisplayDataType = {
    data: RecordServerType[]
    type: 'income' | 'cost'
}

export const DisplayData: FC<DisplayDataType> = ({data, type}) => {


    return (
        <SelectionProvider data={data} type={type}>
            <div className={styles.content}>
                <Card className={styles.costList}>
                    <Table/>
                </Card>
                <Card className={styles.costAside}>
                    <Aside type={type}/>
                </Card>
            </div>
        </SelectionProvider>
    );
};