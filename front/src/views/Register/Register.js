import axios from "axios";
import { createBrowserHistory } from "history";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import "./Register.css";

function Register() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(0);
  const [errorMsg, setErrorMsg] = useState();

  const userContext = useContext(UserContext);
  const history = createBrowserHistory();

  function registerUser(e) {
    if(!user || !password) {
      setError(1);
      setErrorMsg('Preencha todos os campos');
      return;
    }
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
      }).catch((error) => {
        if(error.response.data.errors) {
              setError(1);
              setErrorMsg('Preencha todos os campos');
        } else {
          switch(error.response.data) {
            case 11000:
              setError(1);
              setErrorMsg('Esse nome de usuário já esta sendo utilizado');
            break;
            default:
              setError(1);
              setErrorMsg('Erro ao efetuar cadastro');
          }
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
            <button type="button" onClick={(e) => registerUser(e)} className="btn btn-lg btn-primary">
              Registrar
            </button>
            <button type="button" className="btn btn-lg btn-outline-primary">
              <Link className="link" to="/">
                Voltar
              </Link>
            </button>
          </div>
          {error ? (
          <div className="erro">
            {errorMsg}
          </div>
          ):
          null}
        </form>
      </div>
    </main>
  );
}

export default Register;
