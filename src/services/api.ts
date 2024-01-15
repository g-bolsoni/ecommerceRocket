import axios from 'axios';

// let baseUrl = "http://localhost:3333";
let baseUrl = "https://fakestoreapi.com";

if(process.env.NODE_ENV === 'production'){
  baseUrl = "https://fakestoreapi.com";
}

export const api = axios.create({
  baseURL: baseUrl,
});
