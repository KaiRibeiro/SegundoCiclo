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

    axios.post("awdaw", data);
  }

  return (
    <div className="form">
      <form onSubmit={(e) => registerUser(e)}>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            onChange={(e) => {
              setUser(e);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => {
              setPassword(e);
            }}
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
