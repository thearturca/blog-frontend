import { IStorage } from "../ports/IStorage";
import { IAuthService } from "../ports/IAuthService";
import { UserEntity } from "./user.entity";
import { NewUserEntity } from "./new-user.entity";
import { IApiService, LoginResponse, RegisterResponse } from "../ports/IApiService";
import { StorageService } from "../storage/storage.service";
import { ApiService } from "../api/api.service";

export class AuthService implements IAuthService
{
    private readonly _storage: IStorage = new StorageService();
    private readonly _apiService: IApiService = new ApiService();

    constructor () 
    {
    }

    async login(username: string, password: string): Promise<UserEntity | null> 
    {
        try 
        {
            const res: LoginResponse = await this._apiService.login(username, password);
            if (!res.access_token || !res.user) 
            {
                alert("Неверный логин или пароль");
                return null;
            }
            this._storage.setToken(res.access_token);
            this._storage.setUser(res.user);
            return res.user;
        } 
        catch (error) 
        {
            return null;
        }
    }

    async logout(): Promise<void> 
    {
        this._storage.removeUser();
        this._storage.removeToken();
    }

    async register(newUser: NewUserEntity): Promise<UserEntity | null> 
    {
        try 
        {
            const res: RegisterResponse = await this._apiService.register(newUser);
            if (!res.access_token || !res.user) 
            {
                alert(res.message);
                return null;
            }

            this._storage.setToken(res.access_token);
            this._storage.setUser(res.user);
            return res.user;
        } 
        catch (error) 
        {
            return null;
        }
    }

    async init(): Promise<UserEntity | null> 
    {
        const userFromStorage = this._storage.getUser();
        const user = await this._apiService.checkToken();
        if (user?.id === userFromStorage?.id && userFromStorage) 
        {
            return userFromStorage;
        }
        await this.logout();
        return null;
    }

    
}