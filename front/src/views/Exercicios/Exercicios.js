import Navbar from "../../components/Navbar";
import "./Exercicios.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CardExercicio from "../../components/CardExercicio";

function Exercicios() {
  const [showModal, setShowModal] = useState(0);
  const [nome, setNome] = useState();
  const [descricao, setDescricao] = useState();
  const [musculoAlvo, setMusculoAlvo] = useState();
  const [error, setError] = useState(0);
  const [errorMsg, setErrorMsg] = useState();
  const [ok, setOk] = useState(0);
  const [exercicios, setExercicios] = useState();
  const [carregando, setCarregando] = useState(1);
  let listaExercicios = [];

  function salvarExercicio(e) {
    if (!nome || !descricao || !musculoAlvo) {
      setOk(0);
      setError(1);
      setErrorMsg("Preencha todos os campos");
      return;
    }
    e.preventDefault();

    const data = {
      nome,
      descricao,
      musculoAlvo,
    };

    axios
      .post(`${process.env.REACT_APP_BACK_URL}exercicios`, data, {
        withCredentials: true,
      })
      .then((response) => {
        setNome(null);
        setDescricao(null);
        setMusculoAlvo(null);
        setShowModal(0);
        setError(0);
        setOk(1);
        setShowModal(1);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setOk(0);
          setError(1);
          setErrorMsg("Preencha todos os campos");
        } else {
          setOk(0);
          setError(1);
          setErrorMsg("Erro ao realizar cadastro.");
        }
      });
  }

  function listar() {
    setCarregando(1);
    axios
      .get(`${process.env.REACT_APP_BACK_URL}exercicios`, {
        withCredentials: true,
      })
      .then((response) => {
        response.data.forEach((e) => {
          listaExercicios.push({
            ...e,
          });
        });
        setExercicios(listaExercicios);
        setCarregando(0);
      })
      .catch((error) => {
        setExercicios(null);
        setCarregando(0);
      });
  }

  return (
    <main>
      <Navbar />
      <main className="main">
        <div>
          <button
            onClick={() => {
              setShowModal(1);
            }}
            type="button"
            className="btn btn-lg btn-primary"
          >
            + Novo Exercício
          </button>
          {showModal ? (
            <div className="form">
              <form>
                <div className="inputGroup">
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Nome"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="descricao" className="form-label">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    type="text"
                    placeholder="Descrição"
                    className="form-control"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="alvo" className="form-label">
                    Músculo Alvo
                  </label>
                  <input
                    id="alvo"
                    type="text"
                    placeholder="Músculo Alvo"
                    className="form-control"
                    value={musculoAlvo}
                    onChange={(e) => setMusculoAlvo(e.target.value)}
                  />
                </div>
                <div className="btn">
                  <button
                    onClick={(e) => {
                      salvarExercicio(e);
                    }}
                    type="button"
                    className="btn btn-lg btn-primary"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="btn btn-lg btn-outline-primary"
                    onClick={() => {
                      setShowModal(0);
                    }}
                  >
                    Fechar
                  </button>
                </div>
                {ok ? <div className="ok">Cadastrado com sucesso</div> : null}
                {error ? <div className="erro">{errorMsg}</div> : null}
              </form>
            </div>
          ) : null}
          <button onClick={listar} type="button" className="btn btn-primary">
            Listar Exercícios
          </button>
          {carregando ? null : (
            <div className="exercicios">
              {exercicios.map((item) => (
                <CardExercicio key={item._id} listar={listar} id={item._id} nomeExercicio={item.nome} musculoExercicio={item.musculoAlvo} descricaoExercicio={item.descricao} />
              ))}
            </div>
          )}
        </div>
      </main>
    </main>
  );
}

export default Exercicios;
