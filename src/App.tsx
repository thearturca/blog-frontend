import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout.component/layout.component';
import AuthPage from './pages/auth/auth.page';
import RegisterPage from './pages/register/register.page';
import BlogPage from './pages/blog.page';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { userActionCreators } from './state/actions-creators';
import { useAuth } from './hooks/useAuth';
import { IAuthService } from './services/ports/IAuthService';
import { AuthService } from './services/auth/auth.service';

function App() 
{
  const dispatch = useDispatch();
  const userActions = bindActionCreators(userActionCreators, dispatch);
  const { isAuth } = useAuth();

 
  useEffect(() => 
  {
    const initUser = async () => 
    {
      const authService: IAuthService = new AuthService();
      const res = await authService.init();
      if (res === null)
      {
        return;
      }
      userActions.setUser(res);
    }
    initUser();
  }, [isAuth]);

  return (
  <Routes>
    <Route path='/' element={ <LayoutComponent /> }>
      <Route index element={ <BlogPage /> } />
      <Route path="auth">
        <Route index element={ <AuthPage /> } />
        <Route path='register' element={ <RegisterPage /> } />
      </Route>
      <Route path="*" element={ <BlogPage /> } />
    </Route>
  </Routes>);
}

export default App;
