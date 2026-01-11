import { useState, useContext, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ApiData } from "../Context/PortContext";
import { IoBagAdd } from "react-icons/io5";

import "../Style/Nav.css";
function Nav() {
  const [Text, setText] = useState("");
  const { Filtrado, productosFiltrados, Compra } = useContext(ApiData);
  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return; // Salir si no es Enter

    e.preventDefault(); // Primero evitar acción por defecto

    // Filtrado según el texto
    const textoAFiltrar = Text.length > 0 ? Text : "";
    Filtrado(textoAFiltrar);

    // Mostrar modal / alerta / resultado
    handleShow();
  };
  const messaje = useMemo(
    () =>
      Text.length > 0
        ? "No products found"
        : "Enter something to search for products",
    [Text]
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="Nav">
        <CiSearch className="icons" />
        <input
          type="text"
          id="Buscar"
          className="Buscar"
          value={Text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
        />
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        className="offcanvas-custom"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Resultados de búsqueda</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {productosFiltrados?.length > 0 ? (
            <div className="content-product">
              {productosFiltrados.map((prod, index) => (
                <Card key={index}>
                  <Card.Img variant="top" src={prod.image} />
                  <Card.Body className="text-center">
                    <Card.Title>{prod.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {`$ ${prod.price} USD - ⭐ ${prod.rating.rate}`}
                    </Card.Subtitle>
                  </Card.Body>
                  <section className="Bag">
                    <IoBagAdd
                      onClick={() => Compra(prod)}
                      className="Bag-icons"
                    />
                  </section>
                </Card>
              ))}
            </div>
          ) : (
            <div>{messaje}</div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Nav;
