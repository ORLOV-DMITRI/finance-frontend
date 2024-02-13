import styles from './HomeHeader.module.scss'
import {FC, useEffect, useState} from "react";
import useRussianDate from "@/hooks/useRussianDate";
import axios from "axios";

type HomeHeaderType = {}

export default function HomeHeader({}: HomeHeaderType) {


    const today = useRussianDate();

    return (
        <div className={styles.homeHeader}>
            <div className={styles.title}>Сегодня</div>
            <div className={styles.currentDate}>
                {today}
            </div>
        </div>
    );
};