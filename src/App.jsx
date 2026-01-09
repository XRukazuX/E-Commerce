import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Component/Nav";
import Product from "./Component/Product";
import CarouselProduct from "./Component/CarouselProduct";
import { useContext } from "react";
import "./Style/App.css";
import { ApiData } from "./Context/PortContext";
import Spinner from "react-bootstrap/Spinner";
function App() {
  const { loading } = useContext(ApiData);
  return (
    <>
      <BrowserRouter>
        <h1 className="Title">Catapy</h1>
        <Nav />

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
