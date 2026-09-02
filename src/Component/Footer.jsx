import "../Style/Footer.css";
function Footer() {
  return (
    <>
      <hr />
      <div className="footer">
        <p>
          ⚠️ <strong>Sitio de demostración</strong> — Proyecto de portafolio
          creado únicamente con fines educativos y de prueba.
        </p>

        <p>
          © {new Date().getFullYear()} Catapy — Demo de portafolio. No es una
          tienda real y no se realizan compras ni pagos reales.
        </p>
      </div>
    </>
  );
}
export default Footer;
