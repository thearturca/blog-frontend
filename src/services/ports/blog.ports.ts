export enum fileTypes
{
    img = "img",
    video = "video"
}

export interface FileEntity
{
    type: fileTypes,
    path: string
    fileId?: number,
}

export class BlogPostEntity 
{
    ownerId: number;
    ownerUsername: string;
    timestamp: Date;
    body: string;
    id: number;
    files: FileEntity[]

    constructor 
    (
        ownerId: number,
        ownerUsername: string,
        timestamp: Date,
        body: string,
        id: number,
        files: FileEntity[]
    ) 
    {
        this.id = id;
        this.body = body;
        this.timestamp = timestamp;
        this.ownerId = ownerId;
        this.ownerUsername = ownerUsername;
        this.files = files;
    }
}

export interface AddBlogPostEntity {
    body: string,
}

export interface IBlogService {
    addBlogPost(body: string, formData: FormData): Promise<BlogPostEntity | null>,
    loadBlog(): Promise<BlogPostEntity[]>,
    updateBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity | null>,
    removeBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity | null>
}