import {useMutation, useQueryClient} from '@tanstack/react-query';
import {axiosInstance} from "@/react-query/axiosInstance";
import {NewUser, User} from "@/types/user-types";
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";

const createUser = async ({email, password}: NewUser) => {
    return await axiosInstance.post<User>('api/user/login', {email, password});
}

export const useSignIn = () => {
    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationFn: (userData: NewUser) => createUser(userData),
        onSuccess: ({data}) => {
            toast.success(`Успешная авторизация`)
            localStorage.setItem('token', data.token);
            queryClient.invalidateQueries({queryKey: [queryKeys.user]});

        },
        onError: (error) => {
            // @ts-ignore
            toast.error(`Ошибка! ${error.response.data.message}`)
        }
    })
    return {mutate}
};

