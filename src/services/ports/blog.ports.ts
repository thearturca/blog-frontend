export class BlogPostEntity 
{
    ownerId: number;
    ownerUsername: string;
    timestamp: Date;
    body: string;
    id: number;

    constructor 
    (
        ownerId: number,
        ownerUsername: string,
        timestamp: Date,
        body: string,
        id: number
    ) 
    {
        this.id = id;
        this.body = body;
        this.timestamp = timestamp;
        this.ownerId = ownerId;
        this.ownerUsername = ownerUsername
    }
}

export interface AddBlogPostEntity {
    body: string,
}

export interface IBlogService {
    addBlogPost(body: string): Promise<BlogPostEntity | null>,
    loadBlog(): Promise<BlogPostEntity[]>,
    updateBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity | null>,
    removeBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity | null>
}