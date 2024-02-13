import {axiosInstance} from "@/react-query/axiosInstance";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import {pathIncome} from "@/hooks/income/index";
import {RecordServerType} from "@/types/types";

export async function getIncome(): Promise<RecordServerType[]> {
    const {data} = await axiosInstance.get(pathIncome.all);
    return data;
}


export function useIncomeQuery(isAuthenticated: boolean): RecordServerType[] {
    const {data = []} = useQuery({
        queryKey: [queryKeys.income],
        queryFn: getIncome,
        enabled: isAuthenticated
    })
    return data;
}


export function PrefetchIncome(): void {
    const queryClient = useQueryClient()

    queryClient.prefetchQuery({
        queryKey: [queryKeys.income],
        queryFn: getIncome,
    })
}