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

export const addBlogPost = (blogPostInArrayId: number, blogPost: BlogPostEntity) => 
{
    return (dispatch: Dispatch) => 
    {
        const newBlogPost: BlogReducerAction = 
        { 
            type: BlogReducerActionsEnums.setBlogPosts,
            newBlogPostPayload:
            {
                id: blogPostInArrayId,
                blogPost: blogPost
            }
        }
        dispatch(newBlogPost);
    }
}