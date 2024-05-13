// Dentro desse arquivo vamos deixar as configurações do axios para facilitar o nosso trabalho.

import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-backend-2z00.onrender.com"
});