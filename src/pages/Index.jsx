import React, { useContext } from 'react'
import { ProductsContext } from '../products/ProductsContext'
import { LoadingThink } from '../UI/LoadingThink';
import { IndexLayout } from './layout/IndexLayout';
import { Text, Card } from '@nextui-org/react'

export const Index = () => {

  const { data, isLoading } = useContext(ProductsContext);

  return (
    <IndexLayout>

      {
        isLoading
        ?(<LoadingThink/>)
        :(
          <div className="text-center animate__animated animate__fadeIn">
          <div className="container-xl mt-5 mb-5">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <Text css={{textGradient: "45deg, $yellow600 -20%, $red600 100%",}} weight="bold" h2 className='text-center'>Total de productos</Text>
                <h2 className='text-center'>{ data.length }</h2>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                <Text css={{textGradient: "45deg, $yellow600 -20%, $red600 100%",}} weight="bold" h2 className='text-center'>Clientes totales</Text>
                <h2 className='text-center'>1633</h2>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <Text css={{textGradient: "45deg, $yellow600 -20%, $red600 100%",}} weight="bold" h2 className='text-center'>Ventas totales</Text>
                <h2 className='text-center'>12485</h2>
              </div>
            </div>
          </div>

          <div className="py-5 bg-light mb-5">
                <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-10 col-xl-7">
                            <div className="text-center">
                                <div className="fs-4 mb-4 fst-italic text-dark">"En uResell nos esforzamos todos los dias para poder tener los mejores productos y los mejores precios en un tiempo de entrega de los más rapidos de todo México."</div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="fw-bold">
                                        Equipo uResell
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xl mt-5 mb-5">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <Card isPressable isHoverable variant="bordered" css={{ mw: "400px" }} >
                <Card.Body>
                <Text className='text-center' h3>Nike</Text><br />
                <img src="https://assets.materialup.com/uploads/c1ef85a7-90b4-4b8d-acd9-79e0f6dab587/preview.png" alt="" />
                </Card.Body>
              </Card>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <Card isPressable isHoverable variant="bordered" css={{ mw: "400px" }} >
                <Card.Body>
                  <Text className='text-center' h3>Adidas</Text><br />
                  <img src="https://i.pinimg.com/736x/2e/55/67/2e55672f86387648dc6ad984a455e5c8.jpg" alt="" />
                </Card.Body>
              </Card>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <Card isPressable isHoverable variant="bordered" css={{ mw: "400px" }} >
                <Card.Body>
                <Text className='text-center' h3>Off-White</Text><br />
                <img src="https://www.jordanukshop.com/wp-content/uploads/2021/12/off-white-x-nike-dunk-low-lot-22-of-50-shoes-for-sale-dm1602-124.jpg" alt="" />
                </Card.Body>
              </Card>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <Card isPressable isHoverable variant="bordered" css={{ mw: "400px" }} >
                <Card.Body>
                <Text className='text-center' h3>Rolex</Text><br />
                <img src="https://m.media-amazon.com/images/I/51J-iZ0nRML._AC_.jpg" alt="" />
                </Card.Body>
              </Card>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <Card isPressable isHoverable variant="bordered" css={{ mw: "400px" }} >
                <Card.Body>
                <Text className='text-center' h3>Gucci</Text><br />
                <img src="https://i.pinimg.com/originals/81/4d/7a/814d7a9b5daf09d27dfd068cdd0d7344.jpg" alt="" />
                </Card.Body>
              </Card>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
              <Card isPressable isHoverable variant="bordered" css={{ mw: "400px" }} >
                <Card.Body>
                <Text className='text-center' h3>Celulares</Text><br />
                <img src="https://i.blogs.es/0fa0c1/33a807b2-f37e-4bda-b5cc-c99ab8b510ca/1366_2000.jpeg" alt="" />
                </Card.Body>
              </Card>
              </div>
            </div>
          </div>

          <section id="hero2">
            <div className="hero2-container" data-aos="zoom-in" data-aos-delay="100">
              <h1>SOMOS TÚ MEJOR OPCIÓN</h1><br />
                <h2>Nadie en México tiene nuestros precios, ni nuestros productos, ¡Animate!</h2>
              </div>
          </section>
          </div>
        )
      }


    </IndexLayout>
  )
}

