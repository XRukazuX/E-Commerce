import { useContext } from "react";
import { ApiData } from "../Context/PortContext";
import Card from "react-bootstrap/Card";
function Product() {
  const { Api } = useContext(ApiData);
  console.log("Data", Api);
  return (
    <>
      <div>productos</div>
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
    </>
  );
}
export default Product;
