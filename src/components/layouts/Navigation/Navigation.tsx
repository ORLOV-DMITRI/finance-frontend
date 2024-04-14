'use client'
import styles from './Navigation.module.scss'
import {FC, useRef, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import cn from "classnames";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useWindowSize} from "@/hooks/useWindowSize";

gsap.registerPlugin(useGSAP);

type NavigationType = {}


export const links = [
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
]

export const Navigation: FC<NavigationType> = () => {

    const path = usePathname()





    return (
        <>

            <div className={cn(styles.navigation)}>
                <div className={styles.links}>
                    {links.map(item => (
                        <Link key={item.name} href={item.href}
                              className={cn(styles.linkItem, item.href === path && styles.active)}>
                            {item.name}
                        </Link>
                    ))}
                </div>

            </div>
        </>
    );
};
