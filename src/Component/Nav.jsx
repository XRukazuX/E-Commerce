import { useState } from "react";
function Nav() {
  const [Text, setText] = useState("");
  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      Text.length > 0 ? console.log(Text) : alert("Introduzca Texto");
    }
  };
  return (
    <>
      <div>componente nav 1</div>
      <input
        type="text"
        id="Buscar"
        value={Text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Buscar..."
      />
    </>
  );
}

export default Nav;
