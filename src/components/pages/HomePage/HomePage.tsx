import styles from './HomePage.module.scss'
import {FC} from "react";
import HomeContent from "@/components/home/HomeContent/HomeContent";
import {fetchQuote} from "@/hooks/getQuote";

type HomePageType = {}


const HomePage: FC<HomePageType> = async () => {

    // const {text, author} = await fetchQuote()
    // const text = ''
    // const author = ''

    return (
        <section className={styles.homePage}>
            <HomeContent/>
        </section>);
};

export default HomePage;