import React, { useContext } from 'react'
import { AuthProvider } from './auth/context/AuthProvider'
import { ProductsProvider } from './products'
import { AppRoutes } from './router/AppRoutes'
import { ThemeContext } from './themes/ThemeContext'
import { NextUIProvider } from '@nextui-org/react'
import { CartProvider } from './cart/CartProvider'
import { PedidosProvider } from './pedidos/PedidosProvider'
import { NewPedidoProvider } from './pages/context/NewPedidoProvider'

export const UResellApp = () => {

  const { Theme } = useContext(ThemeContext);

  return (
    <>
      <NextUIProvider theme={Theme}>
        <AuthProvider>
          <PedidosProvider>
            <NewPedidoProvider>
          <CartProvider>
          <ProductsProvider>
            <AppRoutes/>
          </ProductsProvider>
          </CartProvider>
            </NewPedidoProvider>
          </PedidosProvider>
        </AuthProvider>
      </NextUIProvider>
    </>
  )
}
