/**
 * KeltiX AI Academy - Official Website Code
 * Features: Smooth Scroll, AI Tool Integration, Responsive Design
 */

import React, { useState, useEffect } from 'react';
import { 
  Music, Video, Mic, Image as ImageIcon, Brain, Award, 
  Zap, ChevronRight, Send, Sparkles, Target, Rocket, Key,
  Volume2, VolumeX, StopCircle, Loader2, Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import * as gemini from './services/gemini';
import ReactMarkdown from 'react-markdown';

// --- Scroll Logic Function ---
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// --- Constants & Types ---
interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon: any;
}

const TIMELINE: TimelineItem[] = [
  { time: "Step 01", title: "හැඳින්වීම", description: "ලංකාවේ AI අධ්‍යාපන ක්ෂේත්‍රයේ නවීකරණය අරඹමින් KeltiX අප හඳුන්වා දෙන විශේෂිත වැඩසටහන.", icon: Sparkles },
  { time: "Step 02", title: "AI වැදගත්කම", description: "වෙනස් වන ලෝකය සමඟ ඉදිරියට යන්න AI තාක්ෂණය අත්‍යවශ්‍ය වන ආකාරය සහ එහි වාසි.", icon: Brain },
  { time: "Step 03", title: "Course Benefits", description: "ප්‍රවීණ AI mentor කෙනෙක්ගෙන් සෘජුවම ඉගෙන ගෙන වටිනා සහතික පත්‍රයක් ලබා ගැනීම.", icon: Award },
  { time: "Step 04", title: "Free Session", description: "නොමිලේ Zoom වැඩසටහන සහ සුවිශේෂී වට්ටම්.", icon: Target },
  { time: "Step 05", title: "Call to Action", description: "දැන්ම සම්බන්ධ වෙන්න. KeltiX සමඟ ඔබේ අනාගත වෘත්තීය ගමන අදම ආරම්භ කරන්න.", icon: Rocket }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div onClick={() => scrollToSection('home')} className="flex items-center gap-2 group cursor-pointer">
          <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">K</div>
          <span className="text-white font-black text-2xl tracking-tighter">KELTIX <span className="text-orange-500">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-white/60 font-semibold text-sm uppercase tracking-widest">
          <button onClick={() => scrollToSection('home')} className="hover:text-orange-500 transition-colors">Home</button>
          <button onClick={() => scrollToSection('course')} className="hover:text-orange-500 transition-colors">Course</button>
          <button onClick={() => scrollToSection('tools')} className="hover:text-orange-500 transition-colors">Tools</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-orange-500 transition-colors">Register</button>
        </div>
        <button onClick={() => scrollToSection('contact')} className="bg-white text-black hover:bg-orange-500 hover:text-white px-7 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl">
          Get Started
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-zinc-950 z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} className="fill-orange-400" />
              <span>Next-Gen AI Academy</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8">
              Master the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500">Future of AI</span>
            </h1>
            <p className="text-xl text-white/50 mb-10 leading-relaxed max-w-xl">
              කෘත්‍රිම බුද්ධිය (AI) සෙල්ලමක් නෙවෙයි, ඒක ඔබේ අනාගතය. ලංකාවේ ප්‍රමුඛතම AI පාඨමාලාව සමඟ අදම එක්වන්න.
            </p>
            <div className="flex flex-wrap gap-5">
              {/* මෙතන තමයි Buttons වල scroll logic එක තියෙන්නේ */}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 transition-all shadow-2xl shadow-orange-500/20 group"
              >
                Register Free
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('course')}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-md transition-all"
              >
                Course Details
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="hidden md:block relative">
            <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
            <img src="https://images.unsplash.com/photo-1620712943543-bcc4638d9985?auto=format&fit=crop&q=80&w=800" className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl border border-white/10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- ඉතිරි Components (Timeline, AITools, Contact, Footer) පෙර පරිදිම පවතී ---

const Timeline = () => (
  <section id="course" className="py-32 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
        <div>
          <h2 className="text-5xl font-black text-white mb-4">Course Roadmap</h2>
          <p className="text-white/40 text-lg">අපේ පියවරෙන් පියවර ඉගැන්වීමේ ක්‍රමය.</p>
        </div>
        <div className="h-px flex-1 bg-white/10 mx-12 hidden md:block" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {TIMELINE.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><item.icon size={80} /></div>
            <div className="text-orange-500 font-black text-sm tracking-tighter mb-6">{item.time}</div>
            <h3 className="text-white font-bold text-xl mb-4 group-hover:text-orange-400 transition-colors">{item.title}</h3>
            <p className="text-white/30 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ... (AITools, Contact, Footer සහ App එක පෙර කේතයට සමානව තබා ගන්න)

const Contact = () => {
  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('userName');
    const email = formData.get('userEmail');
    const message = `Hello KeltiX Academy! 🚀%0A%0AI want to claim my 30% Discount.%0A%0A👤 *Name:* ${name}%0A📧 *Email:* ${email}%0A%0APlease send me the registration details!`;
    window.open(`https://wa.me/94741302643?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-[4rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-16 overflow-hidden relative shadow-2xl shadow-orange-500/20">
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Claim Your Spot Today!</h2>
            <p className="text-white/80 text-xl mb-12 font-medium">පළමු සිසුන් කණ්ඩායම සඳහා හිමිවන 30% සුවිශේෂී වට්ටම ලබා ගැනීමට දැන්ම ඔබෙ නම ඇතුළත් කරන්න.</p>
            <div className="text-white text-3xl font-black">074 130 2643</div>
          </div>
          <div className="relative z-10 bg-black/30 backdrop-blur-2xl border border-white/20 p-10 rounded-[3rem] w-full max-w-md shadow-inner">
            <form onSubmit={handleRegistration} className="space-y-5">
              <input name="userName" type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all" />
              <input name="userEmail" type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all" />
              <button type="submit" className="w-full bg-white text-orange-600 font-black py-5 rounded-2xl hover:bg-orange-50 transition-all text-lg shadow-xl">Get Discount 🚀</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white text-xl">K</div>
        <span className="text-white font-black text-xl tracking-tighter uppercase">Keltix Academy</span>
      </div>
      <div className="text-white/20 text-sm font-medium">© 2026 KeltiX Academy. Sri Lanka's Leading AI Hub.</div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-orange-500 selection:text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        {/* AITools component එක මෙතනට ඇතුළත් කරන්න */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
