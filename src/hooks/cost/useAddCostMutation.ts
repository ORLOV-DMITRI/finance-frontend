import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/react-query/axiosInstance";
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";
import {pathCost} from "@/hooks/cost/index";
import {RecordClientType} from "@/types/types";


const createCost = async ({name, sum, date}: RecordClientType) => {
    return await axiosInstance.post(pathCost.create, {name, sum, date: date.toISOString()});
}

export function useAddCostMutation() {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: (newCost: RecordClientType) => createCost(newCost),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.cost]})
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            toast.success('Расход добавлен!!')
        }
    })

    return mutate
}