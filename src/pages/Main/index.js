/* eslint-disable no-undef */
import React, { Component } from "react";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa"; // importando lib de icones do react
import { Link } from "react-router-dom"; // importando Link que ira substituir a tag "a" e isso nao ira recarregar a pagina.

import Container from "../../components/Container";
import { Form, SubmitButton, List, Input } from "./styles"; // importando os styled components

import api from "../../services/api";

export default class Main extends Component {
  state = {
    newRepo: "",
    repositories: [],
    loading: false,
    error: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem("repositories");

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados no localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem("repositories", JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    // manipulando o eventro quando o state for alterado
    this.setState({ newRepo: e.target.value });
    e.target.value = "";
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    const { newRepo, repositories } = this.state; // apenas desestruturação

    try {
      const response = await api.get(`/repos/${newRepo}`); // linkando a baseurl que definimos no arquivo api

      const storage = JSON.parse(localStorage.getItem("repositories"));

      if (storage.find(obj => obj.name === newRepo)) {
        throw new Error(" Repositorio duplicado");
      }

      const data = {
        // criando um objeto que vai armazenar temporariamente as informacoes do repositorio pesquisado
        name: response.data.full_name,
      };

      this.setState({
        // aqui estamos recriando o repositories em state e atribuindo um novo valor no final.
        repositories: [...repositories, data],
        newRepo: "",
        loading: false,
        error: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositorios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <Input
            error={error}
            type="text"
            placeholder="Adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              {/* O Link funciona como uma tag "a" do html, o "to" faz o mesmo papel do "href", estamos enviando a rota que iremos acessar e tbm o nome do repositorio, o encodeComponentURI faz com que os caracteres especiais sejam substituidos pelos seus codigos. */}
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
