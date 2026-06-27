import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { About } from './components/About';
import { Founder } from './components/Founder';
import { Feedback } from './components/Feedback';
import { Legal } from './components/Legal';
import { StudentDashboard } from './components/StudentDashboard';
import { Register } from './components/Register';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PosterGallery } from './components/PosterGallery';
import { CampusGallery } from './components/CampusGallery';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { Downloads } from './components/Downloads';
import { WeeklyResults } from './components/WeeklyResults';
import { AuthMode } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('none');
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'courses' | 'about' | 'feedback' | 'legal' | 'signup' | 'dashboard' | 'downloads' | 'gallery'>('home');
  const [practiceHubMode, setPracticeHubMode] = useState<boolean>(false);
  const [selectedCourseCategory, setSelectedCourseCategory] = useState<string>('all');
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [securityWarning, setSecurityWarning] = useState<string | null>(null);

  // Auto-dismiss security warning after 3 seconds
  useEffect(() => {
    if (securityWarning) {
      const timer = setTimeout(() => {
        setSecurityWarning(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [securityWarning]);

  // Anti-Screenshot, Anti-Copy, Anti-RightClick protection setup
  useEffect(() => {
    // 1. Block right click (context menu) except inside text inputs/textareas
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      setSecurityWarning("Right-click is disabled to protect content / सामग्री की सुरक्षा के लिए राइट-क्लिक बैन है");
    };

    // 2. Prevent dragging images to protect content download
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
        setSecurityWarning("Image downloading is restricted / चित्र डाउनलोड करना प्रतिबंधित है");
      }
    };

    // 3. Block selection copying and cutting
    const handleCopyCut = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      setSecurityWarning("Copying content is disabled / कंटेंट कॉपी करना प्रतिबंधित है");
    };

    // 4. Block hotkeys for Printing, Saving, Viewing Source, Inspecting, and copying
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      
      const isCopy = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c';
      const isCut = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x';
      const isPrint = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p';
      const isSave = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's';
      const isViewSource = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u';
      const isInspect = (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i';
      const isInspectC = (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c';
      const isInspectJ = (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'j';
      const isF12 = e.key === 'F12';
      const isPrintScreen = e.key === 'PrintScreen';

      if (isCopy || isCut) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        setSecurityWarning("Copy & Cut is restricted on this platform / कॉपी और कट प्रतिबंधित है");
      } else if (isPrint) {
        e.preventDefault();
        setSecurityWarning("Printing or saving as PDF is disabled / प्रिंट या पीडीएफ सहेजना प्रतिबंधित है");
      } else if (isSave) {
        e.preventDefault();
        setSecurityWarning("Saving the website is restricted / वेबसाइट सहेजना प्रतिबंधित है");
      } else if (isViewSource || isInspect || isInspectC || isInspectJ || isF12) {
        e.preventDefault();
        setSecurityWarning("Developer tools are restricted / डेवलपर टूल्स प्रतिबंधित हैं");
      } else if (isPrintScreen) {
        try {
          navigator.clipboard.writeText("Content Protected by Anay Institute");
        } catch (err) {}
        setSecurityWarning("Screenshots are protected. Content obscured / स्क्रीनशॉट प्रतिबंधित हैं");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        try {
          navigator.clipboard.writeText("Content Protected by Anay Institute");
        } catch (err) {}
        setSecurityWarning("Screenshots are protected. Content obscured / स्क्रीनशॉट प्रतिबंधित हैं");
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('copy', handleCopyCut);
    window.addEventListener('cut', handleCopyCut);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('copy', handleCopyCut);
      window.removeEventListener('cut', handleCopyCut);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Real-time visitor counter and session increment effect
  useEffect(() => {
    const docRef = doc(db, 'counters', 'visitors');
    
    // Subscribe to visitor counter document
    const unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setVisitorCount(docSnap.data().lastId || 0);
      }
    }, (error) => {
      console.warn("Could not load public visitor counter:", error);
    });

    // Handle initial visit once per browser tab session
    const handleVisitorSession = async () => {
      try {
        const hasVisited = sessionStorage.getItem('has_visited_anay');
        if (!hasVisited) {
          sessionStorage.setItem('has_visited_anay', 'true');
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(docRef, { lastId: 1 });
          } else {
            await updateDoc(docRef, { lastId: increment(1) });
          }
        }
      } catch (err) {
        console.error("Failed to update visitor counter:", err);
      }
    };

    handleVisitorSession();

    return () => {
      unsubscribeSnapshot();
    };
  }, []);

  const hasRedirectedRef = React.useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Force profile completion check
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (!userDoc.exists() || !userDoc.data()?.studentId) {
            setCurrentView('signup');
          } else if (!hasRedirectedRef.current) {
            // Redirect to dashboard ONLY on initial login/session load
            setCurrentView('dashboard');
            hasRedirectedRef.current = true;
          }
        } catch (error) {
          console.error("Auth check error:", error);
        }
      } else {
        // Redirect to home on logout
        if (currentView === 'dashboard') {
          setCurrentView('home');
        }
        hasRedirectedRef.current = false;
      }
      setUser(currentUser);
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []); // Remove currentView dependency to prevent re-instantiating the listener on every navigation

  const openAuth = (mode: AuthMode) => {
    if (mode === 'signup') {
      setView('signup');
    } else {
      setAuthMode(mode);
    }
  };
  const closeAuth = () => setAuthMode('none');

  const setView = (view: typeof currentView) => {
    if (view !== 'downloads') {
      setPracticeHubMode(false);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isInitializing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
          <span className="text-brand-navy font-bold text-lg animate-pulse tracking-wider">ANAY INSTITUTE</span>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'signup':
        return <Register onCancel={() => setView('home')} onComplete={() => setView('dashboard')} />;
      case 'dashboard':
        return user ? <StudentDashboard onBackToWebsite={() => setView('home')} visitorCount={visitorCount} /> : <Hero onScrollToCourses={() => setView('courses')} />;
      case 'home':
        return (
          <>
            <Hero onScrollToCourses={() => setView('courses')} />
            
            {/* Anay Practice Hub CTA Banner */}
            <section className="py-12 bg-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="relative bg-gradient-to-br from-brand-navy via-slate-900 to-brand-navy text-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl border border-brand-orange/20">
                  {/* Decorative background gradients */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-400/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold mb-4 border border-brand-orange/30 tracking-wider">
                        <Sparkles size={12} className="text-brand-orange animate-pulse" />
                        <span>PREVIEW AVAILABLE</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight uppercase">
                        Anay Practice Hub <br />
                        <span className="text-brand-orange">अनाय प्रैक्टिस हब</span>
                      </h2>
                      <p className="text-slate-300 max-w-xl text-sm md:text-base leading-relaxed">
                        Master your board exams with our comprehensive collection of Chapter-wise Previous Year Questions (PYQs) from 2019 to 2026, interactive practice tests, subject blueprints, and step-by-step master solutions!
                      </p>
                    </div>
                    <div className="shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => {
                          setPracticeHubMode(true);
                          setView('downloads');
                        }}
                        className="w-full md:w-auto px-8 py-5 bg-brand-orange text-white font-black rounded-2xl hover:bg-brand-orange/90 transition-all shadow-xl shadow-brand-orange/30 flex items-center justify-center gap-3 overflow-hidden text-lg hover:-translate-y-1 hover:shadow-2xl"
                      >
                        <span>Open Practice Hub</span>
                        <ArrowRight size={22} className="animate-pulse" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <WeeklyResults />

            <Features />
            {/* CTA section integrated into home */}
            <section className="py-20 bg-brand-navy text-white overflow-hidden relative">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="md:flex items-center justify-between gap-12">
                  <div className="mb-12 md:mb-0">
                    <h2 className="text-4xl font-bold mb-6">Ready to start your <br/><span className="text-brand-orange">academic journey?</span></h2>
                    <p className="text-slate-300 max-w-md mb-8">
                      Get access to exclusive study material, live sessions, and personalized tracking. Join our elite community of students today.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="text-brand-orange font-bold text-2xl mb-2">24/7</h3>
                      <p className="text-sm text-slate-400">Library Access</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="text-brand-orange font-bold text-2xl mb-2">Online</h3>
                      <p className="text-sm text-slate-400">Doubt Solving</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="text-brand-orange font-bold text-2xl mb-2">Weekly</h3>
                      <p className="text-sm text-slate-400">Mock Tests</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                      <h3 className="text-brand-orange font-bold text-2xl mb-2">Expert</h3>
                      <p className="text-sm text-slate-400">Career Guidance</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-orange opacity-5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            </section>
          </>
        );
      case 'courses':
        return (
          <>
            <Courses initialCategory={selectedCourseCategory} onEnroll={() => setView('signup')} />
            <PosterGallery />
          </>
        );
      case 'gallery':
        return <CampusGallery />;
      case 'about':
        return (
          <>
            <About />
            <Founder />
          </>
        );
       case 'downloads':
        return <Downloads practiceHubMode={practiceHubMode} />;
      case 'feedback':
        return <Feedback />;
      case 'legal':
        return <Legal />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        onOpenAuth={openAuth} 
        onScrollToCourses={(cat) => {
          setSelectedCourseCategory(cat || 'all');
          setView('courses');
        }} 
        onScrollToAbout={() => setView('about')}
        onScrollToDashboard={() => setView('dashboard')}
        onScrollToDownloads={() => {
          setPracticeHubMode(false);
          setView('downloads');
        }}
        onScrollToGallery={() => setView('gallery')}
        onScrollToResults={() => scrollToSection('student-results')}
        onResetView={() => setView('home')}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {currentView !== 'dashboard' && (
        <Footer 
          onAboutClick={() => setView('about')}
          onFeedbackClick={() => setView('feedback')} 
          onLegalClick={() => setView('legal')}
          visitorCount={visitorCount}
        />
      )}
      <WhatsAppButton />

      {/* Security Toast Notification */}
      <AnimatePresence>
        {securityWarning && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-10 left-1/2 z-[99999] flex items-center gap-3 bg-brand-navy border border-brand-orange/30 text-white px-5 py-4 rounded-2xl shadow-2xl w-[90%] max-w-md text-center justify-center font-medium"
          >
            <ShieldAlert className="text-brand-orange w-5 h-5 flex-shrink-0 animate-bounce" />
            <span className="text-sm tracking-wide leading-relaxed">{securityWarning}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
