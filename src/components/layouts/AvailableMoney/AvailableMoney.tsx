'use client'

import styles from './AvailableMoney.module.scss'
import {FC} from "react";
import {useAvailableQuery} from "@/hooks/statistics/useAvailableQuery";
import {hasUser} from "@/hooks/auth/hasUser";
import {priceRu} from "@/utils/priceRu";

type AvailableMoneyType = {}

export const AvailableMoney: FC<AvailableMoneyType> = () => {

    const isAuthenticated = hasUser()
    const total = useAvailableQuery(isAuthenticated)

    return (<div className={styles.total}>
        Доступно:  <span> {priceRu(total)} ₽</span>
    </div>);
};