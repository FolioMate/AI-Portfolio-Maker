"use client";

import React from "react"; // ✅ Import React explicitly
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email.includes("@") || formData.password.length < 6) {
      setError("Invalid email or password must be at least 6 characters.");
      return false;
    }
    if (isSignUp && formData.name.trim() === "") {
      setError("Name cannot be empty.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    setError("");
  
    try {
      let res;
      let data;
  
      if (isSignUp) {
        res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        // ✅ Fix: Check if the response is empty before parsing JSON
        const text = await res.text();
        if (!text) {
          throw new Error("Server returned an empty response.");
        }
  
        data = JSON.parse(text);
  
        if (!res.ok) {
          throw new Error(data.error || "Sign-up failed!");
        }
  
        alert("Account Created Successfully!");
        setIsSignUp(false);
      } else {
        // ✅ Handle Sign-In with NextAuth
        const result = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
  
        if (result?.error) {
          throw new Error("Invalid email or password.");
        }
  
        alert("Logged In Successfully!");
        router.push("/portfolio-builder");
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-gray-700 to-gray-800 px-4">
      <div className="flex-grow flex items-center justify-center">
        <motion.div
          key={isSignUp ? "signup" : "signin"}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-lg"
        >
          <motion.div
            className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold cursor-pointer shadow-md"
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-800 text-center">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-gray-500 text-center mb-4">{isSignUp ? "Sign up to get started" : "Sign in to continue"}</p>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <motion.div
                key="name-input"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required={isSignUp}
                />
              </motion.div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password (Min. 6 chars)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
              disabled={loading}
            >
              {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
            </motion.button>
          </form>

          <p className="mt-4 text-gray-800 text-center">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" className="text-blue-700 font-semibold" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
