/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Infinity as InfinityIcon, 
  ArrowUpRight, 
  PlayCircle, 
  Home, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Plus, 
  Star, 
  Twitter,
  Instagram,
  Github
} from 'lucide-react';

// --- Types ---
interface CursorProps {
  isHovered: boolean;
}

// --- Components ---

const CustomCursor: React.FC<CursorProps> = ({ isHovered }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <motion.div
      id="cursor"
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference hidden md:block"
      animate={{
        x: position.x - (isHovered ? 30 : 10),
        y: position.y - (isHovered ? 30 : 10),
        width: isHovered ? 60 : 20,
        height: isHovered ? 60 : 20,
        backgroundColor: isHovered ? 'rgba(190, 242, 100, 0.8)' : 'rgba(190, 242, 100, 0.05)',
        borderColor: isHovered ? 'transparent' : 'rgba(190, 242, 100, 0.5)',
        borderWidth: isHovered ? 0 : 1,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
};

const SplashScreen = () => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: '-100%' }}
    transition={{ delay: 2.5, duration: 1, ease: [0.87, 0, 0.13, 1] }}
    className="fixed inset-0 bg-[#020402] z-[10000] flex flex-col items-center justify-center"
  >
    <div className="flex flex-col items-center gap-6">
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <InfinityIcon className="text-lime-400 w-12 h-12" />
      </motion.div>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 150 }}
        transition={{ delay: 0.5, duration: 1.5, ease: [0.87, 0, 0.13, 1] }}
        className="h-[2px] bg-lime-400 shadow-[0_0_20px_#bef264]"
      />
    </div>
  </motion.div>
);

const Navbar: React.FC<{ onHover: (hover: boolean) => void }> = ({ onHover }) => (
  <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020402]/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <a 
        href="#" 
        className="flex items-center gap-2"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <div className="w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_10px_#bef264]"></div>
        <span className="text-lg tracking-tight font-semibold text-white">ORBIT</span>
      </a>
      <div className="hidden md:flex gap-10 text-xs font-medium tracking-wide text-zinc-400">
        <a href="#features" className="hover:text-lime-300 transition-colors" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>Services</a>
        <a href="#pricing" className="hover:text-lime-300 transition-colors" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>Retainers</a>
        <a href="#testimony" className="hover:text-lime-300 transition-colors" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>Work</a>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-xs font-medium text-zinc-400 hover:text-white transition-colors hidden sm:block" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>Client Portal</a>
        <button 
          className="text-xs font-semibold text-[#020402] bg-lime-400 px-5 py-2.5 rounded-full hover:bg-lime-300 transition-colors shadow-[0_0_15px_rgba(190,242,100,0.3)]"
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          Let's Talk
        </button>
      </div>
    </div>
  </nav>
);

const Hero: React.FC<{ onHover: (hover: boolean) => void }> = ({ onHover }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] lime-glow pointer-events-none animate-pulse" />
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2 }}
          viewport={{ once: true }}
          className="mb-8 inline-flex items-center gap-2 border border-lime-500/20 bg-lime-900/10 px-4 py-1.5 rounded-full backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping"></span>
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-lime-300">Accepting New Clients</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white leading-[0.95] mb-8"
        >
          Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-200 to-emerald-200">Excellence,</span><br />
          <span className="text-zinc-600 font-medium">Engineered.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-zinc-400 font-light max-w-xl mx-auto mb-12 leading-relaxed tracking-wide"
        >
          The full-stack agency for modern brands. We transform complex problems into high-performance software and scalable marketing systems.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-5 w-full justify-center"
        >
          <button 
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="group relative px-8 py-4 bg-white text-black text-sm font-semibold rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Project
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </span>
            <div className="absolute inset-0 bg-lime-300 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </button>
          <button 
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="px-8 py-4 glass-card text-white text-sm font-medium rounded-full hover:bg-white/5 transition-colors flex items-center gap-2 group border-white/10"
          >
            <PlayCircle className="w-5 h-5 text-lime-400" />
            <span>View Portfolio</span>
          </button>
        </motion.div>

        {/* Hero Visual Abstract */}
        <motion.div 
          style={{ y, opacity }}
          className="mt-24 relative w-full max-w-5xl aspect-[16/8] glass-card rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#020402] via-transparent to-[#020402]/80 z-10 pointer-events-none" />
          
          <div className="absolute top-0 left-0 w-full h-full p-6 md:p-10 grid grid-cols-12 gap-6 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
            <div className="col-span-1 hidden md:flex flex-col gap-6 items-center border-r border-white/5 pr-6">
              <div className="w-8 h-8 rounded-lg bg-lime-400/20 border border-lime-400/50 flex items-center justify-center text-lime-400"><Home size={16} /></div>
              <div className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><BarChart3 size={16} /></div>
              <div className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"><Users size={16} /></div>
              <div className="mt-auto w-8 h-8 rounded-full bg-zinc-800 border border-white/10" />
            </div>
            
            <div className="col-span-12 md:col-span-11 flex flex-col gap-6">
              <div className="flex justify-between items-end pb-4 border-b border-white/5">
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Client Growth ROI</div>
                  <div className="text-3xl font-medium text-white tracking-tight">$124,592<span className="text-lime-400 text-lg">.00</span></div>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded bg-lime-900/20 border border-lime-500/20 text-lime-400 text-xs flex items-center gap-1">
                    <TrendingUp size={12} /> +12.4%
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6 h-full">
                <div className="col-span-2 bg-white/[0.02] rounded-xl border border-white/5 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-2/3 flex items-end justify-between px-4 pb-4 gap-2">
                    {[40, 70, 50, 85, 60].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className={`w-full bg-gradient-to-t ${i === 3 ? 'from-lime-500/40 border-t border-lime-400/30' : 'from-lime-500/20'} to-transparent rounded-t-sm`}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-1 flex flex-col gap-4">
                  <div className="h-1/2 bg-white/[0.02] rounded-xl border border-white/5 p-4 relative overflow-hidden text-left">
                    <div className="absolute top-4 right-4 text-lime-400"><Zap size={16} /></div>
                    <div className="text-xs text-zinc-500">App Load Speed</div>
                    <div className="mt-2 text-xl text-white">45ms</div>
                  </div>
                  <div className="h-1/2 bg-gradient-to-br from-lime-900/20 to-emerald-900/10 rounded-xl border border-lime-500/20 p-4 flex items-center justify-center relative overflow-hidden">
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-ping absolute top-4 right-4" />
                    <span className="text-sm font-medium text-lime-200">System Live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const LogoMarquee = () => (
  <section className="py-24 border-y border-white/5 bg-[#010201] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-[#020402] via-transparent to-[#020402] z-10 pointer-events-none" />
    <div className="marquee-mask overflow-hidden whitespace-nowrap relative">
      <div className="animate-scroll inline-flex gap-24 items-center">
        {['VERTEX', 'NOVA LABS', 'HYPERION', 'SYNTH', 'OBLIVION', 'CYBERDYNE', 'MASSIVE'].map((logo, i) => (
          <span key={i} className="text-xl font-semibold tracking-tighter text-zinc-700 hover:text-lime-400 transition-colors cursor-none">
            {logo}
          </span>
        ))}
        {['VERTEX', 'NOVA LABS', 'HYPERION', 'SYNTH', 'OBLIVION', 'CYBERDYNE', 'MASSIVE'].map((logo, i) => (
          <span key={i + 7} className="text-xl font-semibold tracking-tighter text-zinc-700 hover:text-lime-400 transition-colors cursor-none">
            {logo}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const Features: React.FC<{ onHover: (hover: boolean) => void }> = ({ onHover }) => (
  <section id="features" className="relative py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24">
        <div className="max-w-2xl text-left">
          <span className="block text-lime-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 pl-1">Capabilities v2.0</span>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white">
            Marketing meets <br /> <span className="text-zinc-700">Software Engineering.</span>
          </h2>
        </div>
        <p className="hidden md:block text-zinc-500 max-w-xs text-sm text-right leading-relaxed">
          Designed for forward-thinking brands that demand both technical excellence and creative vision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 h-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="col-span-1 md:col-span-6 lg:col-span-8 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden group min-h-[450px] flex flex-col justify-between border-t border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-lime-900/10 z-0" />
          <div className="relative z-10 flex justify-between items-start">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <BarChart3 className="text-lime-400 w-8 h-8" />
            </div>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
            </div>
          </div>
          <div className="relative z-10 text-left">
            <h3 className="text-3xl font-medium text-white mb-3 tracking-tight group-hover:text-lime-100 transition-colors">Performance Marketing</h3>
            <p className="text-zinc-400 font-light max-w-md leading-relaxed">Our growth team analyzes market patterns to deploy high-converting campaigns. We scale revenue with precision data.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="col-span-1 md:col-span-6 lg:col-span-4 glass-card rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between border-t border-white/10"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-lime-500/10 blur-[80px] rounded-full group-hover:bg-lime-500/20 transition-all duration-700" />
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="w-full relative flex justify-center">
              <svg viewBox="0 0 120 120" className="w-40 h-40 -rotate-90">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#27272a" strokeWidth="1" />
                <motion.circle 
                  cx="60" cy="60" r="54" fill="none" stroke="#bef264" strokeWidth="2" 
                  strokeDasharray="339" 
                  initial={{ strokeDashoffset: 339 }}
                  whileInView={{ strokeDashoffset: 40 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="drop-shadow-[0_0_8px_rgba(190,242,100,0.4)]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-semibold text-white tracking-tighter">92<span className="text-lg text-zinc-500">%</span></span>
                <span className="text-[10px] uppercase tracking-widest text-lime-400 mt-1">Lighthouse</span>
              </div>
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-medium text-white mb-2 tracking-tight">Web Engineering</h3>
            <p className="text-zinc-500 text-sm font-light">High-performance apps built for unprecedented speed.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="col-span-1 md:col-span-6 glass-card rounded-3xl p-8 flex flex-col justify-between group min-h-[320px] border-t border-white/10 aurora-gradient"
        >
          <div className="w-full flex-1 flex items-center justify-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            {[1, 1.2, 0.8, 1.5, 0.9].map((d, i) => (
              <motion.div 
                key={i}
                animate={{ height: [20, 40, 20] }}
                transition={{ repeat: Infinity, duration: d }}
                className={`w-1.5 bg-lime-400 rounded-full ${i === 1 ? 'shadow-[0_0_10px_#bef264]' : 'opacity-50'}`}
              />
            ))}
          </div>
          <div className="text-left">
            <h3 className="text-xl font-medium text-white mb-2 tracking-tight">Custom Software</h3>
            <p className="text-zinc-400 font-light text-sm">Enterprise-grade architecture tailored to your exact operational needs.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="col-span-1 md:col-span-6 glass-card rounded-3xl p-8 flex flex-col justify-between group min-h-[320px] border-t border-white/10"
        >
          <div className="flex gap-3 mb-6 items-center h-full justify-center">
            <div className="w-12 h-12 rounded-full border border-white/10 bg-zinc-900 flex items-center justify-center z-30 transition-transform duration-300 group-hover:-translate-x-2">
              <span className="text-xs font-medium text-white">UX</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-white/10 bg-zinc-900 flex items-center justify-center -ml-6 z-20 transition-transform duration-300 group-hover:-translate-x-1">
              <span className="text-xs font-medium text-white">UI</span>
            </div>
            <div className="w-12 h-12 rounded-full border border-lime-500/50 bg-lime-900/20 flex items-center justify-center -ml-6 z-10 shadow-[0_0_15px_rgba(190,242,100,0.2)]">
              <Plus className="text-lime-400 w-4 h-4" />
            </div>
          </div>
          <div className="text-left">
            <h3 className="text-xl font-medium text-white mb-2 tracking-tight">Digital Strategy</h3>
            <p className="text-zinc-400 font-light text-sm">Comprehensive roadmaps that align technology with your business goals.</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimony" className="py-32 border-y border-white/5 bg-[#010201] relative">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-900/10 via-transparent to-transparent opacity-50" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <h2 className="text-3xl font-medium tracking-tight text-white mb-16 text-center">Client Outcomes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Elena R.", role: "CMO at TechFlow", text: "They didn't just build a website, they engineered a complete digital ecosystem. Our inbound leads have tripled since launch." },
          { name: "Marcus T.", role: "Founder, Nova Systems", text: "We brought them in for a custom software build. What we got was an enterprise-grade platform that cut our operational costs by 40%.", featured: true },
          { name: "Sarah Jenkins", role: "CEO, Lumina Brands", text: "Finally, an agency that understands both beautiful design and complex backend engineering. The marketing ROAS is just the cherry on top." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`glass-card p-10 rounded-2xl border border-white/5 hover:border-lime-500/30 transition-colors group text-left ${item.featured ? 'md:translate-y-12 bg-white/[0.03]' : ''}`}
          >
            <div className="mb-8 text-lime-400 flex gap-1">
              {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" className={j === 0 ? "shadow-[0_0_10px_rgba(190,242,100,0.4)]" : ""} />)}
            </div>
            <p className="text-lg font-light text-zinc-300 mb-8 leading-relaxed group-hover:text-white transition-colors">"{item.text}"</p>
            <div className="flex items-center gap-4 border-t border-white/5 pt-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-lime-900 to-emerald-900 border border-white/10" />
              <div>
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="text-xs text-zinc-500">{item.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing: React.FC<{ onHover: (hover: boolean) => void }> = ({ onHover }) => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-medium tracking-tight text-white mb-6">Partnership Models</h2>
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-zinc-400 font-medium">Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="relative w-14 h-7 bg-zinc-800 rounded-full transition-colors"
            >
              <motion.div 
                animate={{ x: isYearly ? 28 : 2 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
            <span className="text-sm text-white font-medium">Yearly <span className="text-lime-400 text-xs ml-1 bg-lime-900/30 px-2 py-0.5 rounded-full border border-lime-500/20">-20%</span></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-card rounded-3xl p-10 border border-white/5 flex flex-col group text-left"
          >
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Growth Retainer</h3>
              <p className="text-zinc-500 text-sm h-10 font-light">Essential growth and web maintenance.</p>
            </div>
            <div className="text-6xl font-medium text-white mb-8 tracking-tighter">
              {isYearly ? '$2k' : '$2.5k'}<span className="text-lg text-zinc-500 font-normal tracking-normal">/mo</span>
            </div>
            <ul className="space-y-5 mb-12 flex-1">
              {['Dedicated Campaign Manager', 'Monthly Web Maintenance', 'Core Performance Analytics'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-light">
                  <CheckCircle2 size={18} className="text-zinc-500" /> {feat}
                </li>
              ))}
            </ul>
            <button 
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="w-full py-4 rounded-xl border border-white/10 text-white text-sm font-semibold hover:bg-white hover:text-black transition-all tracking-wide"
            >
              Start Growth
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="glass-card rounded-3xl p-10 border border-lime-500/30 bg-gradient-to-b from-lime-900/5 to-transparent flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 px-5 py-2 bg-lime-400 text-[10px] font-bold uppercase tracking-widest text-[#020402] rounded-bl-2xl">Recommended</div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                Enterprise Build <Star size={16} className="text-lime-400" fill="currentColor" />
              </h3>
              <p className="text-zinc-400 text-sm h-10 font-light">Full-stack engineering & digital dominance.</p>
            </div>
            <div className="text-6xl font-medium text-white mb-8 tracking-tighter">
              {isYearly ? '$6.8k' : '$8.5k'}<span className="text-lg text-zinc-500 font-normal tracking-normal">/mo</span>
            </div>
            <ul className="space-y-5 mb-12 flex-1">
              {['Custom App Development', 'Omnichannel Marketing', 'Advanced SEO & CRO', '24/7 Priority Engineering'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white font-medium">
                  <CheckCircle2 size={18} className="text-lime-400 shadow-[0_0_10px_rgba(190,242,100,0.5)] rounded-full" /> {feat}
                </li>
              ))}
            </ul>
            <button 
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="w-full py-4 rounded-xl bg-lime-400 text-[#020402] text-sm font-bold hover:bg-lime-300 transition-all shadow-[0_0_20px_rgba(190,242,100,0.2)] tracking-wide"
            >
              Start Enterprise
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => (
  <section className="py-32 px-6 max-w-3xl mx-auto border-t border-white/5">
    <h2 className="text-2xl font-medium tracking-tight text-white mb-12 text-left">Common Questions</h2>
    <div className="space-y-4">
      {[
        { q: "Do you handle both design and backend development?", a: "Yes. We are a true full-stack agency. Our team includes UI/UX designers, frontend specialists, and backend software engineers capable of building complex systems." },
        { q: "What technology stacks do you specialize in?", a: "We build robust solutions using modern frameworks like React, Next.js, Node.js, Python, and scalable cloud infrastructure on AWS and Vercel." },
        { q: "Can you integrate with our existing software?", a: "Absolutely. Our engineering team routinely handles complex API integrations, legacy system migrations, and enterprise database syncing." }
      ].map((item, i) => (
        <details key={i} className="group glass-card rounded-xl border border-white/5 open:bg-white/[0.03] transition-all duration-300 text-left">
          <summary className="flex cursor-none items-center justify-between p-6 list-none">
            <span className="text-sm font-medium text-zinc-200 group-hover:text-lime-400 transition-colors">{item.q}</span>
            <Plus className="transition group-open:rotate-45 text-zinc-500 group-hover:text-white" size={20} />
          </summary>
          <div className="px-6 pb-6 text-sm text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-4 mt-2">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  </section>
);

const Footer: React.FC<{ onHover: (hover: boolean) => void }> = ({ onHover }) => (
  <footer className="pt-32 pb-12 border-t border-white/5 bg-[#010101] px-6 relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-lime-900/10 to-transparent pointer-events-none" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-left">
        <div className="col-span-1 md:col-span-2">
          <a href="#" className="text-3xl font-semibold tracking-tighter text-white mb-6 block">ORBIT</a>
          <p className="text-zinc-500 text-sm font-light max-w-xs leading-relaxed">
            Defining the future of digital experiences. <br />
            Designed in Tokyo, Code in San Francisco.
          </p>
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 text-lime-400">Platform</h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-400">
            <li><a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="hover:text-white transition-colors">Intelligence</a></li>
            <li><a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="hover:text-white transition-colors">Development</a></li>
            <li><a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="hover:text-white transition-colors flex items-center gap-2">System Status <span className="w-2 h-2 rounded-full bg-lime-500" /></a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 text-lime-400">Legal</h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-400">
            <li><a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="hover:text-white transition-colors">Privacy Protocol</a></li>
            <li><a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
        <p className="text-xs text-zinc-600 font-medium">© 2024 Orbit Agency Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="text-zinc-500 hover:text-lime-400 transition-colors"><Twitter size={18} /></a>
          <a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="text-zinc-500 hover:text-lime-400 transition-colors"><Instagram size={18} /></a>
          <a href="#" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)} className="text-zinc-500 hover:text-lime-400 transition-colors"><Github size={18} /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <SplashScreen />
      <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-40" />
      <div className="grain" />
      <CustomCursor isHovered={isHovered} />
      
      <Navbar onHover={setIsHovered} />
      
      <main>
        <Hero onHover={setIsHovered} />
        <LogoMarquee />
        <Features onHover={setIsHovered} />
        <Testimonials />
        <Pricing onHover={setIsHovered} />
        <FAQ />
      </main>

      <Footer onHover={setIsHovered} />
    </div>
  );
}
