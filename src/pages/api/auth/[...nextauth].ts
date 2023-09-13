// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "@/ts/interfaces";


export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password",  type: "password" },
      },
      //@ts-ignore
      authorize: async (credentials) => {
        try {
          const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
            "https://dummyjson.com/auth/login",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );
          const responseData: ApiResponse = response.data;
            
          const user = responseData;
          
          if (user) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Login error:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
});
