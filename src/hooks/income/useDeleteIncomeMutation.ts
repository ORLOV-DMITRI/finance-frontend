import {axiosInstance} from "@/react-query/axiosInstance";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {pathIncome} from "@/hooks/income/index";


async function deleteIncome(costIdList: string[]) {
    return await axiosInstance.post(pathIncome.delete, {ids: costIdList})
}


export function useDeleteIncomeMutation() {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: (costIdList: string[]) => deleteIncome(costIdList),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            queryClient.invalidateQueries({queryKey: [queryKeys.income]})
            toast.success('Доход удален!')
        }
    })
    return mutate
}