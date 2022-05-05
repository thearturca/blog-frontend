import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout.component/layout.component';
import AuthPage from './pages/auth/auth.page';
import RegisterPage from './pages/register/register.page';
import BlogPage from './pages/blog.page';

function App() {
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
