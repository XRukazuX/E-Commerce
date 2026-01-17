import "../Style/Bag.css";
import Alert from "react-bootstrap/Alert";
import { LuMessageCircleWarning } from "react-icons/lu";
import { useContext, useMemo, useState } from "react";
import { ApiData } from "../Context/PortContext";
import { FaWhatsapp } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FaWhatsappSquare } from "react-icons/fa";
import Button from "react-bootstrap/Button";
function Bag() {
  const { Buy, total } = useContext(ApiData);
  const [Tel, setTel] = useState("");
  const [Verf, setVerf] = useState(false);
  const [Fall, setFall] = useState(false);
  const startsWith15 = (number) => {
    return number.startsWith("11");
  };
  const normalizeMessage = (text) =>
    text
      .split("\n")
      .map((line) => line.trim()) // quita indentaciones
      .filter((line) => line.length > 0) // quita líneas vacías
      .join("\n");
  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (Tel.length === 10 && startsWith15(Tel)) {
      setVerf(true);
      setFall(false);
    } else if (Tel.length === 0) {
      setFall(false);
      setVerf(false);
    } else {
      setFall(true);
      setVerf(false);
    }
  };
  const handleInput = (e) => {
    const valor = e.target.value.replace(/\D/g, ""); // eliminar letras
    setTel(valor.slice(0, 10)); // máximo 15 dígitos
  };
  const mensaje = useMemo(() => {
    if (!Buy || Buy.length === 0) {
      return normalizeMessage(`Hello 👋
      
I would like to place an order:
🛒 Products:
- No products selected`);
    }

    let totalprice = total;

    const productosTexto = Buy.map((item, index) => {
      return `${index + 1}. ${item.title} - Quantity: ${
        item.cantidad
      } - Price: $${item.subtotal}`;
    }).join("\n");

    return normalizeMessage(`Hello 👋

I would like to place an order:
🛒 Products:
${productosTexto}

💰 Total: $${totalprice}

Thank you for using our service 🙏`);
  }, [Buy]);
  return (
    <>
      <div className="Bag-conteiner w-100">
        <h3 className="m-auto text-center w-75 title pt-3 pb-3">
          Order submission via WhatsApp
        </h3>
        <div className="Pedidos">
          <section className="Nav" id="marg">
            <FaWhatsapp className="icons" />

            <input
              type="tel"
              name="whassat"
              value={Tel}
              onChange={handleInput}
              pattern="[0-9]{10,15}"
              inputMode="numeric"
              id="Buscar1"
              className="Buscar1"
              placeholder="WhatsApp number"
              onKeyDown={handleKeyPress}
            />
          </section>
          <section className="check">
            {Verf && (
              <>
                <FaCheckCircle className="ok" /> <span>Correct</span>
              </>
            )}
            {Fall && (
              <>
                <RxCrossCircled className="ok red" />{" "}
                <span>Error, enter a valid number</span>
              </>
            )}
          </section>
        </div>
        <div className="Compra w-100">
          <h3>Order to send to the company</h3>
          <section className="Messaje" style={{ whiteSpace: "pre-line" }}>
            {mensaje}
            <FaWhatsappSquare className="whatsapp" />
          </section>
        </div>
        <section className="enviar">
          {Buy.length > 0 && Verf && (
            <a
              href={`https://wa.me/549${Tel}?text=${encodeURIComponent(
                mensaje,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline-success">Success</Button>
            </a>
          )}
          {Buy.length == 0 && Verf && (
            <Button variant="outline-danger">
              No products were found for the order
            </Button>
          )}
        </section>
        <Alert
          variant="warning"
          className="m-auto rounded-3 border border-warning warning"
        >
          <h3 className="d-flex justify-content-center align-items-center ">
            <LuMessageCircleWarning />
            Order via WhatsApp
          </h3>
          <p>
            This is a demo site created for testing purposes only. <br />
            No real store exists and no data is stored. <br />
            The WhatsApp number is used only to test the generation and sending
            of order messages via WhatsApp <strong>(wa.me)</strong> using the
            user's own account.
            <br />
            <strong>
              Order delivery is only available for WhatsApp numbers in
              Argentina.
            </strong>
          </p>
        </Alert>
      </div>
    </>
  );
}
export default Bag;
