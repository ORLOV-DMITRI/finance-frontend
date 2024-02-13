import {axiosInstance} from "@/react-query/axiosInstance";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import {pathCost} from "@/hooks/cost/index";
import {RecordServerType} from "@/types/types";

export async function getCost(startDate?: string, endDate?: string): Promise<RecordServerType[]> {
    let url = pathCost.all; // Предполагаем, что это ваш URL для получения расходов
    const params = new URLSearchParams();

    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await axiosInstance.get(`${url}?${params}`);
    return response.data;
}

export function useCostQuery(isAuthenticated: boolean, startDate?: string, endDate?: string) {
    const queryKey = [queryKeys.cost, startDate, endDate];

    const {data = []} = useQuery({
        queryKey: queryKey,
        queryFn: () => getCost(startDate, endDate),
        enabled: isAuthenticated
    });

    return data;
}


export function PrefetchCost(): void {
    const queryClient = useQueryClient()
    queryClient.prefetchQuery({
        queryKey: [queryKeys.cost],
        queryFn: () => getCost(undefined, undefined),

    })
}