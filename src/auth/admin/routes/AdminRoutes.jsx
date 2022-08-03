import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminDashboard } from '../pages/AdminDashboard';
import { EditProduct } from '../pages/EditProduct';

export const AdminRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={ <AdminDashboard/> } />
            <Route path='/editproduct/:id' element={ <EditProduct/> } />
            <Route path='/*' element={ <Navigate to="/admin/dashboard" /> } />
        </Routes>
    </>
  )
}
