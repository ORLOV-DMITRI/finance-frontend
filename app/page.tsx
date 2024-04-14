'use client'
import styles from './style.module.scss'
import {FC, useEffect} from "react";
import HomeContent from "@/components/home/HomeContent/HomeContent";
import {useUser} from "@/hooks/auth/useUser";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

type HomePageType = {}


const HomePage: FC<HomePageType> = () => {
    const router = useRouter()
    const user = useUser();
    useEffect(() => {
        if (user.error) {
            toast.success(`Пожалуйста авторизуйтесь`)
            console.log(toast)
            // router.push('/auth')
        } else {
            return
        }
    }, [user]);




    return (
        <section className={styles.homePage}>
            <HomeContent/>
        </section>);
};

export default HomePage;
