'use client'

import styles from './DepositActions.module.scss'
import {FC} from "react";
import React from 'react';
import PlusSvg from '/public/svg/plus.svg';
import MinusSvg from '/public/svg/minus.svg';
import EditIcon from "/public/svg/edit.svg";
import DeleteIcon from "/public/svg/delete.svg";
import {RoundButton} from "@/ui/RoundButton/RoundButton";
import {DepositServerType} from "@/types/types";
import cn from "classnames";


type DepositActionsType = {
    item: DepositServerType;
    onEdit: () => void;
    onDelete: () => void;
    onAddSum: () => void;
    onRemoveSum: () => void;
}

export const DepositActions: FC<DepositActionsType> = ({ item, onEdit, onDelete, onAddSum, onRemoveSum }) => {

    return (
        <div className={styles.item}>
            <div className={styles.name} onClick={onEdit}>
                <EditIcon />
                <span>{item.name}</span>
            </div>
            <div className={styles.sum}>
                {item.sum} ₽
            </div>
            <div onClick={onDelete} className={styles.deleteIcon}>
                <DeleteIcon />
                <span className={cn(styles.tooltip)}>Удалить</span>
            </div>

            <div className={styles.btnsBlock}>
                <RoundButton variant={'plus'} Icon={PlusSvg} onClick={onAddSum}/>
                {item.sum > 0 && (
                    <RoundButton variant={'minus'} Icon={MinusSvg} onClick={onRemoveSum}/>
                )}
            </div>
        </div>
    );
};