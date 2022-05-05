import { useSelector } from "react-redux"
import { UserEntity } from "../services/auth/user.entity";
import { StoreState } from "../state/reducers"

export interface isUserAuth 
{
    isAuth: boolean;
    user: UserEntity
}

export const useAuth = (): isUserAuth => 
{
    const user: UserEntity = useSelector((state: StoreState) => state.user);
    const res: isUserAuth = 
    {
        isAuth: user.username !== null,
        user: user
    }
    return res;
}