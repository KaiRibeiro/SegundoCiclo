import axios from "axios";
import { createBrowserHistory } from 'history';
import { useContext, useState } from "react";
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

    axios.post(`${process.env.REACT_APP_BACK_URL}register`, data, {withCredentials:true}).then((response) => {
      userContext.setId(response.data.id);
      userContext.setUsername(response.data.username);
      if(response.data.id) {
        history.push("/");
      }
    });
  }

  return (
    <div className="form">
      <form onSubmit={(e) => registerUser(e)}>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn">
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
