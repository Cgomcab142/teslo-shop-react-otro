import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (email: string, password: string, fullname:string):Promise<AuthResponse> => {
  try {
    const {data} = await tesloApi.post("/auth/register", {
      email,
      password,
      fullname
    });

     console.log(data)
     return data;

  } catch (error) {
    console.log(error)
    throw(error);
  }
};
