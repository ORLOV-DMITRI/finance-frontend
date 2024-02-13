import {QueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

function createTitle(errorMessage: string, actionType: 'query'|'mutation') {
    const action = actionType === 'query' ? 'fetch' : 'update'

    return `Ошибка - ${action}. ${errorMessage}`
}

function errorHandler(errorMsg: string) {
    // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
    // one message per page load, not one message per query
    // the user doesn't care that there were three failed queries on the staff page
    //    (staff, treatments, user)
    toast.error(`Ошибка тут - ${errorMsg}`)

}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
            gcTime: 900000,
            refetchOnWindowFocus: false
        }
    },
    // queryCache: new QueryCache({
    //     onError: (error) => {
    //         const title = createTitle(error.message, 'query')
    //         errorHandler(title)
    //     }
    // }),
    // mutationCache: new MutationCache({
    //     onError: (error) => {
    //         const title = createTitle(error.message, 'mutation')
    //         errorHandler(title)
    //     }
    // })

})
