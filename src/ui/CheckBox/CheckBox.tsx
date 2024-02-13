import styles from './CheckBox.module.scss'
import {FC} from "react";

type CheckBoxType = {
    checked?: boolean
    onChange: () => void
}

export const CheckBox: FC<CheckBoxType> = ({checked}) => {


    return (

        <label className={styles.checkbox} htmlFor="red">
            <input className={styles.input} type="checkbox" checked={checked} readOnly id="red"/>
            <span className={styles.checkmark}></span>
        </label>);
};