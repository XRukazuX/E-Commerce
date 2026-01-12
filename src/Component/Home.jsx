import { useContext } from "react";
import Product from "./Product";
import CarouselProduct from "./CarouselProduct";
import Spinner from "react-bootstrap/Spinner";
import { ApiData } from "../Context/PortContext";
import Nav from "./Nav";
function Home() {
  const { loading } = useContext(ApiData);
  return (
    <>
      <Nav />
      {loading ? (
        <div className="loading">
          <Spinner animation="border" variant="warning" />
          <section>
            Loading. Please refresh the page if it takes too long.
          </section>
        </div>
      ) : (
        <>
          <CarouselProduct />
          <Product />
        </>
      )}
    </>
  );
}

export default Home;
