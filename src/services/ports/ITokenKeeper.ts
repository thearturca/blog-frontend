export interface ITokenKeeper
{
    setToken(accessToken: string): void;
    removeToken(): void;
}