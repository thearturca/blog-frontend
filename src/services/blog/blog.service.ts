import { ApiService } from "../api/api.service";
import { BlogPostEntity, IBlogService } from "../ports/blog.ports";
import { BlogPostDTO, IApiService, NewBlogPostDTO } from "../ports/IApiService";

export class BlogService implements IBlogService
{
    private readonly _apiService: IApiService = new ApiService();

    constructor () {}

    async loadBlog(): Promise<BlogPostEntity[]> {
        const blogPostDTO: BlogPostDTO[] = await this._apiService.loadBlog();
        const blogPost: BlogPostEntity[] = [];
        blogPostDTO.map((post) =>
        {
            return blogPost.push(new BlogPostEntity(post.ownerId, post.ownerUsername, post.timestamp, post.body, post.id));
        });
        return blogPost;
    }

    async addBlogPost(body: string): Promise<BlogPostEntity | null> 
    {
        const newBlogPostDto: NewBlogPostDTO = {body: body};
        const res: BlogPostDTO = await this._apiService.addBlogPost(newBlogPostDto);
        return new BlogPostEntity(res.ownerId, res.ownerUsername, res.timestamp, res.body, res.id);
    }
}



// async addActivity(ownerWaterMeterId: number, meter: number, meters: WaterMetersActivityEntity[]): Promise<WaterMetersActivityEntity[] | null> 
// {
//     const waterMetersActivity: AddWaterMetersActivityEntity = 
//     {
//         ownerWaterMeterId: ownerWaterMeterId,
//         meter: meter
//     }
//     const res: WaterMeterActivityResponse = await this._apiService.submitMeters(waterMetersActivity);
//     if (!res.ownerWaterMeterId || !res.timestamp || !res.meter || !res.id)
//     {
//         return null;
//     }
//     const newMeter: WaterMetersActivityEntity = new WaterMetersActivityEntity(res.ownerWaterMeterId, new Date(res.timestamp), res.meter, res.id);
//     const newMeters: WaterMetersActivityEntity[] = [...meters, newMeter];
//     return newMeters;
// }