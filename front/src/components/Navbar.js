import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const userContext = useContext(UserContext);

  function deslogar() {
    userContext.setId(null);
    userContext.setUsername(null);
    removeCookie("token");
  }
  return (
    <nav className="navbar fixed-top navbar-expand-md bg-dark">
      <a className="navbar-brand" href="/">
        <img
          className="miniLogo"
          src="/images/miniLogo.png"
          width="50"
          height="50"
          alt="logo"
        />
        body<span className="fw-bold">overflow</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Exercícios
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/home">
              Treinos
            </a>
          </li>
        </ul>
        <span className="navbar-text user text-white">
          <span className="fw-bold">Usuário Logado:</span>{" "}
          {userContext.username}
        </span>
      </div>
      <button
        onClick={deslogar}
        type="button"
        className="btn btn-outline-primary"
      >
        LOGOUT
      </button>
    </nav>
  );
}

export default Navbar;
