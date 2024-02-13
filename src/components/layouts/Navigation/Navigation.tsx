'use client'
import styles from './Navigation.module.scss'
import {FC} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import cn from "classnames";

type NavigationType = {}


const links = [
    {
        href: '/',
        name: 'главная'
    },
    {
        href: '/cost',
        name: 'расходы'
    },
    {
        href: '/income',
        name: 'доходы'
    },
    {
        href: '/deposit',
        name: 'конверты'
    },
    {
        href: '/statistics',
        name: 'статистика'
    },
]

export const Navigation: FC<NavigationType> = () => {

    const path = usePathname()


    return (<div className={cn(styles.navigation)}>
        {links.map(item => (
            <Link key={item.name} href={item.href}
                  className={cn(styles.linkItem, item.href === path && styles.active)}>
                {item.name}
            </Link>
        ))}
    </div>);
};