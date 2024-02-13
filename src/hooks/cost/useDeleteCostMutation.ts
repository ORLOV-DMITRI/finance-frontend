import {axiosInstance} from "@/react-query/axiosInstance";
import {pathCost} from "@/hooks/cost/index";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import toast from "react-hot-toast";


async function deleteCost(costIdList: string[]) {

    return await axiosInstance.post(pathCost.delete, {ids: costIdList})
}


export function useDeleteCostMutation() {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: (costIdList: string[]) => deleteCost(costIdList),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.cost]})
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            toast.success('Расход удален!')
        }
    })
    return mutate
}