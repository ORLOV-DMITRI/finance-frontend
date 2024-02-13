'use client'

import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";

export function useLogout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    return () => {
        localStorage.removeItem('token');
        queryClient.invalidateQueries({queryKey: [queryKeys.user]})
        queryClient.clear();
        toast.success(`Вы вышли из приложения`)
        router.push('/auth');
    };
}