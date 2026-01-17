import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Style/App.css";
import Bag from "./Pages/Bag";
import Home from "./Component/Home";
import Footer from "./Component/Footer";
import Error from "./Pages/Error";
import Cart from "./Component/Cart";
function App() {
  return (
    <>
      <BrowserRouter>
        <Link className="link control-with" to={"/"}>
          <h1 className="Title">Catapy</h1>
        </Link>
        <Cart />
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
