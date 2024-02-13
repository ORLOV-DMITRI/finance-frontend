import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/react-query/axiosInstance";
import toast from "react-hot-toast";
import {queryKeys} from "@/react-query/constants";
import {TransClientType} from "@/types/types";
import {pathTrans} from "@/hooks/transaction/index";


const createTrans = async ({depositId, sum, type}: TransClientType) => {
    return await axiosInstance.post(pathTrans.create, {depositId, sum, type});
}

export function useAddTransMutation() {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: (newTrans: TransClientType) => createTrans(newTrans),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [queryKeys.trans]})
            toast.success('Транзакция добавлена!!')
        }
    })

    return mutate
}