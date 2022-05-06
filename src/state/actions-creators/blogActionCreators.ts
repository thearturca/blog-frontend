import { Dispatch } from "redux";
import { BlogPostEntity } from "../../services/ports/blog.ports";
import { BlogReducerAction, BlogReducerActionsEnums } from "../reducers/blog.reducer";

export const setBlogPosts = (blogPosts: BlogPostEntity[]) => 
{
    return (dispatch: Dispatch) => 
    {
        const blogReducerAction: BlogReducerAction = 
        { 
            type: BlogReducerActionsEnums.setBlogPosts, 
            payload: 
            {
                blogPosts: blogPosts,
                isLoaded: true
                
            }
        }
        dispatch(blogReducerAction);
    }
}

export const addBlogPost = (blogPost: BlogPostEntity) => 
{
    return (dispatch: Dispatch) => 
    {
        const newBlogPost: BlogReducerAction = 
        { 
            type: BlogReducerActionsEnums.addBlogPost,
            newBlogPostPayload:
            {
                blogPost: blogPost
            }
        }
        dispatch(newBlogPost);
    }
}

export const updateBlogPost = (blogPostInArrayId: number, blogPost: BlogPostEntity) =>
{
    return (dispatch: Dispatch) =>
    {
        const updateBlogPostAction: BlogReducerAction =
        {
            type: BlogReducerActionsEnums.updateBlogPost,
            updateBlogPostPayload:
            {
                id: blogPostInArrayId,
                blogPost: blogPost
            }
        }
        dispatch(updateBlogPostAction);
    }
}

export const removeBlogPost = (blogPostInArrayId: number, blogPost: BlogPostEntity) =>
{
    return (dispatch: Dispatch) =>
    {
        const updateBlogPostAction: BlogReducerAction =
        {
            type: BlogReducerActionsEnums.removeBlogPost,
            updateBlogPostPayload:
            {
                id: blogPostInArrayId,
                blogPost: blogPost
            }
        }
        dispatch(updateBlogPostAction);
    }
}