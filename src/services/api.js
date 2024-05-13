// Dentro desse arquivo vamos deixar as configurações do axios para facilitar o nosso trabalho.

import axios from "axios";

export const api = axios.create({
  baseURL: 'http://localhost:3333'
});