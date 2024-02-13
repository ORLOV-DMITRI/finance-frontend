import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/react-query/axiosInstance";
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";
import {DepositClientType} from "@/types/types";
import {pathDeposit} from "@/hooks/deposit/index";


const createDeposit = async ({name}: DepositClientType) => {
    return await axiosInstance.post(pathDeposit.create, {name});
}

export function useAddDepositMutation() {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: (newDeposit: DepositClientType) => createDeposit(newDeposit),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            queryClient.invalidateQueries({queryKey: [queryKeys.depositTotal]})
            queryClient.invalidateQueries({queryKey: [queryKeys.deposit]})
            toast.success('Конверт создан!!')
        }
    })

    return mutate
}