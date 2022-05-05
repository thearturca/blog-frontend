import { BlogPostEntity } from "../services/ports/blog.ports"
import BlogPostsItemComponent from "./blog-posts-item.component"

interface BlogPostsListComponentProps
{
    blogPosts: BlogPostEntity[];
}

function BlogPostsListComponent(props: BlogPostsListComponentProps) 
{


  return (
    <ul>
        {props.blogPosts.map((post) =>
        {
           return <BlogPostsItemComponent blogPost={post} key={post.id} />
        })}
    </ul>
    )
}

export default BlogPostsListComponent