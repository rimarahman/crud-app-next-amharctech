import { Box, Button } from "@radix-ui/themes";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { LoginFormData } from "@/ts/interfaces";

function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    errorMessage: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const userData = {
      email: formData.email,
      password: formData.password,
    };
    

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: userData.email,
        password: userData.password,
      });
      

      if (result?.error) {
        console.error("Login error:", result.error);
      } else {
        router.push("/userNotes");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Box className="bg-white flex items-center justify-center h-screen">
      <Box className="w-2/6 shadow-lg p-9 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {formData.errorMessage && (
            <Box className="text-red-500 mb-4">{formData.errorMessage}</Box>
          )}
          <Box className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-gray-300 border p-2 rounded-lg focus:ring focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </Box>
          <Box className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border-gray-300 border p-2 rounded-lg focus:ring focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </Box>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Login
          </Button>
        </form>
        <Box className="mt-4">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signUp" legacyBehavior>
              <a className="text-blue-500">Sign up</a>
            </Link>
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
