import Navbar from "../../components/Navbar";
import "./Home.css";

function Home() {
  return (
    <main>
      <Navbar />
      <main className="main">
        <div className="textoResumo">
          <p>
            body<span className="fw-bold">overflow</span> é um projeto de um
            sistem de controle e acompanhamento de treinos corporais, dietas e
            evolução corporal. Com foco na exibição detalhada de informações da
            evolução.
          </p>
        </div>
      </main>
    </main>
  );
}

export default Home;
