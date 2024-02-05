export type Admin = {
    _id:string,
    ID:string,
    Role:string,
}


export type AdminState = {
    Admin:Admin | null
}