import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { bindActionCreators } from "redux";
import RegisterFormComponent from "../../components/register.form/register.form.component"
import { useAuth } from "../../hooks/useAuth";
import { AuthService } from "../../services/auth/auth.service";
import { NewUserEntity } from "../../services/auth/new-user.entity"
import { IAuthService } from "../../services/ports/IAuthService";
import { userActionCreators } from "../../state/actions-creators";

function RegisterPage() {
    const { isAuth } = useAuth();
    const navigate: NavigateFunction = useNavigate();

    const dispatch = useDispatch();
    const actions = bindActionCreators(userActionCreators, dispatch);

    const handelRegister = async (newUser: NewUserEntity) => {
        const authService: IAuthService = new AuthService();
        const res = await authService.register(newUser);
        if (res === null) {
            return;
        }
        actions.setUser(res)
        navigate("/")
    }

    useEffect(() => {
        if(isAuth) {
          navigate("/")
        }
      }, [isAuth]);

    return (
        <>
            <h2>Sign up</h2>
            <RegisterFormComponent register={ handelRegister }/>
            <Link to='/auth'>Sign in</Link>
        </>
    )
}

export default RegisterPage