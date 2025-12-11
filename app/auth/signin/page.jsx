"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 

export default function SignIn() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", { ...data, redirect: false });
    if (res.error) { setError("Invalid credentials."); return; }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#131314] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-50"></div>
      
      <div className="auth-glass p-8 rounded-2xl w-full max-w-md z-10">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
           <p className="text-gray-500">Enter your details to access the AI.</p>
        </div>

        {error && <div className="bg-red-900/20 border border-red-900/50 text-red-200 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</label>
            <input type="email" required
              className="mt-1 w-full bg-[#0b0b0c] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Password</label>
            <input type="password" required
              className="mt-1 w-full bg-[#0b0b0c] border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity mt-4">
            Sign In
          </button>
        </form>
        
        
        <div className="mt-8 text-center text-sm text-gray-500">
          New here? <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 ml-1">Create an account</Link>
        </div>
      </div>
    </div>
  );
}