'use client'
import styles from './style.module.scss'
import {FC, useMemo} from "react";
import {useIncomeQuery} from "@/hooks/income/useIncomeQuery";
import {DisplayData} from "@/components/records/DisplayData/DisplayData";
import {Title} from "@/ui/Title/Title";
import {useAuth} from "@/hooks/auth/useAuth";

type IncomePageType = {}

const IncomePage: FC<IncomePageType> = () => {
    const isAuthenticated = useAuth();
    const incomeData = useIncomeQuery(isAuthenticated)

    const memoizedIncomeData = useMemo(() => incomeData, [incomeData]);

    return (
        <section className={styles.costPage}>

        <div className="container">
            <Title>Доходы</Title>
            <DisplayData data={memoizedIncomeData} type={'income'}/>
        </div>
    </section>);
};

export default IncomePage;
