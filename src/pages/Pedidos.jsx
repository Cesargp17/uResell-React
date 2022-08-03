import { collection, getDocs } from 'firebase/firestore/lite';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../auth/context/AuthContext';
import { FirebaseDB } from '../firebase/config';
import { PedidosContext } from '../pedidos/PedidosContext';
import { LoadingThink } from '../UI/LoadingThink';
import { PagesLayout } from './layout/PagesLayout';
import { Card, Text, Table, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { ProductsContext } from '../products';
import { CheckingAuth } from '../UI';

export const Pedidos = () => { 
  
  const { Pedido, startLoadingPedidos } = useContext(PedidosContext);

  const navigate = useNavigate();

  useEffect(() => {
    startLoadingPedidos();
  }, []);

  if(Pedido[0].status === 'checking'){
    return (
      <PagesLayout>
        <LoadingThink/>
      </PagesLayout>
    )
  } else if(Pedido[0].status ===  'loaded'){
    if(Pedido[0].producto.length === 0 ){
      return (
        <PagesLayout>
          <Card className='mx-auto mt-5 mb-5 animate__animated animate__fadeIn' isHoverable variant="bordered" css={{ mw: "600px" }}>
            <Card.Body>
              <Text h3 className='text-center fw-bold mb-2'>No tienes ningún pedido</Text><br />
                <div className="mx-auto">
                  <Button onClick={()=>navigate('/products')} auto>Compra aquí</Button>
                </div>
            </Card.Body>
          </Card>
      </PagesLayout>
      )
    }
  }

  return (
    <>
      <PagesLayout>
          {
            Pedido[0].status === 'checking'
            ? <LoadingThink/>
            :( Pedido[0].producto.map(p=>
             <div  key={p.id} className="container-xl animate__animated animate__fadeIn">
                <Card className='mx-auto mt-5 mb-5' css={{ mw: "1000px" }}>
                  <Card.Body  className='d-inline-block'>
                  <h4 className='text-center'>{ p.fecha }</h4>
                  <h5 className='text-center'>{ p.number }</h5>
                  <hr />
                  <Table aria-label="Example table with static content" css={{ height: "auto", minWidth: "1500", }}>
                    <Table.Header>
                      <Table.Column>Producto</Table.Column>
                      <Table.Column>Cantidad</Table.Column>
                      <Table.Column>Talla</Table.Column>
                      <Table.Column>Precio</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell><Text weight='bold'>{ p.nombre }</Text></Table.Cell>
                        <Table.Cell>{ p.cantidad }</Table.Cell>
                        <Table.Cell>{ p.talla } MX</Table.Cell>
                        <Table.Cell><Text weight='bold' css={{textGradient: "#005222, #01d015",}}>${ p.precio }</Text></Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <div className="text-center">
                  <img src={p.imagen} width='120px' height='120px'></img>
                  </div>
                  </Card.Body>
                </Card>
             </div>
            ))

          }
      </PagesLayout>
    </>
  )
}
