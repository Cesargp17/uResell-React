import { Button, Text } from '@nextui-org/react'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../cart/CartContext'
import { useFetch } from '../hooks/useFetch'
import { LoadingThink } from '../UI/LoadingThink'
import { PagesLayout } from './layout/PagesLayout'

export const ProductsView = () => {

  const {id} = useParams();

  const { addToCart, Talla, Cantidad, incrementQuantity, decrementQuantity, incrementSize, decrementSize } = useContext(CartContext);

  const { data, isLoading } = useFetch(`https://uresell-api.herokuapp.com/api/product/${id}`);

  const increment = () => {
    incrementQuantity();
  }

  const decrement = () => {
    if(Cantidad === 1) return
    decrementQuantity();
  }

  const addCart = (id) => {
    addToCart(id);
    
  }

  const addsize = () => {
    if(Talla === 30) return;
    incrementSize();
  }

  const restsize = () => {
    if(Talla === 20) return;
    decrementSize();
  }


  return (
    <PagesLayout>
      {
        isLoading
        ?(<LoadingThink/>)
        :(
          <section className="py-5">
          <div className="container px-4 px-lg-5 my-5">
              <div className="row gx-4 gx-lg-5 align-items-center">
                  <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={data.imagen} alt="..." /></div>
                  <div className="col-md-6">
                      <Text css={{textGradient: "45deg, $yellow600 -20%, $red600 100%",}}weight="bold" h1>{data.nombre}</Text>
                      <div className="fs-5 mb-5">
                          <Text size='2em' weight='bold' css={{textGradient: "#005222, #01d015",}}>${data.precio} MXN</Text>
                      </div>
                      <Text className='mb-5' h4>{data.description}</Text><br />
                      <div className="mx-auto">
                      <Text h4 className='d-inline-block mb-3'>Cantidad:</Text><br />
                          <Button auto shadow color="success" onClick={increment} className='d-inline-block me-2'>+</Button>
                          <div className="d-inline-block form-control text-center w-25">{ Cantidad }</div>
                          <Button auto shadow color="success" onClick={decrement} className='d-inline-block ms-2 me-3'>-</Button>                     
                      </div><br />

                      <div className="mx-auto">
                        <Text h4 className='d-inline-block mb-3'>Talla:</Text><br />
                          <Button auto shadow color="success" onClick={addsize} className='d-inline-block  me-2'>+</Button>
                          <div className="d-inline-block form-control text-center w-25">{ Talla } MX</div>
                          <Button auto shadow color="success" onClick={restsize} className='d-inline-block  ms-2 me-3'>-</Button>
                      </div><br />

                      <div className="mx-auto">
                          <Button size='md' shadow color="primary" onClick={()=>addCart(data.id)} className='ms-4 d-inline-block btn btn-primary me-2'><i className="bi bi-cart-check-fill"></i>&nbsp;Agregar</Button>
                      </div>
                  </div>
              </div>
          </div>
      </section>
        )
      }

    </PagesLayout>
  )
}
