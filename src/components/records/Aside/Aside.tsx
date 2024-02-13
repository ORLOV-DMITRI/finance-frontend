'use client'
import styles from './Aside.module.scss'
import {FC, useState} from "react";
import {Button} from "@/ui/Button/Button";
import AddIcon from '/public/svg/add.svg'
import EditIcon from '/public/svg/edit.svg'
import DeleteIcon from '/public/svg/x.svg'
import {Modal} from "@/ui/Modal";
import {IForm} from "@/components/iForm/iForm";
import toast from "react-hot-toast";
import {useAddCostMutation} from "@/hooks/cost/useAddCostMutation";
import {useAddIncomeMutation} from "@/hooks/income/useAddIncomeMutation";
import {useDeleteCostMutation} from "@/hooks/cost/useDeleteCostMutation";
import {useDeleteIncomeMutation} from "@/hooks/income/useDeleteIncomeMutation";
import {useSelection} from "@/components/records/DisplayData/SelectionProvider/SelectionProvider";
import {useUpdateCostMutation} from "@/hooks/cost/useUpdateCostMutation";
import {useUpdateIncomeMutation} from "@/hooks/income/useUpdateIncomeMutation";
import {RecordClientType, RecordServerType} from "@/types/types";

type Type = {
    type: string
}

export const Aside: FC<Type> = ({type}) => {
    const [isOpenModal, setIsModalOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState<RecordServerType | null>(null)

    const {checkedItems, data} = useSelection()


    const addMutation = type === 'cost' ? useAddCostMutation() : useAddIncomeMutation();
    const deleteMutation = type === 'cost' ? useDeleteCostMutation() : useDeleteIncomeMutation();
    const updateMutation = type === 'cost' ? useUpdateCostMutation() : useUpdateIncomeMutation();


    const handleAdd = (values: RecordClientType, isClose: boolean) => {
        values.sum = Number.parseInt(String(values.sum))
        addMutation(values)
        if (isClose) {
            setIsModalOpen(false)
        }
    }

    const handleAddCheckedItem = () => {
        if (checkedItems.length === 0) {
            toast.error("Выберете запись для изменения")
        } else {
            const updatedItem = data.filter(item => item.id === checkedItems[0])
            setSelectedItem(updatedItem[0])
            setIsModalOpen(true)
        }
    }

    const handleUpdate = (values: RecordClientType, isClose: boolean) => {
        values.sum = Number.parseInt(String(values.sum))
        if (selectedItem?.id) {
            const updateData = {
                id: selectedItem.id,
                ...values
            }
            updateMutation(updateData)
            setSelectedItem(null)
        }

        if (isClose) {
            setIsModalOpen(false)
        }

    }
    const handleDelete = () => {
        if (checkedItems.length === 0) {
            toast.error("Выберете запись для удаления")
        } else {
            deleteMutation(checkedItems)
        }
    }

    return (
        <>
            <div className={styles.aside}>
                <Button Icon={AddIcon}
                        variant={'white'}
                        size={'full'}
                        onClick={() => setIsModalOpen(true)}>
                    Добавить запись
                </Button>
                {checkedItems.length === 1 && (
                    <Button Icon={EditIcon}
                            variant={'dark'}
                            size={'full'}
                            onClick={handleAddCheckedItem}>
                        Изменить запись
                    </Button>
                )}
                {checkedItems.length > 0 && (
                    <Button Icon={DeleteIcon}
                            variant={'delete'}
                            size={'full'}
                            onClick={handleDelete}>
                        Удалить запись
                    </Button>
                )}

            </div>
            <Modal
                onClose={() => setIsModalOpen(false)}
                isOpen={isOpenModal}
            >
                <IForm onSubmit={handleAdd} selectedItem={selectedItem} onUpdate={handleUpdate} type={type}/>
            </Modal>
        </>

    );
};