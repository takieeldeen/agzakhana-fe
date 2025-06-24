import { LoginCredentials } from "@/types/auth";
import axios from "./axios";
import endpoints from "./endpoints";
import { dispatchLogout } from "@/components/store/slices/auth/slice";

export const login = async (credentials: LoginCredentials) => {
  const res = await axios.post(endpoints.auth.login, credentials, {
    withCredentials: true,
  });
  return res;
};
export const logout = async () => {
  await axios
    .post(endpoints.auth.logout, {}, { withCredentials: true })
    .then(() => {
      dispatchLogout();
    });
};

export const checkAuthentication = async () => {
  const res = await axios.post(
    endpoints.auth.checkAuthentication,
    {},
    { withCredentials: true }
  );
  return res;
};
