import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { BlogPostEntity, FileEntity, fileTypes } from "../services/ports/blog.ports"
import "./blog-posts-item.css"
import UpdateBlogPostFormComponent from "./update-blog-post.form.component/update-blog-post.form.component";

interface BlogPostsItemComponentProps
{
    blogInArrayId: number,
    blogPost: BlogPostEntity,
    handleUpdatePost(blogPost: BlogPostEntity, blogPostInArrayId: number,): Promise<void>
    handleRemovePost(blogPost: BlogPostEntity, blogPostInArrayId: number): Promise<void>
}

function BlogPostsItemComponent(props: BlogPostsItemComponentProps) 
{
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleFormSubmit = async (body: string) =>
  {
    const updateBlogPost: BlogPostEntity = new BlogPostEntity(props.blogPost.ownerId, props.blogPost.ownerUsername, props.blogPost.timestamp, body, props.blogPost.id, props.blogPost.files);
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
      { isUpdate && <UpdateBlogPostFormComponent handleUpdatePost={handleFormSubmit} bodyStartText={props.blogPost.body} /> }
      {props.blogPost.files && props.blogPost.files.map((file: FileEntity) =>
      {
        switch(file.type)
        {
          case fileTypes.img:
            return <img src={file.path} style={{maxWidth: "400px"}} alt="Failed to Load image"></img>
          case fileTypes.video:
            return <video controls src={file.path} style={{maxWidth: "400px"}}></video>
        }
      })}
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