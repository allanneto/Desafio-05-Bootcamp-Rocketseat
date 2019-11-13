import { BrowserRouter, Switch, Route } from "react-router-dom"; // BrowserRouter: permite fazer navegação entre varias paginas mantendo o endereço raiz
import React from "react";
import Main from "./pages/Main";
import Repository from "./pages/Repository";

// exportando um componente que sera a rota de acesso aos componentes

export default function Routes() {
  return (
    <BrowserRouter>
      {/* O Browser routes deve ficar em volta de todos os outros componentes que vamos utilizar as rotas  */}
      <Switch>
        {/* O Switch faz com que so seja chamado 1 rota por vez, pois o react-dom permite chamar mais de 1 rota por vez. */}
        <Route path="/" exact component={Main} />
        {/* O react procura a rota que inicia com o componente, ou seja se tiver 2 rotas com o começo parecido elas irao ter conflito, quando queremos verificar uma condição de igualdade na rotas devemos usar o "exact" antes do componente */}
        <Route path="/repository/:repository" component={Repository} />{" "}
        {/* a propriedade path a rota que sera acessada e a prop. component se refere ao arquivo importado */}
        {/* O Route ira representar cada rota da aplicação */}
      </Switch>
    </BrowserRouter>
  );
}
