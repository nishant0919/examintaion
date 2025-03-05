"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/start" });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-white mb-6">
          Register your Account
        </h1>
        <p className="text-gray-400 mb-6">Sign in to continue</p>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-900 flex items-center justify-center gap-2 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-200"
          disabled={loading}
        >
          <FcGoogle className="text-2xl" />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
