import axios from "axios";
import { useState } from "react";

function CardExercicio(props) {
  const [nome, setNome] = useState();
  const [descricao, setDescricao] = useState();
  const [musculoAlvo, setMusculoAlvo] = useState();

  function remover(e) {
    axios
      .delete(
        `${process.env.REACT_APP_BACK_URL}exercicios`,
        { params: { id: props.id } },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("ok");
        props.listar();
      })
      .catch((error) => {
        console.log("erro");
      });
  }

  function editar(e) {
    if (!nome || !descricao || !musculoAlvo) {
      return;
    }
    e.preventDefault();

    const data = {
      id: props.id,
      nome,
      descricao,
      musculoAlvo,
    };

    console.log(data);

    axios
      .put(`${process.env.REACT_APP_BACK_URL}exercicios`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("ok");
        props.listar();
      })
      .catch((error) => {
        console.log("erro");
      });
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="inputGroup"></div>
        <input
          id="nome"
          type="text"
          placeholder="Nome"
          defaultValue={props.nomeExercicio}
          className="form-control card-title"
          onChange={(e) => setNome(e.target.value)}
        />
        <h6 className="card-subtitle mb-2 text-muted">
          <input
            id="alvo"
            type="text"
            placeholder="Músculo Alvo"
            className="form-control"
            defaultValue={props.musculoExercicio}
            onChange={(e) => setMusculoAlvo(e.target.value)}
          />
        </h6>
        <p className="card-text">
          <textarea
            id="descricao"
            type="text"
            placeholder="Descrição"
            className="form-control"
            defaultValue={props.descricaoExercicio}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </p>
      </div>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={editar}
      >
        Editar
      </button>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={remover}
      >
        Remover
      </button>
    </div>
  );
}

export default CardExercicio;
