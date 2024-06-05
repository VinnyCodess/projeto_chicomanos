import React, { useState, useEffect } from 'react';

function NovoComponente() {
  const [persona, setPersona] = useState(null);
  const [idAtual, setIdAtual] = useState(1);

  useEffect(() => {
    buscarPersona(idAtual);
  }, [idAtual]);

  function buscarPersona(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => {
        setPersona(data);
      })
      .catch(error => console.error('Erro ao buscar persona:', error));
  }

  function lidarComBotaoAnterior() {
    if (idAtual > 1) {
      setIdAtual(prevId => prevId - 1);
    }
  }

  function lidarComBotaoProximo() {
    setIdAtual(prevId => prevId + 1);
  }

  function lidarComBotaoBuscar() {
    const id = parseInt(idAtual);
    if (!isNaN(id)) {
      setIdAtual(id);
    }
  }

  return (
    <div className="container-personagem">
      <div className="imagem-personagem">
        {persona && <img src={persona.image} alt="Imagem da Persona" id="imagem-personagem" />}
      </div>
      <div className="info-personagem">
        {persona && (
          <>
            <h2 id="nome-personagem">{persona.name}</h2>
            <p id="status-personagem">Status: {persona.status}</p>
            <p id="especie-personagem">Espécie: {persona.species}</p>
            <p id="genero-personagem">Gênero: {persona.gender}</p>
            <p id="origem-personagem">Origem: {persona.origin.name}</p>
            <p id="localizacao-personagem">Localização: {persona.location.name}</p>
            <p id="criado-em-personagem">Criado em: {new Date(persona.created).toLocaleDateString('pt-BR')}</p>
            <p id="id-personagem">ID: {persona.id}</p>
          </>
        )}
      </div>
      <div className="lista-episodios">
        <h2>Episódios</h2>
        <ul>
          {persona && persona.episode.map((episodeUrl, index) => {
            const numeroEpisodio = episodeUrl.split("/").pop();
            return <li key={index}> episódio: {numeroEpisodio}</li>;
          })}
        </ul>
      </div>
      <div className="container-botoes">
        <button id="botao-anterior" onClick={lidarComBotaoAnterior}>Anterior</button>
        <button id="botao-proximo" onClick={lidarComBotaoProximo}>Próximo</button>
      </div>
      <div className="container-busca">
        <input type="number" id="entrada-id-personagem" placeholder="Buscar persona pelo ID" value={idAtual}
          onChange={(element) => setIdAtual(element.target.value)} />
        <button id="botao-buscar" onClick={lidarComBotaoBuscar}>Buscar</button>
      </div>
    </div>
  );
}

export default NovoComponente;