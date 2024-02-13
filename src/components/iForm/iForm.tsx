'use client'

import styles from './iForm.module.scss'
import {FC, useState} from "react";
import {Form, Formik} from "formik";
import {Button} from "@/ui/Button/Button";
import {CustomDataPicker} from "@/ui/CustomDataPicker/CustomDataPicker";
import RefreshIcon from '/public/svg/refresh.svg'
import ExitIcon from '/public/svg/login.svg'
import {Input} from "@/ui/Input/Input";
import {RecordClientType} from "@/types/types";

type iFormType = {
    onSubmit: (values: RecordClientType, isClose: boolean) => void
    onUpdate?: (values: RecordClientType, isClose: boolean) => void
    selectedItem?: RecordClientType | null
    type: string
    isVisibleRepeat?: boolean
}


export const IForm: FC<iFormType> = ({onSubmit, selectedItem, onUpdate, type, isVisibleRepeat = true}) => {
    const [isClose, setIsClose] = useState(false)

    const initialValue: RecordClientType = {
        name: selectedItem ? selectedItem.name : '',
        sum: selectedItem ? selectedItem.sum : 0,
        date: selectedItem ? selectedItem.date : new Date(),
    }

    const handleSubmit = (values: RecordClientType) => {
        values.date = new Date(values.date)
        values.sum = Math.abs(values.sum)
        if (selectedItem) {
            onUpdate && onUpdate(values, isClose)
        } else {
            onSubmit(values, isClose)
        }
    }

    return (

        <div className={styles.formContainer}>
            <div className={styles.title}>
                {type === 'cost' ? 'Добавить расход' : 'Добавить доход'}

            </div>
            <div className={styles.form}>
                <Formik initialValues={initialValue} onSubmit={handleSubmit}>
                    <Form className={styles.fields}>
                        <div className={styles.inputs}>
                            <Input label={'Имя'} name={'name'} maxLength={20} placeholder={'Напишите название'}/>
                            <Input label={'Сумма'} maxLength={10} type={'number'} name={'sum'} placeholder={'Укажите сумму'}/>
                            <CustomDataPicker name={'date'} label={'Дата'}/>
                        </div>
                        <div className={styles.buttons}>
                            {selectedItem && (
                                <>
                                    <Button Icon={ExitIcon} type={'submit'} variant={'white'}
                                            onClick={() => setIsClose(true)}>
                                        Обновить и закрыть
                                    </Button>
                                </>
                            )}
                            {!selectedItem && (
                                <>
                                    <Button Icon={ExitIcon} type={'submit'} variant={'white'}
                                            onClick={() => setIsClose(true)}>
                                        Сохранить и закрыть
                                    </Button>
                                    {isVisibleRepeat && (
                                        <Button type={'submit'} variant={'white'} Icon={RefreshIcon}>
                                            Сохранить и повторить
                                        </Button>
                                    )}

                                </>
                            )}

                        </div>
                    </Form>
                </Formik>
            </div>

        </div>);
};