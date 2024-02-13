import styles from './Card.module.scss'
import {FC, ReactNode} from "react";
import cn from "classnames";

type CardType = {
    children: ReactNode,
    className?: string,
}& React.HTMLAttributes<HTMLDivElement>

export const Card: FC<CardType> = ({children, className, ...props}) => {

    return (
        <div className={cn(styles.card, className)} {...props}>
        {children}
    </div>);
};