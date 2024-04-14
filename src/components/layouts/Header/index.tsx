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
import MobileNav from "@/components/layouts/MobileNav/MobileNav";
import MenuIcon from '/public/svg/menu.svg';
import CloseIcon from '/public/svg/close.svg';

type HeaderType = {}

export const Header: FC<HeaderType> = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false)

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
        <>
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.nav}>
                        <div className={styles.menu} onClick={() => setIsOpenMenu(prevState => !prevState)}>
                            {isOpenMenu ? <CloseIcon/> : <MenuIcon/>}
                        </div>
                        <Navigation/>

                        {!isAuthenticated && (
                            <Link href={'/auth'}>
                                <Button variant={'white'}>Войти</Button>
                            </Link>
                        )}
                        {isAuthenticated && (
                            <>
                                <div className={styles.avail}>
                                    {path !== '/' && <AvailableMoney/>}
                                </div>
                                <div className={styles.welcome}>
                                    <CircleUserRound/>
                                    <Button variant={'white'} onClick={handleLogout}>Выйти</Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <MobileNav isOpen={isOpenMenu} onClose={() => setIsOpenMenu(false)}/>
        </>)

};
