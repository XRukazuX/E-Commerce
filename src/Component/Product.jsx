import { useContext } from "react";
import { ApiData } from "../Context/PortContext";
import Card from "react-bootstrap/Card";
import "../Style/Product.css";
function Product() {
  const { Api, Buy, Compra, eliminarProducto, quitarProducto, sumaProducto } =
    useContext(ApiData);
  //console.log("Data", Api);
  console.log("Api", Api);
  return (
    <>
      {Api && (
        <>
          <h2>Productos</h2>
          <div className="content-product">
            {Api?.map((prod, index) => {
              return (
                <Card key={index}>
                  <Card.Img variant="top" src={prod.image} />
                  <Card.Body className="text-center">
                    <Card.Title>{prod.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted ">
                      {`$ ${prod.price} USD - ⭐ ${prod.rating.rate}`}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
export default Product;
