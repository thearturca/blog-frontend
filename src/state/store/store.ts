import thunk from "redux-thunk";
import { IStorage } from "../../services/ports/IStorage";
import { StorageService } from "../../services/storage/storage.service";
import { UserEntity } from "../../services/auth/user.entity";
import { rootReducer } from "../reducers";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { BlogEntitiesState } from "../reducers/blog.reducer";

const storage: IStorage = new StorageService();
const userFromStorage = storage.getUser();
let initialUserState: UserEntity = {username: null, };
let initialBlogPosts: BlogEntitiesState = 
{
    isLoaded: false,
    blogPosts: []
}
if (userFromStorage !== null) 
{
    initialUserState = userFromStorage;
};


export const store = configureStore
({
    reducer: rootReducer,
    preloadedState: 
    {
        user: initialUserState,
        blogPosts: initialBlogPosts
    },
    middleware: [thunk]
})    

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

   