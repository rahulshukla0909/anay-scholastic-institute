import React from 'react';
import { InstituteLogo } from './Logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onAboutClick?: () => void;
  onResultsClick?: () => void;
  onFeedbackClick?: () => void;
  onLegalClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAboutClick, onResultsClick, onFeedbackClick, onLegalClick }) => {
  return (
    <footer className="bg-brand-navy text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <InstituteLogo className="w-12 h-12" />
            <div className="flex flex-col">
              <span className="font-bold text-white text-lg">ANAY SCHOLASTIC</span>
              <span className="text-brand-orange text-[10px] font-bold tracking-[0.2em] uppercase">Institute</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Pioneering educational excellence through innovative teaching methods and student-centric focus.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-brand-orange transition-colors"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-brand-orange transition-colors"><Twitter size={18} /></a>
            <a href="https://www.instagram.com/anay_scholastic_institute/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-brand-orange transition-colors"><Instagram size={18} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-brand-orange transition-colors"><Linkedin size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li>
              <button 
                onClick={onAboutClick}
                className="hover:text-brand-orange transition-colors cursor-pointer text-left w-full"
              >
                Our Story
              </button>
            </li>
            <li>
              <button 
                onClick={onAboutClick}
                className="hover:text-brand-orange transition-colors cursor-pointer text-left w-full"
              >
                Meet Our Founder
              </button>
            </li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Academic Programs</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Admission Process</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Faculty Directory</a></li>
            <li>
              <button 
                onClick={onResultsClick}
                className="hover:text-brand-orange transition-colors cursor-pointer text-left w-full"
              >
                Success Stories
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Support</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-brand-orange transition-colors">Help Center</a></li>
            <li>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-brand-orange transition-colors"
              >
                Top of Page
              </button>
            </li>
            <li>
              <button 
                onClick={onLegalClick}
                className="hover:text-brand-orange transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button 
                onClick={onLegalClick}
                className="hover:text-brand-orange transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button 
                onClick={onFeedbackClick}
                className="hover:text-brand-orange transition-colors"
              >
                Feedback
              </button>
            </li>
          </ul>
        </div>

        <div id="contact-info">
          <h4 className="font-bold text-lg mb-6">Contact Us</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-orange shrink-0" />
              <span>Near Shiv Mandir, Mahaveer Residency, Jhansi Road, Tikamgarh, 472001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-orange shrink-0" />
              <span>+91 8602306316, +91 8827230149</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-orange shrink-0" />
              <span>anayscholasticinstitute@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="text-center text-slate-500 text-xs">
        <p>© 2024 ANAY SCHOLASTIC INSTITUTE. All rights reserved. Designed for Excellence.</p>
      </div>
    </footer>
  );
};
