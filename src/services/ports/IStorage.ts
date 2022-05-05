import { UserEntity } from "../auth/user.entity";
import { StorageKeys } from "./storage.enum";

export interface IStorage {
    setToken(accessToken: string): void,
    getToken(): string | null,
    removeToken(): void,

    setUser(user: UserEntity): void,
    getUser(): UserEntity | null,
    removeUser(): void,

    setItem(key: StorageKeys, value: string): void,
    getItem(key: StorageKeys): string | null,
    removeItem(key: StorageKeys): void
}