import styles from './RoundButton.module.scss'
import {FC} from "react";
import cn from "classnames";

type RoundButtonType = {
    Icon?: React.FunctionComponent<React.SVGAttributes<SVGAElement>>
    className?: string
    variant: 'plus' | 'minus'
}& React.ButtonHTMLAttributes<HTMLButtonElement>

export const RoundButton: FC<RoundButtonType> = ({Icon, className, variant,...props}) => {

    const content = variant === 'plus' ? 'Пополнить' : 'Снять';
    return (
        <button {...props} className={styles.btn}>
            {Icon && <Icon/>}
            <span className={cn(styles.tooltip, styles[variant])}>{content}</span>
        </button>
    );
};