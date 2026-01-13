import { ApiData } from "./PortContext";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
function ApiProvider({ children }) {
  const [Api, setApi] = useState(null);
  const [Buy, setBuy] = useState([]);
  const [Filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productosFiltrados = useMemo(() => {
    if (!Filter || !Filter.trim()) return [];

    return Api?.filter((producto) =>
      producto.title.toLowerCase().includes(Filter.toLowerCase())
    );
  }, [Api, Filter]);
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
  const vaciarCarrito = () => setBuy([]);
  const total = useMemo(
    () => parseFloat(Buy.reduce((acc, p) => acc + p.subtotal, 0).toFixed(2)),
    [Buy]
  );
  const guardarCarrito = () => {
    if (Buy) {
      localStorage.setItem("cart_saved", JSON.stringify(Buy));
      console.log("Guardado carrito");
    }
    if (Buy.length <= 0) {
      alert("There are no items to store.");
    }
  };
  const recuperarCarrito = () => {
    const stored = localStorage.getItem("cart_saved");
    console.log("Datos guardados en carrito");
    if (stored) {
      setBuy(JSON.parse(stored));
      console.log("Datos recuperados");
    }
  };
  const borrarCarritoGuardado = () => {
    localStorage.removeItem("cart_saved");
    console.log("Carrito, Borrado", localStorage.getItem("cart_saved"));
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
    recuperarCarrito();
  }, []);
  useEffect(() => {
    /* console.log("Filtrado", productosFiltrados);
    console.log("Filter", Filter);*/
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
        quitarProducto,
        vaciarCarrito,
        guardarCarrito,
        borrarCarritoGuardado,
      }}
    >
      {children}
    </ApiData.Provider>
  );
}
export default ApiProvider;
