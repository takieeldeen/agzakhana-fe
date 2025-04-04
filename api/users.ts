import { objectToFormData } from "@/utilis/formdata";
import axios from "./axios";
import endpoints from "./endpoints";

export const inviteUser = async (data: any) => {
  const URL = endpoints.users.invite;
  const formData = objectToFormData(data);
  await axios.post(URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data;",
    },
  });
};
