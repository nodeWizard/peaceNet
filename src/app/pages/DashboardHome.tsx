import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { EyeOff, MessageCircle, Bot, Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-stone-900 mb-2">Good morning, Guest</h1>
           <p className="text-stone-500">You are safe here. How are you feeling today?</p>
        </div>
        <div className="flex gap-2">
           <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
           <span className="text-sm font-medium text-emerald-700">Community is active</span>
        </div>
      </header>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
            { icon: EyeOff, label: 'Blur Content', sub: 'Activate extension', color: 'bg-indigo-50 text-indigo-600', link: '/app/extension' },
            { icon: Bot, label: 'Chat with AI', sub: 'Get immediate help', color: 'bg-emerald-50 text-emerald-600', link: '/app/ai-support' },
            { icon: MessageCircle, label: 'Share Story', sub: 'Post anonymously', color: 'bg-orange-50 text-orange-600', link: '/app/community' },
            { icon: Calendar, label: 'Book Expert', sub: 'Free consultation', color: 'bg-blue-50 text-blue-600', link: '/app/experts' },
         ].map((action, i) => (
            <Link key={i} to={action.link}>
               <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all h-full"
               >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${action.color}`}>
                     <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-stone-900">{action.label}</h3>
                  <p className="text-sm text-stone-400">{action.sub}</p>
               </motion.div>
            </Link>
         ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
         {/* Featured Article / Daily Tip */}
         <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-stone-900">Recommended for you</h2>
            <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm flex flex-col md:flex-row">
               <div className="md:w-1/3 relative h-48 md:h-auto">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1516042438821-0abd7a73c4b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwc3R1ZHlpbmclMjBwZWFjZWZ1bCUyMGxpYnJhcnl8ZW58MXx8fHwxNzcwMzgyNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Reading"
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-600 uppercase tracking-wide">
                     <BookOpen className="w-4 h-4" />
                     Digital Wellness
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">Understanding the psychology of trolls</h3>
                  <p className="text-stone-500 mb-6 line-clamp-2">
                     Learn why people spread hate online and how you can protect your mental health by disengaging effectively.
                  </p>
                  <Link to="/app/education" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700">
                     Read Article <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
               <div className="bg-emerald-900 rounded-3xl p-6 text-white relative overflow-hidden">
                  <div className="relative z-10">
                     <h3 className="font-bold text-lg mb-2">Daily Affirmation</h3>
                     <p className="text-emerald-100 italic">"I have the right to exist in digital spaces without fear. My voice matters."</p>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-800 rounded-full blur-2xl -mr-10 -mt-10" />
               </div>
               <div className="bg-white rounded-3xl p-6 border border-stone-100">
                  <h3 className="font-bold text-lg mb-4 text-stone-900">Community Pulse</h3>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500">Supportive reactions</span>
                        <span className="font-bold text-stone-900">1,240</span>
                     </div>
                     <div className="w-full bg-stone-100 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full w-[75%]" />
                     </div>
                     <p className="text-xs text-stone-400 pt-1">Today's goal reached!</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar / Recent Activity */}
         <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold text-stone-900">Recent Activity</h2>
               <Link to="/app/community" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">View all</Link>
            </div>
            
            <div className="bg-white rounded-2xl border border-stone-100 p-2 shadow-sm">
               {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 hover:bg-stone-50 rounded-xl transition-colors cursor-pointer border-b last:border-0 border-stone-50">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-stone-400">Anonymous User</span>
                        <span className="text-xs text-stone-300">2h ago</span>
                     </div>
                     <p className="text-sm text-stone-600 line-clamp-2 mb-2">
                        "Just wanted to say thank you to everyone who replied to my post yesterday. It really helped..."
                     </p>
                     <div className="flex gap-2">
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">🙏 Thank you</span>
                        <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">❤️ 24</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
