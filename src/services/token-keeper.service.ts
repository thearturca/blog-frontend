import { ITokenKeeper } from "./ports/ITokenKeeper";

export class TokenKeeperService implements ITokenKeeper 
{
    constructor()
    {}

    setToken(accessToken: string): void 
    {
        throw new Error("Method not implemented.");
    }
    
    removeToken(): void 
    {
        throw new Error("Method not implemented.");
    }
    
}