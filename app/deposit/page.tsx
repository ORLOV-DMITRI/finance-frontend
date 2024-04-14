'use client'
import styles from './style.module.scss'
import {FC, useMemo} from "react";
import {DepositContent} from "@/components/deposits/DepositContent/DepositContent";
import {DepositHeader} from "@/components/deposits/DepositHeader/DepositHeader";
import {useAuth} from "@/hooks/auth/useAuth";
import {useDepositQuery} from "@/hooks/deposit/useDepositQuery";
import {useDepositTotalQuery} from "@/hooks/statistics/useDepositTotal";
import {priceRu} from "@/utils/priceRu";

type DepositPageType = {}


const DepositPage: FC<DepositPageType> = () => {

    const isAuthenticated = useAuth();
    const {data} = useDepositQuery(isAuthenticated);
    const depositTotal = useDepositTotalQuery()

    const memoizedDepositData = useMemo(() => data, [data]);


    return (
        <section className={styles.deposit}>
            <div className="container">
                <div className={styles.scroll}>
                    <DepositHeader/>
                    <div className={styles.total}>Всего в конвертах : <span>{priceRu(depositTotal)} ₽</span></div>
                </div>
                <DepositContent data={memoizedDepositData}/>
            </div>
        </section>);
};

export default DepositPage;
