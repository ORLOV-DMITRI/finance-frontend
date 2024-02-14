'use client'
import styles from './HomePage.module.scss'
import {FC, useEffect, useMemo, useState} from "react";
import {useAuth} from "@/hooks/auth/useAuth";
import {getDeposit} from "@/hooks/deposit/useDepositQuery";
import {getCost, useCostQuery} from "@/hooks/cost/useCostQuery";
import {getIncome} from "@/hooks/income/useIncomeQuery";
import {queryKeys} from "@/react-query/constants";
import {useQueryClient} from "@tanstack/react-query";
import HomeHeader from "@/components/home/HomeHeader/HomeHeader";
import HomeQuote from "@/components/home/HomeQuote/HomeQuote";
import {priceRu} from "@/utils/priceRu";
import {Card} from "@/ui/Card/Card";
import {useAvailableQuery} from "@/hooks/statistics/useAvailableQuery";
import {useDepositTotalQuery} from "@/hooks/statistics/useDepositTotal";
import Link from "next/link";
import HomeInfo from "@/components/home/HomeInfo/HomeInfo";
import HomeActions from "@/components/home/HomeActions/HomeActions";
import HomeActions1 from "@/components/home/HomeActions1/HomeActions";

type HomePageType = {
    // quote: { text: string; author: string; };

}


const HomeContent: FC<HomePageType> = () => {

    const [isVisibleQuote, setIsVisibleQuote] = useState(true)

    const isAuthenticated = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (isAuthenticated) {
            queryClient.prefetchQuery({queryKey: [queryKeys.deposit], queryFn: getDeposit});
            queryClient.prefetchQuery({queryKey: [queryKeys.cost], queryFn: () => getCost()});
            queryClient.prefetchQuery({queryKey: [queryKeys.income], queryFn: getIncome});
        }
    }, [isAuthenticated, queryClient]);


    return (
        <div className="container">
            <HomeHeader/>
            <div className={styles.content}>
                <div className={styles.info}>
                    <HomeInfo isAuthenticated={isAuthenticated}/>
                    <HomeActions1/>
                </div>
                <div className={styles.aside}>
                    {/*{isVisibleQuote && <HomeQuote quote={quote} onClose={() => setIsVisibleQuote(false)}/>}*/}
                </div>
            </div>
        </div>)
};

export default HomeContent;