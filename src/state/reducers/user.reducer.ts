import {  Action, Reducer } from "redux";
import { UserEntity } from "../../services/auth/user.entity";

export enum userReducerActionsEnums 
{
    setUser = "setUser",
    removeUser = "removeUser"
}

export interface UserReducerAction extends Action 
{
payload: UserEntity;
}

export const userReducer: Reducer<UserEntity, UserReducerAction> = (state: UserEntity = {username: null, }, action: UserReducerAction) => 
{
    switch (action.type) 
    {
        case userReducerActionsEnums.setUser:
        return action.payload;

        case userReducerActionsEnums.removeUser:
            return { username: null }
            
        default:
            return state;
    }
}