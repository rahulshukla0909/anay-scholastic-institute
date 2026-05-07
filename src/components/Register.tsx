import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, UserCircle, BookOpen, Phone, 
  Camera, CheckCircle2, Loader2, AlertCircle, ArrowLeft,
  ShieldCheck, Sparkles, GraduationCap
} from 'lucide-react';
import { auth, db, storage } from '../lib/firebase';
import { 
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, setDoc, getDoc, serverTimestamp, runTransaction 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { handleFirestoreError, Operation } from '../lib/errorHandlers';

interface RegisterProps {
  onCancel: () => void;
  onComplete: () => void;
}

export function Register({ onCancel, onComplete }: RegisterProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [isGoogleCompletion, setIsGoogleCompletion] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.studentId) {
              onComplete(); 
              return;
            }
          }
          setIsGoogleCompletion(true);
          setName(user.displayName || '');
          setPhotoPreview(user.photoURL || null);
        } catch (err) {
          console.error("Error checking user profile:", err);
        }
      }
    });
    return () => checkUser();
  }, [onComplete]);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setAuthSuccess(true);
      setTimeout(() => setAuthSuccess(false), 2000); // Transition to form
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneInput = (value: string, setter: (v: string) => void) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 10);
    setter(limited);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setError("Photo size should be less than 2MB");
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateStudentId = async () => {
    const counterRef = doc(db, 'counters', 'students');
    try {
      const nextId = await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        if (!counterDoc.exists()) {
          transaction.set(counterRef, { lastId: 1 });
          return 1;
        }
        const newId = counterDoc.data().lastId + 1;
        transaction.update(counterRef, { lastId: newId });
        return newId;
      });
      return `ASI-2025-${nextId.toString().padStart(3, '0')}`;
    } catch (err) {
      handleFirestoreError(err, Operation.WRITE, 'counters/students');
      return ''; // unreachable
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const finalUser = auth.currentUser;
      if (!finalUser) throw new Error("Authentication failed");

      if (mobileNumber.length !== 10 || whatsappNumber.length !== 10) {
        throw new Error("Mobile and WhatsApp numbers must be 10 digits");
      }

      if (!finalUser.email) {
        throw new Error("Email is required for registration. Please ensure your Google account has an email.");
      }

      let photoURL = photoPreview;
      if (photo) {
        const photoRef = ref(storage, `profiles/${finalUser.uid}`);
        await uploadBytes(photoRef, photo);
        photoURL = await getDownloadURL(photoRef);
      }

      await updateProfile(finalUser, { displayName: name, photoURL });

      const studentId = await generateStudentId();
      const userPath = `users/${finalUser.uid}`;
      
      try {
        await setDoc(doc(db, 'users', finalUser.uid), {
          uid: finalUser.uid,
          name,
          email: finalUser.email,
          studentId,
          className,
          motherName,
          mobileNumber: `+91 ${mobileNumber}`,
          whatsappNumber: `+91 ${whatsappNumber}`,
          photoURL: photoURL || null,
          role: finalUser.email === 'prshntshukla063@gmail.com' ? 'admin' : 'student',
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, Operation.WRITE, userPath);
      }

      setSuccess("You have successfully registered!");
      setTimeout(() => onComplete(), 3000);
    } catch (err: any) {
      console.error(err);
      try {
        const parsed = JSON.parse(err.message);
        setError(`Permission Error: ${parsed.operationType} at ${parsed.path}. Please contact admin.`);
      } catch {
        setError(err.message || "An error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onCancel}
          className="flex items-center gap-2 text-slate-500 hover:text-brand-navy mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">Back to Home</span>
        </button>

        <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid lg:grid-cols-5">
            {/* Sidebar info */}
            <div className="lg:col-span-2 bg-brand-navy p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-brand-orange/20 rounded-2xl flex items-center justify-center mb-8">
                  <GraduationCap size={32} className="text-brand-orange" />
                </div>
                <h1 className="text-3xl font-black mb-6 leading-tight">
                  Start Your <br/>
                  <span className="text-brand-orange">Journey</span> Today
                </h1>
                <p className="text-slate-300 text-lg mb-12">
                  Complete your registration to access online classes, study materials, and track your progress.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <ShieldCheck size={20} className="text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold">Verified Account</h4>
                      <p className="text-xs text-slate-400">Secure student identity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Sparkles size={20} className="text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-bold">Elite Resources</h4>
                      <p className="text-xs text-slate-400">Premium study content</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange opacity-10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Form Content */}
            <div className="lg:col-span-3 p-12">
              <AnimatePresence mode="wait">
                {!isGoogleCompletion && !authSuccess ? (
                  <motion.div 
                    key="auth"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                      <Sparkles size={40} className="text-brand-orange" />
                    </div>
                    <h2 className="text-2xl font-black text-brand-navy mb-4">Complete Your Signup</h2>
                    <p className="text-slate-500 mb-8 max-w-xs">Use your Google account to create a secure student profile instantly.</p>
                    
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl w-full">
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleGoogleSignup}
                      disabled={isLoading}
                      className="w-full max-w-sm py-4 bg-white border-2 border-slate-100 flex items-center justify-center gap-4 rounded-2xl font-bold hover:bg-slate-50 transition-all group disabled:opacity-50"
                    >
                      {isLoading ? <Loader2 className="animate-spin text-brand-orange" /> : (
                        <>
                          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                          <span className="text-slate-700">Sign Up with Google</span>
                        </>
                      )}
                    </button>
                    
                    <p className="text-[10px] text-slate-400 mt-8 uppercase font-black tracking-widest leading-loose">
                      By signing up, you agree to our <br/>
                      <span className="text-brand-orange">Terms of Service</span> and <span className="text-brand-orange">Privacy Policy</span>
                    </p>
                  </motion.div>
                ) : authSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl font-black text-brand-navy mb-2">Successfully Signup!</h2>
                    <p className="text-slate-500">Redirecting to profile details...</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="mb-10">
                      <h2 className="text-2xl font-black text-brand-navy">Complete Your Profile</h2>
                      <p className="text-slate-500 mt-2">Mandatory details for identity verification.</p>
                    </div>

                    {error && (
                      <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    {success ? (
                      <div className="p-6 bg-green-50 border border-green-100 rounded-3xl flex items-start gap-4 text-green-700">
                        <CheckCircle2 size={24} className="shrink-0 mt-1" />
                        <div>
                          <h4 className="font-black text-lg">Registration Successful!</h4>
                          <p className="text-sm opacity-90">{success}</p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Photo Upload */}
                        <div className="flex flex-col items-center sm:items-start group">
                          <div 
                            onClick={() => !isLoading && fileInputRef.current?.click()}
                            className="w-32 h-32 rounded-[2rem] bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center cursor-pointer overflow-hidden relative"
                          >
                            {photoPreview ? (
                              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <Camera size={40} className="text-slate-300 group-hover:text-brand-orange transition-colors" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <span className="text-[10px] text-white font-black uppercase tracking-widest px-2 py-1 bg-brand-orange rounded">Upload</span>
                            </div>
                          </div>
                          <input 
                            type="file" ref={fileInputRef} className="hidden" 
                            accept="image/*" onChange={handlePhotoChange} disabled={isLoading}
                          />
                          <div className="mt-4 text-center sm:text-left">
                            <p className="text-sm font-black text-brand-navy">Profile Photo / पासपोर्ट फोटो</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                              <User size={14} className="text-brand-orange" /> Student Full Name
                            </label>
                            <input
                              type="text" required value={name} onChange={(e) => setName(e.target.value)}
                              className="input-field rounded-2xl bg-slate-50"
                              placeholder="Full Name" disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                              <UserCircle size={14} className="text-brand-orange" /> Mother's Name
                            </label>
                            <input
                              type="text" required value={motherName} onChange={(e) => setMotherName(e.target.value)}
                              className="input-field rounded-2xl bg-slate-50"
                              placeholder="Mother's Name" disabled={isLoading}
                            />
                          </div>

                          <div className="sm:col-span-2 space-y-2">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                              <BookOpen size={14} className="text-brand-orange" /> Class or Course
                            </label>
                            <select
                              required value={className} onChange={(e) => setClassName(e.target.value)}
                              className="input-field rounded-2xl bg-slate-50"
                              disabled={isLoading}
                            >
                              <option value="">-- Choose One --</option>
                              <option value="Class 6th">Class 6th</option>
                              <option value="Class 7th">Class 7th</option>
                              <option value="Class 8th">Class 8th</option>
                              <option value="Class 9th">Class 9th</option>
                              <option value="Class 10th">Class 10th</option>
                              <option value="SSC">SSC (CGL, CHSL, MTS)</option>
                              <option value="Banking">Banking (IBPS, SBI, RRB)</option>
                              <option value="Spoken English">Spoken English & Personality Dev.</option>
                              <option value="Foundation Batch">Foundation Batch</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                              <Phone size={14} className="text-brand-orange" /> Mobile Number
                            </label>
                            <div className="flex gap-2">
                              <div className="flex items-center px-4 bg-slate-100 rounded-2xl font-bold text-slate-500">+91</div>
                              <input
                                type="tel" required value={mobileNumber} 
                                onChange={(e) => handlePhoneInput(e.target.value, setMobileNumber)}
                                className="input-field rounded-2xl bg-slate-100"
                                placeholder="10 Digit Number" disabled={isLoading}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-2">
                              <Phone size={14} className="text-green-600" /> WhatsApp Number
                            </label>
                            <div className="flex gap-2">
                              <div className="flex items-center px-4 bg-slate-100 rounded-2xl font-bold text-slate-500">+91</div>
                              <input
                                type="tel" required value={whatsappNumber} 
                                onChange={(e) => handlePhoneInput(e.target.value, setWhatsappNumber)}
                                className="input-field rounded-2xl bg-slate-100"
                                placeholder="10 Digit Number" disabled={isLoading}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-brand-navy text-white text-lg font-black uppercase tracking-widest rounded-2xl hover:bg-brand-navy-light shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                          >
                            {isLoading ? (
                              <Loader2 size={24} className="animate-spin" />
                            ) : (
                              <>
                                <CheckCircle2 size={24} />
                                <span>Complete Registration</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
