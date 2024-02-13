import styles from './CustomSelect.module.scss'
import {FC, useEffect, useRef, useState} from "react";
import ArrowIcon from '/public/svg/arrow.svg'
import CheckIcon from '/public/svg/check.svg'
import cn from "classnames";

type OptionsType = {
    name: string,
    value: string
}

type CustomSelectType = {
    options: OptionsType[]
}


export const CustomSelect: FC<CustomSelectType> = ({options}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionsType>(options[1]);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);


    const handleOptionClick = (option: OptionsType) => {
        setSelectedOption(option);
        setIsOpen(false);
    };


    return (
        <div className={styles.select} ref={dropdownRef}>
            <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
                {selectedOption.name}
                <ArrowIcon/>
            </div>

            <ul className={cn(styles.optionsList, isOpen && styles.open)}>
                {options.map((option, index) => (
                    <li key={index} onClick={() => handleOptionClick(option)}
                        className={cn(styles.option, selectedOption.value === option.value && styles.active)}>
                        <CheckIcon/>
                        {option.name}
                    </li>
                ))}
            </ul>

        </div>
    );
};