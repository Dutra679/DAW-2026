import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://my.api.mockaroo.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});
