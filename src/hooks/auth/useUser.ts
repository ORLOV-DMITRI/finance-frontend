import {axiosInstance} from "@/react-query/axiosInstance";
import {User} from "@/types/user-types";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/react-query/constants";


async function getUser(): Promise<User> {
    const {data} = await axiosInstance.get<User>('api/user/current')
    return data;
}

export function useUser() {
    return useQuery({
        queryKey: [queryKeys.user],
        queryFn: getUser,
        retry: 1
    })
}