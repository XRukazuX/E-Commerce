import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Component/Nav";
import Product from "./Component/Product";
import CarouselProduct from "./Component/CarouselProduct";
import "./Style/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1 className="Title">Catapy</h1>
        <Nav />
        <CarouselProduct />
        <Routes>
          <Route path="/" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
