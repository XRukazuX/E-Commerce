import { Link } from "react-router";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { IoBag } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { MdFolderDelete } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { ApiData } from "../Context/PortContext";
import { useContext, useState } from "react";

function Cart() {
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
      <Button onClick={handleShow} variant="outline-warning" className="Bag-i">
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
              <span className="word-main">Clear</span>
              <span className="word-secondary"> cart</span>
            </Button>
            <OverlayTrigger
              placement={"bottom"}
              overlay={
                <Tooltip id={`tooltip-bottom`}>Saved for next session</Tooltip>
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
                        <section className="w-100 d-flex  justify-content-center align-items-center mt-3 botones">
                          <Button
                            onClick={() => Compra(prod)}
                            variant="outline-primary"
                            className="box-op"
                          >
                            +
                          </Button>
                          <Button
                            onClick={() => quitarProducto(prod.id)}
                            variant="outline-primary"
                            className="box-op"
                          >
                            -
                          </Button>
                          <Button
                            onClick={() => eliminarProducto(prod.id)}
                            variant="outline-primary"
                            className="box-op d-flex  justify-content-center align-items-center"
                          >
                            <MdDeleteForever />
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
                    onClick={handleClose}
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
    </>
  );
}
export default Cart;
