'use client'
import {axiosInstance} from "@/react-query/axiosInstance";
import {NewUser, User} from "@/types/user-types";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";


const createUser = async ({email, password}: NewUser) => {
    return await axiosInstance.post<User>('api/user/register', {email, password});
}


export const useSignUp = () => {
    const queryClient = useQueryClient();

    const {mutate, mutateAsync} = useMutation({
        mutationFn: (newUserData: NewUser) => createUser(newUserData),
        onSuccess: ({data}) => {
            toast.success(`Успешная регистрация`)
            localStorage.setItem('token', data.token); // Записываем токен в localStorage
            queryClient.invalidateQueries({queryKey: [queryKeys.user]});
        },
        onError: (error) => {
            // @ts-ignore
            toast.error(`Ошибка! ${error.response.data.message}`)
        }
    })

    return {mutate, mutateAsync}
}
