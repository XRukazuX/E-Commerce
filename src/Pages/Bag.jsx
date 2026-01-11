import "../Style/Bag.css";
import Alert from "react-bootstrap/Alert";
import { LuMessageCircleWarning } from "react-icons/lu";
import { useContext, useState } from "react";
import { ApiData } from "../Context/PortContext";
import { FaWhatsapp } from "react-icons/fa";

function Bag() {
  const { Buy } = useContext(ApiData);
  const [Tel, setTel] = useState("");
  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    console.log(Tel);
  };
  const handleInput = (e) => {
    const valor = e.target.value.replace(/\D/g, ""); // eliminar letras
    setTel(valor.slice(0, 10)); // máximo 15 dígitos
  };
  return (
    <>
      <div className="Bag-conteiner w-100">
        <h3 className="m-auto text-center w-100 title pt-3 pb-3">
          Order submission via WhatsApp
        </h3>
        <div className="Pedidos">
          <section className="Nav">
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
        </div>

        <Alert
          variant="warning"
          className="m-auto rounded-3 border border-warning warning"
        >
          <h3 className="d-flex justify-content-center align-items-center ">
            <LuMessageCircleWarning />
            Order via WhatsApp
          </h3>
          <p>
            Orders are sent via WhatsApp using the user's personal account. This
            application only facilitates the order message and does not control
            or manage the delivery. <br /> The provided WhatsApp number belongs
            exclusively to the business, so please use it responsibly and
            respectfully. <br /> Misuse may affect service to other customers.
          </p>
        </Alert>
      </div>
    </>
  );
}
export default Bag;
