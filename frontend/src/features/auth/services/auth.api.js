import axios from "axios";
import { BASE_URL } from "../../../Api";

const api = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
});

export const Register = async (
  fullname,
  email,
  password,
  contact,
  isSeller,
) => {
  const res = await api.post("/register", {
    fullname,
    email,
    contact,
    isSeller,
    password,
  });
  return res.data;
};
export const Login = async (email, name, password) => {
  const res = await api.post("/login", { email, name, password });
  return res.data;
};
