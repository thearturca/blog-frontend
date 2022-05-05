import { Action, Reducer } from "redux";
import update from "react-addons-update";
import { BlogPostEntity } from "../../services/ports/blog.ports";

export enum BlogReducerActionsEnums
{
    setBlogPosts = "setBlogPosts",
    addBlogPost = "addBlogPost"
}

interface NewBlogPostPayload 
{
    id: number;
    blogPost: BlogPostEntity;
}

export interface BlogEntitiesState
{
    blogPosts: BlogPostEntity[];
    isLoaded: boolean;
}

export interface BlogReducerAction extends Action 
{
    payload?: BlogEntitiesState;
    newBlogPostPayload?: NewBlogPostPayload;
}

export const blogReducer: Reducer<any, BlogReducerAction> = (state: BlogEntitiesState = {blogPosts: [], isLoaded: false}, action: BlogReducerAction) => 
{
    switch(action.type)
    {
        case BlogReducerActionsEnums.setBlogPosts:
        return action.payload;

        case BlogReducerActionsEnums.addBlogPost:
           const newBlogPosts = update(state.blogPosts, {
                        $push: [action.newBlogPostPayload?.blogPost]
            }) as BlogPostEntity[];
        return {...state, blogPosts: newBlogPosts};

        default:
            return state;    
    }
}