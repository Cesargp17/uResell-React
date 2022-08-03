import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch';
import { LoadingThink } from '../../../UI/LoadingThink';
import { LayoutAdmin } from '../layout/LayoutAdmin';
import { Card, Text, Input, Button } from '@nextui-org/react'
import { useForm } from '../../../hooks/useForm';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const EditProduct = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setproduct] = useState({
        data: null,
        isLoading: true
    })
    
    const [Nombre, setNombre] = useState();
    const [Imagen, setImagen] = useState();
    const [Description, setDescription] = useState();
    const [Stock, setStock] = useState();
    const [Precio, setPrecio] = useState();
    const [Marca, setMarca] = useState();

    const getProduct = async() => {
        const resp = await fetch(`https://uresell-api.herokuapp.com/api/product/${id}`);
        const data = await resp.json();
        setNombre(data.nombre);
        setImagen(data.imagen),
        setDescription(data.description),
        setStock(data.stock),
        setPrecio(data.precio);
        setMarca(data.marca);
       
        setproduct({
        data: data,
        isLoading: false,
       })
    }

    useEffect(() => {
      getProduct();
    }, []);

    const update = async(e) => {
      e.preventDefault();
      Swal.fire({
        title: '¿Quieres guardar los cambios?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No Guardar`,
        cancelButtonText: 'Cancelar'
      }).then(async(result)=>{
        if(result.isConfirmed){
          Swal.fire('Guardado con éxito', '', 'success')
          await axios.put(`https://uresell-api.herokuapp.com/api/product/${id}` , {
            nombre: Nombre,
            imagen: Imagen,
            description: Description,
            stock: Stock,
            precio: Precio,
            marca: Marca
          })
          navigate('/admin')
        }else if (result.isDenied) {
          Swal.fire('Los cambios no fueron guardados', '', 'info')
        }
      })

    }
    

  return (
    <>
        <LayoutAdmin>
            {
                product.isLoading
                ?(<LoadingThink/>)
                : (
                    <form onSubmit={update}>
                    <Card className='mx-auto mt-5 mb-5 animate__animated animate__fadeIn' css={{ mw: "800px" }}>
                    <Text className='text-center' h5>EDITAR PRODUCTO</Text><br />
                    <Card.Body>
                        <Input bordered color="default" type='text' onChange={(e) => setNombre(e.target.value)} value={Nombre}></Input><br /><br />
                        <Input bordered color="default" type='text' onChange={(e) => setImagen(e.target.value)} value={Imagen}></Input><br /><br />
                        <Input bordered color="default" type='text' onChange={(e) => setDescription(e.target.value)} value={Description}></Input><br /><br />
                        <Input bordered color="default" type='text' onChange={(e) => setStock(e.target.value)} value={Stock}></Input><br /><br />
                        <Input bordered color="default" type='text' onChange={(e) => setPrecio(e.target.value)} value={Precio}></Input><br /><br />
                        <Input bordered color="default" type='text' onChange={(e) => setMarca(e.target.value)} value={Marca}></Input><br /><br />
                    <Button type='submit' className='mx-auto text-dark fw-bold' shadow color='light'>Actualizar</Button>
          </Card.Body>
        </Card>
                    </form>
                  )
            }
        </LayoutAdmin>
    </>
  )
}
