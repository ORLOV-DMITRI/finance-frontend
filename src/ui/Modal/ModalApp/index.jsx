import Button from "@/src/components/ui/Button";
import Link from "next/link";
import InputModal from "@/src/components/ui/InputModal";
import styles from "./ModalApp.module.scss";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import FieldInput from "@/src/components/ui/FiledInput";
import { postForm } from "@/src/api/apiForms";

export default function ModalApp({ onClose, setOpenThanksModal }) {
    const [title, setTitle] = useState("");
    const handleSubmit = async (values) => {
        try {
            const data = await postForm(values, `Узнать стоимость - ${ title }`);
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
                            className={ styles.input }
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
                            className={ styles.input }
                        />
                    </div>
                    <div className={ styles.title }>Услуга</div>
                    <FieldInput
                        type={ "select" }
                        list={ ["Парковка", "Кладовая", "Коммерческое помещение", "Ремонт от застройщика"] }
                        setTitle={ setTitle }
                    />
                    <div className={ styles.policy }>
                        Нажимая отправить, вы принимаете <Link href={ "#" } className={ styles.link }>политику
                        конфиденциальности </Link>
                        и&nbsp;даете согласие на обработку персональных данных
                    </div>
                    <Button type={ "submit" } className={ styles.btn } color={ "primary" }
                            disabled={ isSubmitting }>Узнать стоимость</Button>
                </form>
            ) }
        </Formik>
    );
}