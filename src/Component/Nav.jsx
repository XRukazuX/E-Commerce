import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useContext } from "react";
import "../Style/Nav.css";
import { ApiData } from "../Context/PortContext";
function Nav() {
  const [Text, setText] = useState("");
  const { Filtrado } = useContext(ApiData);
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      Filtrado(Text);
      Text.length > 0 ? console.log(Text) : alert("Introduzca Texto");
    }
  };
  return (
    <>
      <div className="Nav">
        <CiSearch className="icons" />

        <input
          type="text"
          id="Buscar"
          className="Buscar"
          value={Text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search..."
        />
      </div>
    </>
  );
}

export default Nav;
