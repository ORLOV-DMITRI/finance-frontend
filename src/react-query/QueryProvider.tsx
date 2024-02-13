'use client'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/react-query/queryClient";
import {Root} from "../../app/layout";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";

export function QueryProvider({children}: Root) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools/>
            <Toaster/>
        </QueryClientProvider>
    )
}