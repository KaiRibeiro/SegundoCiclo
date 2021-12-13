import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useCookies } from "react-cookie";

function Home() {
    const [cookie, setCookie, removeCookie] = useCookies(['token']);
    const userContext = useContext(UserContext);

  function deslogar() {
    userContext.setId(null);
    userContext.setUsername(null);
    removeCookie("token");
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>Logado como {userContext.username}</h2>
      <h2>{process.env.REACT_APP_BACK_URL}</h2>
      <button type="button" onClick={deslogar}>
        Deslogar
      </button>
    </div>
  );
}

export default Home;
