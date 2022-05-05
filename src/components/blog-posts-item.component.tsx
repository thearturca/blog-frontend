import { BlogPostEntity } from "../services/ports/blog.ports"

interface BlogPostsItemComponentProps
{
    blogPost: BlogPostEntity
}

function BlogPostsItemComponent(props: BlogPostsItemComponentProps) 
{
  return (
    <div>
      <h3>{ props.blogPost.ownerUsername }</h3>
      { props.blogPost.body }
    </div>
  )
}

export default BlogPostsItemComponent