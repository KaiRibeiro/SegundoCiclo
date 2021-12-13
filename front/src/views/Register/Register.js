import "./Register.css";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  function registerUser(e) {
    e.preventDefault();

    const data = {
      user,
      password,
    };

    axios.post("http://localhost:4000/register", data, {withCredentials:true}).then(() => {

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
