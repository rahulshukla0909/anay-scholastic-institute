import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, IdCard, Loader2, AlertCircle, Phone, BookOpen, UserCircle, Camera, CheckCircle2 } from 'lucide-react';
import { auth, db, storage } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp, 
  collection, 
  query, 
  where, 
  getDocs,
  runTransaction
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AuthMode } from '../types';
import { handleFirestoreError, Operation } from '../lib/errorHandlers';

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose }) => {
  const [currentMode, setCurrentMode] = useState<'signin' | 'signup'>(mode === 'signin' ? 'signin' : 'signup');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (currentMode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        let photoURL = null;
        if (photo) {
          const photoRef = ref(storage, `profiles/${user.uid}`);
          await uploadBytes(photoRef, photo);
          photoURL = await getDownloadURL(photoRef);
        }

        await updateProfile(user, { displayName: name, photoURL });

        const studentId = await generateStudentId();
        
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          name,
          email,
          studentId,
          className,
          motherName,
          mobileNumber,
          whatsappNumber,
          photoURL,
          role: (email === 'prshntshukla063@gmail.com' || email === 'anayscholasticinstitute@gmail.com') ? 'admin' : 'student',
          createdAt: serverTimestamp(),
        });

        setSuccess(`Registration successful! Your Student ID is: ${studentId}`);
        setTimeout(() => onClose(), 3000);
      } else {
        let loginEmail = email;

        if (!email.includes('@') && !isAdminMode) {
          const q = query(collection(db, 'users'), where('studentId', '==', email.trim()));
          const querySnapshot = await getDocs(q);
          
          if (querySnapshot.empty) {
            throw new Error("Student ID not found. Please register or check your ID.");
          }
          
          loginEmail = querySnapshot.docs[0].data().email;
        }

        await signInWithEmailAndPassword(auth, loginEmail, password);
        onClose();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'none') return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="auth-card w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-20"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-navy">
              {currentMode === 'signup' ? 'Student Registration' : (isAdminMode ? 'Admin Portal' : 'Student Login')}
            </h2>
            <p className="text-slate-500 mt-2">
              {currentMode === 'signup' 
                ? 'Join Anay Scholastic Institute for academic excellence' 
                : 'Enter your credentials to access your dashboard'}
            </p>
          </div>

          {!isAdminMode && (
            <>
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors mb-6"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-slate-400 font-medium">Or use your credentials</span></div>
              </div>
            </>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-start gap-3 text-green-600 text-sm">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                  <Mail size={14} /> 
                  {isAdminMode ? 'Admin Email' : 'Student ID or Email'}
                </label>
                <input
                  type={!isAdminMode ? 'text' : 'email'}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder={isAdminMode ? 'admin@anayinstitute.com' : 'ASI-2025-001 or email@example.com'}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center gap-2">
                  <Lock size={14} /> Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`${isAdminMode ? 'btn-primary' : 'btn-secondary'} w-full py-3 mt-4 flex items-center justify-center gap-2`}
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                 isAdminMode ? 'Login as Admin' : 'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-sm text-slate-500">
            New student?
            <button 
              onClick={() => {
                onClose();
                // Trigger navigation to signup
                const signupBtn = document.querySelector('[data-signup="true"]') as HTMLElement;
                if (signupBtn) signupBtn.click();
              }}
              className="text-brand-orange font-bold hover:underline"
            >
              Register Here
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
