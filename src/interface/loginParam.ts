import { TypeUser } from "../enum/type";

export interface LoginParams {
    nim: string, 
    fullName: string,
    password: string, 
    type: TypeUser,
}