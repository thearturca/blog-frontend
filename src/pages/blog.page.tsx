import { bindActionCreators } from "@reduxjs/toolkit"
import { useEffect } from "react"
import BlogPostsListComponent from "../components/blog-posts-list.component"
import NewBlogPostFormComponent from "../components/new-blog-post.form.component/new-blog-post.form.component"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { useAuth } from "../hooks/useAuth"
import { BlogService } from "../services/blog/blog.service"
import { BlogPostEntity, IBlogService } from "../services/ports/blog.ports"
import { blogActionCreators } from "../state/actions-creators"

function BlogPage() 
{
  const { blogPosts } = useAppSelector((store) => store.blogPosts);
  const dispatch = useAppDispatch();
  const actions = bindActionCreators(blogActionCreators, dispatch);
  const { isAuth } = useAuth();

  const blogService: IBlogService = new BlogService();


  const handleNewPost = async (body: string): Promise<void> =>
  {
    const res = await blogService.addBlogPost(body.trim());
    if (res === null)
    {
      return;
    }
    actions.addBlogPost(res);
    return;
  }

  const handleUpdatePost = async (blogPost: BlogPostEntity, blogPostInArrayId: number): Promise<void> =>
  {
    const res = await blogService.updateBlogPost(blogPost);
    if (res === null)
    {
      return;
    }
    actions.updateBlogPost(blogPostInArrayId, res);
    return;
  }

  const handleRemovePost = async (blogPost: BlogPostEntity, blogPostInArrayId: number): Promise<void> =>
  {
    const res = await blogService.removeBlogPost(blogPost);
    if (res === null)
    {
      return;
    }
    actions.removeBlogPost(blogPostInArrayId, res);
    return;
  }

  useEffect(() => 
  {
    const loadBlog = async () =>
    {
      const fetchedBlogPosts: BlogPostEntity[] = await blogService.loadBlog();
      actions.setBlogPosts(fetchedBlogPosts);
    };
    loadBlog()
  }, [isAuth]);

  return (
    <div className="container">
      {isAuth && <h2>New Post</h2>}
    {isAuth && <NewBlogPostFormComponent handleNewPost={ handleNewPost }/>}
    <h2 style={{marginTop: "28px"}}>Blog</h2>
    <BlogPostsListComponent handleRemovePost={handleRemovePost} handleUpdatePost={ handleUpdatePost } blogPosts={ blogPosts } ></BlogPostsListComponent>
    </div>
    )
}

export default BlogPage