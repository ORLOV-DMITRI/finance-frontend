import styles from './HomePage.module.scss'
import {FC, useEffect} from "react";
import {useAuth} from "@/hooks/auth/useAuth";
import {getDeposit} from "@/hooks/deposit/useDepositQuery";
import {getCost} from "@/hooks/cost/useCostQuery";
import {getIncome} from "@/hooks/income/useIncomeQuery";
import {queryKeys} from "@/react-query/constants";
import {useQueryClient} from "@tanstack/react-query";
import HomeHeader from "@/components/home/HomeHeader/HomeHeader";
import HomeContent from "@/components/home/HomeContent/HomeContent";
import {fetchQuote} from "@/hooks/getQuote";

type HomePageType = {}


const HomePage: FC<HomePageType> = async () => {

    const {text, author} = await fetchQuote()


    return (
        <section className={styles.homePage}>
           <HomeContent quote={{text, author}}/>
        </section>);
};

export default HomePage;