/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Video, 
  Mic, 
  Image as ImageIcon, 
  FileVideo, 
  Brain, 
  MessageSquare, 
  Clock, 
  Award, 
  Users, 
  Zap,
  ChevronRight,
  Play,
  Pause,
  Upload,
  Send,
  Loader2,
  Menu,
  X,
  Phone,
  Key,
  Volume2,
  VolumeX,
  StopCircle,
  Sparkles,
  Target,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import * as gemini from './services/gemini';
import ReactMarkdown from 'react-markdown';

// --- Types ---
type ToolType = 'music' | 'video' | 'live' | 'image-analysis' | 'video-analysis' | 'thinking';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  icon: any;
}

// --- Constants ---
const TIMELINE: TimelineItem[] = [
  {
    time: "Step 01",
    title: "හැඳින්වීම",
    description: "ලංකාවේ AI අධ්‍යාපන ක්ෂේත්‍රයේ නවීකරණය අරඹමින් KeltiX අප හඳුන්වා දෙන විශේෂිත වැඩසටහන.",
    icon: Sparkles
  },
  {
    time: "Step 02",
    title: "AI වැදගත්කම",
    description: "වෙනස් වන ලෝකය සමඟ ඉදිරියට යන්න AI තාක්ෂණය අත්‍යවශ්‍ය වන ආකාරය සහ එහි වාසි.",
    icon: Brain
  },
  {
    time: "Step 03",
    title: "Course Benefits",
    description: "ප්‍රවීණ AI mentor කෙනෙක්ගෙන් සෘජුවම ඉගෙන ගෙන වටිනා සහතික පත්‍රයක් ලබා ගැනීම.",
    icon: Award
  },
  {
    time: "Step 04",
    title: "Free Session",
    description: "නොමිලේ Zoom වැඩසටහන සහ සුවිශේෂී වට්ටම්.",
    icon: Target
  },
  {
    time: "Step 05",
    title: "Call to Action",
    description: "දැන්ම සම්බන්ධ වෙන්න. KeltiX සමඟ ඔබේ අනාගත වෘත්තීය ගමන අදම ආරම්භ කරන්න.",
    icon: Rocket
  }
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
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">K</div>
          <span className="text-white font-black text-2xl tracking-tighter">KELTIX <span className="text-orange-500">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-white/60 font-semibold text-sm uppercase tracking-widest">
          <a href="#home" className="hover:text-orange-500 transition-colors">Home</a>
          <a href="#course" className="hover:text-orange-500 transition-colors">Course</a>
          <a href="#tools" className="hover:text-orange-500 transition-colors">Tools</a>
          <a href="#contact" className="hover:text-orange-500 transition-colors">Register</a>
        </div>
        <button className="bg-white text-black hover:bg-orange-500 hover:text-white px-7 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl">
          Get Started
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-950">
      {/* Background with higher quality image and darker overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-zinc-950 z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000" 
          alt="AI Visualization" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={14} className="fill-orange-400" />
              <span>Next-Gen AI Academy</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8">
              Master the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500">
                Future of AI
              </span>
            </h1>
            <p className="text-xl text-white/50 mb-10 leading-relaxed max-w-xl">
              කෘත්‍රිම බුද්ධිය (AI) සෙල්ලමක් නෙවෙයි, ඒක ඔබේ අනාගතය. ලංකාවේ ප්‍රමුඛතම AI පාඨමාලාව සමඟ අදම එක්වන්න.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 transition-all shadow-2xl shadow-orange-500/20 group">
                Register Free
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg backdrop-blur-md transition-all">
                Course Details
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1620712943543-bcc4638d9985?auto=format&fit=crop&q=80&w=800" 
              alt="AI Bot" 
              className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Timeline = () => {
  return (
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
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <item.icon size={80} />
              </div>
              <div className="text-orange-500 font-black text-sm tracking-tighter mb-6">{item.time}</div>
              <h3 className="text-white font-bold text-xl mb-4 group-hover:text-orange-400 transition-colors">{item.title}</h3>
              <p className="text-white/30 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ToolCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  active 
}: { 
  title: string; 
  description: string; 
  icon: any; 
  onClick: () => void;
  active: boolean;
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300 group",
      active 
        ? "bg-orange-500 border-orange-400 text-white shadow-2xl shadow-orange-500/40 translate-x-2" 
        : "bg-white/[0.03] border-white/5 text-white/60 hover:bg-white/[0.08] hover:border-white/10"
    )}
  >
    <div className={cn(
      "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
      active ? "bg-white/20" : "bg-orange-500/10 text-orange-500"
    )}>
      <Icon size={24} />
    </div>
    <div className="text-left">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className={cn("text-xs leading-tight opacity-50", active ? "text-white" : "")}>
        {description}
      </p>
    </div>
  </button>
);

const ToolInterface = ({ type }: { type: ToolType }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!prompt && !file) return;
    setLoading(true);
    setResult(null);
    setMediaUrl(null);

    try {
      let base64 = '';
      if (file) {
        base64 = await toBase64(file);
      }

      switch (type) {
        case 'image-analysis':
          const analysis = await gemini.analyzeImage(base64, prompt || "Analyze this image.");
          setResult(analysis);
          break;
        case 'video-analysis':
          const videoAnalysis = await gemini.analyzeVideo(base64, prompt || "Analyze this video.");
          setResult(videoAnalysis);
          break;
        case 'thinking':
          const thinkingResult = await gemini.solveComplexTask(prompt);
          setResult(thinkingResult);
          break;
        case 'music':
          const musicUrl = await gemini.generateMusic(prompt);
          setMediaUrl(musicUrl);
          break;
        case 'video':
          const videoUrl = await gemini.generateVideo(prompt, base64);
          setMediaUrl(videoUrl);
          break;
      }
    } catch (error) {
      console.error(error);
      setResult("Error occurred during processing.");
    } finally {
      setLoading(false);
    }
  };

  if ((type === 'video' || type === 'music') && !hasKey) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12">
        <div className="w-24 h-24 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-500 mb-8 border border-orange-500/20">
          <Key size={44} />
        </div>
        <h3 className="text-3xl font-black text-white mb-4">API Key Required</h3>
        <p className="text-white/40 mb-8 max-w-sm">To use premium features like Veo or Lyria, please select your Gemini API key.</p>
        <button 
          onClick={async () => {
            await window.aistudio.openSelectKey();
            setHasKey(true);
          }}
          className="bg-white text-black hover:bg-orange-500 hover:text-white px-10 py-4 rounded-2xl font-black transition-all shadow-2xl"
        >
          Activate Now
        </button>
      </div>
    );
  }

  if (type === 'live') {
    return <LiveConversation />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-6 pb-24 scrollbar-hide">
        {!result && !mediaUrl && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-20">
            <Sparkles size={60} className="mb-4" />
            <p className="text-white font-medium">Ready for your prompt...</p>
          </div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 text-white/80 prose prose-invert max-w-none shadow-inner"
          >
            <ReactMarkdown>{result}</ReactMarkdown>
          </motion.div>
        )}

        {mediaUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-800/50 border border-white/10 rounded-3xl p-4 overflow-hidden"
          >
            {type === 'music' ? (
              <div className="flex flex-col items-center gap-6 py-10">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                  <Music size={40} />
                </div>
                <audio src={mediaUrl} controls className="w-full max-w-md accent-orange-500" />
              </div>
            ) : (
              <video src={mediaUrl} controls className="w-full rounded-2xl shadow-2xl aspect-video object-cover" />
            )}
          </motion.div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
              <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500" size={24} />
            </div>
            <p className="text-orange-500 font-bold mt-6 tracking-widest animate-pulse">AI IS THINKING...</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-3 flex items-center gap-3 shadow-2xl">
          {(type === 'image-analysis' || type === 'video-analysis' || type === 'video') && (
            <label className="w-12 h-12 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-2xl cursor-pointer transition-all shrink-0">
              <Upload size={22} />
              <input type="file" className="hidden" onChange={handleFileChange} accept={type === 'video-analysis' ? "video/*" : "image/*"} />
            </label>
          )}
          <input 
            type="text" 
            placeholder={file ? `Attached: ${file.name}` : "Ask anything or describe what to generate..."}
            className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-3 placeholder:text-white/20 font-medium"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button 
            onClick={handleSubmit}
            disabled={loading || (!prompt && !file)}
            className="bg-orange-500 hover:bg-orange-400 disabled:opacity-20 text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-orange-500/20"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

const LiveConversation = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [session, setSession] = useState<any>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const newSession = await gemini.connectLive({
        onopen: () => {
          setIsConnecting(false);
          setIsConnected(true);
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
          audioContextRef.current = audioContext;
          const source = audioContext.createMediaStreamSource(stream);
          const processor = audioContext.createScriptProcessor(4096, 1, 1);
          source.connect(processor);
          processor.connect(audioContext.destination);
          processor.onaudioprocess = (e) => {
            if (isMuted) return;
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmData = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
            }
            const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
            newSession.sendRealtimeInput({
              audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
            });
          };
        },
        onmessage: (message: any) => {
          if (message.serverContent?.modelTurn?.parts?.[0]?.text) {
            const text = message.serverContent.modelTurn.parts[0].text;
            setTranscript(prev => [...prev, { role: 'model', text }]);
          }
        },
        onerror: (error: any) => {
          console.error(error);
          stopSession();
        },
        onclose: () => {
          stopSession();
        }
      });
      setSession(newSession);
    } catch (error) {
      console.error(error);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (session) session.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    setIsConnected(false);
    setTranscript([]);
    setSession(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 p-6 scrollbar-hide">
        {transcript.length === 0 && !isConnecting && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mb-6 border border-orange-500/20">
              <Mic size={40} className="animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3">Live AI Mentor</h3>
            <p className="text-white/30 text-sm max-w-xs">සජීවීව AI ගුරුවරයෙකු සමඟ කතා කර ඔබේ ගැටළු විසඳා ගන්න.</p>
          </div>
        )}

        {transcript.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "max-w-[85%] p-5 rounded-3xl font-medium",
              msg.role === 'user' ? "ml-auto bg-orange-500 text-white shadow-xl shadow-orange-500/10" : "mr-auto bg-white/5 text-white/80 border border-white/10"
            )}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <div className="p-10 flex flex-col items-center gap-6">
        {!isConnected ? (
          <button 
            onClick={startSession}
            disabled={isConnecting}
            className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all group"
          >
            {isConnecting ? <Loader2 className="animate-spin" size={32} /> : <Mic size={36} />}
          </button>
        ) : (
          <div className="flex items-center gap-8">
            <button onClick={() => setIsMuted(!isMuted)} className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all">
              {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
            </button>
            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white relative">
              <div className="absolute inset-[-12px] border-4 border-orange-500/30 rounded-full animate-ping" />
              <Mic size={36} />
            </div>
            <button onClick={stopSession} className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-all">
              <StopCircle size={28} />
            </button>
          </div>
        )}
        <p className="text-white/20 font-bold uppercase tracking-widest text-xs">
          {!isConnected ? "Click to start session" : "Live - Speak Naturally"}
        </p>
      </div>
    </div>
  );
};

const AITools = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('live');

  return (
    <section id="tools" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/3 space-y-3">
            <div className="mb-12">
              <div className="text-orange-500 font-black text-sm uppercase tracking-widest mb-4">Hands-on Experience</div>
              <h2 className="text-5xl font-black text-white mb-6">Play with <br />AI Power</h2>
              <p className="text-white/40 leading-relaxed">අපේ වෙබ් අඩවිය තුළදීම අතිනවීන AI මෙවලම් අත්හදා බලන්න. Gemini 3.1 තාක්ෂණය සමඟ මේ සියල්ල ක්‍රියාත්මක වේ.</p>
            </div>
            
            <ToolCard title="Live AI Tutor" description="Real-time voice mentor" icon={Mic} active={activeTool === 'live'} onClick={() => setActiveTool('live')} />
            <ToolCard title="Music Generator" description="AI powered melodies" icon={Music} active={activeTool === 'music'} onClick={() => setActiveTool('music')} />
            <ToolCard title="Video Creator" description="Cinematic generations" icon={Video} active={activeTool === 'video'} onClick={() => setActiveTool('video')} />
            <ToolCard title="Intelligence Lab" description="Complex problem solving" icon={Brain} active={activeTool === 'thinking'} onClick={() => setActiveTool('thinking')} />
          </div>

          <div className="w-full md:w-2/3 bg-zinc-900/40 border border-white/5 rounded-[3rem] p-6 md:p-10 min-h-[700px] relative overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="h-full"
              >
                <ToolInterface type={activeTool} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -mr-64 -mt-64" />
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Claim Your <br />Spot Today!</h2>
            <p className="text-white/80 text-xl mb-12 font-medium">
              පළමු සිසුන් කණ්ඩායම සඳහා හිමිවන 30% සුවිශේෂී වට්ටම ලබා ගැනීමට දැන්ම ඔබෙ නම ඇතුළත් කරන්න.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
              <div className="flex flex-col">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">Direct Hotline</span>
                <span className="text-white text-3xl font-black">074 130 2643</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-black/30 backdrop-blur-2xl border border-white/20 p-10 rounded-[3rem] w-full max-w-md shadow-inner">
            <h3 className="text-white font-black text-2xl mb-8">Quick Entry</h3>
            <form onSubmit={handleRegistration} className="space-y-5">
              <div className="space-y-2">
                <label className="text-white/40 text-[10px] font-bold uppercase ml-4">Full Name</label>
                <input name="userName" type="text" placeholder="John Doe" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-white/40 text-[10px] font-bold uppercase ml-4">Email Address</label>
                <input name="userEmail" type="email" placeholder="john@example.com" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all" />
              </div>
              <button type="submit" className="w-full bg-white text-orange-600 font-black py-5 rounded-2xl hover:bg-orange-50 transition-all text-lg shadow-xl">
                Get Discount 🚀
              </button>
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
        <span className="text-white font-black text-xl tracking-tighter uppercase">Keltix <span className="text-orange-500">Academy</span></span>
      </div>
      <div className="text-white/20 text-sm font-medium">
        © 2026 KeltiX Academy. Sri Lanka's Leading AI Hub.
      </div>
      <div className="flex gap-8 text-white/40 font-bold text-xs uppercase tracking-widest">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Support</a>
      </div>
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
        <AITools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
