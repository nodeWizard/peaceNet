import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Heart, Zap, Users, ArrowRight, EyeOff, Globe, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="text-xl font-bold tracking-tight">PeaceNet</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#mission" className="hover:text-emerald-600 transition-colors">Mission</a>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</a>
            <a href="#extension" className="hover:text-emerald-600 transition-colors">Extension</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="hidden md:block text-sm font-medium text-stone-600 hover:text-stone-900">Log in</Link>
            <Link to="/auth" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-full transition-all shadow-sm hover:shadow-md">
              Join the Community
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Building a safer internet
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-stone-900">
              A safer digital space <span className="text-emerald-600">starts with you.</span>
            </h1>
            <p className="text-xl text-stone-600 max-w-lg leading-relaxed">
              Support, education, and community to counter online hate. Join thousands of users building peace in the digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/auth" className="px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Join the Community <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/auth" className="px-8 py-4 bg-white border border-stone-200 hover:border-emerald-200 hover:bg-emerald-50 text-stone-900 font-medium rounded-full transition-all flex items-center justify-center gap-2">
                Download Extension
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10">
               <ImageWithFallback 
                 src="https://images.unsplash.com/photo-1684610527413-66eec7828690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMG5ldHdvcmt8ZW58MXx8fHwxNzcwMzk0MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                 alt="Community Support"
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-stone-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900">Empowering you to take control</h2>
            <p className="text-lg text-stone-500">PeaceNet combines advanced technology with human connection to create a comprehensive support system.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: EyeOff, title: "Blur Hate", desc: "Automatically blur slurs and harmful language across your social feeds." },
              { icon: BookOpen, title: "Learn & Grow", desc: "Understand the psychology of hate speech and how to counter it." },
              { icon: Zap, title: "AI Support", desc: "Get immediate, personalized advice on how to handle difficult situations." },
              { icon: Heart, title: "Connect", desc: "Join a safe, anonymous community of supportive peers and allies." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-stone-50 border border-stone-100 hover:border-emerald-200 transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-stone-900">{feature.title}</h3>
                <p className="text-stone-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browser Extension Highlight */}
      <section id="extension" className="py-24 bg-stone-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
           <ImageWithFallback 
             src="https://images.unsplash.com/photo-1616133321649-d29ebc595799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBncmVlbiUyMHNvZnQlMjBsaWdodHxlbnwxfHx8fDE3NzAzODI0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
             alt="Abstract Background"
             className="w-full h-full object-cover"
           />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Clean up your feed instantly.</h2>
            <p className="text-stone-300 text-lg leading-relaxed">
              Our browser extension works silently in the background to detect and blur harmful language on Twitter, Facebook, and Instagram, giving you the choice to see it or not.
            </p>
            <ul className="space-y-4">
              {['Works on all major social platforms', 'Customizable sensitivity levels', 'Privacy-first: data never leaves your device'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-full transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Add to Chrome — It's Free
            </button>
          </div>
          
          <div className="relative">
             <div className="bg-white rounded-xl shadow-2xl p-4 md:p-6 transform rotate-2 hover:rotate-0 transition-all duration-500">
                {/* Mock Browser Interface */}
                <div className="border-b border-stone-100 pb-4 mb-4 flex items-center gap-2">
                   <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-stone-300" />
                      <div className="w-3 h-3 rounded-full bg-stone-300" />
                      <div className="w-3 h-3 rounded-full bg-stone-300" />
                   </div>
                   <div className="flex-1 bg-stone-100 h-6 rounded-md mx-4" />
                </div>
                {/* Mock Feed Item */}
                <div className="flex gap-4">
                   <div className="w-10 h-10 bg-stone-200 rounded-full flex-shrink-0" />
                   <div className="space-y-3 flex-1">
                      <div className="flex gap-2">
                        <div className="w-24 h-4 bg-stone-200 rounded" />
                        <div className="w-16 h-4 bg-stone-100 rounded" />
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 text-stone-400 italic flex items-center gap-2">
                         <EyeOff className="w-4 h-4" />
                         <span>Content hidden by PeaceNet (Hate Speech detected)</span>
                      </div>
                      <div className="flex gap-4 pt-2">
                         <div className="w-6 h-6 bg-stone-100 rounded" />
                         <div className="w-6 h-6 bg-stone-100 rounded" />
                         <div className="w-6 h-6 bg-stone-100 rounded" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-stone-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
               <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                     <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
                     <span className="text-xl font-bold tracking-tight">PeaceNet</span>
                  </div>
                  <p className="text-stone-500 max-w-sm">
                     Empowering individuals to build a safer, more inclusive digital world through technology and community support.
                  </p>
               </div>
               <div>
                  <h4 className="font-bold text-stone-900 mb-6">Platform</h4>
                  <ul className="space-y-4 text-stone-500 text-sm">
                     <li><a href="#" className="hover:text-emerald-600">Community</a></li>
                     <li><a href="#" className="hover:text-emerald-600">Extension</a></li>
                     <li><a href="#" className="hover:text-emerald-600">Educational Hub</a></li>
                     <li><a href="#" className="hover:text-emerald-600">Expert Help</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-stone-900 mb-6">Company</h4>
                  <ul className="space-y-4 text-stone-500 text-sm">
                     <li><a href="#" className="hover:text-emerald-600">About Us</a></li>
                     <li><a href="#" className="hover:text-emerald-600">Privacy Policy</a></li>
                     <li><a href="#" className="hover:text-emerald-600">Terms of Service</a></li>
                     <li><a href="#" className="hover:text-emerald-600">Contact</a></li>
                  </ul>
               </div>
            </div>
            <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-400">
               <p>© 2024 PeaceNet. All rights reserved.</p>
               <div className="flex gap-6">
                  <a href="#">Twitter</a>
                  <a href="#">Instagram</a>
                  <a href="#">LinkedIn</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
