import "../Style/Footer.css";
function Footer() {
  return (
    <>
      <hr />
      <div className="footer">
        <p>Contacto: info@catapy.com</p>
        <p>
          © {new Date().getFullYear()} Catapy. Todos los derechos reservados.
        </p>
      </div>
    </>
  );
}
export default Footer;
