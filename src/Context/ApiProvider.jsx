import { ApiData } from "./PortContext";
import { useEffect, useState } from "react";
import axios from "axios";
function ApiProvider({ children }) {
  const [Api, setApi] = useState(null);
  useEffect(() => {
    async function dataApi() {
      try {
        const api = await axios.get("https://fakestoreapi.com/products");
        setApi(api.data);
      } catch {
        console.log("error de carga");
      }
    }
    dataApi();
  }, []);
  return <ApiData.Provider value={{ Api }}>{children}</ApiData.Provider>;
}
export default ApiProvider;
