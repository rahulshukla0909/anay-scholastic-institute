import React, { useState, useRef } from 'react';
import { LogIn, UserPlus, LogOut, User, Menu, X, ChevronDown, Download, BookOpen, FileText, ClipboardList, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InstituteLogo } from './Logo';
import { AuthMode } from '../types';
import { auth } from '../lib/firebase';
import { signOut, User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  user: FirebaseUser | null;
  onOpenAuth: (mode: AuthMode) => void;
  onScrollToCourses: () => void;
  onScrollToAbout: () => void;
  onScrollToResults: () => void;
  onScrollToContact: () => void;
  onScrollToDashboard: () => void;
  onResetView: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuth, onScrollToCourses, onScrollToAbout, onScrollToResults, onScrollToContact, onScrollToDashboard, onResetView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDownloadsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDownloadsOpen(false);
    }, 300);
  };

  const resourceLinks = [
    { title: 'NCERT Books (Class 10th)', icon: <BookOpen size={16} />, href: 'https://ncert.nic.in/textbook.php?jess1=0-15' },
    { title: 'Notes (Class 10th)', icon: <FileText size={16} />, href: '#' },
    { title: 'Test Papers (Class 10th)', icon: <ClipboardList size={16} />, href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-[70] bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div onClick={() => handleNavClick(onResetView)} className="flex items-center gap-3 group cursor-pointer relative z-50">
          <InstituteLogo useImage className="w-10 h-10 transition-transform group-hover:rotate-12" />
          <div className="flex flex-col">
            <span className="font-bold text-brand-navy leading-tight tracking-tight text-lg">ANAY SCHOLASTIC</span>
            <span className="text-brand-orange text-[9px] font-bold tracking-[0.05em] uppercase flex flex-col">
              <span>INSTITUTE</span>
              <span className="text-[7px] text-brand-navy/60 italic">"Coaching nhi Confidence banate hain"</span>
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <button 
            onClick={onResetView} 
            className="hover:text-brand-orange transition-colors"
          >
            Home
          </button>
          <button 
            onClick={onScrollToCourses}
            className="hover:text-brand-orange transition-colors"
          >
            Courses
          </button>
          <button 
            onClick={onScrollToAbout}
            className="hover:text-brand-orange transition-colors"
          >
            About
          </button>
          <button 
            onClick={onScrollToResults}
            className="hover:text-brand-orange transition-colors"
          >
            Results
          </button>
          <button 
            onClick={onScrollToContact}
            className="hover:text-brand-orange transition-colors"
          >
            Contact
          </button>

          {user && (
            <button 
              onClick={onScrollToDashboard}
              className="px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full font-bold text-sm hover:bg-brand-orange hover:text-white transition-all animate-pulse"
            >
              Academic Portal
            </button>
          )}
          
          {/* Downloads Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="flex items-center gap-1 hover:text-brand-orange transition-colors group"
            >
              <Download size={18} className="text-brand-orange" />
              <span>Downloads</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isDownloadsOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDownloadsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
                >
                  <div className="p-2">
                    <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                      Resources (Class 10th)
                    </div>
                    {resourceLinks.map((link, idx) => (
                      <a 
                        key={idx}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-orange/5 text-slate-600 hover:text-brand-orange font-bold text-sm transition-all group"
                      >
                        <span className="text-brand-orange/50 group-hover:text-brand-orange transition-colors">
                          {link.icon}
                        </span>
                        <span>{link.title}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-50">
          {user ? (
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <User size={16} className="text-brand-navy" />
                <span className="text-sm font-semibold text-slate-700">{user.displayName || 'Student'}</span>
              </div>
              <button 
                onClick={() => signOut(auth)}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onOpenAuth('signin')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-brand-navy font-bold hover:text-brand-orange transition-colors"
              >
                <LogIn size={18} />
                <span>Login</span>
              </button>
              <button 
                data-signup="true"
                onClick={() => onOpenAuth('signup')}
                className="flex items-center gap-2 px-6 py-2.5 bg-brand-orange text-white font-bold rounded-xl shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all"
              >
                <UserPlus size={18} />
                <span className="hidden xs:inline">Register</span>
              </button>
            </div>
          )}
          
          <button 
            className="md:hidden p-2 text-brand-navy hover:bg-slate-50 rounded-xl transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <button 
                onClick={() => handleNavClick(onResetView)} 
                className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-600 font-bold flex items-center justify-between group"
              >
                <span>Home</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => handleNavClick(onScrollToCourses)}
                className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-600 font-bold flex items-center justify-between group"
              >
                <span>Courses</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => handleNavClick(onScrollToAbout)}
                className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-600 font-bold flex items-center justify-between group"
              >
                <span>About</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => handleNavClick(onScrollToResults)}
                className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-600 font-bold flex items-center justify-between group"
              >
                <span>Results</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => handleNavClick(onScrollToContact)}
                className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-600 font-bold flex items-center justify-between group"
              >
                <span>Contact</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {user && (
                <button 
                  onClick={() => handleNavClick(onScrollToDashboard)}
                  className="text-left py-3 px-4 rounded-xl bg-brand-orange/10 text-brand-orange font-bold flex items-center justify-between group"
                >
                  <span>Academic Portal</span>
                  <ChevronRight size={16} />
                </button>
              )}

              {/* Mobile Downloads Section */}
              <div className="mt-2 py-4 px-4 bg-slate-50 rounded-2xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Download size={14} className="text-brand-orange" />
                  <span>Downloads (Class 10)</span>
                </div>
                <div className="flex flex-col gap-2">
                  {resourceLinks.map((link, idx) => (
                    <a 
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-2 text-slate-600 font-bold text-sm"
                    >
                      <span className="text-brand-orange">{link.icon}</span>
                      <span>{link.title}</span>
                    </a>
                  ))}
                </div>
              </div>

              {user && (
                 <div className="mt-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-2 text-brand-navy">
                      <User size={18} className="text-brand-orange" />
                      <span className="font-bold">{user.displayName || 'Student'}</span>
                    </div>
                 </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
