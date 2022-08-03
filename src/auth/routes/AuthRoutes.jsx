import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from '../admin/pages/AdminDashboard';
import { AuthContext } from '../context/AuthContext';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';


export const AuthRoutes = () => {

  const { Usuario } = useContext(AuthContext);

  return (
    <Routes>
        <Route path='login' element={ <LoginPage/> } />
        <Route path='register' element={ <RegisterPage/> } />
        <Route path='/*' element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
