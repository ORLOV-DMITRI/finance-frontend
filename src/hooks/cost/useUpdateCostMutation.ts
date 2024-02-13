import {axiosInstance} from "@/react-query/axiosInstance";
import {pathCost} from "@/hooks/cost/index";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";
import {RecordServerType} from "@/types/types";


async function updateCost(data: RecordServerType) {
    return await axiosInstance.put(pathCost.update, data)
}


export function useUpdateCostMutation() {
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: (data: RecordServerType) => updateCost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            queryClient.invalidateQueries({queryKey: [queryKeys.cost]})
            toast.success('Расход обновлен!')
        }
    })
    return mutate
}