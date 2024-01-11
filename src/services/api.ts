import axios from 'axios';

let baseUrl = "http://localhost:3333";

if(process.env.NODE_ENV !== 'production'){
  baseUrl = "https://fakestoreapi.com";
}

export const api = axios.create({
  baseURL: baseUrl,
});
