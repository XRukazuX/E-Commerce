import "../Style/Error.css";
import { SiAdblock } from "react-icons/si";

function Error() {
  return (
    <>
      <div className="page-error w-100">
        <SiAdblock className="error-icons" />
        <section className="error-mensaje">
          Page under construction or path error. Please check the path or return
          to the homepage.
        </section>
      </div>
    </>
  );
}
export default Error;
