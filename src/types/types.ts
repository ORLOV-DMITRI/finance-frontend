export type AuthFormValues = {
    email: string;
    password: string;
}


export type RecordServerType = {
    id: string,
    name: string,
    sum: number,
    date: Date
}
export type RecordClientType = {
    name: string,
    sum: number,
    date: Date
}

export type DepositClientType = {
    name: string
}
export type DepositServerType = {
    id: string
    name: string
    sum: number
}

export type TransServerType = {
    id: String
    type: String // "add" для пополнения, "remove" для снятия
    sum: number
    date: Date
}
export type TransClientType = {
    type: String // "add" для пополнения, "remove" для снятия
    sum: number
    depositId: String
}
