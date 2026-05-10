import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { About } from './components/About';
import { Founder } from './components/Founder';
import { Results } from './components/Results';
import { Feedback } from './components/Feedback';
import { Legal } from './components/Legal';
import { StudentDashboard } from './components/StudentDashboard';
import { Register } from './components/Register';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PosterGallery } from './components/PosterGallery';
import { CampusGallery } from './components/CampusGallery';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { AuthMode } from './types';
import { AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('none');
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'courses' | 'about' | 'results' | 'feedback' | 'legal' | 'contact' | 'signup' | 'dashboard'>('home');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Force profile completion check
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (!userDoc.exists() || !userDoc.data().studentId) {
          setCurrentView('signup');
        } else {
          // If profile is complete, and we were on home/signin, maybe go to dashboard
          // but user wants to be able to see home too. 
          // Let's just set the user and let them decide where to go.
          // However, if they just signed in, it might be good to show dashboard once.
        }
      }
      setUser(currentUser);
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  const openAuth = (mode: AuthMode) => {
    if (mode === 'signup') {
      setView('signup');
    } else {
      setAuthMode(mode);
    }
  };
  const closeAuth = () => setAuthMode('none');

  const setView = (view: typeof currentView) => {
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
    // Only show dashboard if explicitly requested
    if (user && currentView === 'dashboard') return <StudentDashboard onBackToWebsite={() => setView('home')} />;
    
    switch (currentView) {
      case 'signup':
        return <Register onCancel={() => setView('home')} onComplete={() => setView('home')} />;
      case 'dashboard':
        return user ? <StudentDashboard onBackToWebsite={() => setView('home')} /> : <Hero onStart={openAuth} onScrollToCourses={() => setView('courses')} onScrollToAbout={() => setView('about')} />;
      case 'home':
        return (
          <>
            <Hero onStart={openAuth} onScrollToCourses={() => setView('courses')} onScrollToAbout={() => setView('about')} />
            <PosterGallery />
            <CampusGallery />
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
        return <Courses />;
      case 'about':
        return (
          <>
            <About />
            <Founder />
          </>
        );
      case 'results':
        return <Results />;
      case 'feedback':
        return <Feedback />;
      case 'legal':
        return <Legal />;
      case 'contact':
        return (
          <div className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-brand-navy mb-4">Contact Us</h2>
                <div className="w-20 h-1 bg-brand-orange mx-auto rounded-full" />
              </div>
              <div id="contact-info" className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100 max-w-2xl mx-auto">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange italic-none">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-brand-navy">Location</h4>
                      <p className="text-slate-600">Near Shiv Mandir, Mahaveer Residency, Jhansi Road, Tikamgarh, 472001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange italic-none">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-brand-navy">Phone</h4>
                      <p className="text-slate-600">+91 8602306316, +91 8827230149</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-brand-orange/10 rounded-xl text-brand-orange italic-none">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-brand-navy">Email</h4>
                      <p className="text-slate-600">anayscholasticinstitute@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        onOpenAuth={openAuth} 
        onScrollToCourses={() => setView('courses')} 
        onScrollToAbout={() => setView('about')}
        onScrollToResults={() => setView('results')}
        onScrollToContact={() => setView('contact')}
        onScrollToDashboard={() => setView('dashboard')}
        onResetView={() => setView('home')}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {currentView !== 'dashboard' && (
        <Footer 
          onAboutClick={() => setView('about')}
          onResultsClick={() => setView('results')}
          onFeedbackClick={() => setView('feedback')} 
          onLegalClick={() => setView('legal')}
        />
      )}
      <WhatsAppButton />


      <AnimatePresence>
        {authMode !== 'none' && (
          <AuthModal mode={authMode} onClose={closeAuth} />
        )}
      </AnimatePresence>
    </div>
  );
}
