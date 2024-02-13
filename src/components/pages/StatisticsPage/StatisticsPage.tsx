'use client'

import styles from './StatisticsPage.module.scss'
import {FC} from "react";

type StatisticsPageType = {}

const StatisticsPage: FC<StatisticsPageType> = () => {
    return (
        <section className={styles.homePage}>
            <div className="container">
                <div className={styles.content}>

                    <h1>Скоро тут будет что нибудь полезное :)</h1>
                </div>
            </div>
        </section>
    );
};

export default StatisticsPage;