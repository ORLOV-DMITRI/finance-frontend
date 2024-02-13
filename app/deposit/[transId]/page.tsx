'use client'
import {useDepositByIdQuery} from "@/hooks/deposit/useDepositQuery";
import {useAuth} from "@/hooks/auth/useAuth";

export default function DepositItem({params}: { params: { transId: string } }) {
    //
    // const isAuthenticated = useAuth();
    //
    // const deposit = useDepositByIdQuery(params.transId, isAuthenticated)
    //
    // console.log(deposit)
    return <div></div>
}