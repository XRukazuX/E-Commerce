import { useContext } from "react";
import { ApiData } from "../Context/PortContext";
import Card from "react-bootstrap/Card";
import "../Style/Product.css";
function Product() {
  const { Api, Buy, Compra, eliminarProducto, quitarProducto, sumaProducto } =
    useContext(ApiData);
  //console.log("Data", Api);
  console.log("Buy", Buy);
  return (
    <>
      {Api && (
        <>
          <div>Productos</div>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={Api[0].image} />
            <Card.Body>
              <Card.Title>{Api[0].category}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {Api[0].title} <br />
                {`$ ${Api[0].price} - ⭐ ${Api[0].rating.rate}`}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={Api[1].image} />
            <Card.Body>
              <Card.Title>{Api[1].category}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {Api[1].title} <br />
                {`$ ${Api[1].price} - ⭐ ${Api[1].rating.rate}`}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <section className="buton">
            <button onClick={() => sumaProducto(Api[0].id)}>+</button>
            <button onClick={() => quitarProducto(Api[0].id)}>-</button>
            <button onClick={() => eliminarProducto(Api[0].id)}>X</button>
            <button onClick={() => Compra(Api[0])}>Agregar carrito</button>
            <button onClick={() => Compra(Api[1])}>Agregar carrito</button>
          </section>
          <div>Carrito</div>
          <section>
            {Buy &&
              Buy.map((e, key) => (
                <div key={key}>
                  <h3>{e.title}</h3>
                </div>
              ))}
          </section>
        </>
      )}
    </>
  );
}
export default Product;
