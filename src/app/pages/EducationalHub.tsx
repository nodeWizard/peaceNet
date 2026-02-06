import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, Video, FileText, ArrowRight, Play, CheckCircle, ChevronLeft, ChevronRight, Award, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { clsx } from 'clsx';
import { toast } from 'sonner';

// --- Types & Mock Data ---

type Resource = {
  id: number;
  type: 'Article' | 'Video' | 'Guide';
  title: string;
  author: string;
  readTime: string;
  category: string;
  image: string | null;
};

type Slide = {
  title: string;
  content: string;
  image?: string;
};

type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

type Chapter = {
  id: number;
  title: string;
  duration: string;
  slides: Slide[];
  quiz: QuizQuestion;
};

type Module = {
  id: number;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  totalChapters: number;
  chapters: Chapter[];
  image: string;
};

const MODULES: Module[] = [
  {
    id: 1,
    title: 'Digital Citizenship 101',
    description: 'Learn the fundamentals of being a responsible and safe digital citizen.',
    level: 'Beginner',
    progress: 0,
    totalChapters: 3,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    chapters: [
      {
        id: 101,
        title: 'Understanding Digital Footprints',
        duration: '5 min',
        slides: [
          { title: 'What is a Digital Footprint?', content: 'Every interaction you have online leaves a trace. This includes posts, comments, likes, and even browsing history.' },
          { title: 'Active vs. Passive', content: 'Active footprints are what you intentionally share. Passive footprints are collected without your direct knowledge, like IP addresses.' },
          { title: 'Why it Matters', content: 'Your digital footprint can affect your reputation, future job prospects, and personal security.' }
        ],
        quiz: {
          question: 'Which of the following is an example of an "Active" digital footprint?',
          options: ['Your IP address', 'A comment you posted on a video', 'Your search history', 'Cookies saved by a website'],
          correctIndex: 1
        }
      },
      {
        id: 102,
        title: 'The Psychology of Online Interactions',
        duration: '7 min',
        slides: [
          { title: 'The Disinhibition Effect', content: 'People often say things online they wouldn\'t say in person because they feel anonymous and detached.' },
          { title: 'Empathy Deficit', content: 'Without facial expressions and tone of voice, it is harder to empathize with others online.' }
        ],
        quiz: {
          question: 'What is the "Online Disinhibition Effect"?',
          options: ['Feeling shy online', 'Acting with less restraint online than in person', 'Being addicted to social media', 'Forgetting passwords'],
          correctIndex: 1
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Countering Hate Speech',
    description: 'Strategies to identify, report, and de-escalate hateful content.',
    level: 'Intermediate',
    progress: 0,
    totalChapters: 4,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
    chapters: []
  }
];

const RESOURCES: Resource[] = [
  {
    id: 1,
    type: 'Article',
    title: 'Understanding Cyberbullying: A Guide for Parents and Teens',
    author: 'Dr. Sarah Jenkins',
    readTime: '5 min read',
    category: 'Research',
    image: 'https://images.unsplash.com/photo-1516042438821-0abd7a73c4b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwc3R1ZHlpbmclMjBwZWFjZWZ1bCUyMGxpYnJhcnl8ZW58MXx8fHwxNzcwMzgyNDk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    type: 'Video',
    title: 'How to Respond to Hate Speech Online',
    author: 'Digital Peace Initiative',
    readTime: '10 min watch',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1616133321649-d29ebc595799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBncmVlbiUyMHNvZnQlMjBsaWdodHxlbnwxfHx8fDE3NzAzODI0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    type: 'Guide',
    title: 'Setting Boundaries on Social Media',
    author: 'Wellness Collective',
    readTime: '3 min read',
    category: 'Self-Care',
    image: null
  },
];

// --- Components ---

function ModuleCard({ module, onClick }: { module: Module; onClick: () => void }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="h-40 overflow-hidden relative">
        <ImageWithFallback src={module.image} alt={module.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-stone-900">
           {module.level}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-stone-900 mb-2">{module.title}</h3>
        <p className="text-sm text-stone-500 mb-4 line-clamp-2">{module.description}</p>
        <div className="flex items-center justify-between text-xs text-stone-400">
           <span>{module.totalChapters} Chapters</span>
           <span className="flex items-center gap-1 text-emerald-600 font-medium">
             Start Learning <ArrowRight className="w-3 h-3" />
           </span>
        </div>
        {/* Progress Bar */}
        <div className="mt-4 w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
           <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${module.progress}%` }} />
        </div>
      </div>
    </motion.div>
  );
}

function ChapterPlayer({ chapter, onClose, onComplete }: { chapter: Chapter; onClose: () => void; onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const totalSlides = chapter.slides.length;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(curr => curr + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrev = () => {
    if (showQuiz) {
       setShowQuiz(false);
    } else if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  const handleQuizSubmit = () => {
     if (selectedOption === chapter.quiz.correctIndex) {
        setIsCorrect(true);
        toast.success("Correct! Well done.");
        setTimeout(() => {
           onComplete();
        }, 1500);
     } else {
        setIsCorrect(false);
        toast.error("Not quite. Try again!");
     }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-md p-4">
       <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="bg-white w-full max-w-4xl h-[600px] rounded-3xl shadow-2xl flex overflow-hidden relative"
       >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors">
             <X className="w-5 h-5 text-stone-600" />
          </button>

          {/* Sidebar Navigation (optional for larger screens) */}
          <div className="hidden md:flex flex-col w-64 bg-stone-50 border-r border-stone-100 p-6">
             <h3 className="font-bold text-stone-900 mb-6">{chapter.title}</h3>
             <div className="space-y-2">
                {chapter.slides.map((_, idx) => (
                   <div key={idx} className={clsx("flex items-center gap-3 p-2 rounded-lg text-sm", currentSlide === idx && !showQuiz ? "bg-white shadow-sm text-emerald-600 font-medium" : "text-stone-500")}>
                      <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-xs", currentSlide === idx && !showQuiz ? "bg-emerald-100" : "bg-stone-200")}>
                         {idx + 1}
                      </div>
                      <span>Part {idx + 1}</span>
                   </div>
                ))}
                <div className={clsx("flex items-center gap-3 p-2 rounded-lg text-sm", showQuiz ? "bg-white shadow-sm text-emerald-600 font-medium" : "text-stone-500")}>
                   <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-xs", showQuiz ? "bg-emerald-100" : "bg-stone-200")}>
                      <Award className="w-3 h-3" />
                   </div>
                   <span>Quiz</span>
                </div>
             </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col p-8 md:p-12 relative">
             <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
                <AnimatePresence mode='wait'>
                   {!showQuiz ? (
                      <motion.div 
                         key={currentSlide}
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x: -20 }}
                         className="space-y-6"
                      >
                         <span className="text-emerald-600 font-bold tracking-wide uppercase text-sm">Part {currentSlide + 1} of {totalSlides}</span>
                         <h2 className="text-3xl md:text-4xl font-bold text-stone-900">{chapter.slides[currentSlide].title}</h2>
                         <p className="text-lg text-stone-600 leading-relaxed">{chapter.slides[currentSlide].content}</p>
                      </motion.div>
                   ) : (
                      <motion.div 
                         key="quiz"
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="space-y-8"
                      >
                         <div className="flex items-center gap-3 text-emerald-600 mb-2">
                            <Award className="w-8 h-8" />
                            <h2 className="text-2xl font-bold">Knowledge Check</h2>
                         </div>
                         <h3 className="text-xl font-medium text-stone-900">{chapter.quiz.question}</h3>
                         <div className="space-y-3">
                            {chapter.quiz.options.map((option, idx) => (
                               <button 
                                  key={idx}
                                  onClick={() => { setSelectedOption(idx); setIsCorrect(null); }}
                                  className={clsx(
                                     "w-full p-4 rounded-xl border-2 text-left transition-all",
                                     selectedOption === idx 
                                        ? (isCorrect === true ? "border-emerald-500 bg-emerald-50 text-emerald-900" : (isCorrect === false ? "border-red-500 bg-red-50 text-red-900" : "border-emerald-500 bg-emerald-50 text-stone-900"))
                                        : "border-stone-100 hover:border-emerald-200 bg-white"
                                  )}
                               >
                                  {option}
                               </button>
                            ))}
                         </div>
                         <button 
                            onClick={handleQuizSubmit}
                            disabled={selectedOption === null}
                            className="w-full py-3 bg-stone-900 text-white font-medium rounded-xl hover:bg-stone-800 disabled:opacity-50 transition-all"
                         >
                            Check Answer
                         </button>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>

             {/* Footer Controls */}
             <div className="mt-8 flex items-center justify-between border-t border-stone-100 pt-6">
                <button 
                   onClick={handlePrev}
                   disabled={currentSlide === 0 && !showQuiz}
                   className="flex items-center gap-2 text-stone-500 hover:text-stone-900 disabled:opacity-30 font-medium"
                >
                   <ChevronLeft className="w-5 h-5" /> Previous
                </button>
                
                {!showQuiz && (
                   <div className="flex gap-1">
                      {chapter.slides.map((_, i) => (
                         <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-emerald-600 w-4' : 'bg-stone-200'}`} />
                      ))}
                      <div className="w-2 h-2 rounded-full bg-stone-200" /> {/* Quiz dot */}
                   </div>
                )}

                {!showQuiz && (
                   <button 
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-medium transition-all shadow-sm"
                   >
                      Next <ChevronRight className="w-4 h-4" />
                   </button>
                )}
             </div>
          </div>
       </motion.div>
    </div>
  );
}

export function EducationalHub() {
  const [activeTab, setActiveTab] = useState<'Modules' | 'Resources'>('Modules');
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);

  const handleChapterComplete = () => {
      setActiveChapter(null);
      toast.success("Chapter completed! Progress saved.");
      // In a real app, update progress state here
  };

  return (
    <div className="space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Educational Hub</h1>
          <p className="text-stone-500">Master digital citizenship through interactive modules and expert resources.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-stone-200">
         {['Modules', 'Resources'].map((tab) => (
            <button
               key={tab}
               onClick={() => { setActiveTab(tab as any); setActiveModule(null); }}
               className={clsx(
                  "pb-3 text-sm font-medium transition-all relative",
                  activeTab === tab ? "text-emerald-600" : "text-stone-500 hover:text-stone-800"
               )}
            >
               {tab}
               {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />}
            </button>
         ))}
      </div>

      {activeTab === 'Modules' ? (
        activeModule ? (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <button onClick={() => setActiveModule(null)} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm font-medium">
                 <ChevronLeft className="w-4 h-4" /> Back to Modules
              </button>
              
              <div className="bg-white p-8 rounded-3xl border border-stone-100 flex flex-col md:flex-row gap-8 items-start">
                 <div className="w-full md:w-1/3 aspect-video rounded-2xl overflow-hidden shadow-md">
                    <ImageWithFallback src={activeModule.image} alt={activeModule.title} className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase rounded-lg mb-3">
                       {activeModule.level}
                    </div>
                    <h2 className="text-3xl font-bold text-stone-900 mb-3">{activeModule.title}</h2>
                    <p className="text-stone-600 leading-relaxed mb-6">{activeModule.description}</p>
                    <div className="flex items-center gap-4 text-sm text-stone-500 mb-6">
                       <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {activeModule.chapters.length} Chapters</span>
                       <span className="flex items-center gap-1"><Award className="w-4 h-4" /> Certificate on Completion</span>
                    </div>
                 </div>
              </div>

              <h3 className="text-xl font-bold text-stone-900">Chapters</h3>
              <div className="space-y-4">
                 {activeModule.chapters.length > 0 ? (
                    activeModule.chapters.map((chapter) => (
                       <div key={chapter.id} className="bg-white p-6 rounded-2xl border border-stone-100 flex items-center justify-between hover:border-emerald-200 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                                <Play className="w-4 h-4 ml-0.5" />
                             </div>
                             <div>
                                <h4 className="font-bold text-stone-900">{chapter.title}</h4>
                                <span className="text-xs text-stone-500">{chapter.duration} • Quiz included</span>
                             </div>
                          </div>
                          <button 
                             onClick={() => setActiveChapter(chapter)}
                             className="px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                          >
                             Start
                          </button>
                       </div>
                    ))
                 ) : (
                    <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-100 border-dashed">
                       <p className="text-stone-400">Content coming soon for this module.</p>
                    </div>
                 )}
              </div>
           </motion.div>
        ) : (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES.map(module => (
                 <ModuleCard key={module.id} module={module} onClick={() => setActiveModule(module)} />
              ))}
           </div>
        )
      ) : (
        /* Resources View (Previous implementation optimized) */
        <div className="space-y-6">
            <div className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
               <Search className="w-5 h-5 text-stone-400" />
               <input type="text" placeholder="Search articles, whitepapers..." className="flex-1 bg-transparent outline-none text-stone-800" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {RESOURCES.map((resource) => (
                  <motion.div 
                     key={resource.id}
                     whileHover={{ y: -4 }}
                     className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                  >
                     {resource.image ? (
                        <div className="h-48 overflow-hidden">
                           <ImageWithFallback src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
                        </div>
                     ) : (
                        <div className="h-48 bg-stone-100 flex items-center justify-center">
                           <FileText className="w-12 h-12 text-stone-300" />
                        </div>
                     )}
                     <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                           <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2 py-1 rounded-md">{resource.category}</span>
                           <span className="text-xs text-stone-400 flex items-center gap-1">
                              {resource.type === 'Video' ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                              {resource.readTime}
                           </span>
                        </div>
                        <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-2">{resource.title}</h3>
                        <p className="text-sm text-stone-500 mb-4">{resource.author}</p>
                        <div className="mt-auto pt-4 border-t border-stone-50">
                           <button className="text-emerald-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                              Read Now <ArrowRight className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
        </div>
      )}

      <AnimatePresence>
         {activeChapter && (
            <ChapterPlayer 
               chapter={activeChapter} 
               onClose={() => setActiveChapter(null)} 
               onComplete={handleChapterComplete}
            />
         )}
      </AnimatePresence>
    </div>
  );
}
