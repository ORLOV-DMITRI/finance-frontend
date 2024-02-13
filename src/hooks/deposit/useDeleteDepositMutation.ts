import {axiosInstance} from "@/react-query/axiosInstance";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";
import {pathDeposit} from "@/hooks/deposit/index";


async function deleteDeposit(depositId: string) {
    return await axiosInstance.post(`${pathDeposit.delete}/${depositId}`)
}


export function useDeleteDepositMutation() {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: (depositId: string) => deleteDeposit(depositId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            queryClient.invalidateQueries({queryKey: [queryKeys.deposit]})
            queryClient.invalidateQueries({queryKey: [queryKeys.depositTotal]})

            toast.success('Конверт удален!')
        }
    })
    return mutate
}