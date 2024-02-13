import styles from './HomeInfo.module.scss'
import {FC, useMemo} from "react";
import {Card} from "@/ui/Card/Card";
import Link from "next/link";
import {priceRu} from "@/utils/priceRu";
import {useCostQuery} from "@/hooks/cost/useCostQuery";
import {useAvailableQuery} from "@/hooks/statistics/useAvailableQuery";
import {useDepositTotalQuery} from "@/hooks/statistics/useDepositTotal";

type HomeInfoType = {
    isAuthenticated: boolean
}

export default function HomeInfo({isAuthenticated}: HomeInfoType) {

    const {startDate, endDate} = useMemo(() => {
        const today = new Date().toISOString();
        return {startDate: today, endDate: today};
    }, []);

    const currentCosts = useCostQuery(isAuthenticated, startDate, endDate);
    const available = useAvailableQuery(isAuthenticated);
    const depositTotal = useDepositTotalQuery();

    const {costs, deposits, avail} = useMemo(() => {
        const totalCosts = currentCosts?.reduce((acc, cost) => acc + cost.sum, 0) || 0;
        const formattedCosts = priceRu(totalCosts);
        const formattedDeposits = priceRu(depositTotal || 0);
        const formattedAvailable = priceRu(available || 0);

        return {
            costs: formattedCosts,
            deposits: formattedDeposits,
            avail: formattedAvailable
        };
    }, [currentCosts, depositTotal, available]);

    return (
        <div className={styles.info}>
            <Link href={'/deposit'} className={styles.infoLink}>
                <Card className={styles.infoItem}>
                    <div className={styles.current}>
                        В конвертах: <span>{deposits} ₽</span>
                    </div>
                </Card>
            </Link>

            <Link href={'/income'} className={styles.infoLink}>
                <Card className={styles.infoItem}>
                    <div className={styles.current}>
                        Доступно: <span>{avail} ₽</span>
                    </div>

                </Card>
            </Link>
            <Link href={'/cost'} className={styles.infoLink}>
                <Card className={styles.infoItem}>
                    <div className={styles.current}>
                        Расходы сегодня: <span>{costs} ₽</span>
                    </div>

                </Card>
            </Link>
        </div>
    );
};