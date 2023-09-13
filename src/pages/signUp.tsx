// components/SignupForm.tsx
import { Box, Button } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

function SignupForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // You can perform form validation here

    // Prepare the data to send to your server
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      // Send a POST request to your server to create the user
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("User created successfully!");
      } else {
        alert("Error creating user. Please try again.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Box className="bg-white flex items-center justify-center h-screen">
      <Box className="w-2/6 shadow-lg p-9 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <Box className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border-gray-300 border p-2 rounded-lg focus:ring focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </Box>
          <Box className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
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
            Sign Up
          </Button>
        </form>
        <Box className="mt-4">
          <p>
            Do you have an account?{" "}
            <Link href="/login" legacyBehavior>
              <a className="text-blue-500">Login</a>
            </Link>
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default SignupForm;
