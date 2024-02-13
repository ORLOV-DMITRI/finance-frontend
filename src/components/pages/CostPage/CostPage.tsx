'use client'
import styles from './CostPage.module.scss'
import {FC, useMemo} from "react";
import {useCostQuery} from "@/hooks/cost/useCostQuery";
import {DisplayData} from "@/components/records/DisplayData/DisplayData";
import {Title} from "@/ui/Title/Title";
import {useAuth} from "@/hooks/auth/useAuth";


type CostPageType = {}

 const CostPage: FC<CostPageType> = () => {

    const isAuthenticated = useAuth();

    const data = useCostQuery(isAuthenticated);


    const memoizedCostData = useMemo(() => data, [data]);

    return (<section className={styles.costPage}>
        <div className="container">
            <Title>Расходы</Title>
            <DisplayData data={memoizedCostData} type={'cost'}/>
        </div>
    </section>);
};

export default CostPage;