import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    navigate('/app/home');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
       <Link to="/" className="mb-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
          <span className="text-xl font-bold tracking-tight text-stone-900">PeaceNet</span>
       </Link>

       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10"
       >
          <div className="text-center mb-8">
             <h1 className="text-2xl font-bold text-stone-900 mb-2">
                {isLogin ? 'Welcome back' : 'Join the community'}
             </h1>
             <p className="text-stone-500">
                {isLogin ? 'Sign in to access your safe space.' : 'Create an anonymous account to get support.'}
             </p>
          </div>

          <div className="flex bg-stone-100 p-1 rounded-xl mb-8">
             <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
             >
                Log In
             </button>
             <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500 hover:text-stone-700'}`}
             >
                Sign Up
             </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="you@example.com"
                  required 
                />
             </div>
             
             <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  placeholder="••••••••"
                  required 
                />
             </div>

             <button 
               type="submit"
               className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
             >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
             </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-100 text-center">
             <button 
               onClick={() => navigate('/app/home')}
               className="text-sm text-stone-500 hover:text-emerald-600 font-medium"
             >
                Continue as Guest
             </button>
          </div>

          <div className="mt-8 bg-emerald-50 rounded-xl p-4 flex gap-3 items-start">
             <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
             <p className="text-xs text-emerald-800 leading-relaxed">
                Your privacy is our priority. We use end-to-end encryption and will never sell your personal data.
             </p>
          </div>
       </motion.div>
    </div>
  );
}
