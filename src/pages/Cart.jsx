import React, { useContext } from 'react'
import { CartContext } from '../cart/CartContext'
import { LoadingThink } from '../UI/LoadingThink';
import { PagesLayout } from './layout/PagesLayout';
import { Table, Text, Button, Card } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';
import { AuthContext } from '../auth/context/AuthContext';
import Swal from 'sweetalert2'

export const Cart = () => {

    const { cart, isLoading, deleteProductInCart, addNewBuy, Total, addQuantityInCart,restQuantityInCart } = useContext(CartContext);
    const {Usuario} = useContext(AuthContext);
    const { uid } = Usuario;

    const navigate = useNavigate();

    const deleteProduct = (id) => {
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        showConfirmButton: false,
        timer: 1500
      })
      deleteProductInCart(id);
    };

    const addBuy = () => {
      addNewBuy();
    };

    const addQuantity = (id) => {
      addQuantityInCart(id);
    };

    const restQuantity = (id) => {
      const producto = cart.find(product=>product.id === id);
      if(producto.Cantidad === 1) return;
      restQuantityInCart(id);
    };

    if(cart.length === 0){
      return (<PagesLayout>
      <div className="container-xl animate__animated animate__fadeIn">
      { 
  
                    isLoading
                    ?  (<LoadingThink/>)
                    :  (<div className="container-xl text-center mt-5 mb-5">
                    <Card className='mx-auto' isHoverable variant="bordered" css={{ mw: "600px" }}>
                      <Card.Body>
                        <Text h3 className='text-center fw-bold mb-2'>No tienes ningún producto en el carrito.</Text><br />
                        <div className="mx-auto">
                          <Button onClick={()=>navigate('/products')} auto>Compra aquí</Button>
                        </div>
                      </Card.Body>
                  </Card>
                </div>)
                }
                </div>
      </PagesLayout>
    )}

  return (
    <>
    <PagesLayout>
    <div className="container-xl animate__animated animate__fadeIn">
    { 

                  isLoading
                  ?  (<LoadingThink/>)
                  :  (<div className='mt-5 mb-5'>
                    <Table className='mx-auto' aria-label="Example table with static content" css={{ height: "auto", w: "1200px",}}>
                    <Table.Header>
                    <Table.Column className='fs-6 fw-bold'>Imagen</Table.Column>
                      <Table.Column className='fs-6 fw-bold'>Nombre</Table.Column>
                      <Table.Column className='fs-6 fw-bold'>Talla</Table.Column>
                      <Table.Column className='fs-6 fw-bold'>Precio</Table.Column>
                      <Table.Column className='fs-6 fw-bold'>Cantidad</Table.Column>
                      <Table.Column className='fs-6 fw-bold'>Acciones</Table.Column>
                    </Table.Header>
                    <Table.Body>
                    {
                      cart.map(c=>
                        <Table.Row key={c.id}>
                          <Table.Cell> <img width='120px' height='120px' src={c.imagen}/> </Table.Cell>
                          <Table.Cell><Text className='fw-bold fw-5'>{c.nombre}</Text></Table.Cell>
                          <Table.Cell><Text className='fw-bold fw-5'>{c.Talla} MX</Text></Table.Cell>
                          <Table.Cell><Text className='fw-bold text-success fs-5'>${c.Cantidad*c.precio}</Text></Table.Cell>
                          <Table.Cell><Text className='fw-bold fs-5'><Button onClick={()=>restQuantity(c.id)} className='d-inline-block me-1' shadow auto size='xs'>-</Button>{c.Cantidad}<Button onClick={()=>addQuantity(c.id)} size='xs' shadow className='ms-1 d-inline-block' auto>+</Button></Text></Table.Cell>
                          <Table.Cell><Button onClick={()=>deleteProduct(c.id)} className='text-dark d-inline-block me-2' shadow color='light' size='sm' auto><i className="bi bi-x-circle-fill"/></Button><Button onClick={()=>navigate(`/product/${c.id}`)} shadow color='light' size='sm' className='text-dark d-inline-block' auto><i className="bi bi-eye-fill"></i></Button></Table.Cell>
                        </Table.Row>
                        )
                    }
                      </Table.Body>
                    </Table>
                    </div>)
              }
              </div>
              <div className="container-xl text-center mt-4">
                  <Card className='mx-auto' isHoverable variant="bordered" css={{ mw: "400px" }}>
                    <Card.Body>
                      <Text h3 className='text-center fw-bold mb-2'>Total a pagar: </Text><br />
                      <Text h3 className='text-center fw-bold text-success'>${ Total }</Text><br />
                     <div className="mx-auto">
                      <Button onClick={addBuy} auto>Confirmar compra</Button>
                      </div><br />
                    </Card.Body>
                </Card>
              </div><br /><br />
    </PagesLayout>

    </>
  )
}
