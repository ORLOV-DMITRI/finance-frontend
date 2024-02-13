'use client'
import styles from './Header.module.scss'
import {FC, useEffect, useState} from "react";
import {Navigation} from "@/components/layouts/Navigation/Navigation";
import {Button} from "@/ui/Button/Button";
import Link from "next/link";
import {useUser} from "@/hooks/auth/useUser";
import {CircleUserRound} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import {AvailableMoney} from "@/components/layouts/AvailableMoney/AvailableMoney";

type HeaderType = {}

export const Header: FC<HeaderType> = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const user = useUser()


    useEffect(() => {
        if (user.error) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true)
        }
    }, [user]);


    const router = useRouter();
    const path = usePathname()
    const queryClient = useQueryClient();

    const handleLogout = () => {
        localStorage.removeItem('token');
        queryClient.invalidateQueries({queryKey: [queryKeys.user]})
        router.push('/auth');
    }

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.nav}>
                    <Navigation/>

                    {!isAuthenticated && (
                        <Link href={'/auth'}>
                            <Button variant={'white'}>Войти</Button>
                        </Link>
                    )}
                    {isAuthenticated && (
                        <>
                            {path !== '/' && <AvailableMoney/>
                            }
                            <div className={styles.welcome}>
                                <CircleUserRound/>
                                <Button variant={'white'} onClick={handleLogout}>Выйти</Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>)
};