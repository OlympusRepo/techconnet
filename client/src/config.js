import axios from "axios";
export const Axios = axios.create({
  baseURL: "https://techcon.cyclic.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    credentials: "include",
  },
});

// https://cyan-sheep-belt.cyclic.app