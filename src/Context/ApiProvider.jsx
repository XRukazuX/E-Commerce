import { ApiData } from "./PortContext";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
function ApiProvider({ children }) {
  const [Api, setApi] = useState(null);
  const [Buy, setBuy] = useState([]);
  const [Filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productosFiltrados = Api?.filter((producto) =>
    producto.title.toLowerCase().includes(Filter.toLowerCase())
  );
  const Filtrado = (e) => setFilter(e);
  const Compra = (producto) => {
    //Se Comprueba que el contenido no este ya en la lista
    setBuy((Buy) => {
      const existe = Buy.find((p) => p.id === producto.id);

      if (existe) {
        return Buy.map((p) =>
          p.id === producto.id
            ? {
                ...p,
                cantidad: p.cantidad + 1,
                subtotal: (p.cantidad + 1) * p.price,
              }
            : p
        );
      }

      return [
        ...Buy,
        {
          ...producto,
          cantidad: 1,
          subtotal: producto.price,
        },
      ];
    });
  };
  const eliminarProducto = (id) => {
    setBuy((Buy) => Buy.filter((p) => p.id !== id));
  };
  const quitarProducto = (id) => {
    setBuy((Buy) =>
      Buy.map((p) =>
        p.id === id
          ? {
              ...p,
              cantidad: p.cantidad - 1,
              subtotal: (p.cantidad - 1) * p.price,
            }
          : p
      ).filter((p) => p.cantidad > 0)
    );
  };
  const sumaProducto = (id) => {
    setBuy((Buy) =>
      Buy.map((p) =>
        p.id === id
          ? {
              ...p,
              cantidad: p.cantidad + 1,
              subtotal: (p.cantidad + 1) * p.price,
            }
          : p
      )
    );
  };
  const vaciarCarrito = () => setBuy([]);
  const total = useMemo(
    () => Buy.reduce((acc, p) => acc + p.subtotal, 0),
    [Buy]
  );
  const guardarCarrito = () => {
    localStorage.setItem("cart_saved", JSON.stringify(Buy));
  };
  const recuperarCarrito = () => {
    const stored = localStorage.getItem("cart_saved");
    if (stored) {
      setBuy(JSON.parse(stored));
    }
  };
  const borrarCarritoGuardado = () => {
    localStorage.removeItem("cart_saved");
  };

  useEffect(() => {
    async function dataApi() {
      try {
        const api = await axios.get("https://fakestoreapi.com/products");
        setApi(api.data);
      } catch (err) {
        setError("Error cargando productos");
      } finally {
        setLoading(false);
      }
    }
    dataApi();
  }, []);
  useEffect(() => {
    console.log("Filtrado", productosFiltrados);
  }, [Filter]);
  return (
    <ApiData.Provider
      value={{
        productosFiltrados,
        Api,
        Filtrado,
        Buy,
        loading,
        error,
        total,
        Compra,
        eliminarProducto,
        sumaProducto,
        quitarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </ApiData.Provider>
  );
}
export default ApiProvider;
