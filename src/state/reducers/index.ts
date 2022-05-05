import { AnyAction, combineReducers } from "redux";
import { UserEntity } from "../../services/auth/user.entity";
import { BlogEntitiesState, blogReducer } from "./blog.reducer";
import { userReducer } from "./user.reducer";

export interface StoreState {
    user: UserEntity,
    blogPosts: BlogEntitiesState
}

const appReducers = combineReducers<StoreState>({
    user: userReducer,
    blogPosts: blogReducer
});

export const rootReducer = (state: any, action: AnyAction) => 
{
    if(action.type === "removeUser")
    {
        return appReducers(undefined, action);
    }
    
    return appReducers(state, action)
}
