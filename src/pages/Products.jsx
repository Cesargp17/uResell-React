import React, { useContext, useState } from 'react'
import { ProductsContext } from '../products'
import { PagesLayout } from './layout/PagesLayout'
import { Card, Grid, Row, Text, Input, Button } from "@nextui-org/react";
import { LoadingThink } from '../UI/LoadingThink';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

export const Products = () => {

  const { data, isLoading } = useContext(ProductsContext);
  const { busqueda, onInputChange } = useForm({
    busqueda: ''
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { q = '' } = queryString.parse(location.search);

  const getProductsByName = (nombre = '') => {
    if(!isLoading){
      return data.filter(
        prod=>prod.nombre.toLowerCase().includes(nombre)
        );
    }
  };

  const res = getProductsByName(q);

  const onClickProduct=(id)=>{
    navigate(`/product/${id}`)
  };

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`?q=${busqueda.toLowerCase().trim()}`);
  }

  return (
    <PagesLayout>
      <form onSubmit={onSearch} className="text-center mt-5">
      <Input name='busqueda' value={busqueda} onChange={onInputChange} size='xl' className='d-inline-block me-2' placeholder='Buscar...'></Input>
      <Button type='submit' auto className='d-inline-block'><i className="bi bi-search"></i></Button>
      </form>
      {
        isLoading 
        ? <LoadingThink/>
        : (
          <div className="container-xl text-center mb-5 mt-4 animate__animated animate__fadeIn">
            <div className="row">
          {
          res.map((producto) => (
            
          <div key={producto.id}  className="col-lg-3 col-md-4 col-sm-12 text-center">
            <Card onClick={()=>onClickProduct(producto.id)} className='mt-5 text-center mx-auto' isPressable isHoverable variant="bordered" css={{ mw: "250px", h: "350px" }}>
            <div className="text-center mx-auto mt-3">
                <Text h4>{ producto.nombre }</Text>
              </div>
              <hr />
              <div className="text-center mx-auto">
                <Text h3 weight='bold' css={{textGradient: "#005222, #01d015",}}>${ producto.precio }</Text>
              </div>
                <img className='mx-auto' src={producto.imagen} width='250px' height='250px'/>
          </Card>
          </div>
          
          ))}
          </div>
          </div>
        )
      }

    </PagesLayout>
  )
}
