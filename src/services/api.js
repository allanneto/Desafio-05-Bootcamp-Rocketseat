import axios from "axios";

const api = axios.create({
  // estamos usando o axios para criar uma variavel onde iremos definir uma URL padrao que podemos usar nas requisições.
  baseURL: "https://api.github.com",
});

export default api;
