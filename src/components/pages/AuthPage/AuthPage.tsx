'use client'
import styles from './AuthPage.module.scss'
import {FC, useMemo, useState} from "react";
import {Input} from "@/ui/Input/Input";
import {Form, Formik, FormikHelpers} from "formik";
import {Button} from "@/ui/Button/Button";
import * as Yup from 'yup';
import {useSignUp} from "@/hooks/auth/useRegister";
import {useSignIn} from "@/hooks/auth/useLogin";
import {useRouter} from "next/navigation";

type AuthPageType = {}

const formConfig = {
    signIn: {
        name: 'SignIn',
        title: 'Войти в приложение',
        subtitle: 'Введите почту и пароль ниже, чтобы войти',
        button: 'Войти',
        nextBtn: 'Зарегистрироваться',
        text: 'Уже есть аккаунт?',
    },
    signUp: {
        name: 'SignUp',
        title: 'Создать аккаунт',
        subtitle: 'Введите почту и пароль ниже, чтобы создать учетную запись',
        button: 'Зарегистрироваться',
        nextBtn: 'Войти',
        text: 'Еще нет аккаунта?'
    }
};
type FormValues = {
    email: string;
    password: string;
}
const validationSchema = Yup.object({
    email: Yup.string().email('Неверный формат электронной почты').required('Электронная почта обязательна'),
    password: Yup.string().min(8, 'Пароль должен быть не менее 8 символов').required('Пароль обязателен'),
});

const AuthPage: FC<AuthPageType> = () => {
    type FormConfigKey = keyof typeof formConfig;
    const [currentPage, setCurrentPage] = useState<FormConfigKey>('signIn')

    const toggleForm = () => {
        setCurrentPage(currentPage === 'signIn' ? 'signUp' : 'signIn');
    }

    const {title, subtitle, button, text, nextBtn} = useMemo(() => formConfig[currentPage], [currentPage]);


    const initialValues: FormValues = {
        email: '',
        password: ''
    }
    const router = useRouter()


    const {mutate: register} = useSignUp()
    const {mutate: login} = useSignIn()


    const handleSubmit = (values: FormValues, {setSubmitting, resetForm}: FormikHelpers<FormValues>) => {
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

                            <Button  type={'submit'} className={styles.btn}
                                    variant={'white'}>{button}</Button>
                            <div className={styles.text}>{text}</div>
                            <Button  onClick={toggleForm} className={styles.btn}
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
