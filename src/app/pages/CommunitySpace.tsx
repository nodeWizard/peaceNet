import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Heart, Share2, Filter, Plus, X, Flag, ThumbsUp, Shield, Send, User } from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';

// --- Types & Mock Data ---

type Comment = {
  id: number;
  author: string;
  content: string;
  time: string;
};

type Post = {
  id: number;
  author: string; // 'Anonymous' or username
  isAnonymous: boolean;
  category: string;
  content: string;
  tags: string[];
  reactions: { support: number; relate: number };
  comments: Comment[];
  time: string;
  color: string;
};

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    author: 'Anonymous',
    isAnonymous: true,
    category: 'Experience',
    content: "I finally blocked the accounts that were harassing me. It was hard to let go of the need to defend myself, but the silence is so peaceful now. If you're struggling, prioritize your peace.",
    tags: ['Anxiety', 'Healing'],
    reactions: { support: 42, relate: 15 },
    comments: [
       { id: 101, author: 'SafeSpace_User', content: 'So proud of you! That step is huge.', time: '1h ago' },
       { id: 102, author: 'Anonymous', content: 'I needed to hear this today. Thank you.', time: '30m ago' }
    ],
    time: '2 hours ago',
    color: 'bg-emerald-50'
  },
  {
    id: 2,
    author: 'DigitalWarrior',
    isAnonymous: false,
    category: 'Advice',
    content: "Here's a tip: mute words are your best friend on Twitter. I have a list of 50+ words I don't want to see, and my timeline is completely different now.",
    tags: ['Tips', 'Social Media'],
    reactions: { support: 128, relate: 56 },
    comments: [],
    time: '5 hours ago',
    color: 'bg-blue-50'
  }
];

const TAG_COLORS: Record<string, string> = {
   'Anxiety': 'bg-purple-100 text-purple-700',
   'Healing': 'bg-emerald-100 text-emerald-700',
   'Tips': 'bg-blue-100 text-blue-700',
   'Social Media': 'bg-stone-100 text-stone-700',
   'Bullying': 'bg-red-100 text-red-700',
   'Help': 'bg-orange-100 text-orange-700'
};

const CATEGORIES = ['All', 'Experience', 'Advice', 'Resources', 'Support Request'];

export function CommunitySpace() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Post Creation State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Experience');
  const [isAnonymous, setIsAnonymous] = useState(true);
  
  // Commenting State
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: Post = {
       id: Date.now(),
       author: isAnonymous ? 'Anonymous' : 'Guest_User',
       isAnonymous,
       category: newPostCategory,
       content: newPostContent,
       tags: ['New'], // Default tag for now
       reactions: { support: 0, relate: 0 },
       comments: [],
       time: 'Just now',
       color: 'bg-white' // or based on category
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setNewPostContent('');
    toast.success("Your post has been shared.");
  };

  const handleAddComment = (postId: number) => {
     if (!commentInput.trim()) return;

     setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
           return {
              ...post,
              comments: [...post.comments, {
                 id: Date.now(),
                 author: 'You',
                 content: commentInput,
                 time: 'Just now'
              }]
           };
        }
        return post;
     }));
     setCommentInput('');
  };

  const filteredPosts = posts.filter(post => {
     const matchCategory = activeCategory === 'All' || post.category === activeCategory;
     const matchTag = activeTag ? post.tags.includes(activeTag) : true;
     return matchCategory && matchTag;
  });

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Community Space</h1>
          <p className="text-stone-500">A safe place to share, connect, and heal together.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full shadow-md flex items-center gap-2 transition-all"
        >
          <Plus className="w-5 h-5" />
          Share Your Story
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
         <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
               <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                     "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                     activeCategory === cat 
                        ? "bg-stone-900 text-white" 
                        : "bg-white text-stone-500 hover:bg-stone-100 border border-stone-200"
                  )}
               >
                  {cat}
               </button>
            ))}
         </div>
         
         {activeTag && (
            <div className="flex items-center gap-2 text-sm text-stone-500">
               <span>Filtered by tag:</span>
               <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md font-medium flex items-center gap-1">
                  #{activeTag}
                  <button onClick={() => setActiveTag(null)}><X className="w-3 h-3" /></button>
               </span>
            </div>
         )}
      </div>

      {/* Feed */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
           {filteredPosts.map((post) => (
             <motion.div 
               key={post.id}
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className={clsx(
                  "bg-white rounded-2xl border border-stone-100 shadow-sm transition-all flex flex-col overflow-hidden",
                  post.color === 'bg-white' ? 'border-l-4 border-l-emerald-500' : '' // visual indicator for new posts
               )}
             >
               <div className={clsx("p-6 flex-1 flex flex-col", post.color !== 'bg-white' && post.color)}>
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-2">
                        {post.isAnonymous ? (
                           <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center text-stone-500">
                              <Shield className="w-4 h-4" />
                           </div>
                        ) : (
                           <div className="w-8 h-8 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-700">
                              <span className="font-bold text-xs">{post.author.charAt(0)}</span>
                           </div>
                        )}
                        <div>
                           <p className="text-xs font-bold text-stone-700">{post.author}</p>
                           <p className="text-[10px] text-stone-400">{post.time} • {post.category}</p>
                        </div>
                     </div>
                  </div>
                  
                  <p className="text-stone-800 mb-6 leading-relaxed flex-1">
                    "{post.content}"
                  </p>

                  <div className="flex gap-2 mb-4 flex-wrap">
                     {post.tags.map(tag => (
                       <button 
                          key={tag} 
                          onClick={() => setActiveTag(tag)}
                          className={clsx("text-xs px-2 py-1 rounded-md transition-colors", TAG_COLORS[tag] || 'bg-stone-100 text-stone-600 hover:bg-stone-200')}
                       >
                          #{tag}
                       </button>
                     ))}
                  </div>

                  <div className="pt-4 border-t border-stone-900/5 flex items-center justify-between">
                     <div className="flex gap-4">
                        <button className="flex items-center gap-1.5 text-stone-400 hover:text-red-500 transition-colors group">
                           <Heart className="w-4 h-4 group-hover:fill-current" />
                           <span className="text-xs font-medium">{post.reactions.support}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-stone-400 hover:text-emerald-500 transition-colors">
                           <ThumbsUp className="w-4 h-4" />
                           <span className="text-xs font-medium">{post.reactions.relate}</span>
                        </button>
                        <button 
                           onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                           className={clsx("flex items-center gap-1.5 transition-colors", expandedPostId === post.id ? "text-emerald-600" : "text-stone-400 hover:text-stone-600")}
                        >
                           <MessageCircle className="w-4 h-4" />
                           <span className="text-xs font-medium">{post.comments.length}</span>
                        </button>
                     </div>
                     <button className="text-stone-300 hover:text-stone-500">
                        <Flag className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               {/* Comments Section */}
               <AnimatePresence>
                  {expandedPostId === post.id && (
                     <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-stone-50 border-t border-stone-100 overflow-hidden"
                     >
                        <div className="p-4 space-y-4">
                           {post.comments.length > 0 ? (
                              post.comments.map(comment => (
                                 <div key={comment.id} className="flex gap-3">
                                    <div className="w-6 h-6 bg-stone-200 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-stone-500">
                                       {comment.author.charAt(0)}
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none text-sm shadow-sm border border-stone-100 flex-1">
                                       <div className="flex justify-between items-center mb-1">
                                          <span className="font-bold text-xs text-stone-700">{comment.author}</span>
                                          <span className="text-[10px] text-stone-400">{comment.time}</span>
                                       </div>
                                       <p className="text-stone-600">{comment.content}</p>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <p className="text-xs text-center text-stone-400 italic py-2">No comments yet. Be the first to support.</p>
                           )}

                           <div className="flex gap-2 items-center mt-2">
                              <input 
                                 type="text" 
                                 value={commentInput}
                                 onChange={(e) => setCommentInput(e.target.value)}
                                 placeholder="Write a supportive comment..."
                                 className="flex-1 bg-white border border-stone-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                              />
                              <button 
                                 onClick={() => handleAddComment(post.id)}
                                 disabled={!commentInput.trim()}
                                 className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 transition-all"
                              >
                                 <Send className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
             </motion.div>
           ))}
        </AnimatePresence>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-white w-full max-w-lg rounded-3xl p-6 relative z-10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-stone-900">Share your story</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <form onSubmit={handlePostSubmit}>
                 <div className="mb-4">
                    <label className="block text-sm font-medium text-stone-700 mb-2">Category</label>
                    <div className="flex flex-wrap gap-2">
                       {['Experience', 'Advice', 'Support Request'].map(cat => (
                          <button 
                             key={cat} 
                             type="button"
                             onClick={() => setNewPostCategory(cat)}
                             className={clsx(
                                "px-3 py-1.5 rounded-lg border text-sm transition-all",
                                newPostCategory === cat 
                                   ? "bg-emerald-50 border-emerald-500 text-emerald-700 font-medium" 
                                   : "border-stone-200 text-stone-600 hover:border-emerald-300"
                             )}
                          >
                             {cat}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="mb-6">
                    <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                    <textarea 
                       className="w-full h-32 p-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none text-stone-800"
                       placeholder="What's on your mind?"
                       value={newPostContent}
                       onChange={(e) => setNewPostContent(e.target.value)}
                       required
                    />
                 </div>

                 <div className="flex items-center justify-between bg-stone-50 p-3 rounded-xl mb-6">
                    <div className="flex items-center gap-2">
                       <Shield className={clsx("w-5 h-5", isAnonymous ? "text-emerald-600" : "text-stone-400")} />
                       <span className="text-sm text-stone-700">Post Anonymously</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                       <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="sr-only peer" />
                       <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                 </div>

                 <button 
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-200"
                 >
                    Post Story
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
