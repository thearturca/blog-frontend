import { useDispatch} from "react-redux";
import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom"
import { bindActionCreators } from "redux";
import { useAuth } from "../../hooks/useAuth";
import { AuthService } from "../../services/auth/auth.service";
import { IAuthService } from "../../services/ports/IAuthService";
import { userActionCreators } from "../../state/actions-creators";


function HeaderComponent() {
    const navigate: NavigateFunction = useNavigate();
    const {isAuth, user} = useAuth();
    const dispatch = useDispatch();
    const actions = bindActionCreators(userActionCreators, dispatch);
    const location = useLocation();

    const handleLogOut = () => {
        const authService: IAuthService = new AuthService();
        authService.logout();
        actions.removeUser();
        navigate("/");
    }
    return (
        <header>
            {location.pathname.startsWith("/auth") && <Link to="/">Main page</Link>}
            {!isAuth ? <></> : <div>{ "Здравствуйте, " + user.fullName }</div>}
            {isAuth && <button onClick={()=> handleLogOut()}>Sign out</button>}
            {!location.pathname.startsWith("/auth") && !isAuth && <Link to="/auth">Sing in</Link>}
        </header>
    )
}

export default HeaderComponent