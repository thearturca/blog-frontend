import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { BlogPostEntity } from "../services/ports/blog.ports"
import NewBlogPostFormComponent from "./new-blog-post.form.component/new-blog-post.form.component";
import "./blog-posts-item.css"

interface BlogPostsItemComponentProps
{
    blogInArrayId: number,
    blogPost: BlogPostEntity,
    handleUpdatePost(blogPost: BlogPostEntity, blogPostInArrayId: number): Promise<void>
    handleRemovePost(blogPost: BlogPostEntity, blogPostInArrayId: number): Promise<void>
}

function BlogPostsItemComponent(props: BlogPostsItemComponentProps) 
{
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleFormSubmit = async (body: string) =>
  {
    const updateBlogPost: BlogPostEntity = new BlogPostEntity(props.blogPost.ownerId, props.blogPost.ownerUsername, props.blogPost.timestamp, body, props.blogPost.id);
    await props.handleUpdatePost(updateBlogPost, props.blogInArrayId);
    setIsUpdate(false);
  }

  const handleRemoveBlogPost = async () =>
  {
    await props.handleRemovePost(props.blogPost, props.blogInArrayId)
  }

  const { user } = useAuth();
  return (
    <div className="post">
      <p>{ !isUpdate && props.blogPost.body }</p>
      { isUpdate && <NewBlogPostFormComponent handleNewPost={handleFormSubmit} bodyStartText={props.blogPost.body} /> }
      
      <div>
        <span className="author">{ props.blogPost.ownerUsername }</span>
        { new Date(props.blogPost.timestamp).toLocaleDateString() }
      </div>
      {props.blogPost.ownerId === user.id && <button onClick={ () => setIsUpdate(!isUpdate) } className="btn">{isUpdate ? "Отмена" : "Изменить"}</button>}
      {props.blogPost.ownerId === user.id && !isUpdate && <button onClick={handleRemoveBlogPost} className="btn">Удалить</button>}
    </div>
  )
}

export default BlogPostsItemComponent