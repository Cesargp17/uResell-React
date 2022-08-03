
import { useReducer } from 'react'
import { NewPedidoContext } from './NewPedidoContext'
import { pedidosReducer } from './pedidosReducer'
import { types } from './types/types'

export const NewPedidoProvider = ({ children }) => {

    const [newPedido, dispatch] = useReducer(pedidosReducer, []);

    const getNewPedido = (pedido, id, total) => {
        for(let i=0; i<=pedido.length - 1; i++){
            const newPedido = {
                id: id,
                total: total,
                nombre: pedido[i].nombre,
                imagen: pedido[i].imagen,
                cantidad: pedido[i].Cantidad,
                talla: pedido[i].Talla,
                marca: pedido[i].marca,
                precio: pedido[i].precio
            }

            const action = {
                type: types.newpedido,
                payload: newPedido
            }

            dispatch(action)
        }
    }

  return (
    <>
        <NewPedidoContext.Provider value={{ getNewPedido, newPedido: newPedido }}>
            { children }
        </NewPedidoContext.Provider>
    </>
  )
}
