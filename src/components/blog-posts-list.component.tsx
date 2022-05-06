import { BlogPostEntity } from "../services/ports/blog.ports"
import BlogPostsItemComponent from "./blog-posts-item.component"

interface BlogPostsListComponentProps
{
    blogPosts: BlogPostEntity[];
    handleUpdatePost(blogPost: BlogPostEntity, blogPostInArrayId: number): Promise<void>
    handleRemovePost(blogPost: BlogPostEntity, blogPostInArrayId: number): Promise<void>
}

function BlogPostsListComponent(props: BlogPostsListComponentProps) 
{
    const sortedBlogPosts = props.blogPosts.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
    return (
    <ul>
        {sortedBlogPosts.map((post, i) =>
            {
                return <BlogPostsItemComponent handleRemovePost={props.handleRemovePost} handleUpdatePost={props.handleUpdatePost} blogPost={ post } key={ post.id } blogInArrayId={ i } />
            })}
    </ul>
    )
}

export default BlogPostsListComponent