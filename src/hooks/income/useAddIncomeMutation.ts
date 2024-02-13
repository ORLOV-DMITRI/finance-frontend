import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/react-query/axiosInstance";
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";
import {pathIncome} from "@/hooks/income/index";
import {RecordClientType} from "@/types/types";


const createIncome = async ({name, sum, date}: RecordClientType) => {
    return await axiosInstance.post(pathIncome.create, {name, sum, date: date.toISOString()});
}

export function useAddIncomeMutation() {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: (newIncome: RecordClientType) => createIncome(newIncome),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.available]})
            queryClient.invalidateQueries({queryKey: [queryKeys.income]})
            toast.success('Доход добавлен!')
        }
    })

    return mutate
}