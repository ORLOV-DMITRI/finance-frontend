import Button from "@/src/components/ui/Button";
import Link from "next/link";
import InputModal from "@/src/components/ui/InputModal";
import styles from "./ModalCall.module.scss";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { getDataHouses } from "@/src/api/apiGeneral";
import { postForm } from "@/src/api/apiForms";
import Modal from "@/src/components/Modal";

export default function ModalCall({ type, onClose, setOpenThanksModal }) {
    const [btnName, setBtnName] = useState("");
    const [title, setTitle] = useState("");
    useEffect(() => {
        switch (type) {
            case "call":
                setBtnName("Жду звонка");
                setTitle("Заказать звонок");
                break;
            case "proposal":
                setBtnName("Жду звонка");
                setTitle("Получить предложение");
                break;
            case "credits":
                setBtnName("Узнать стоимость");
                setTitle("Узнать стоимость");
                break;
            case "flat":
                setBtnName("Забронировать");
                setTitle("Забронировать квартиру");
                break;
            default:
        }
    }, []);
    
    const handleSubmit = async (values) => {
        try {
            const data = await postForm(values, title);
            if (data.data) {
                onClose();
                setOpenThanksModal(true);
            }
        } catch (e) {
            console.warn(e);
        }
    };
    return (
        <Formik
            initialValues={ { name: "", phone: "" } }
            validate={ values => {
                const errors = {};
                if (!values.name) {
                    errors.name = "Обязательное поле";
                }
                if (!values.phone) {
                    errors.phone = "Обязательное поле";
                } else if (values.phone.length !== 12) {
                    errors.phone = "Неверный формат номера";
                }
                return errors;
            } }
            onSubmit={ (values) => {
                handleSubmit(values);
            } }
        >
            { ({
                   values,
                   errors,
                   touched,
                   handleChange,
                   handleBlur,
                   handleSubmit,
                   isSubmitting,
                   setValues
               }) => (
                <form className={ styles.main } onSubmit={ handleSubmit }>
                    <div className={ styles.fields }>
                        <InputModal
                            label={ "Имя" }
                            placeholder={ "Укажите ваше имя" }
                            name={ "name" }
                            onChange={ handleChange }
                            onBlur={ handleBlur }
                            value={ values.name }
                            error={ errors.name }
                            touch={ touched.name }
                        />
                        <InputModal
                            label={ "Телефон" }
                            placeholder={ "+7 (999) 000 00 00" }
                            name={ "phone" }
                            onChange={ (e) => setValues({ ...values, phone: e }) }
                            onBlur={ handleBlur }
                            value={ values.phone }
                            error={ errors.phone }
                            touch={ touched.phone }
                        />
                    </div>
                    <div className={ styles.policy }>
                        Нажимая отправить, вы принимаете <Link href={ "#" } className={ styles.link }>политику
                        конфиденциальности </Link>
                        и&nbsp;даете согласие на обработку персональных данных
                    </div>
                    <Button type={ "submit" } className={ styles.btn } color={ "primary" }
                            disabled={ isSubmitting }>{ btnName }</Button>
                </form>
            ) }
        </Formik>
    );
}