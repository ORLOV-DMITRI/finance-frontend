'use client'

import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {RecordServerType} from "@/types/types";

type SelectionProviderType = {
    children: ReactNode
    data: RecordServerType[]
    type: 'income' | 'cost'
}

type SelectionContextType = {
    checkedItems: string[];
    allChecked: boolean;
    handleCheckItem: (itemId: string) => void;
    handleAllCheckedItem: () => void;
    clearCheckedItems: () => void;
    data: RecordServerType[]
    type: 'income' | 'cost'
};
const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const useSelection = () => {
    const context = useContext(SelectionContext);
    if (context === undefined) {
        throw new Error('useSelection must be used within a SelectionProvider');
    }
    return context;
};

export const SelectionProvider: FC<SelectionProviderType> = ({children, data, type}) => {
    const [checkedItems, setCheckedItems] = useState<string[]>([]);
    const [allChecked, setAllChecked] = useState(false);

    const handleCheckItem = (itemId: string) => {
        setCheckedItems((prevState) =>
            prevState.includes(itemId) ? prevState.filter((item) => item !== itemId) : [...prevState, itemId]
        );
    };

    const handleAllCheckedItem = () => {
        setAllChecked(prevState => !prevState);

        if (!allChecked) {
            setCheckedItems(data.map(item => item.id));
        } else {
            setCheckedItems([]);
        }
    };
    useEffect(() => {
        setAllChecked(false);
        setCheckedItems([]);
    }, [data]);

    const clearCheckedItems = () => setCheckedItems([]);

    return (
        <SelectionContext.Provider
            value={{checkedItems, allChecked, handleCheckItem, handleAllCheckedItem, clearCheckedItems, data, type}}>
            {children}
        </SelectionContext.Provider>
    );
};