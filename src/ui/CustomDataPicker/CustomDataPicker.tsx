'use client'
import styles from './CustomDataPicker.module.scss'
import {FC, forwardRef, LegacyRef, useState} from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';

import {FieldHookConfig, useField} from "formik";
import cn from "classnames";
registerLocale('ru', ru);

type CustomDataPickerType = {
    label?: string


}

type CustomDateInput = {
    onClick?: () => void;
    value?: string
}

const CustomDateInput = forwardRef(({value, onClick}: CustomDateInput, ref: LegacyRef<HTMLButtonElement>) => {

    return (
        <button className={styles.customDateInput} onClick={onClick} ref={ref} type="button">
            {value}
        </button>
    )
});

export const CustomDataPicker: FC<CustomDataPickerType & FieldHookConfig<string | null>> = ({label, ...props}) => {

    const [field, meta, helpers] = useField(props);
    const [selectedData, setSelectedData] = useState<Date | null>(new Date())
    const {setValue} = helpers;

    const handleChange = (date: Date | null) => {
        if (date) {
            const dateString = date.toISOString();
            setSelectedData(date)
            setValue(dateString)
        }
    }
    return (
        <div className={cn(styles.field)}>
            <label htmlFor='field'>
                {label}
            </label>
            <DatePicker
                {...field}
                selected={selectedData}
                onChange={handleChange}
                locale={ru}
                value={selectedData?.toLocaleDateString('ru')}
                dateFormat="dd.MM.yyyy"
                customInput={<CustomDateInput/>}
            />
        </div>

    );
};