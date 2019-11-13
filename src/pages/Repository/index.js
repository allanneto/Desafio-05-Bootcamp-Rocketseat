/* eslint-disable react/static-property-placement */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Container from "../../components/Container";
import {
  Loading,
  Owner,
  IssueList,
  Filter,
  Pages,
  OptButton,
  PageButton,
} from "./styles";

// como vamos utilizar state e a função componentDidMount precisamo que esse component seja uma classe.
export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    options: ["all", "open", "closed"],
    select: "open",
    list: 1,
  };

  async componentDidMount() {
    // estamos desestruturando a prop match para poder acessar os parametros enviados pela URL
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    this.setState({ repository: repoName });

    this.handleRequest();

    // esse codigo gigante abaixo foi substituido pela função handleRequest!

    // const response =  await api.get(`/repos/${repoName}`)
    // const response =  await api.get(`/repos/${repoName}/issues`)
    // // quando formos utilizar mais de uma requisição que nao necessariamente precisar aguardar a outra para ser feita podemos utilizar Promise.all

    // const [repository, issues] = await Promise.all([
    //   // estamos desestruturando os 2 itens
    //   // aqui iremos passar todas as chamadas que quermos aguardar
    //   api.get(`/repos/${repoName}`),
    //   api.get(`/repos/${repoName}/issues`, {
    //     // estamos passando uma segunda propriedade que ira se referir aos parametros da url
    //     params: {
    //       state: select,
    //       per_page: 5,
    //     },
    //   }),
    // ]);
    // // so ira avançar o codigo quando a execução dessas 2 requisições forem finalizadas.

    // this.setState({
    //   repository: repository.data,
    //   issues: issues.data,
    //   loading: false,
    // });
  }

  async handleRequest() {
    const { match } = this.props;

    const { select, list } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues, issuesLength] = await Promise.all([
      // estamos desestruturando os 2 itens
      // aqui iremos passar todas as chamadas que quermos aguardar
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        // estamos passando uma segunda propriedade que ira se referir aos parametros da url
        params: {
          state: select,
          page: list,
          per_page: 5,
        },
      }),
      api.get(`/repos/${repoName}/issues`, {
        // estamos passando uma segunda propriedade que ira se referir aos parametros da url
        params: {
          state: select,
        },
      }),
    ]);
    // so ira avançar o codigo quando a execução dessas 2 requisições forem finalizadas.

    this.setState({
      repository: repository.data,
      issues: issues.data,
      total: issuesLength.data,
      loading: false,
    });
  }

  async handleChange(opt) {
    await this.setState({ select: opt, list: 1 });

    this.handleRequest();
  }

  async handleNext() {
    const { list } = this.state;

    await this.setState({ list: list + 1 });

    this.handleRequest();
  }

  async handlePrevious() {
    const { list } = this.state;

    await this.setState({ list: list - 1 });

    this.handleRequest();
  }

  render() {
    const { repository, issues, loading, options, list, select } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositorios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          {options.map(opt => (
            <OptButton
              opt={opt}
              selected={select}
              type="button"
              onClick={() => this.handleChange(opt)}
            >
              <span>{opt}</span>
            </OptButton>
          ))}
        </Filter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Pages>
          <PageButton page={list} onClick={() => this.handlePrevious()}>
            <span>Página anterior</span>
          </PageButton>
          <PageButton onClick={() => this.handleNext()}>
            <span>Próxima página</span>
          </PageButton>
        </Pages>
      </Container>
    );
  }
}
