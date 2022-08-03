import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite'
import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { AuthContext } from '../auth/context/AuthContext'
import { FirebaseDB } from '../firebase/config'
import { useFetch } from '../hooks/useFetch'
import { NewPedidoContext } from '../pages/context/NewPedidoContext'
import { PedidosContext } from '../pedidos/PedidosContext'
import { CartContext } from './CartContext'
import { cartReducer } from './cartReducer'
import { types } from './types'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const init = () => {
    return JSON.parse(localStorage.getItem('product')) || []
}

export const CartProvider = ({ children }) => {

    const { getNewPedido } = useContext(NewPedidoContext);
    const {Usuario} = useContext(AuthContext);
    const { uid } = Usuario;

    const { data, isLoading } = useFetch('https://uresell-api.herokuapp.com/api/products');
    const [Talla, setTalla] = useState(20);
    const [Cantidad, setCantidad] = useState(1)
    const [cart, dispatch] = useReducer(cartReducer, [], init);
    const [Productos, setProductos] = useState(0);
    const [Total, setTotal] = useState(0);

    const navigate = useNavigate();

    const incrementQuantity = () => {
        setCantidad(Cantidad + 1);
    }

    const decrementQuantity = () => {
        setCantidad(Cantidad - 1);
    }

    const incrementSize = () => {
        setTalla(Talla + 1);
    }

    const decrementSize = () => {
        setTalla(Talla - 1);
    }

    const getAllProductsInCart = () => {
        setProductos(cart.length)
    }

    useEffect(() => {
      getAllProductsInCart();
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('product', JSON.stringify( cart ) );
       }, [cart]);
    

    const addToCart = (id) => {

        const producto = cart.find(product=>product.id === id);
        
        if(producto){
            return Swal.fire({
                icon: 'error',
                title: 'Ya has agregado este producto',
                showConfirmButton: false,
                timer: 1500
              })
        }

        if(!isLoading){
            const product = data.filter((p)=> id == p.id);
            const newProduct = {id: product[0].id, imagen: product[0].imagen, marca: product[0].marca, nombre: product[0].nombre, precio: product[0].precio, Talla, Cantidad}
            const action = {
                type: types.addtocart,
                payload: newProduct
            }
            dispatch(action);
            return Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                showConfirmButton: false,
                timer: 1500
              })
        }
        setCantidad(1);
        setTalla(20);
    };

    const deleteProductInCart = (id) => {
        const action = {
            type: types.deletecart,
            payload: id
        }
        dispatch(action);
        localStorage.removeItem('product');
    };

    const date = new Date().getTime();

    const dateString = useMemo(()=>{
      const newDate = new Date(date);
      return newDate.toUTCString();
    },[date]);

    const addQuantityInCart = (id) => {
        const action = {
            type: types.addQuantity,
            payload: id
        }
        dispatch(action);
    }

    const restQuantityInCart = (id) => {
        const action = {
            type: types.restQuantity,
            payload: id
        }
        dispatch(action)
    }

    const newId = new Date() * 10;

    const addNewBuy = async () => {

        for(let i = 0; i<=cart.length - 1; i++){
          const newProduct = {
            number: newId,
            nombre: cart[i].nombre,
            imagen: cart[i].imagen,
            cantidad: cart[i].Cantidad,
            talla: cart[i].Talla,
            marca: cart[i].marca,
            precio: cart[i].precio,
            fecha: dateString
        }

        await axios.put(`https://uresell-api.herokuapp.com/api/product/${data[i].id}`,{
            nombre: data[i].nombre,
            imagen: data[i].imagen,
            marca: data[i].marca,
            precio: data[i].precio,
            description: data[i].description,
            stock: data[i].stock - cart[i].Cantidad,
        });

        const addPedido = doc(collection(FirebaseDB, `${ uid }/pedidos/detalles`));
        await setDoc(addPedido, newProduct);
        newProduct.id = addPedido.id;
        }

        getNewPedido(cart, newId, Total);
        navigate('/confirmacion');
        const lon = cart.length - 2;
        cart.splice(lon);
        localStorage.removeItem('product')

    };

    const getTotal = () => {
        let total = 0;
        const productos = [...cart];

        for(let i=0; i<=cart.length - 1; i++){
           total = total + productos[i].precio * productos[i].Cantidad;
           setTotal(total);
        }
    };

    useEffect(() => {
      getTotal();
    }, [cart]);
    

  return (
    <>
        <CartContext.Provider value={{ addToCart: addToCart, incrementQuantity: incrementQuantity, decrementQuantity: decrementQuantity, Cantidad: Cantidad, incrementSize: incrementSize, decrementSize: decrementSize, Talla: Talla, cart: cart, isLoading: isLoading, Productos: Productos, deleteProductInCart: deleteProductInCart, addNewBuy: addNewBuy, Total: Total, addQuantityInCart: addQuantityInCart,restQuantityInCart: restQuantityInCart }}>
            { children }
        </CartContext.Provider>
    </>
  )
}
