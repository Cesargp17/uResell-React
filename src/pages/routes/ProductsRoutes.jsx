import { Routes, Route, Navigate } from 'react-router-dom'
import { Cart } from '../Cart'
import { ConfirmPage } from '../ConfirmPage'
import { Index } from '../Index'
import { Pedidos } from '../Pedidos'
import { Products } from '../Products'
import { ProductsView } from '../ProductsView'

export const ProductsRoutes = () => {
  return (
    <Routes>
        <Route path='/products' element={ <Products/> } />
        <Route path='/' element={ <Index/> } />
        <Route path='/*' element={ <Navigate to='/'/> } />
        <Route path='/product/:id' element={ <ProductsView/> } />
        <Route path='/cart' element={ <Cart/> } />
        <Route path='/pedidos' element={ <Pedidos/> } />
        <Route path='/confirmacion'  element={ <ConfirmPage/> } />
    </Routes>
  )
}
