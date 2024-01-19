import axios from "axios";
export const Axios = axios.create({
  baseURL: "https://techcon.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    credentials: "include",
  },
});

// https://cyan-sheep-belt.cyclic.app https://techcon.cyclic.app 
