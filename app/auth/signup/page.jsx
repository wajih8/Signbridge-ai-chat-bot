"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', userType: 'mother_child' });
  const [hala, setHala] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setHala(data);
    
    if(res.ok) router.push('/auth/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#131314] relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 opacity-50"></div>

      <div className="auth-glass p-8 rounded-2xl w-full max-w-md z-10">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
           <p className="text-gray-500">Choose your assistant type.</p>
        </div>
        


        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Username" required className="w-full bg-[#0b0b0c] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" onChange={(e) => setFormData({...formData, username: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full bg-[#0b0b0c] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full bg-[#0b0b0c] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 focus:outline-none" onChange={(e) => setFormData({...formData, password: e.target.value})} />

          <div className="pt-2">
            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">I am a:</label>
            <div className="relative">
              <select className="w-full appearance-none bg-[#1e1f20] border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none"
                onChange={(e) => setFormData({...formData, userType: e.target.value})}>
                <option value="mother_child">Mother (Understanding Child)</option>
                <option value="deaf_helper">Deaf Person (Seeking Help)</option>
                <option value="autism_parent">Parent (Autistic Child)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-opacity mt-4">
            Get Started
          </button>
          
        </form>
<p>{hala?.message}</p>
        <div className="mt-6 text-center text-sm text-gray-500">
          Existing user? <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 ml-1">Sign In</Link>
        </div>
      </div>
    </div>
  );
}