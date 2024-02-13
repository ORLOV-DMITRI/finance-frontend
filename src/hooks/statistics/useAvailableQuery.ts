import {axiosInstance} from "@/react-query/axiosInstance";
import {queryKeys} from "@/react-query/constants";
import {pathStatistics} from "@/hooks/statistics/index";
import {useQuery} from "@tanstack/react-query";

export async function getAvailable(){
    const {data} = await axiosInstance.get(pathStatistics.available);
    return data;
}

export function useAvailableQuery(isAuthenticated: boolean): number {
    const {data = {availableMoney: 0}} = useQuery({
        queryKey: [queryKeys.available],
        queryFn: getAvailable,
        enabled: isAuthenticated
    });
    const {availableMoney} = data;

    return availableMoney;
}
