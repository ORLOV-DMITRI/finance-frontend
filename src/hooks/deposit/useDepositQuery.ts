import {axiosInstance} from "@/react-query/axiosInstance";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";
import {DepositServerType} from "@/types/types";
import {pathDeposit} from "@/hooks/deposit/index";

export async function getDeposit(): Promise<DepositServerType[]> {

    const {data} = await axiosInstance.get(pathDeposit.all);
    return data;
}

export function useDepositQuery(isAuthenticated: boolean) {

    const {data = []} = useQuery({
        queryKey: [queryKeys.deposit],
        queryFn: getDeposit,
        enabled: isAuthenticated
    });

    return {data};
}

export async function getDepositById(depositId: string): Promise<DepositServerType> {
    const { data } = await axiosInstance.get(`${pathDeposit.all}/${depositId}`);
    return data;
}

export function useDepositByIdQuery(depositId: string, isAuthenticated: boolean) {
    const { data } = useQuery({
        queryKey: [queryKeys.deposit, depositId],
        queryFn: () => getDepositById(depositId),
        enabled: !!depositId && isAuthenticated
    });

    return { data };
}


export function PrefetchDeposit(): void {
    const queryClient = useQueryClient()
    queryClient.prefetchQuery({
        queryKey: [queryKeys.deposit],
        queryFn: getDeposit,
    })
}