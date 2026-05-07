import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Receipt, IndianRupee, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

interface LegalSectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const LegalSection: React.FC<LegalSectionProps> = ({ id, title, icon, children }) => (
  <section id={id} className="py-20 bg-white border-b border-slate-100 italic-none">
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-brand-orange text-white rounded-xl flex items-center justify-center shadow-lg">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-brand-navy">{title}</h2>
      </div>
      <div className="prose prose-slate max-w-none prose-headings:text-brand-navy prose-strong:text-brand-navy text-slate-600 leading-relaxed space-y-6">
        {children}
      </div>
    </div>
  </section>
);

export const Legal: React.FC = () => {
  return (
    <div className="bg-slate-50">
      {/* Privacy Policy */}
      <LegalSection 
        id="privacy-policy" 
        title="Privacy Policy" 
        icon={<ShieldCheck size={28} />}
      >
        <p className="text-sm text-slate-400 font-medium">Effective Date: May 4, 2024</p>
        <p>
          At <strong>Anay Scholastic Institute</strong>, we are committed to protecting the privacy and security of our students, parents, and visitors. This policy explains how we handle your personal information.
        </p>

        <h3 className="text-xl font-bold mt-8">1. Information We Collect</h3>
        <p>We may collect the following types of information when you register or use our services:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Details:</strong> Full Name, Email Address, and Phone Number.</li>
          <li><strong>Academic Info:</strong> Class, Course preferences, and Academic history.</li>
          <li><strong>Transactional Data:</strong> Payment details for fee processing.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, and device information to improve our website experience.</li>
        </ul>

        <h3 className="text-xl font-bold mt-8">2. How We Use Your Information</h3>
        <p>Your data is used solely for educational and administrative purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To manage student enrollment and registrations.</li>
          <li>To provide classes, study materials, and conduct test series.</li>
          <li>To send results, performance updates, and important notifications.</li>
          <li>To communicate via Calls, SMS, WhatsApp, or Email regarding institute activities.</li>
        </ul>

        <h3 className="text-xl font-bold mt-8">3. Data Protection & Sharing</h3>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-blue-800 font-medium mb-0">
            We do not sell, trade, or rent your personal information to third parties.
          </p>
        </div>
        <p>
          Data is only shared with trusted service providers (like payment gateways) to process transactions or with legal authorities if required by law. We implement industry-standard security measures to prevent unauthorized access.
        </p>

        <h3 className="text-xl font-bold mt-8">4. Student & Parent Rights</h3>
        <p>You have the right to request access to your data, ask for corrections to inaccurate information, or request the deletion of your account/data from our records.</p>
      </LegalSection>

      {/* Refund Policy */}
      <LegalSection 
        id="refund-policy" 
        title="Refund Policy" 
        icon={<Receipt size={28} />}
      >
        <p className="text-sm text-slate-400 font-medium">Effective Date: May 4, 2024</p>
        
        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl mb-8">
          <h4 className="text-red-700 font-bold mb-2 flex items-center gap-2">
            <AlertCircle size={20} />
            Important Notice
          </h4>
          <p className="text-red-600 font-bold text-lg mb-0">
            Fees once paid are non-refundable under any circumstances, except in specific approved cases.
          </p>
        </div>

        <h3 className="text-xl font-bold">1. General Policy</h3>
        <p>
          All fees paid for admissions, courses, test series, or any other educational services at Anay Scholastic Institute are final and non-refundable.
        </p>

        <h3 className="text-xl font-bold mt-8">2. Special Exceptional Cases</h3>
        <p>Refunds may be considered solely at the discretion of the management in the following situations:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Duplicate payments made due to technical errors.</li>
          <li>Incorrect transaction amounts processed via the website.</li>
          <li>Failure to provide services due to internal institute-related issues.</li>
        </ul>

        <h3 className="text-xl font-bold mt-8">3. Non-Refundable Situations</h3>
        <p>No refunds will be provided for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Voluntary withdrawal by the student.</li>
          <li>Absence from classes or missed examinations.</li>
          <li>Change of mind after enrollment.</li>
          <li>Performance or results not meeting personal expectations.</li>
        </ul>

        <h3 className="text-xl font-bold mt-8">4. Claim Process</h3>
        <p>To request a refund for eligible cases, please contact the administrative office within <strong>3–5 days</strong> of the transaction with valid proof of payment.</p>
      </LegalSection>

      {/* Contact Bar */}
      <div className="py-12 bg-white flex flex-col items-center">
        <h3 className="text-xl font-bold text-brand-navy mb-6">Need assistance?</h3>
        <div className="flex flex-wrap justify-center gap-8 italic-none">
          <div className="flex items-center gap-2 text-slate-600">
            <Phone size={18} className="text-brand-orange" />
            <span>+91 8602306316, +91 8827230149</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin size={18} className="text-brand-orange" />
            <span>Near Shiv Mandir, Mahaveer Residency, Jhansi Road, Tikamgarh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
