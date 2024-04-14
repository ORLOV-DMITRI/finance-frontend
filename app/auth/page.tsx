'use client'

import styles from './style.module.scss';
import {useMemo, useState} from "react";
import {Input} from "@/ui/Input/Input";
import {Form, Formik, FormikHelpers} from "formik";
import {Button} from "@/ui/Button/Button";
import * as Yup from 'yup';
import {useSignUp} from "@/hooks/auth/useRegister";
import {useSignIn} from "@/hooks/auth/useLogin";
import {useRouter} from "next/navigation";
import {AuthFormValues} from "@/types/types";
import {formConfig} from "@/utils/constants/form-config";


const validationSchema = Yup.object({
    email: Yup.string().email('Неверный формат электронной почты').required('Электронная почта обязательна'),
    password: Yup.string().min(8, 'Пароль должен быть не менее 8 символов').required('Пароль обязателен'),
});

const AuthPage = () => {
    type FormConfigKey = keyof typeof formConfig;

    const [currentPage, setCurrentPage] = useState<FormConfigKey>('signIn')
    const {title, subtitle, button, text, nextBtn} = useMemo(() => formConfig[currentPage], [currentPage]);

    const router = useRouter()
    const {mutate: register} = useSignUp()
    const {mutate: login} = useSignIn()


    const initialValues: AuthFormValues = {
        email: '',
        password: ''
    }

    const toggleForm = () => {
        setCurrentPage(currentPage === 'signIn' ? 'signUp' : 'signIn');
    }

    const handleSubmit = (values: AuthFormValues, {setSubmitting, resetForm}: FormikHelpers<AuthFormValues>) => {
        const action = currentPage === 'signUp' ? register : login;
        action(values, {
            onSuccess: () => {
                resetForm();
                router.push('/');
                setSubmitting(false);
            },
        });
    }

    return (<section className={styles.auth}>
        <div className="container">
            <div className={styles.content}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className={styles.form}>
                            <div className={styles.title}>{title}</div>
                            <div className={styles.subtitle}>
                                {subtitle}
                            </div>
                            <Input name={'email'} placeholder={'пример@почта.ру'}/>
                            <Input name={'password'} placeholder={'*********'} type={'password'}/>

                            <Button type={'submit'} className={styles.btn}
                                    variant={'white'}>{button}</Button>
                            <div className={styles.text}>{text}</div>
                            <Button onClick={toggleForm} className={styles.btn}
                                    variant={'dark'} type={'button'}>{nextBtn}</Button>
                        </Form>
                    )}
                </Formik>
                <div>
                </div>
            </div>
        </div>

    </section>);
};

export default AuthPage;
