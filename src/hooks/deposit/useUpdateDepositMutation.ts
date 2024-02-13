import {axiosInstance} from "@/react-query/axiosInstance";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";
import {DepositServerType} from "@/types/types";
import {pathDeposit} from "@/hooks/deposit/index";


async function updateDeposit(data: DepositServerType) {
    return await axiosInstance.put(pathDeposit.update, data)
}


export function useUpdateDepositMutation() {
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: (data: DepositServerType) => updateDeposit(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            queryClient.invalidateQueries({queryKey: [queryKeys.deposit]})
            queryClient.invalidateQueries({queryKey: [queryKeys.depositTotal]})

            toast.success('Конверт обновлен!')
        }
    })
    return mutate
}