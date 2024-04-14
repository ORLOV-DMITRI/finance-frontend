'use client'
import styles from './HomePage.module.scss'
import {FC, useEffect, useState} from "react";
import {useAuth} from "@/hooks/auth/useAuth";
import {getDeposit} from "@/hooks/deposit/useDepositQuery";
import {getCost} from "@/hooks/cost/useCostQuery";
import {getIncome} from "@/hooks/income/useIncomeQuery";
import {queryKeys} from "@/react-query/constants";
import {useQueryClient} from "@tanstack/react-query";
import HomeHeader from "@/components/home/HomeHeader/HomeHeader";
import HomeInfo from "@/components/home/HomeInfo/HomeInfo";
import HomeActions from "@/components/home/HomeActions/HomeActions";

type HomePageType = {}


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
                    <HomeActions/>
                </div>
            </div>
        </div>)
};

export default HomeContent;
