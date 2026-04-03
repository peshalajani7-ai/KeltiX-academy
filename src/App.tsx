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
  StopCircle
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
}

// --- Constants ---
const TIMELINE: TimelineItem[] = [
  {
    title: "හැඳින්වීම (Introduction)",
    description: "ආයුබෝවන්! මම Keltix එකෙන්. ලංකාවේ AI අධ්යාපන ක්ෂේත්රයේ නවීකරණය අරඹමින් අපි අරන් එන Artificial Intelligence course එක ගැනයි මේ කියන්න යන්නේ."
  },
  {
    title: "AI වල වැදගත්කම (Importance of AI)",
    description: "ලෝකය වෙනස් වන ආකාරය සහ AI ඉගෙන ගැනීමෙන් ලැබෙන වාසි."
  },
  {
    title: "Course Benefits",
    description: "අපේ කෝස් එක අවසානයේ ඔබට ලංකාවේ අනුමත වටිනා සහතික පත්රයක් හිමි වෙනවා. ඒ වගේම ක්ෂේත්රයේ ප්රවීණ AI mentor කෙනෙක්ගෙන් සෘජුවම ඉගෙන ගන්න අවස්ථාව ලැබෙනවා."
  },
  {
    title: "Free Session & Offer",
    description: "පළමු වැඩසටහන සම්පූර්ණයෙන්ම නොමිලේ Zoom ඔස්සේ පවත්වනවා. විශේෂම දේ තමයි, අදම ලියාපදිංචි වන අයට 30% ක සුවිශේෂී වට්ටමක් (Discount) හිමි වෙනවා."
  },
  {
    title: "Call to Action",
    description: "දැන්ම සම්බන්ධ වෙන්න. 0741302643 අංකයට WhatsApp පණිවිඩයක් එවන්න. Keltix සමඟ ඔබේ අනාගතය අදම සැලසුම් කරන්න."
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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-xl">K</div>
          <span className="text-white font-bold text-xl tracking-tight">KELTIX <span className="text-orange-500">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/70 font-medium">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#course" className="hover:text-white transition-colors">Course</a>
          <a href="#tools" className="hover:text-white transition-colors">AI Tools</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95">
          Enroll Now
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <img 
          src="https://ais-dev-yrb46yue5asad7egklkeub-786221018123.asia-southeast1.run.app/input_file_0.png" 
          alt="Keltix AI Labs" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-semibold mb-6">
            <Zap size={14} />
            <span>Sri Lanka's #1 AI Education Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Future-Proof Your <span className="text-orange-500">Career</span> with AI
          </h1>
          <p className="text-xl text-white/60 mb-10 leading-relaxed">
            ලංකාවේ AI අධ්යාපන ක්ෂේත්රයේ නවීකරණය අරඹමින් Keltix අපි අරන් එන සුවිශේෂී Artificial Intelligence course එක සමඟ අදම එක්වන්න.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all group">
              Get Started Free
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition-all">
              View Course Details
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Timeline = () => {
  return (
    <section id="course" className="py-24 bg-zinc-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Course Roadmap</h2>
          <p className="text-white/50 max-w-2xl mx-auto">Our comprehensive curriculum designed to take you from basics to advanced AI implementation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {TIMELINE.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all group"
            >
              <div className="text-orange-500 font-mono text-sm mb-4">{item.time}</div>
              <h3 className="text-white font-bold text-lg mb-3 group-hover:text-orange-500 transition-colors">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
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
      "flex flex-col items-start p-6 rounded-2xl border transition-all text-left",
      active 
        ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" 
        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
    )}
  >
    <div className={cn(
      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
      active ? "bg-white/20" : "bg-orange-500/10 text-orange-500"
    )}>
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className={cn("text-sm leading-relaxed", active ? "text-white/80" : "text-white/40")}>
      {description}
    </p>
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
        <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mb-6">
          <Key size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">API Key Required</h3>
        <p className="text-white/40 mb-8 max-w-md">To use Veo video generation or Lyria music generation, you must select your own Gemini API key.</p>
        <button 
          onClick={async () => {
            await window.aistudio.openSelectKey();
            setHasKey(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition-all"
        >
          Select API Key
        </button>
        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-orange-500/60 text-sm mt-4 hover:underline">Learn about billing</a>
      </div>
    );
  }

  if (type === 'live') {
    return <LiveConversation />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-6 pb-20">
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 text-white/80 prose prose-invert max-w-none"
          >
            <ReactMarkdown>{result}</ReactMarkdown>
          </motion.div>
        )}

        {mediaUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            {type === 'music' ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white">
                  <Music size={32} />
                </div>
                <audio src={mediaUrl} controls className="w-full" />
              </div>
            ) : (
              <video src={mediaUrl} controls className="w-full rounded-xl shadow-2xl" />
            )}
          </motion.div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-orange-500 mb-4" size={40} />
            <p className="text-white/40">Processing your request... This may take a moment.</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-8 right-8">
        <div className="bg-zinc-800 border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
          {(type === 'image-analysis' || type === 'video-analysis' || type === 'video') && (
            <label className="p-3 text-white/40 hover:text-white cursor-pointer transition-colors">
              <Upload size={20} />
              <input type="file" className="hidden" onChange={handleFileChange} accept={type === 'video-analysis' ? "video/*" : "image/*"} />
            </label>
          )}
          <input 
            type="text" 
            placeholder={file ? `File selected: ${file.name}` : "Describe what you want to do..."}
            className="flex-1 bg-transparent border-none focus:ring-0 text-white px-4 py-2 placeholder:text-white/20"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button 
            onClick={handleSubmit}
            disabled={loading || (!prompt && !file)}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 text-white p-3 rounded-xl transition-all"
          >
            <Send size={20} />
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
          console.log("Live session opened");
          
          // Start sending audio
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
          audioContextRef.current = audioContext;
          const source = audioContext.createMediaStreamSource(stream);
          const processor = audioContext.createScriptProcessor(4096, 1, 1);
          
          source.connect(processor);
          processor.connect(audioContext.destination);
          
          processor.onaudioprocess = (e) => {
            if (isMuted) return;
            const inputData = e.inputBuffer.getChannelData(0);
            // Convert to 16-bit PCM
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
          
          const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (base64Audio && audioContextRef.current) {
            // Playback logic would require more complex buffering
            console.log("Received audio data");
          }
        },
        onerror: (error: any) => {
          console.error("Live session error:", error);
          stopSession();
        },
        onclose: () => {
          console.log("Live session closed");
          stopSession();
        }
      });
      setSession(newSession);
    } catch (error) {
      console.error("Failed to connect to Live API:", error);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (session) {
      session.close();
      setSession(null);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsConnected(false);
    setTranscript([]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {transcript.length === 0 && !isConnecting && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 mb-4">
              <Mic size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Start a Voice Session</h3>
            <p className="text-white/40 text-sm max-w-xs">Have a real-time conversation with our AI mentor about your learning path.</p>
          </div>
        )}

        {transcript.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "max-w-[80%] p-4 rounded-2xl",
              msg.role === 'user' ? "ml-auto bg-orange-500 text-white" : "mr-auto bg-white/5 text-white/80 border border-white/10"
            )}
          >
            {msg.text}
          </motion.div>
        ))}
        
        {isConnecting && (
          <div className="flex items-center gap-2 text-white/40 p-4">
            <Loader2 className="animate-spin" size={16} />
            Establishing secure connection...
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col items-center gap-6">
        {!isConnected ? (
          <button 
            onClick={startSession}
            disabled={isConnecting}
            className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all group"
          >
            {isConnecting ? <Loader2 className="animate-spin" size={32} /> : <Mic size={32} className="group-hover:scale-110 transition-transform" />}
          </button>
        ) : (
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-white relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20" />
              <Mic size={32} />
            </div>
            <button 
              onClick={stopSession}
              className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500/30 transition-all"
            >
              <StopCircle size={24} />
            </button>
          </div>
        )}
        <p className="text-white/40 text-sm">
          {!isConnected ? "Click to start voice conversation" : "Listening... Speak naturally"}
        </p>
      </div>
    </div>
  );
};

const AITools = () => {
  const [activeTool, setActiveTool] = useState<ToolType>('live');

  return (
    <section id="tools" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/3 space-y-4">
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">Interactive AI Tools</h2>
              <p className="text-white/50">Experience the power of Gemini 3.1 and Lyria directly in your browser.</p>
            </div>
            
            <ToolCard 
              title="Live AI Tutor" 
              description="Real-time voice conversation with our AI mentor."
              icon={Mic}
              active={activeTool === 'live'}
              onClick={() => setActiveTool('live')}
            />
            <ToolCard 
              title="Music Generator" 
              description="Create custom study tracks using Lyria Pro."
              icon={Music}
              active={activeTool === 'music'}
              onClick={() => setActiveTool('music')}
            />
            <ToolCard 
              title="Image to Video" 
              description="Animate your concepts into cinematic videos."
              icon={Video}
              active={activeTool === 'video'}
              onClick={() => setActiveTool('video')}
            />
            <ToolCard 
              title="Image Analysis" 
              description="Deep understanding of visual data with Gemini Pro."
              icon={ImageIcon}
              active={activeTool === 'image-analysis'}
              onClick={() => setActiveTool('image-analysis')}
            />
            <ToolCard 
              title="Video Analysis" 
              description="Extract key insights from any video content."
              icon={FileVideo}
              active={activeTool === 'video-analysis'}
              onClick={() => setActiveTool('video-analysis')}
            />
            <ToolCard 
              title="High Thinking Mode" 
              description="Solve complex reasoning tasks with maximum precision."
              icon={Brain}
              active={activeTool === 'thinking'}
              onClick={() => setActiveTool('thinking')}
            />
          </div>

          <div className="w-full md:w-2/3 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 min-h-[600px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
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
  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-orange-500 rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to start your AI journey?</h2>
            <p className="text-white/80 text-lg mb-8">
              අදම ලියාපදිංචි වන අයට 30% ක සුවිශේෂී වට්ටමක් හිමි වේ. දැන්ම සම්බන්ධ වෙන්න.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/94741302643" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-orange-500 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-zinc-100 transition-all"
              >
                <Phone size={20} />
                WhatsApp Us
              </a>
              <div className="flex items-center gap-3 text-white font-mono text-xl">
                0741302643
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-black/20 backdrop-blur-xl border border-white/20 p-8 rounded-3xl w-full max-w-sm">
            <h3 className="text-white font-bold text-xl mb-6">Quick Registration</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40" />
              <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40" />
              <button className="w-full bg-white text-orange-500 font-bold py-4 rounded-xl hover:bg-zinc-100 transition-all">
                Claim 30% Discount
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 bg-black border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">K</div>
        <span className="text-white font-bold text-lg tracking-tight">KELTIX <span className="text-orange-500">AI</span></span>
      </div>
      <div className="text-white/40 text-sm">
        © 2026 Keltix AI Academy. All rights reserved.
      </div>
      <div className="flex gap-6 text-white/40">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-orange-500 selection:text-white">
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
