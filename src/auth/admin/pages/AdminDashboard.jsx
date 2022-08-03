import React, { useEffect, useState } from 'react'
import { LayoutAdmin } from '../layout/LayoutAdmin'
import { Table, Button, Text, Card, Input } from "@nextui-org/react";
import { LoadingThink } from '../../../UI/LoadingThink';
import { useForm } from '../../../hooks/useForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export const AdminDashboard = () => {

  const [Info, setInfo] = useState({
    data: null,
    isLoading: true
  });

  const url = 'https://uresell-api.herokuapp.com/api/product';
  const urls = 'https://uresell-api.herokuapp.com/api/products';

  const { formState, onInputChange } = useForm({
    imagen:'',
    nombre:'',
    precio:'',
    stock:'',
    marca:'',
    description:''
  })

  const { imagen, nombre, precio, stock, marca, description } = formState;

  const navigate = useNavigate();

  const getAllProducts = async() => {
    const resp = await fetch(urls);
    const datos = await resp.json();

    setInfo({
      data: datos,
      isLoading: false
    })
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Agregar el producto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      denyButtonText: `No Agregar`,
      cancelButtonText: 'Cancelar'
    }).then(async(result)=>{
      if(result.isConfirmed){
        Swal.fire('Agregado con éxito', '', 'success')
    await axios.post(url,{nombre: nombre, marca: marca,  description: description, precio: precio, stock: stock, imagen: imagen,  });
    getAllProducts();
      }else if (result.isDenied) {
        Swal.fire('El producto no se agregó', '', 'info')
      }
    })
  }

  const deleteProduct = async(id)=>{
    Swal.fire({
      title: '¿Estas seguro de eliminar el producto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
      cancelButtonText: 'Cancelar'
    }).then(async(result)=>{
      if(result.isConfirmed){
        Swal.fire('Eliminado con éxito', '', 'success')
        await axios.delete(`${url}/${id}`);
        getAllProducts();
      }else if (result.isDenied) {
        Swal.fire('El producto no se eliminó', '', 'info')
      }
    })
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  

  return (
    <>
    <LayoutAdmin>
    {
      Info.isLoading 
      ? <LoadingThink/>
      :(
        <div className="container animate__animated animate__fadeIn ">
        <Table className='mx-auto' aria-label="Example table with static content" css={{ w: '1000px'}}>
        <Table.Header>
        <Table.Column className='fs-6 fw-bold'>Imagen</Table.Column>
          <Table.Column className='fs-6 fw-bold'>Nombre</Table.Column>
          <Table.Column className='fs-6 fw-bold'>Precio</Table.Column>
          <Table.Column className='fs-6 fw-bold'>Stock</Table.Column>
          <Table.Column className='fs-6 fw-bold'></Table.Column>
        </Table.Header>
        <Table.Body>
            
            {
                Info.data.map(c=>
                  <Table.Row key={c.id}>
                    <Table.Cell> <img className='imgCart' src={c.imagen} width='120px' height='120px'/> </Table.Cell>
                    <Table.Cell><Text className='fw-bold fw-5'>{c.nombre}</Text></Table.Cell>
                    <Table.Cell><Text className='fw-bold fw-5'>{c.precio}</Text></Table.Cell>
                    <Table.Cell><Text className='fw-bold fw-5'>{c.stock}</Text></Table.Cell>
                    <Table.Cell><Button onClick={ () => deleteProduct(c.id) } className='d-inline-block me-2 text-dark' shadow color='light' size='sm' auto><i className="bi bi-x-circle-fill"></i></Button><Button onClick={()=>navigate(`editproduct/${c.id}`)} shadow color='light' size='sm' className='text-dark d-inline-block me-2' auto><i className="bi bi-pencil-fill"></i></Button><Button onClick={()=>navigate(`/product/${c.id}`)} shadow color='light' size='sm' className='text-dark d-inline-block' auto><i className="bi bi-eye-fill"></i></Button></Table.Cell>
                  </Table.Row>
                  )
              }
            
          </Table.Body>
        </Table>
        </div>
      )
    }

    <div className="container-xl mt-5 mb-5 animate__animated animate__fadeIn">
      <form onSubmit={onSubmit}>
    <Card className='mx-auto' css={{ mw: "800px" }}>
          <Card.Body>
            <Text className='text-center' h5>AGREGAR NUEVO PRODUCTO</Text><br />
            <Input bordered name='nombre' value={nombre} onChange={onInputChange} labelPlaceholder="Nombre del producto" color="default" /><br /><br />
            <Input bordered name='precio' value={precio} onChange={onInputChange} labelPlaceholder="Precio del producto" color="default" /><br /><br />
            <Input bordered name='imagen' value={imagen} onChange={onInputChange} labelPlaceholder="Imagen del producto" color="default" /><br /><br />
            <Input bordered name='stock' value={stock} onChange={onInputChange} labelPlaceholder="Stock del producto" color="default" /><br /><br />
            <Input bordered name='marca' value={marca} onChange={onInputChange} labelPlaceholder="Marca del producto" color="default" /><br /><br />
            <Input bordered name='description' value={description} onChange={onInputChange} labelPlaceholder="Descripción del producto" color="default" /><br /><br />
            <Button type='submit' className='mx-auto text-dark fw-bold' shadow color='light'>Agregar</Button>
          </Card.Body>
        </Card>
        </form>
    </div>


  </LayoutAdmin>
    </>
  )
}
