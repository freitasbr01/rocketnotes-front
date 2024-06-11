import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-backend-2z00.onrender.com"
  // baseURL: 'http://localhost:3333'

});