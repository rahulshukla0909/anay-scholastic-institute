import React, { useState, useRef } from 'react';
import { LogOut, User, Menu, X, ChevronDown, Download, BookOpen, FileText, ClipboardList, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InstituteLogo } from './Logo';
import { AuthMode } from '../types';
import { auth } from '../lib/firebase';
import { signOut, User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  user: FirebaseUser | null;
  onOpenAuth: (mode: AuthMode) => void;
  onScrollToCourses: (courseCategory?: string) => void;
  onScrollToAbout: () => void;
  onScrollToDashboard: () => void;
  onScrollToDownloads: () => void;
  onScrollToGallery: () => void;
  onResetView: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  user, 
  onOpenAuth, 
  onScrollToCourses, 
  onScrollToAbout, 
  onScrollToDashboard, 
  onScrollToDownloads,
  onScrollToGallery,
  onResetView 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isSchoolSubmenuOpen, setIsSchoolSubmenuOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isMobileSchoolClassesOpen, setIsMobileSchoolClassesOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const coursesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const schoolSubmenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCoursesMouseEnter = () => {
    if (coursesTimeoutRef.current) clearTimeout(coursesTimeoutRef.current);
    setIsCoursesOpen(true);
  };

  const handleCoursesMouseLeave = () => {
    coursesTimeoutRef.current = setTimeout(() => {
      setIsCoursesOpen(false);
      setIsSchoolSubmenuOpen(false);
    }, 200);
  };

  const handleSchoolMouseEnter = () => {
    if (schoolSubmenuTimeoutRef.current) clearTimeout(schoolSubmenuTimeoutRef.current);
    setIsSchoolSubmenuOpen(true);
  };

  const handleSchoolMouseLeave = () => {
    schoolSubmenuTimeoutRef.current = setTimeout(() => {
      setIsSchoolSubmenuOpen(false);
    }, 150);
  };

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
              <span className="text-[7px] text-brand-orange font-extrabold tracking-wider uppercase">Coaching nahi, confidence banate hain</span>
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
          <div 
            className="relative"
            onMouseEnter={handleCoursesMouseEnter}
            onMouseLeave={handleCoursesMouseLeave}
          >
            <button 
              onClick={() => handleNavClick(() => onScrollToCourses('school'))}
              className="hover:text-brand-orange transition-colors flex items-center gap-1 py-1 font-medium"
            >
              Courses
              <ChevronDown size={14} className={`transition-transform duration-300 ${isCoursesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isCoursesOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 py-2.5 z-[100]"
                >
                  <div 
                    className="relative group/school"
                    onMouseEnter={handleSchoolMouseEnter}
                    onMouseLeave={handleSchoolMouseLeave}
                  >
                    <button
                      onClick={() => handleNavClick(() => onScrollToCourses('school'))}
                      className="w-full text-left px-5 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand-orange font-bold transition-colors flex items-center justify-between text-sm border-b border-slate-50"
                    >
                      <span>School Preparation</span>
                      <ChevronRight size={14} className="text-slate-400 group-hover/school:translate-x-1 transition-transform" />
                    </button>

                    <AnimatePresence>
                      {isSchoolSubmenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 ml-1.5 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 py-2.5 z-[120]"
                        >
                          {['6th', '7th', '8th', '9th', '10th'].map((cls) => (
                            <button
                              key={cls}
                              onClick={() => handleNavClick(() => onScrollToCourses(`school-${cls.replace('th', '')}`))}
                              className="w-full text-left px-5 py-2 hover:bg-slate-50 text-slate-600 hover:text-brand-orange font-bold transition-colors text-xs first:rounded-t-xl last:rounded-b-xl"
                            >
                              Class {cls}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    onMouseEnter={() => setIsSchoolSubmenuOpen(false)}
                    onClick={() => handleNavClick(() => onScrollToCourses('ssc'))}
                    className="w-full text-left px-5 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand-orange font-bold transition-colors block text-sm border-b border-slate-50"
                  >
                    Bank and SSC preparation
                  </button>
                  <button
                    onMouseEnter={() => setIsSchoolSubmenuOpen(false)}
                    onClick={() => handleNavClick(() => onScrollToCourses('spoken'))}
                    className="w-full text-left px-5 py-2.5 hover:bg-slate-50 text-slate-700 hover:text-brand-orange font-bold transition-colors block text-sm"
                  >
                    Spoken English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button 
            onClick={onScrollToAbout}
            className="hover:text-brand-orange transition-colors"
          >
            About
          </button>
          <button 
            onClick={onScrollToGallery}
            className="hover:text-brand-orange transition-colors font-bold text-brand-navy"
          >
            Infrastructure
          </button>

          {user && (
            <button 
              onClick={onScrollToDashboard}
              className="px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full font-bold text-sm hover:bg-brand-orange hover:text-white transition-all animate-pulse"
            >
              Academic Portal
            </button>
          )}
          
          {/* Downloads Button to Page */}
          <button 
            onClick={() => handleNavClick(onScrollToDownloads)}
            className="flex items-center gap-1.5 hover:text-brand-orange transition-colors group px-1 text-slate-600 font-medium"
          >
            <Download size={18} className="text-brand-orange group-hover:scale-110 transition-transform" />
            <span className="font-bold">Downloads</span>
          </button>
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
          ) : null}
          
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
              <div className="flex flex-col">
                <button 
                  onClick={() => setIsMobileCoursesOpen(!isMobileCoursesOpen)}
                  className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-600 font-bold flex items-center justify-between group"
                >
                  <span>Courses</span>
                  <ChevronDown size={18} className={`transition-transform text-slate-400 ${isMobileCoursesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isMobileCoursesOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 pl-4 border-l-2 border-slate-100 flex flex-col gap-1 overflow-hidden"
                    >
                      <div className="flex flex-col">
                        <button
                          onClick={() => setIsMobileSchoolClassesOpen(!isMobileSchoolClassesOpen)}
                          className="text-left py-2 text-slate-500 font-bold hover:text-brand-orange text-sm flex items-center justify-between"
                        >
                          <span>School Preparation</span>
                          <ChevronDown size={14} className={`transition-transform text-slate-400 ${isMobileSchoolClassesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isMobileSchoolClassesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-4 pl-3 border-l border-slate-200 flex flex-col gap-1.5 overflow-hidden"
                            >
                              <button
                                onClick={() => handleNavClick(() => onScrollToCourses('school'))}
                                className="text-left py-1 text-slate-400 hover:text-brand-orange text-xs font-bold"
                              >
                                All Classes (6th-10th)
                              </button>
                              {['6th', '7th', '8th', '9th', '10th'].map((cls) => (
                                <button
                                  key={cls}
                                  onClick={() => handleNavClick(() => onScrollToCourses(`school-${cls.replace('th', '')}`))}
                                  className="text-left py-1 text-slate-400 hover:text-brand-orange text-xs font-bold"
                                >
                                  Class {cls}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <button
                        onClick={() => handleNavClick(() => onScrollToCourses('ssc'))}
                        className="text-left py-2 text-slate-500 font-bold hover:text-brand-orange text-sm flex items-center justify-between"
                      >
                        <span>Bank and SSC preparation</span>
                      </button>
                      <button
                        onClick={() => handleNavClick(() => onScrollToCourses('spoken'))}
                        className="text-left py-2 text-slate-500 font-bold hover:text-brand-orange text-sm flex items-center justify-between"
                      >
                        <span>Spoken English</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={() => handleNavClick(onScrollToAbout)}
                className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-600 font-bold flex items-center justify-between group"
              >
                <span>About</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => handleNavClick(onScrollToGallery)}
                className="text-left py-3 px-4 rounded-xl hover:bg-slate-50 text-brand-navy font-black flex items-center justify-between group border-l-4 border-brand-orange pl-3"
              >
                <span>Infrastructure</span>
                <span className="animate-pulse bg-brand-orange text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Tour
                </span>
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

              {/* Mobile Downloads Button */}
              <button 
                onClick={() => handleNavClick(onScrollToDownloads)}
                className="text-left py-3.5 px-4 bg-brand-orange/10 hover:bg-brand-orange/15 text-brand-orange rounded-xl font-bold flex items-center justify-between group mt-2"
              >
                <div className="flex items-center gap-2">
                  <Download size={18} className="text-brand-orange" />
                  <span>Free Material & Practice Papers</span>
                </div>
                <ChevronRight size={16} />
              </button>

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
