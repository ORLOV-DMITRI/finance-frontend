import {axiosInstance} from "@/react-query/axiosInstance";
import {queryKeys} from "@/react-query/constants";
import {pathStatistics} from "@/hooks/statistics/index";
import {useQuery} from "@tanstack/react-query";

export async function getDepositTotal() {
    const {data} = await axiosInstance.get(pathStatistics.depositTotal);
    return data;
}

export function useDepositTotalQuery(): number {
    const {data = {depositTotal: 0}} = useQuery({
        queryKey: [queryKeys.depositTotal],
        queryFn: getDepositTotal,
    });
    const {depositTotal} = data;

    return depositTotal;
}
