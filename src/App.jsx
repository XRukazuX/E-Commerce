import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Componentes/Nav";
import axios from "axios";
import "./App.css";

function App() {
  const [Api, setApi] = useState(null);
  async function dataApi() {
    try {
      const api = await axios.get("https://fakestoreapi.com/products");
      console.log(api.data);
    } catch {
      console.log("error de carga");
    }
  }
  dataApi();
  return (
    <>
      <BrowserRouter>
        <h1>Holas</h1>
        <Routes>
          <Route path="/" element={<Nav />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
