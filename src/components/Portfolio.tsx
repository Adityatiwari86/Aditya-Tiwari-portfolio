import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Activity, 
  Zap, 
  Terminal, 
  Globe, 
  ChevronRight, 
  Download, 
  Send, 
  Menu, 
  X, 
  Layout, 
  Server, 
  Bot, 
  Eye, 
  ShieldCheck, 
  Radio, 
  Box 
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types & Constants ---

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  icon: React.ReactNode;
  status: 'Completed' | 'Beta' | 'In-Dev';
}

const PROJECTS: Project[] = [
  {
    title: "Echo-Vision",
    description: "Real-time assistive vision system using TensorFlow.js and MediaPipe for object detection and spatial awareness.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    tags: ["TensorFlow.js", "MediaPipe", "AI", "Edge"],
    liveUrl: "https://echo-vision-seven.vercel.app/",
    category: "AI",
    icon: <Eye className="w-6 h-6" />,
    status: 'Completed'
  },
  {
    title: "Shadow-Sim",
    description: "Vehicle digital twin platform with real-time synchronization using WebSockets and Three.js 3D rendering.",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=1000",
    tags: ["WebSockets", "Three.js", "Digital Twin", "React"],
    liveUrl: "https://shadow-sim.vercel.app/",
    category: "Systems",
    icon: <Box className="w-6 h-6" />,
    status: 'Beta'
  },
  {
    title: "FleetFlow",
    description: "High-throughput real-time telemetry pipeline built with Kafka and Redis for large-scale fleet management.",
    image: "https://images.unsplash.com/photo-1551288049-bbb652167c8a?auto=format&fit=crop&q=80&w=1000",
    tags: ["Kafka", "Redis", "Telemetry", "Backend"],
    liveUrl: "http://13.53.163.137",
    category: "Systems",
    icon: <Radio className="w-6 h-6" />,
    status: 'Completed'
  },
  {
    title: "Neuro-Drive",
    description: "AI-powered driver monitoring system using MediaPipe and OpenCV for fatigue and distraction detection.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000",
    tags: ["MediaPipe", "OpenCV", "Python", "Edge AI"],
    category: "AI",
    icon: <Activity className="w-6 h-6" />,
    status: 'In-Dev'
  },
  {
    title: "HR Dashboard",
    description: "Full-stack management system with integrated video calling and AI-driven chatbot for automated HR tasks.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    tags: ["React", "Node.js", "WebRTC", "AI Chatbot"],
    liveUrl: "https://hr-dashboard-five-dusky.vercel.app/",
    category: "Full Stack",
    icon: <Layout className="w-6 h-6" />,
    status: 'Completed'
  },
  {
    title: "Phishing Detector",
    description: "Machine learning security system using Scikit-learn to identify and block malicious phishing attempts.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    tags: ["ML", "Scikit-learn", "Cybersecurity", "Python"],
    category: "AI",
    icon: <ShieldCheck className="w-6 h-6" />,
    status: 'Completed'
  }
];

const SKILLS = [
  {
    category: "AI/ML & Edge",
    icon: <Bot className="w-5 h-5" />,
    skills: ["YOLOv10", "OpenVINO", "NPU Optimization", "TensorFlow", "MediaPipe", "OpenCV"]
  },
  {
    category: "Full Stack",
    icon: <Layout className="w-5 h-5" />,
    skills: ["React", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Tailwind CSS"]
  },
  {
    category: "Systems & Data",
    icon: <Server className="w-5 h-5" />,
    skills: ["Kafka", "Redis", "WebSockets", "Digital Twins", "Docker", "AWS"]
  },
  {
    category: "Languages",
    icon: <Terminal className="w-5 h-5" />,
    skills: ["Java", "Python"]
  }
];

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-amber-400 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
};

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, #ffb700 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-rose-500/5" />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-amber-500/10 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-rose-500/10 blur-[120px] rounded-full"
      />
    </div>
  );
};

const GlitchText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-amber-400 opacity-0 group-hover:opacity-70 group-hover:translate-x-1 transition-all duration-100">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-rose-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-1 transition-all duration-100">
        {text}
      </span>
    </span>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-amber-500/20' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(251,191,36,0.5)]">
            AT
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">Aditya Tiwari</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-amber-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-400 hover:bg-amber-500 hover:text-black transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)]"
          >
            Hire Me
          </motion.button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-amber-500/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-amber-400"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["Full Stack Developer", "Java Developer", "AI Specialist", "Digital Twin Systems"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" /> Available for International Internships
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] text-orange-50">
            ADITYA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-500">TIWARI</span>
          </h1>
          <div className="h-12 mb-8">
            <p className="text-xl md:text-2xl font-mono text-orange-100/60">
              {'> '} 
              <span className="text-amber-400">{text}</span>
              <span className="animate-pulse">_</span>
            </p>
          </div>
          <p className="text-orange-100/70 text-lg mb-10 max-w-xl leading-relaxed">
            Engineering high-performance AI systems and scalable full-stack applications with a focus on Edge AI and real-time data processing.
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="px-8 py-4 bg-amber-500 text-black font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:scale-105 transition-all flex items-center gap-3">
              View Projects <ChevronRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 bg-slate-900 border border-slate-800 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-slate-800 transition-all flex items-center gap-3">
              Download CV <Download className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative mt-12 lg:mt-0 lg:translate-y-12 flex justify-center"
        >
          <div className="relative z-10 aspect-square max-w-[500px] mx-auto rounded-3xl overflow-hidden border border-amber-500/30 group">
            <img 
              src="/5.jpeg" 
              alt="Aditya Tiwari" 
              className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-amber-400" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-amber-400" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-amber-400" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-amber-400" />
          </div>

          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-6 -right-6 z-20 px-6 py-3 bg-black/80 backdrop-blur-xl border border-amber-500/50 rounded-2xl shadow-[0_0_20px_rgba(251,191,36,0.3)]"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">Full Stack Developer</p>
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-6 -left-6 z-20 px-6 py-3 bg-black/80 backdrop-blur-xl border border-rose-500/50 rounded-2xl shadow-[0_0_20px_rgba(244,63,94,0.3)]"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Java Developer</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { label: "Edge AI Focus", value: "Real-time", icon: <Cpu className="w-5 h-5 text-amber-400" /> },
    { label: "Global Mindset", value: "International", icon: <Globe className="w-5 h-5 text-rose-500" /> },
    { label: "Latency", value: "<100ms", icon: <Zap className="w-5 h-5 text-yellow-400" /> },
    { label: "Full Stack", value: "Systems", icon: <Layers className="w-5 h-5 text-emerald-400" /> },
  ];

  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="tech-card p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Activity className="w-32 h-32 text-amber-500" />
            </div>
            <h2 className="text-4xl font-black mb-8 tracking-tighter uppercase text-orange-50">
              <GlitchText text="Engineering Excellence" />
            </h2>
            <div className="space-y-6 text-lg text-orange-100/70 leading-relaxed relative z-10">
              <p>
                My core expertise lies in building real-time data systems and applying machine learning in practical scenarios.
              </p>
              <p>
                I’ve worked on streaming data pipelines, computer vision-based perception systems, and Edge AI applications, especially in mobility-related use cases. I thrive on technical challenges that require precision, low latency, and a global engineering mindset.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="tech-card p-8 group hover:border-amber-500/50 transition-all"
              >
                <div className="p-3 bg-white/5 rounded-xl mb-4 group-hover:scale-110 transition-transform w-fit">
                  {stat.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 mb-1">{stat.label}</p>
                <p className="text-xl font-black text-orange-50 uppercase tracking-tighter">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 relative bg-black/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400"
          >
            <Terminal className="w-3 h-3" /> Technical Arsenal
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-orange-50">
            <GlitchText text="Core Competencies" />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <TiltCard className="h-full">
                <div className="tech-card p-8 h-full border-amber-500/10 hover:border-amber-500/40 transition-all group">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-orange-50">{category.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-orange-100/50 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:border-amber-400 hover:text-amber-400 hover:shadow-[0_0_10px_rgba(251,191,36,0.2)] transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI', 'Systems', 'Full Stack'];

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-rose-400"
            >
              <Layers className="w-3 h-3" /> Portfolio
            </motion.div>
            <h2 className="text-4xl font-black tracking-tighter uppercase text-orange-50">
              <GlitchText text="Featured Innovations" />
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  filter === cat 
                    ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-500/20' 
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="h-full">
                  <div 
                    className="group tech-card flex flex-col cursor-pointer h-full holographic-border overflow-hidden"
                    onClick={() => project.liveUrl && window.open(project.liveUrl, '_blank')}
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 z-20">
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
                          project.status === 'Completed' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' :
                          project.status === 'Beta' ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' :
                          'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                        }`}>
                          {project.status}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-amber-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <div className="w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(251,191,36,0.5)] scale-0 group-hover:scale-100 transition-transform duration-500">
                          <ExternalLink className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-amber-400 group-hover:border-amber-500/50 transition-colors">
                          {project.icon}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-end max-w-[150px]">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-500 text-[8px] font-bold uppercase tracking-wider rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-black mb-3 tracking-tighter uppercase group-hover:text-amber-400 transition-colors text-orange-50">{project.title}</h3>
                      <p className="text-orange-100/60 text-sm mb-8 leading-relaxed line-clamp-3">{project.description}</p>
                      
                      <div className="mt-auto pt-6 border-t border-slate-800 flex gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 py-3 bg-amber-600 text-black text-center rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-amber-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                          >
                            Live Demo
                          </a>
                        )}
                        <a
                          href={project.githubUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-3 bg-slate-900 border border-slate-800 text-white text-center rounded-xl font-black uppercase tracking-widest text-[9px] hover:border-slate-700 transition-colors flex items-center justify-center gap-2"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<"SUCCESS" | "ERROR" | "">("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xpwzjyqv", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffb700', '#ff003c', '#ffffff']
        });
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400"
            >
              <Mail className="w-3 h-3" /> Get In Touch
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.9] text-orange-50">
              <GlitchText text="Let's build" /> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-500">Something Great.</span>
            </h2>
            <p className="text-orange-100/70 text-lg mb-12 max-w-md leading-relaxed">
              Open for international internships, collaborative AI research, and high-performance system development.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-amber-400 group-hover:border-amber-500/50 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 mb-1">Email</p>
                  <p className="text-orange-50 font-bold text-lg">adityatiwari8630@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-rose-500 group-hover:border-rose-500/50 transition-all">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 mb-1">LinkedIn</p>
                  <p className="text-orange-50 font-bold text-lg">Aditya Tiwari</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <TiltCard>
              <div className="tech-card p-10 bg-black/40 backdrop-blur-3xl border-amber-500/20">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 ml-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:outline-none focus:border-amber-500 transition-all text-orange-50 placeholder:text-orange-900/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 ml-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:outline-none focus:border-amber-500 transition-all text-orange-50 placeholder:text-orange-900/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-500/50 ml-1">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-6 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl focus:outline-none focus:border-amber-500 transition-all text-orange-50 placeholder:text-orange-900/50 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-black font-black uppercase tracking-widest text-xs shadow-2xl shadow-amber-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group overflow-hidden relative"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Transmit Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  
                  {status === "SUCCESS" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-emerald-400 text-center text-sm font-bold animate-pulse"
                    >
                      Message Received. Initializing response...
                    </motion.div>
                  )}
                  {status === "ERROR" && (
                    <p className="text-red-400 text-center text-sm font-bold">Transmission Failed. Please try again.</p>
                  )}
                </form>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-amber-900/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]">AT</div>
              <div>
                <p className="text-orange-50 text-sm font-black uppercase tracking-widest">Aditya Tiwari</p>
                <p className="text-amber-500/50 text-[10px] font-black uppercase tracking-widest">AI Engineer</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Status: Optimal</span>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-8">
              <a href="https://github.com/Adityatiwari86" target="_blank" rel="noopener noreferrer" className="text-amber-500/50 hover:text-amber-400 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" /> Github
              </a>
              <a href="mailto:adityatiwari8630@gmail.com" className="text-amber-500/50 hover:text-amber-400 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" /> Email
              </a>
              <a href="https://www.linkedin.com/in/adityatiwari1602" target="_blank" rel="noopener noreferrer" className="text-amber-500/50 hover:text-amber-400 transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" /> LinkedIn
              </a>
            </div>
            <p className="text-orange-100/20 text-[10px] font-mono uppercase tracking-widest">
              © {new Date().getFullYear()} • Build: 2026.04.06.futuristic • Latency: 18ms
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[1000]"
      style={{ scaleX }}
    />
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-amber-500 text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.5)] group"
        >
          <ChevronRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#030303] text-orange-50 selection:bg-amber-500/30 cursor-none">
      <CustomCursor />
      <BackgroundEffects />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
      
      {/* HUD Elements */}
      <div className="fixed top-1/2 left-6 -translate-y-1/2 hidden xl:flex flex-col gap-10 z-50">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
        <div className="rotate-90 text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/40 whitespace-nowrap">
          System Diagnostics
        </div>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
      </div>
      
      <div className="fixed top-1/2 right-6 -translate-y-1/2 hidden xl:flex flex-col gap-10 z-50">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-rose-500 to-transparent" />
        <div className="-rotate-90 text-[10px] font-black uppercase tracking-[0.5em] text-rose-500/40 whitespace-nowrap">
          Neural Interface
        </div>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-rose-500 to-transparent" />
      </div>
    </div>
  );
}
