import axios from "axios";
import { createBrowserHistory } from "history";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import "./Register.css";

function Register() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const userContext = useContext(UserContext);
  const history = createBrowserHistory();

  function registerUser(e) {
    e.preventDefault();

    const data = {
      user,
      password,
    };

    axios
      .post(`${process.env.REACT_APP_BACK_URL}register`, data, {
        withCredentials: true,
      })
      .then((response) => {
        userContext.setId(response.data.id);
        userContext.setUsername(response.data.username);
        if (response.data.id) {
          history.push("/");
        }
      });
  }

  return (
    <main>
      <div className="form">
        <form onSubmit={(e) => registerUser(e)}>
          <div className="inputGroup">
            <label htmlFor="password" className="form-label">
              Usuário
            </label>
            <input
              id="user"
              type="text"
              placeholder="Usuário"
              className="form-control"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Senha"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn">
            <button type="button" className="btn btn-lg btn-primary">
              Registrar
            </button>
            <button type="button" className="btn btn-lg btn-primary">
              <Link className="link" to="/">
                Voltar
              </Link>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Register;
