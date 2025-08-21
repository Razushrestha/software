
"use client";

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'student', label: 'Student' },
  { value: 'partner', label: 'Partner' },
  { value: 'school', label: 'School' },
];

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      router.push(`/${role}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 px-4">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-10 border border-blue-100">
        <div className="flex flex-col items-center mb-8">
          <div className="mb-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_1_1)"/>
              <path d="M12 7a2 2 0 110 4 2 2 0 010-4zm0 6c-2.21 0-4 1.343-4 3v1h8v-1c0-1.657-1.79-3-4-3z" fill="#fff"/>
              <defs>
                <linearGradient id="paint0_linear_1_1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6"/>
                  <stop offset="1" stopColor="#ec4899"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm" placeholder="Email address" required />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-400 font-medium shadow-sm" placeholder="Password" required />
          </div>
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">Role</label>
            <select
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 font-medium shadow-sm"
              required
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-bold py-2.5 rounded-lg shadow-md transition-all text-lg tracking-wide">Sign In</button>
        </form>
        <p className="mt-8 text-center text-base text-gray-700 font-medium">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-bold">Register</a>
        </p>
      </div>
    </div>
  );
}
