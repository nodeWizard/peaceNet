import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Clock, Calendar as CalendarIcon, ShieldCheck, MapPin, Video, CheckCircle, X, ChevronLeft, ChevronRight, Link as LinkIcon } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { clsx } from 'clsx';
import { toast } from 'sonner';

// --- Mock Data ---

type Expert = {
  id: number;
  name: string;
  role: string;
  specialties: string[];
  rating: number;
  reviews: number;
  about: string;
  image: string | null;
  availability: string[]; // Days available
};

type Appointment = {
  id: number;
  expertId: number;
  expertName: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed';
  meetLink: string;
};

const EXPERTS: Expert[] = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    role: 'Clinical Psychologist',
    specialties: ['Cyberbullying Trauma', 'Anxiety', 'Teen Psychology'],
    rating: 4.9,
    reviews: 124,
    about: 'Dr. Chen has over 10 years of experience helping young adults navigate the complexities of digital life and mental health.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    availability: ['Mon', 'Tue', 'Thu']
  },
  {
    id: 2,
    name: 'Mark Johnson',
    role: 'Digital Safety Consultant',
    specialty: ['Online Privacy', 'Security Audits', 'Harassment Reporting'],
    specialties: ['Online Privacy', 'Security Audits', 'Harassment Reporting'],
    rating: 4.8,
    reviews: 89,
    about: 'Former tech safety officer helping individuals secure their digital footprint and report harassment effectively.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    availability: ['Wed', 'Fri']
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'Conflict Mediator',
    specialties: ['Restorative Justice', 'Conflict Resolution', 'Peer Support'],
    rating: 5.0,
    reviews: 56,
    about: 'Specializes in mediating online conflicts and fostering understanding between parties.',
    image: null,
    availability: ['Mon', 'Fri']
  }
];

// --- Components ---

function BookingCalendar({ expert, onConfirm, onCancel }: { expert: Expert, onConfirm: (date: string, time: string) => void, onCancel: () => void }) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Mock calendar days
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      fullDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  const timeSlots = ['09:00 AM', '10:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl max-w-md w-full relative">
       <button onClick={onCancel} className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full text-stone-500">
          <X className="w-5 h-5" />
       </button>
       
       <h3 className="text-xl font-bold text-stone-900 mb-1">Book a Session</h3>
       <p className="text-sm text-stone-500 mb-6">with {expert.name}</p>

       <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-3">Select Date</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             {days.map((d, i) => (
                <button 
                   key={i}
                   onClick={() => setSelectedDate(i)}
                   className={clsx(
                      "flex flex-col items-center justify-center min-w-[60px] h-20 rounded-xl border transition-all",
                      selectedDate === i 
                         ? "bg-emerald-600 border-emerald-600 text-white shadow-md transform scale-105" 
                         : "bg-white border-stone-200 text-stone-600 hover:border-emerald-300 hover:bg-emerald-50"
                   )}
                >
                   <span className="text-xs font-medium opacity-80">{d.day}</span>
                   <span className="text-lg font-bold">{d.date}</span>
                </button>
             ))}
          </div>
       </div>

       {selectedDate !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
             <label className="block text-sm font-medium text-stone-700 mb-3">Available Times</label>
             <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                   <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={clsx(
                         "py-2 px-3 text-sm font-medium rounded-lg border transition-all",
                         selectedTime === time 
                            ? "bg-emerald-100 border-emerald-500 text-emerald-800" 
                            : "bg-white border-stone-200 text-stone-600 hover:border-emerald-300"
                      )}
                   >
                      {time}
                   </button>
                ))}
             </div>
          </motion.div>
       )}

       <button 
          onClick={() => {
             if (selectedDate !== null && selectedTime) {
                onConfirm(days[selectedDate].fullDate, selectedTime);
             }
          }}
          disabled={selectedDate === null || !selectedTime}
          className="w-full py-3.5 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
       >
          Confirm Booking
       </button>
       <p className="text-xs text-center text-stone-400 mt-3">All sessions are 45 minutes and completely free.</p>
    </div>
  );
}

function SuccessModal({ onClose }: { onClose: () => void }) {
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={onClose}
         />
         <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-sm rounded-3xl p-8 text-center relative z-10 shadow-2xl"
         >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Booking Confirmed!</h2>
            <p className="text-stone-500 mb-8">You're all set. We've sent a calendar invitation to your email.</p>
            <button 
               onClick={onClose}
               className="w-full py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
            >
               View My Appointments
            </button>
         </motion.div>
      </div>
   );
}

export function ExpertConsultation() {
  const [activeTab, setActiveTab] = useState<'Browse' | 'MyAppointments'>('Browse');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // State for appointments
  const [appointments, setAppointments] = useState<Appointment[]>([
     // One mock appointment initially? No, let's start empty or with one past.
  ]);

  const handleBookClick = (expert: Expert) => {
     setSelectedExpert(expert);
     setShowCalendar(true);
  };

  const handleConfirmBooking = (date: string, time: string) => {
     if (!selectedExpert) return;

     const newAppt: Appointment = {
        id: Date.now(),
        expertId: selectedExpert.id,
        expertName: selectedExpert.name,
        date,
        time,
        status: 'Upcoming',
        meetLink: 'https://meet.google.com/abc-defg-hij'
     };

     setAppointments(prev => [newAppt, ...prev]);
     setShowCalendar(false);
     setShowSuccess(true);
     // Keep selected expert for context if needed, or clear it
  };

  const handleSuccessClose = () => {
     setShowSuccess(false);
     setSelectedExpert(null);
     setActiveTab('MyAppointments');
  };

  return (
    <div className="space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
         <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-2">Expert Consultation</h1>
            <p className="text-stone-500">Professional support, completely free and confidential.</p>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-stone-100 rounded-xl w-fit">
         {['Browse', 'MyAppointments'].map((tab) => (
            <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
               )}
            >
               {tab === 'Browse' ? 'Find an Expert' : 'My Appointments'}
            </button>
         ))}
      </div>

      {activeTab === 'Browse' ? (
         <div className="grid lg:grid-cols-2 gap-6">
            {EXPERTS.map((expert) => (
               <motion.div 
                  key={expert.id}
                  layout
                  className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6"
               >
                  <div className="w-24 h-24 rounded-2xl bg-stone-100 flex-shrink-0 overflow-hidden">
                     {expert.image ? (
                        <ImageWithFallback src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-600 font-bold text-2xl">
                           {expert.name.charAt(0)}
                        </div>
                     )}
                  </div>
                  
                  <div className="flex-1">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <h3 className="text-lg font-bold text-stone-900">{expert.name}</h3>
                           <p className="text-emerald-600 font-medium text-sm">{expert.role}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                           <Star className="w-3 h-3 text-yellow-500 fill-current" />
                           <span className="text-xs font-bold text-yellow-700">{expert.rating}</span>
                        </div>
                     </div>
                     
                     <div className="flex flex-wrap gap-2 mb-4">
                        {expert.specialties.map(tag => (
                           <span key={tag} className="px-2 py-1 bg-stone-50 text-stone-600 text-xs rounded-md border border-stone-100">
                              {tag}
                           </span>
                        ))}
                     </div>

                     <button 
                        onClick={() => handleBookClick(expert)}
                        className="w-full py-2.5 bg-stone-900 text-white text-sm font-medium rounded-xl hover:bg-stone-800 transition-colors shadow-sm"
                     >
                        Check Availability
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>
      ) : (
         <div className="max-w-3xl">
            {appointments.length > 0 ? (
               <div className="space-y-4">
                  {appointments.map((apt) => (
                     <div key={apt.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                              <CalendarIcon className="w-6 h-6" />
                           </div>
                           <div>
                              <h4 className="font-bold text-stone-900">{apt.expertName}</h4>
                              <p className="text-sm text-stone-500">{apt.date} • {apt.time}</p>
                           </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                              {apt.status}
                           </span>
                           <a 
                              href={apt.meetLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm"
                           >
                              <Video className="w-4 h-4" />
                              Join Meet
                           </a>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="text-center py-16 bg-stone-50 rounded-3xl border border-stone-100 border-dashed">
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <CalendarIcon className="w-8 h-8 text-stone-400" />
                  </div>
                  <h3 className="font-bold text-stone-900 mb-1">No appointments yet</h3>
                  <p className="text-stone-500 mb-6">Book a free session with one of our experts.</p>
                  <button 
                     onClick={() => setActiveTab('Browse')}
                     className="px-6 py-2.5 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 transition-colors"
                  >
                     Find an Expert
                  </button>
               </div>
            )}
         </div>
      )}

      {/* Booking Modal Overlay */}
      <AnimatePresence>
         {showCalendar && selectedExpert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
                  onClick={() => setShowCalendar(false)}
               />
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative z-10"
               >
                  <BookingCalendar 
                     expert={selectedExpert} 
                     onConfirm={handleConfirmBooking}
                     onCancel={() => setShowCalendar(false)}
                  />
               </motion.div>
            </div>
         )}
      </AnimatePresence>

      <AnimatePresence>
         {showSuccess && <SuccessModal onClose={handleSuccessClose} />}
      </AnimatePresence>
    </div>
  );
}
