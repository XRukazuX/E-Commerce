import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Component/Nav";
import Product from "./Component/Product";
import CarouselProduct from "./Component/CarouselProduct";
import Button from "react-bootstrap/Button";
import { useContext, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Style/App.css";
import { IoBag } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { ApiData } from "./Context/PortContext";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Spinner from "react-bootstrap/Spinner";
function App() {
  const {
    loading,
    Buy,
    total,
    Compra,
    eliminarProducto,
    quitarProducto,
    vaciarCarrito,
  } = useContext(ApiData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <BrowserRouter>
        <h1 className="Title">Catapy</h1>
        <Button
          onClick={() => handleShow()}
          variant="outline-warning"
          className="Bag-i"
        >
          <IoBag />
        </Button>
        <Nav />
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="start"
          className="offcanvas-custom2"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              Shopping
              <Button onClick={() => vaciarCarrito()} variant="danger">
                Clear cart
              </Button>
              <OverlayTrigger
                placement={"bottom"}
                overlay={
                  <Tooltip id={`tooltip-bottom`}>
                    Saved for next session
                  </Tooltip>
                }
              >
                <Button variant="secondary">
                  {" "}
                  <IoIosSave className="oh" />
                </Button>
              </OverlayTrigger>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {Buy?.length > 0 ? (
              <>
                <div className="content-product2">
                  {Buy.map((prod, index) => (
                    <Card key={index}>
                      <Card.Img variant="top" src={prod.image} />
                      <Card.Body className="text-center">
                        <Card.Title>{`${prod.title} x ${prod.cantidad}`}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {`$ ${prod.subtotal} `}
                          <section className="w-100 d-flex  justify-content-center align-items-center mt-3">
                            <Button
                              onClick={() => Compra(prod)}
                              variant="outline-primary"
                            >
                              sumar
                            </Button>
                            <Button
                              onClick={() => quitarProducto(prod.id)}
                              variant="outline-primary"
                            >
                              restar
                            </Button>
                            <Button
                              onClick={() => eliminarProducto(prod.id)}
                              variant="outline-primary"
                            >
                              borrar
                            </Button>
                          </section>
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                  <Button variant="outline-warning" size="lg">
                    {`Creating Order for a total of ${total} $ USD`}
                  </Button>
                </div>
              </>
            ) : (
              <div>Oops! There's nothing in your cart yet.</div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
        {loading ? (
          <div className="loading">
            <Spinner animation="border" variant="warning" />
            <section>
              Loading. Please refresh the page if it takes too long.
            </section>
          </div>
        ) : (
          <CarouselProduct />
        )}
        <Routes>
          <Route path="/" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
