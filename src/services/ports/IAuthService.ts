import { NewUserEntity } from "../auth/new-user.entity";
import { UserEntity } from "../auth/user.entity";

export interface IAuthService {
    login(username: string, password: string): Promise<UserEntity | null>,
    register(newUser: NewUserEntity): Promise<UserEntity | null>,
    logout(): Promise<void>,
    init(): Promise<UserEntity | null>
}