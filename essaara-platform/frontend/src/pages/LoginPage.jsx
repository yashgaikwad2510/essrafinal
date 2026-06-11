import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/profile');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <main className="w-full bg-[#FDFBF7] min-h-[80vh] flex items-center justify-center py-16 px-6">
      <div className="max-w-md w-full bg-white p-8 md:p-10 border border-neutral-200/60 shadow-sm rounded-sm text-center">
        <h1 className="font-serif text-3xl text-essaara-earth mb-2">Welcome Back</h1>
        <p className="font-sans text-xs text-neutral-500 tracking-widest uppercase mb-8">Sign in to your account</p>
        
        {error && (
          <div className="bg-red-50 text-red-700 text-xs p-3 mb-6 border border-red-100 rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-neutral-300 p-3 text-sm focus:outline-hidden focus:border-essaara-earth bg-neutral-50"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-neutral-300 p-3 text-sm focus:outline-hidden focus:border-essaara-earth bg-neutral-50"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-essaara-earth text-white font-sans text-xs font-bold uppercase tracking-widest py-4 mt-2 hover:bg-essaara-gold transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-xs text-neutral-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-essaara-earth font-bold hover:text-essaara-gold">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
