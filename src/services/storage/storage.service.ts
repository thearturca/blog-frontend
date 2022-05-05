import { UserEntity } from "../auth/user.entity";
import { IStorage } from "../ports/IStorage";
import { StorageKeys } from "../ports/storage.enum";

export class StorageService implements IStorage {
    constructor () {}
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
        return;
    }

    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key)
        return;
    }

    setToken(accessToken: string): void {
        this.setItem(StorageKeys.access_token, accessToken);
        return;
    }

    getToken(): string | null {
        return this.getItem(StorageKeys.access_token);
    }

    removeToken(): void {
        this.removeItem(StorageKeys.access_token)
        return;
    }

    setUser(user: UserEntity): void {
        this.setItem(StorageKeys.user, JSON.stringify(user));
        return;
    }

    getUser(): UserEntity | null {
        const userFromStorage = this.getItem(StorageKeys.user)
        if (userFromStorage === null) {
            return userFromStorage;
        }
        
        const user: UserEntity = JSON.parse(userFromStorage)
        return user; 
        
    }

    removeUser(): void {
        this.removeItem(StorageKeys.user);
        return;
    }

}