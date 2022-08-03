import React, { useContext } from 'react'
import { NewPedidoContext } from './context/NewPedidoContext'
import { PagesLayout } from './layout/PagesLayout'
import { Card, Text,Table, Button } from '@nextui-org/react'
import { ProductsContext } from '../products'
import { LoadingThink } from '../UI/LoadingThink'
import { useNavigate } from 'react-router-dom'
import { Products } from './Products'

export const ConfirmPage = () => {

  const { newPedido } = useContext(NewPedidoContext);
  const { isLoading } = useContext(ProductsContext);
  const navigate = useNavigate();

  if( newPedido.length === 0 ){
    return (
      <Products/>
    )
  }

  return (
    <>
        <PagesLayout>
        <div className="text-center mt-5">
                <Card className='mx-auto' isHoverable variant="bordered" css={{ mw: "600px" }}>
                    <Card.Body>
                        <Text className='text-center' h2>PEDIDO CONFIRMADO</Text><br />
                        <Text className='text-center' h3>ID: {newPedido[0].id}</Text><br />
                        <Text className='text-center' h4>Te enviaremos más detalles por correo.</Text>
                        { 
                      isLoading
                      ?  (<LoadingThink/>)
                      :  (<div className='mt-4'>
                        <Table aria-label="Example table with static content" css={{ height: "auto", minWidth: "100%",}}>
                        <Table.Header>
                          <Table.Column className='fs-6 fw-bold'>Nombre</Table.Column>
                          <Table.Column className='fs-6 fw-bold'>Precio</Table.Column>
                          <Table.Column className='fs-6 fw-bold'>Cantidad</Table.Column>
                          <Table.Column className='fs-6 fw-bold'>Imagen</Table.Column>
                        </Table.Header>
                        <Table.Body>
                        {
                          newPedido.map(c=>
                            <Table.Row key={c.nombre}>
                              <Table.Cell><Text className='fw-bold fw-5'>{c.nombre}</Text></Table.Cell>
                              <Table.Cell><Text className='fw-bold text-success fs-5'>${c.cantidad * c.precio}</Text></Table.Cell>
                              <Table.Cell><Text className='fw-bold fs-5'>{c.cantidad}</Text></Table.Cell>
                              <Table.Cell> <img className='imgCart' src={c.imagen}/> </Table.Cell>
                            </Table.Row>
                            )
                        }
                          </Table.Body>
                        </Table>
                        </div>)
                  }
                    </Card.Body>
                </Card><br /><br />
            </div>
        </PagesLayout>
    </>
  )
}
