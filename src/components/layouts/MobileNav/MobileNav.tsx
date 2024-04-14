import styles from './MobileNav.module.scss'
import Link from "next/link";
import cn from "classnames";
import {links} from "@/components/layouts/Navigation/Navigation";
import {usePathname} from "next/navigation";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";
import gsap from 'gsap'
import {AvailableMoney} from "@/components/layouts/AvailableMoney/AvailableMoney";

interface IMobileNav {
    isOpen: boolean,
    onClose: () => void
}

export default function MobileNav({onClose, isOpen}: IMobileNav) {
    const path = usePathname()
    const navRef = useRef(null)
    useGSAP(() => {
        if (!navRef.current) return
        if (isOpen) {
            gsap.to(navRef.current, {
                y: 0,
                duration: 1,
            })
        } else {
            gsap.to(navRef.current, {
                y: '-120%',
                duration: 1.5
            })
        }
    }, {dependencies: [isOpen]})

    return (
        <div className={styles.mobileNav} ref={navRef}>
            <div className={styles.avail}>
                {path !== '/' && <AvailableMoney/>}
            </div>
            <div className={styles.links}>

                {links.map(item => (
                    <Link key={item.name} href={item.href}
                          className={cn(styles.linkItem, item.href === path && styles.active)} onClick={onClose}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

