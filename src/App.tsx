import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MessageSquare, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  Database, 
  Server, 
  Layers, 
  Cpu, 
  Globe,
  Menu,
  X,
  Terminal,
  Laptop
} from 'lucide-react';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Components ---

const ProjectCard = ({ project }: { project: any, key?: any }) => (
  <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-colors">
    <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400 group-hover:bg-sky-500/20 transition-colors shrink-0">
      <Terminal className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h4 className="font-bold text-white text-sm truncate">{project.title}</h4>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-sky-400">
          <Github className="w-4 h-4" />
        </a>
      </div>
      <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-2">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.tech.slice(0, 3).map((t: string) => (
          <span key={t} className="text-[9px] font-mono uppercase px-1.5 py-0.5 bg-zinc-800 text-zinc-400 rounded">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-zinc-800/50 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-white tracking-tighter flex items-center gap-2">
          <Code2 className="text-sky-500" />
          <span className="hidden sm:inline">ABDULLAHI JAMILU</span>
          <span className="sm:hidden text-sky-500 font-mono">AJ.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-sky-400 transition-colors uppercase tracking-widest text-[10px]">
              {link.name}
            </a>
          ))}
          <a 
            href="https://github.com/Abdullahijamilu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            <Github className="w-5 h-5 text-white" />
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#121212] border-b border-zinc-800 px-6 py-8 flex flex-col gap-6"
          >
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-zinc-300 hover:text-sky-400">
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const projects = [
    {
      title: "Student Result System",
      description: "Automated student records management and grade calculations for educational institutions.",
      tech: ["C#", "ASP.NET Core", "SQL Server"],
      github: "https://github.com/Abdullahijamilu"
    },
    {
      title: "HRMS Enterprise API",
      description: "Scalable backend API for HR operations with JWT-secured role-based access control.",
      tech: ["C#", "Web API", "JWT Auth"],
      github: "https://github.com/Abdullahijamilu"
    },
    {
      title: "Todo Planner App",
      description: "Usability-focused productivity tool for daily task management and personal organization.",
      tech: ["C#", "ASP.NET Core"],
      github: "https://github.com/Abdullahijamilu"
    }
  ];

  const allTech = Array.from(new Set(projects.flatMap(p => p.tech))).sort();

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech ? project.tech.includes(selectedTech) : true;
    return matchesSearch && matchesTech;
  });

  return (
    <div className="min-h-screen bg-[#050505]">
      <Nav />
      
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[240px]">
          
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bento-card bento-card-accent md:col-span-2 md:row-span-2 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent pointer-events-none" />
            <div>
              <div className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em] mb-6">Aspiring Full Stack Developer</div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
                Abdullahi <br/> <span className="text-sky-500">Jamilu</span>
              </h1>
              <p className="text-zinc-400 font-medium max-w-sm">
                Building real-world solutions with code and creativity. Specializing in backend development.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <a href="#projects" className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-black font-bold rounded-xl transition-all text-sm">
                View Projects
              </a>
              <a href="#contact" className="px-6 py-3 bg-[#1a1a1a] border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-all text-sm">
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* About Section */}
          <div id="about" className="bento-card md:col-span-2 md:row-span-1 flex flex-col justify-center">
            <div className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em] mb-4">About Me</div>
            <p className="text-zinc-300 leading-relaxed font-medium">
              Math Education background turned <span className="text-white font-bold">Full Stack Engineer</span>. Focused on backend development, API design, and creating scalable systems that improve efficiency and solve real-world problems.
            </p>
          </div>

          {/* Current Building Section */}
          <div className="bento-card md:col-span-1 md:row-span-1 flex flex-col justify-between border-sky-500/20">
             <div>
               <div className="inline-block px-2 py-0.5 bg-sky-500 text-black text-[10px] font-black uppercase rounded mb-4">Currently Building</div>
               <h3 className="text-white font-bold mb-2">Buyers Raffle System</h3>
               <p className="text-xs text-zinc-500">Automated, real-time winner selection platform using Node.js logic.</p>
             </div>
             <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500 lowercase">active development</span>
             </div>
          </div>

          {/* Contact Quick Link (replaces one slot to maintain bento flow) */}
          <div id="contact" className="bento-card md:col-span-1 md:row-span-1 bg-sky-500 text-black flex flex-col justify-between p-8">
            <h3 className="text-xl font-black leading-tight">Let’s Build Something Together 🚀</h3>
            <div className="mt-4 space-y-1">
              <div className="text-[9px] font-bold uppercase opacity-80">Quick Contact</div>
              <div className="text-[10px] font-black break-all">abdullahionimis@gmail.com</div>
              <div className="text-[10px] font-black">+234 814 635 0888</div>
            </div>
          </div>

          {/* Skills Section */}
          <div id="skills" className="bento-card md:col-span-1 md:row-span-2 flex flex-col">
            <div className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em] mb-6">Technical Tools</div>
            <div className="flex flex-wrap gap-2 mb-8">
              {["C#", "ASP.NET", "SQL", "JWT", "MVC", "Node.js", "Git", "API Design"].map(skill => (
                <span key={skill} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-zinc-400">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <p className="text-xs text-zinc-500 leading-relaxed italic">
                Focus on structured architecture and automation logic.
              </p>
            </div>
          </div>

          {/* Projects Section */}
          <div id="projects" className="bento-card md:col-span-2 md:row-span-2 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em]">Selected Projects</div>
              <div className="w-full sm:w-auto relative group">
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 pt-2 text-[10px] text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-sky-500/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button 
                onClick={() => setSelectedTech(null)}
                className={`px-2 py-1 rounded text-[9px] font-mono uppercase tracking-widest transition-colors ${!selectedTech ? 'bg-sky-500 text-black font-bold' : 'bg-white/5 text-zinc-500 hover:text-zinc-300'}`}
              >
                All
              </button>
              {allTech.map(tech => (
                <button 
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-2 py-1 rounded text-[9px] font-mono uppercase tracking-widest transition-colors ${selectedTech === tech ? 'bg-sky-500 text-black font-bold' : 'bg-white/5 text-zinc-500 hover:text-zinc-300'}`}
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="space-y-4 flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <motion.div
                      layout
                      key={project.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-600 py-12">
                    <Terminal className="w-8 h-8 mb-4 opacity-20" />
                    <p className="text-[10px] uppercase tracking-widest">No matching projects found</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
               <span className="text-xs text-zinc-500 font-mono italic">
                 {filteredProjects.length} {filteredProjects.length === 1 ? 'Entry' : 'Entries'} filtered
               </span>
               <ChevronRight className="w-4 h-4 text-sky-500" />
            </div>
          </div>

          {/* GitHub Box */}
          <div className="bento-card md:col-span-1 md:row-span-1 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <Github className="w-8 h-8 text-zinc-500 group-hover:text-white transition-colors" />
              <ExternalLink className="w-4 h-4 text-zinc-600" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em] mb-1">GitHub Activity</div>
              <div className="text-xl font-bold text-white mb-2 truncate">@Abdullahijamilu</div>
              <a href="https://github.com/Abdullahijamilu" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors">
                View repositories →
              </a>
            </div>
          </div>

        </div>
      </main>

      <footer className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-sky-500" />
          <span className="text-xs font-bold tracking-tighter text-white">ABDULLAHI <span className="text-sky-500">JAMILU</span></span>
        </div>
        <div className="flex gap-6 items-center text-[10px] uppercase font-bold tracking-widest">
          <a href="https://github.com/Abdullahijamilu" className="hover:text-white">GitHub</a>
          <a href="https://www.linkedin.com/in/abdul-onimisi-809031374" className="hover:text-white">LinkedIn</a>
          <a href="mailto:abdullahionimis@gmail.com" className="hover:text-white">Mail</a>
        </div>
        <div className="text-[10px] font-mono">
          © {new Date().getFullYear()} CORE SYSTEMS
        </div>
      </footer>
    </div>
  );
}
