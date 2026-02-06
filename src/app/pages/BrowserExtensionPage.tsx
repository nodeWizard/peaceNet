import React from 'react';
import { motion } from 'motion/react';
import { Shield, EyeOff, Sliders, Check, Download, AlertTriangle, FileArchive } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

export function BrowserExtensionPage() {
  
  const handleDownload = () => {
     // Create a dummy blob to simulate a zip file
     const content = "This is a placeholder for the PeaceNet Browser Extension.";
     const blob = new Blob([content], { type: 'application/zip' });
     const url = URL.createObjectURL(blob);
     
     const a = document.createElement('a');
     a.href = url;
     a.download = "PeaceNet_Plugin.zip";
     document.body.appendChild(a);
     a.click();
     
     document.body.removeChild(a);
     URL.revokeObjectURL(url);

     toast.success("Download started: PeaceNet_Plugin.zip");
  };

  return (
    <div className="space-y-8">
      <div className="bg-stone-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden md:block">
            <ImageWithFallback 
               src="https://images.unsplash.com/photo-1684610527413-66eec7828690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMG5ldHdvcmt8ZW58MXx8fHwxNzcwMzk0MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
               alt="Extension Banner"
               className="w-full h-full object-cover"
            />
         </div>
         <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wide mb-6">
               <span className="w-2 h-2 rounded-full bg-emerald-400" />
               V 2.0 Available Now
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Make the internet safe again.</h1>
            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
               The PeaceNet browser extension automatically detects and blurs harmful language, giving you control over what you see on social media.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <button 
                  onClick={handleDownload}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
               >
                  <Download className="w-5 h-5" /> Install for Chrome
               </button>
               <button className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                  Watch Demo
               </button>
            </div>
            <p className="text-xs text-stone-400 mt-4 flex items-center gap-1">
               <FileArchive className="w-3 h-3" /> Downloads as PeaceNet_Plugin.zip
            </p>
         </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">How it works</h2>
            <div className="space-y-6">
               {[
                  { icon: EyeOff, title: 'Real-time Blurring', desc: 'Advanced AI scans your feed and instantly blurs toxic comments before you read them.' },
                  { icon: Sliders, title: 'Customizable Filters', desc: 'Choose your sensitivity level. Block everything or just specific keywords.' },
                  { icon: Shield, title: 'Privacy First', desc: 'All processing happens locally on your device. No data is sent to the cloud.' }
               ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                        <item.icon className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="font-bold text-stone-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-stone-50 p-8 rounded-3xl border border-stone-100 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-sm mb-6 text-left">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full" />
                  <div>
                     <div className="w-24 h-4 bg-stone-200 rounded mb-1" />
                     <div className="w-16 h-3 bg-stone-100 rounded" />
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="w-full h-4 bg-stone-100 rounded" />
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-400 text-sm">
                     <AlertTriangle className="w-4 h-4" />
                     <span className="italic blur-sm select-none">You are a complete idiot and...</span>
                  </div>
                  <div className="w-3/4 h-4 bg-stone-100 rounded" />
               </div>
            </div>
            <h3 className="font-bold text-stone-900 mb-2">See the difference?</h3>
            <p className="text-stone-500 text-sm max-w-xs">Toxic content is identified and obscured instantly, protecting your peace of mind.</p>
         </div>
      </div>
    </div>
  );
}
