import styles from './SimpleInput.module.scss'
import {FC} from "react";

type SimpleInputType = {
    label?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const SimpleInput: FC<SimpleInputType> = ({label, ...props}) => {
    return (
        <div className={styles.field}>
            <label>
                {label}
            </label>
            <input autoFocus={true} className={styles.input} {...props}/>
        </div>
    );
};
