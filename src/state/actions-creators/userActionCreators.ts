import { Dispatch } from "redux"
import { UserEntity } from "../../services/auth/user.entity"
import { userReducerActionsEnums } from "../reducers/user.reducer"

export const setUser = (user: UserEntity) => 
{
    return (dispatch: Dispatch) => 
    {
        dispatch
        ({
            type: userReducerActionsEnums.setUser,
            payload: user
        })
    }
}

export const removeUser = () => 
{
    return (dispath: Dispatch) => 
    {
        dispath
        ({
            type: userReducerActionsEnums.removeUser
        })
    }
}
