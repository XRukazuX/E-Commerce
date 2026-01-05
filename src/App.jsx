import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Component/Nav";
import Product from "./Component/Product";
import "./Style/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>Holas</h1>
        <Routes>
          <Route path="/" element={((<Nav />), (<Product />))} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
