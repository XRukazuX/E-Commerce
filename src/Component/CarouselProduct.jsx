import Carousel from "react-bootstrap/Carousel";
import { useContext, useState, useEffect } from "react";
import { ApiData } from "../Context/PortContext";
import "../Style/CarouselProduct.css";
function CarouselProduct() {
  const { Api } = useContext(ApiData);
  const primerosTres = Api?.slice(0, 3);

  console.log(primerosTres);
  return (
    <>
      {primerosTres && (
        <Carousel>
          {primerosTres.map((producto, index) => (
            <Carousel.Item key={index} interval={2000}>
              <img
                className="carousel-img"
                src={producto.image} // ajusta según tu API
                alt={producto.title}
              />
              <Carousel.Caption>
                <h3>{`$ ${producto.price}`}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      <div className="comic-border">¡OFERTAS IMPERDIBLES!</div>
    </>
  );
}
export default CarouselProduct;
