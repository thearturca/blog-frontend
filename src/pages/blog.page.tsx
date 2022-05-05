import { bindActionCreators } from "@reduxjs/toolkit"
import React, { SyntheticEvent, useEffect, useState } from "react"
import BlogPostsListComponent from "../components/blog-posts-list.component"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { BlogService } from "../services/blog/blog.service"
import { BlogPostEntity, IBlogService } from "../services/ports/blog.ports"
import { blogActionCreators } from "../state/actions-creators"

function BlogPage() 
{
  const { blogPosts, isLoaded } = useAppSelector((store) => store.blogPosts);
  const dispatch = useAppDispatch();
  const actions = bindActionCreators(blogActionCreators, dispatch);
  const blogService: IBlogService = new BlogService();

  const [newBlogPostState, setNewBlogPostState] = useState<string>("");

  const handleNewPost = async (body: string) =>
  {
    const res = await blogService.addBlogPost(body);
    if (res === null)
    {
      return null;
    }
    actions.addBlogPost(0, res)
  }

  useEffect(() => 
  {
    const loadBlog = async () =>
    {
      const fetchedBlogPosts: BlogPostEntity[] = await blogService.loadBlog();
      actions.setBlogPosts(fetchedBlogPosts);
    };
    loadBlog()
  }, []);

  return (
    <>
    <form onSubmit={() => handleNewPost(newBlogPostState)}>
      <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewBlogPostState(e.target.value)}></textarea>
      <input type="submit" value="submit"></input>
    </form>
    <BlogPostsListComponent blogPosts={blogPosts}></BlogPostsListComponent>
    </>
    )
}

export default BlogPage