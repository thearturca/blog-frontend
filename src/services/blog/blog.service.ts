import { ApiService } from "../api/api.service";
import { BlogPostEntity, FileEntity, IBlogService } from "../ports/blog.ports";
import { BlogPostDTO, IApiService, NewBlogPostDTO, UpdateBlogPostDTO } from "../ports/IApiService";

export class BlogService implements IBlogService
{
    private readonly _apiService: IApiService = new ApiService();

    constructor () {}

    async loadBlog(): Promise<BlogPostEntity[]> {
        const blogPostDTO: BlogPostDTO[] = await this._apiService.loadBlog();
        const blogPost: BlogPostEntity[] = [];
        blogPostDTO.map((post) =>
        {
            return blogPost.push(new BlogPostEntity(post.ownerId, post.ownerUsername, post.timestamp, post.body, post.id, post.files));
        });
        return blogPost;
    }

    async addBlogPost(body: string, formData: FormData): Promise<BlogPostEntity | null> 
    {
        if (body === "")
        {
            return null;
        }
        const newBlogPostDto: NewBlogPostDTO = {body: body};
        const res: BlogPostDTO = await this._apiService.addBlogPost(newBlogPostDto);
        let uploadedFile: FileEntity | null = null;
            uploadedFile = await this._apiService.uploadFile(formData, res.id);
        return new BlogPostEntity(res.ownerId, res.ownerUsername, res.timestamp, res.body, res.id, [uploadedFile!] || []);
    }

    async updateBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity | null>
    {
        if (blogPost.body === "")
        {
            return null;
        }
        const updateBlogPostDTO: UpdateBlogPostDTO = { blogPostid: blogPost.id, body: blogPost.body };
        const res: BlogPostDTO = await this._apiService.updateBlogPost(updateBlogPostDTO);
        return new BlogPostEntity(res.ownerId, res.ownerUsername, res.timestamp, res.body, res.id, res.files); 
    }

    async removeBlogPost(blogPost: BlogPostEntity): Promise<BlogPostEntity | null>
    {
        if (blogPost.body === "")
        {
            return null;
        }
        const res: BlogPostDTO = await this._apiService.removeBlogPost(blogPost.id);
        return new BlogPostEntity(res.ownerId, res.ownerUsername, res.timestamp, res.body, res.id, res.files); 
    }
}