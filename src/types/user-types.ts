type Id = {
    id: string
}

export type User = Id & {
    email: string
    token: string
}
export type NewUser = {
    password: string
    email: string
}
