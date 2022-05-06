import { Action, Reducer } from "redux";
import update from "immutability-helper";
import { BlogPostEntity } from "../../services/ports/blog.ports";

export enum BlogReducerActionsEnums
{
    setBlogPosts = "setBlogPosts",
    addBlogPost = "addBlogPost",
    updateBlogPost = "updateBlogPost",
    removeBlogPost = "removeBlogPost"
}

interface NewBlogPostPayload 
{
    blogPost: BlogPostEntity;
}

interface UpdateBlogPostPayload 
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
    updateBlogPostPayload?: UpdateBlogPostPayload;
}

export const blogReducer: Reducer<any, BlogReducerAction> = (state: BlogEntitiesState = {blogPosts: [], isLoaded: false}, action: BlogReducerAction) => 
{
    switch(action.type)
    {
        case BlogReducerActionsEnums.setBlogPosts:
        return action.payload;

        case BlogReducerActionsEnums.addBlogPost:
           const newBlogPosts = update(state.blogPosts, {
                        $push: [action.newBlogPostPayload!.blogPost]
            }) as BlogPostEntity[];
        return {...state, blogPosts: newBlogPosts};

        case BlogReducerActionsEnums.updateBlogPost:
           const updatedBlogPosts = update(state.blogPosts, {
                [action.updateBlogPostPayload!.id]:
                {
                    $set: action.updateBlogPostPayload!.blogPost
                }
            }) as BlogPostEntity[];
        return {...state, blogPosts: updatedBlogPosts};

        case BlogReducerActionsEnums.removeBlogPost:
           const removeUpdatedBlogPosts = update(state.blogPosts, {
                    $splice: [[action.updateBlogPostPayload!.id, 1]] 
            }) as BlogPostEntity[];
        return {...state, blogPosts: removeUpdatedBlogPosts};

        default:
            return state;    
    }
}