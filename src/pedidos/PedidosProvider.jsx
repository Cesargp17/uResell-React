import { collection, getDocs } from 'firebase/firestore/lite'
import React, { useContext, useEffect, useReducer } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { FirebaseDB } from '../firebase/config'
import { pedidoReducer } from './pedidoReducer'
import { PedidosContext } from './PedidosContext'
import { types } from './types/types'

const init = () => {
    return [{
        status: 'checking'
    }];
}

export const PedidosProvider = ({ children }) => {

    const [Pedido, dispatch] = useReducer(pedidoReducer, [], init)

    const { Usuario } = useContext(AuthContext);
    const { uid } = Usuario;

    // const checkPedidos = () => {
    //     const pedidoChecking = {
    //         status: 'checking'
    //     }
    //     const action = {
    //         type: types.checking,
    //         payload: pedidoChecking
    //     }

    //     dispatch(action);
    // }

    // const pedidoListo = () => {
    //     const pedidoChecking = {
    //         status: 'loaded'
    //     }

    //     const action = {
    //         type: types.load,
    //         payload: pedidoChecking
    //     }
    //     dispatch(action);
    // }

    const setPedidos = (state) => {
        const producto = {
            status: 'loaded',
            producto: state
        }
        const action = {
            type: types.pedidos,
            payload: producto
        }
        dispatch(action);
    }

    const startLoadingPedidos = async() => {
        if(!uid) return;
        const collectionRef = collection(FirebaseDB, `${ uid }/pedidos/detalles`);
        const docs = await getDocs(collectionRef);

        const notes = [];
        docs.forEach(doc=>{
            notes.push({id: doc.id, ...doc.data()});
        });
        setPedidos(notes);
    }

  return (
    <>
        <PedidosContext.Provider value={{ setPedidos, startLoadingPedidos, Pedido: Pedido}}>
            { children }
        </PedidosContext.Provider>
    </>
  )
}
