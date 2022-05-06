import { NewUserEntity } from "../auth/new-user.entity";
import { UserEntity } from "../auth/user.entity";

export interface LoginResponse 
{
    statusCode: number,
    message: string,
    user?: UserEntity,
    access_token?: string
}

export interface RegisterResponse 
{
    status: number,
    message: string,
    user?: UserEntity,
    access_token?: string
}

export interface BlogPostDTO
{
    id: number,
    ownerId: number,
    ownerUsername: string,
    body: string,
    timestamp: Date,
}

export interface NewBlogPostDTO
{
    body: string,
}

export interface UpdateBlogPostDTO
{
    readonly body: string;
    readonly blogPostid: number;
}

export interface IApiService 
{
    login(username: string, password: string): Promise<LoginResponse>
    register(newUser: NewUserEntity): Promise<RegisterResponse>
    checkToken(): Promise<UserEntity | null>
    loadBlog(): Promise<BlogPostDTO[]>
    addBlogPost(blogPost: NewBlogPostDTO): Promise<BlogPostDTO>,
    updateBlogPost(blogPost: UpdateBlogPostDTO): Promise<BlogPostDTO>
    removeBlogPost(blogPostId: number): Promise<BlogPostDTO>
}