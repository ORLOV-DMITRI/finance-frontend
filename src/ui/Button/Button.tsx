import styles from './Button.module.scss'
import {FC} from "react";
import cn from "classnames";

type ButtonType = {
    Icon?: React.FunctionComponent<React.SVGAttributes<SVGAElement>>
    variant?: string
    className?: string
    size?: 'full' | 'small' | 'auto'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonType> = ({Icon, variant = 'white', size = 'small', className,...props}) => {
    return (
        <button className={cn(styles.btn, styles[variant],styles[size], className)} {...props}>
            {Icon && <Icon/>}
            <span>
            {props.children}
            </span>
        </button>)


};