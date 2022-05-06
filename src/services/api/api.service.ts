import { NewUserEntity } from "../auth/new-user.entity";
import { BlogPostDTO, IApiService, LoginResponse, NewBlogPostDTO, RegisterResponse, UpdateBlogPostDTO } from "../ports/IApiService";
import { ApiEndpoints, ApiMethods } from "../ports/api.enum";
import { UserEntity } from "../auth/user.entity";
import { IStorage } from "../ports/IStorage";
import { StorageService } from "../storage/storage.service";

export class ApiService implements IApiService 
{
    private _token: string | null = null;
    private readonly _storage: IStorage = new StorageService();
    private readonly _url: string = process.env.REACT_APP_API_HOST ? `${process.env.REACT_APP_API_HOST}/api/` : "http://localhost:3000/api/";
    
    constructor() 
    {
        this._token = this._storage.getToken();
    }

    async login(username: string, password: string): Promise<LoginResponse> 
    {
        return await this.sendRequest<LoginResponse>(ApiEndpoints.login, ApiMethods.POST, JSON.stringify({username: username, password: password}));
    }
    
    async register(newUser: NewUserEntity): Promise<RegisterResponse> 
    {
        return await this.sendRequest<RegisterResponse>(ApiEndpoints.register, ApiMethods.POST, JSON.stringify(newUser));
    }
    
    async checkToken(): Promise<UserEntity | null> 
    {
        return await this.sendRequest<UserEntity | null>(ApiEndpoints.profile, ApiMethods.GET);
    }

    async loadBlog(): Promise<BlogPostDTO[]>
    {
        return await this.sendRequest<BlogPostDTO[]>(ApiEndpoints.blog, ApiMethods.GET);
    }

    async addBlogPost(blogPost: NewBlogPostDTO): Promise<BlogPostDTO> 
    {
        return await this.sendRequest<BlogPostDTO>(ApiEndpoints.blog, ApiMethods.POST, JSON.stringify(blogPost));
    }

    async updateBlogPost(blogPost: UpdateBlogPostDTO): Promise<BlogPostDTO> 
    {
        return await this.sendRequest<BlogPostDTO>(ApiEndpoints.blog+ `/${blogPost.blogPostid}`, ApiMethods.PUT, JSON.stringify(blogPost))
    }
    
    async removeBlogPost(blogPostId: number): Promise<BlogPostDTO> 
    {
        return await this.sendRequest<BlogPostDTO>(ApiEndpoints.blog+ `/${blogPostId}`, ApiMethods.DELETE)
    }

    async sendRequest<T>(urlEndpoint: ApiEndpoints | string, method: ApiMethods, body?: string): Promise<T> 
    {
        let res;
        try 
        {
            const rawRes: Response = await fetch(this._url + urlEndpoint, 
                {
                method: method,
                headers: 
                {
                    'Authorization': 'Bearer ' + this._token, 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });
            res = await rawRes.json();
        } 
        catch (e) 
        {
        }
        return res as Promise<T>;
    }
}