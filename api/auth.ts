import { LoginCredentials } from "@/types/auth";
import axios from "./axios";
import endpoints from "./endpoints";

export const login = async (credentials: LoginCredentials) => {
  const res = await axios.post(endpoints.auth.login, credentials);
  return res;
};

export const checkAuthentication = async () => {
  const res = await axios.post(endpoints.auth.checkAuthentication);
  return res;
};
