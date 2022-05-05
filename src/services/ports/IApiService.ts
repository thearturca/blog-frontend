import { NewUserEntity } from "../auth/new-user.entity";
import { UserEntity } from "../auth/user.entity";
import { BlogPostEntity } from "./blog.ports";

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

export interface IApiService 
{
    login(username: string, password: string): Promise<LoginResponse>
    register(newUser: NewUserEntity): Promise<RegisterResponse>
    checkToken(): Promise<UserEntity | null>
    loadBlog(): Promise<BlogPostDTO[]>
    addBlogPost(blogPost: NewBlogPostDTO): Promise<BlogPostDTO>
}