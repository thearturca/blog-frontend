import { NewUserEntity } from "../auth/new-user.entity";
import { UserEntity } from "../auth/user.entity";
import { FileEntity, fileTypes } from "./blog.ports";

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
    files: FileEntity[]
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

export interface FileEntityDTO
{
    message?: string
    type: fileTypes,
    path: string
    fileId?: number,
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
    uploadFile(formData: FormData, postId: number): Promise<FileEntityDTO>
}