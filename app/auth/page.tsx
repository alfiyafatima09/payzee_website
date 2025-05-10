'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafbfc] p-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {/* Tabs */}
        <div className="flex mb-6 bg-[#fafafa] rounded-xl overflow-hidden border border-gray-100">
          <button
            className={`flex-1 py-3 text-lg font-medium transition-all ${
              isLogin
                ? 'bg-white shadow text-black'
                : 'bg-[#fafafa] text-gray-500'
            }`}
            style={{ boxShadow: isLogin ? '0 2px 8px 0 rgba(0,0,0,0.04)' : 'none', color: isLogin ? '#03bf62' : undefined }}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-lg font-medium transition-all ${
              !isLogin
                ? 'bg-white shadow text-black'
                : 'bg-[#fafafa] text-gray-500'
            }`}
            style={{ boxShadow: !isLogin ? '0 2px 8px 0 rgba(0,0,0,0.04)' : 'none', color: !isLogin ? '#03bf62' : undefined }}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Sign Up
          </button>
        </div>
        {/* Header */}
        <h2 className="text-2xl font-bold mb-1">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <p className="mb-6 text-gray-500 text-base">
          {isLogin
            ? 'Enter your credentials to access your account'
            : 'Create your account to get started'}
        </p>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#03bf62] bg-white shadow-sm"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#03bf62] bg-white shadow-sm"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder=""
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#03bf62] bg-white shadow-sm pr-12"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#03bf62] hover:bg-green-700 text-white font-semibold rounded-lg py-3 text-lg shadow transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        {/* Bottom link */}
        <div className="mt-7 text-center text-gray-500 text-base">
          {isLogin ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                className="text-[#03bf62] font-medium hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="text-[#03bf62] font-medium hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 