import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import LoginFormComponent from "../../components/auth.form.component/login.form.component"
import { useAuth } from "../../hooks/useAuth"
import { AuthService } from "../../services/auth/auth.service";
import { IAuthService } from "../../services/ports/IAuthService";
import { userActionCreators } from "../../state/actions-creators";

function AuthPage() 
{
  const { isAuth } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  const dispatch = useDispatch();
  const actions = bindActionCreators(userActionCreators, dispatch);
  const authService: IAuthService = new AuthService();

  const handleLogin = async (login: string, password: string) => 
  {
    const res = await authService.login(login, password);
    if (res === null)
    {
      return;
    }
    actions.setUser(res);
    navigate("/")
  };
  
  useEffect(() => 
  {
    if(isAuth) 
    {
      navigate("/")
    }
  }, [isAuth]);
  
  return (
      <>
        <h2>Sign in</h2>
        <LoginFormComponent login={ handleLogin }/>
        <Link to="register">Sign up</Link>
      </>
  )
}

export default AuthPage