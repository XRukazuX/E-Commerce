import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
import { MdFolderDelete } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Bag from "./Pages/Bag";
import Home from "./Component/Home";
import Footer from "./Component/Footer";
import { MdDeleteForever } from "react-icons/md";
import Error from "./Pages/Error";

function App() {
  const {
    Buy,
    total,
    Compra,
    eliminarProducto,
    quitarProducto,
    vaciarCarrito,
    guardarCarrito,
    borrarCarritoGuardado,
  } = useContext(ApiData);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <BrowserRouter>
        <Link className="link" to={"/"}>
          <h1 className="Title">Catapy</h1>
        </Link>
        <Button
          onClick={() => handleShow()}
          variant="outline-warning"
          className="Bag-i"
        >
          <IoBag />
        </Button>
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="start"
          className="offcanvas-custom2"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              Shopping
              <Button
                onClick={() => vaciarCarrito()}
                variant="outline-danger"
                className="content-boton"
              >
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
                <Button
                  variant="outline-success"
                  onClick={() => guardarCarrito()}
                >
                  <IoIosSave className="oh" />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement={"bottom"}
                overlay={
                  <Tooltip id={`tooltip-bottom`}>Delete saved list</Tooltip>
                }
              >
                <Button
                  onClick={() => borrarCarritoGuardado()}
                  variant="outline-dark"
                >
                  <MdFolderDelete className="oh" />
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
                              +
                            </Button>
                            <Button
                              onClick={() => quitarProducto(prod.id)}
                              variant="outline-primary"
                            >
                              -
                            </Button>
                            <Button
                              onClick={() => eliminarProducto(prod.id)}
                              variant="outline-primary"
                            >
                              <MdDeleteForever size={20} />
                            </Button>
                          </section>
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                  <Link className="link" to={"/Orders"}>
                    <Button
                      variant="outline-warning d-flex justify-content-center align-items-center"
                      size="lg"
                    >
                      <FaWhatsapp className="oh " />
                      {`Creating Order for a total of ${total} $ USD`}
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <div>Oops! There's nothing in your cart yet.</div>
            )}
          </Offcanvas.Body>
        </Offcanvas>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Orders" element={<Bag />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
