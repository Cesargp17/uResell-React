import { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AdminRoutes } from '../auth/admin/routes/AdminRoutes'
import { AuthContext } from '../auth/context/AuthContext'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { NewPedidoContext } from '../pages/context/NewPedidoContext'
import { ProductsRoutes } from '../pages/routes/ProductsRoutes'
import { PedidosContext } from '../pedidos/PedidosContext'
import { CheckingAuth } from '../UI'

export const AppRoutes = () => {

  const { Usuario } = useContext(AuthContext);

  const { startLoadingPedidos } = useContext(PedidosContext);

  const { newPedido } = useContext(NewPedidoContext);

  useCheckAuth();

  useEffect(() => {
    startLoadingPedidos();
  }, [Usuario])

  if(Usuario.status === 'checking' || Usuario.status === undefined ){
    return <CheckingAuth/>
  }

  if(Usuario.rol === 'Administrador' && Usuario.status === 'auth'){
    return (
      <Routes>
          <Route path='/*' element={ <ProductsRoutes/> } />
          <Route path='/admin/*' element={ <AdminRoutes/> } />
      </Routes>
    )
  } else if(Usuario.status === 'auth'){
    return (
      <Routes>
          <Route path='/*' element={ <ProductsRoutes/> } />
      </Routes>
    )
  }

  return (
    <Routes>
        <Route path='/*' element={ <ProductsRoutes/> } />
        <Route path="/auth/*" element={ <AuthRoutes /> } />
    </Routes>
  )
}

