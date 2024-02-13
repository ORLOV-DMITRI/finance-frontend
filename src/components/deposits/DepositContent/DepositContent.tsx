'use client'
import styles from './DepositContent.module.scss'
import {FC, useMemo} from "react";
import {useDepositQuery} from "@/hooks/deposit/useDepositQuery";
import {DepositServerType} from "@/types/types";
import {DepositCard} from "@/components/deposits/DepositCard/DepositCard";
import Link from "next/link";

type DepositContentType = {
    data: DepositServerType[]
}

export const DepositContent: FC<DepositContentType> = ({data}) => {


    return (
        <div className={styles.content}>
            <div className={styles.list}>
                {data?.map(card => (
                    <DepositCard item={card} key={card.name}/>
                ))}
            </div>
        </div>
    );
};