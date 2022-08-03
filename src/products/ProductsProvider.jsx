import React from 'react'
import { useFetch } from '../hooks/useFetch';
import { ProductsContext } from './ProductsContext'

export const ProductsProvider = ({ children }) => {

  const { data, isLoading } = useFetch('https://uresell-api.herokuapp.com/api/products');

  return (
    <ProductsContext.Provider value={{ data: data, isLoading: isLoading }}>
        { children }
    </ProductsContext.Provider>
  )
}
