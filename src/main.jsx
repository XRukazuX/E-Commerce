import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ApiProvider from "./Context/ApiProvider.jsx";
import "./Style/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <ApiProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ApiProvider>
);
