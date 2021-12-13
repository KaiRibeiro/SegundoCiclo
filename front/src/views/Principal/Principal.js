import "./Principal.css";
import { Link } from "react-router-dom";
import bigLogo from "../../public/images/bigLogo.png";

function Principal() {
  return (
    <main className="main">
      <div className="conteudo">
        <div>
          <img src={bigLogo} alt="Logo" />
          <h2>Ferramenta de acompanhamento corporal</h2>
        </div>
        <div className="btns">
          <button type="button" className="btn btn-primary btn-lg ">
            <Link className="link" to="/login">Login</Link>
          </button>
          <button type="button" className="btn btn-lg btn-outline-primary">
            <Link className="link" to="/register">Registrar</Link>
          </button>
        </div>
      </div>
</main>  );
}

export default Principal;
