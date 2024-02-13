import {axiosInstance} from "@/react-query/axiosInstance";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {pathIncome} from "@/hooks/income/index";
import {RecordServerType} from "@/types/types";

async function updateIncome(data: RecordServerType) {
    return await axiosInstance.put(pathIncome.update, data)
}


export function useUpdateIncomeMutation() {
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: (data: RecordServerType) => updateIncome(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            queryClient.invalidateQueries({queryKey: [queryKeys.income]})
            toast.success('Доход обновлен!')
        }
    })
    return mutate
}