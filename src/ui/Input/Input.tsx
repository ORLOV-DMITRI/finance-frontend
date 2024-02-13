import styles from './Input.module.scss'
import {FC} from 'react';
import {FieldHookConfig, useField} from "formik";
import cn from "classnames";

type UiInputType = {
    label?: string
    className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input: FC<UiInputType & FieldHookConfig<string>> = ({label, className, ...props}) => {


    const [field, {error, touched}] = useField(props);

    return (

        <div className={cn(styles.field, className,
            error && touched && error && styles.field_error)}>
            <label htmlFor='field'>
                {label}
            </label>
            <input autoComplete={'off'} maxLength={props.maxLength} type={props.type} {...field} name={props.name} placeholder={props.placeholder}
                   className={styles.input} onFocus={(e) => e.target.select()}/>
            <div className={styles.error}>{error && touched && error}</div>

        </div>
    )
}
