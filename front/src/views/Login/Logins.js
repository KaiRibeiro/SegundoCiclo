import "./Login.css";
import { useState, useContext } from "react";
import { createBrowserHistory } from 'history';
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function Login() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();


  const userContext = useContext(UserContext);
  const history = createBrowserHistory();


  function login(e) {
    e.preventDefault();

    const data = {
      user,
      password,
    };

    axios.post(`${process.env.REACT_APP_BACK_URL}login`, data, {withCredentials:true}).then((response)  => {
        userContext.setId(response.data.id);
        userContext.setUsername(response.data.username);
        if(response.data.id) {
          history.push("/");
        }
    });
  }

  return (
    <div className="form">
      <form onSubmit={(e) => login(e)}>
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
          <button type="submit">Logar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
