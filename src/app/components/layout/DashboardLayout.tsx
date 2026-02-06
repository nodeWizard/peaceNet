import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  Bot, 
  Stethoscope, 
  Puzzle, 
  User, 
  LogOut,
  Menu
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/app/home' },
  { icon: Users, label: 'Community', path: '/app/community' },
  { icon: BookOpen, label: 'Education', path: '/app/education' },
  { icon: Bot, label: 'AI Support', path: '/app/ai-support' },
  { icon: Stethoscope, label: 'Experts', path: '/app/experts' },
  { icon: Puzzle, label: 'Extension', path: '/app/extension' },
  { icon: User, label: 'Profile', path: '/app/profile' },
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-stone-200 h-full p-4 fixed left-0 top-0 z-20">
        <div className="flex items-center gap-3 px-4 py-4 mb-6">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-stone-900 tracking-tight">PeaceNet</span>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-emerald-50 text-emerald-700 font-medium shadow-sm" 
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-emerald-600" : "text-stone-400 group-hover:text-stone-600")} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-stone-100 pt-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-8 overflow-y-auto h-full">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
           <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-50 px-4 py-2 flex justify-between items-center safe-area-bottom shadow-lg">
        {NAV_ITEMS.slice(0, 5).map((item) => {
           const isActive = location.pathname === item.path;
           return (
            <NavLink
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all",
                isActive ? "text-emerald-600" : "text-stone-400"
              )}
            >
              <div className={clsx("p-1.5 rounded-full", isActive && "bg-emerald-50")}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            </NavLink>
           )
        })}
        {/* Mobile More Menu (Profile/Extension hidden in main view) */}
        <NavLink
            to="/app/profile"
             className={clsx(
                "flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all",
                location.pathname === '/app/profile' ? "text-emerald-600" : "text-stone-400"
              )}
        >
             <User className="w-6 h-6" />
             <span className="text-[10px] font-medium mt-0.5">Profile</span>
        </NavLink>
      </div>
    </div>
  );
}
