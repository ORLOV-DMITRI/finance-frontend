import {queryKeys} from "@/react-query/constants";

export const generateUserKey = (userId: number, userToken: string) => {
    return [queryKeys.user, userId, userToken]
}