import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  BookOpen, 
  FileText, 
  ClipboardList, 
  Search, 
  ArrowRight, 
  Book, 
  Layers, 
  CheckCircle, 
  ChevronRight, 
  ExternalLink,
  Sparkles,
  Award
} from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  fileSize: string;
  fileType: string;
  downloadUrl: string;
  branch?: 'Chemistry' | 'Biology' | 'Physics' | 'Environment' | 'History' | 'Geography' | 'Civics' | 'Economics';
  medium?: 'English' | 'Hindi';
}

export const Downloads: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'ncert' | 'test-series' | 'notes' | 'pyq'>('all');
  const [pyqBoard, setPyqBoard] = useState<'cbse' | 'mp'>('cbse');
  const [searchQuery, setSearchQuery] = useState('');
  const [notesSubject, setNotesSubject] = useState<'all' | 'science' | 'sst' | 'math'>('all');
  const [scienceBranch, setScienceBranch] = useState<'all' | 'Chemistry' | 'Biology' | 'Physics' | 'Environment'>('all');
  const [sstBranch, setSstBranch] = useState<'all' | 'History' | 'Geography' | 'Civics' | 'Economics'>('all');
  const [notesMedium, setNotesMedium] = useState<'all' | 'English' | 'Hindi'>('all');

  // NCERT Class 10th & 9th Books
  const ncertBooks: ResourceItem[] = [
    {
      id: 'ncert-math-10',
      title: 'Mathematics Textbook (Full Book)',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '15.4 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?jess1=0-15'
    },
    {
      id: 'ncert-sci-10',
      title: 'Science Textbook (Full Book)',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '18.2 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?jess2=0-13'
    },
    {
      id: 'ncert-sst-history-10',
      title: 'India & Contemporary World II (History)',
      subject: 'Social Science',
      classLevel: 'Class 10th',
      fileSize: '12.1 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?jess3=0-5'
    },
    {
      id: 'ncert-english-10',
      title: 'First Flight (English Textbook)',
      subject: 'English',
      classLevel: 'Class 10th',
      fileSize: '8.5 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?jeff1=0-11'
    },
    {
      id: 'ncert-math-9',
      title: 'Mathematics Textbook (Class 9th)',
      subject: 'Mathematics',
      classLevel: 'Class 9th',
      fileSize: '14.1 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?iemh1=0-12'
    },
    {
      id: 'ncert-sci-9',
      title: 'Science Textbook (Class 9th)',
      subject: 'Science',
      classLevel: 'Class 9th',
      fileSize: '16.5 MB',
      fileType: 'PDF',
      downloadUrl: 'https://ncert.nic.in/textbook.php?iesc1=0-12'
    }
  ];

  // Revision & Chapter Notes
  const revisionNotes: ResourceItem[] = [
    // --- Science Revision Notes (English Medium) ---
    // Chemistry (English)
    {
      id: 'sc-en-chem-ch1',
      title: 'Chemistry Chapter 1: Chemical Reactions and Equations',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Chemistry',
      medium: 'English'
    },
    {
      id: 'sc-en-chem-ch2',
      title: 'Chemistry Chapter 2: Acids, Bases and Salts',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Chemistry',
      medium: 'English'
    },
    {
      id: 'sc-en-chem-ch3',
      title: 'Chemistry Chapter 3: Metals and Non-Metals',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Chemistry',
      medium: 'English'
    },
    {
      id: 'sc-en-chem-ch4',
      title: 'Chemistry Chapter 4: Carbon and Its Compounds',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.5 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Chemistry',
      medium: 'English'
    },
    // Biology (English)
    {
      id: 'sc-en-bio-ch5',
      title: 'Biology Chapter 5: Life Processes',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.8 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Biology',
      medium: 'English'
    },
    {
      id: 'sc-en-bio-coord',
      title: 'Biology Chapter 6: Control and Coordination',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.7 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Biology',
      medium: 'English'
    },
    {
      id: 'sc-en-bio-reprod',
      title: 'Biology Chapter 7: How Do Organisms Reproduce?',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Biology',
      medium: 'English'
    },
    {
      id: 'sc-en-bio-heredity',
      title: 'Biology Chapter 8: Heredity and Evolution',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Biology',
      medium: 'English'
    },
    // Physics (English)
    {
      id: 'sc-en-phy-light',
      title: 'Physics Chapter 9: Light – Reflection and Refraction',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '3.0 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Physics',
      medium: 'English'
    },
    {
      id: 'sc-en-phy-eye',
      title: 'Physics Chapter 10: The Human Eye and the Colourful World',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.6 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Physics',
      medium: 'English'
    },
    {
      id: 'sc-en-phy-elec',
      title: 'Physics Chapter 11: Electricity',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.2 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Physics',
      medium: 'English'
    },
    {
      id: 'sc-en-phy-mag',
      title: 'Physics Chapter 12: Magnetic Effects of Electric Current',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Physics',
      medium: 'English'
    },
    // Environment (English)
    {
      id: 'sc-en-env-our',
      title: 'Environment Chapter 13: Our Environment',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Environment',
      medium: 'English'
    },

    // --- Science Revision Notes (Hindi Medium - हिन्दी माध्यम) ---
    // Chemistry (Hindi)
    {
      id: 'sc-hi-chem-ch1',
      title: 'रसायन विज्ञान Chapter 1: रासायनिक अभिक्रियाएँ एवं समीकरण',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Chemistry',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-chem-ch2',
      title: 'रसायन विज्ञान Chapter 2: अम्ल, क्षारक एवं लवण',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.2 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Chemistry',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-chem-ch3',
      title: 'रसायन विज्ञान Chapter 3: धातु एवं अधातु',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Chemistry',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-chem-ch4',
      title: 'रसायन विज्ञान Chapter 4: कार्बन एवं उसके यौगिक',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.6 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Chemistry',
      medium: 'Hindi'
    },
    // Biology (Hindi)
    {
      id: 'sc-hi-bio-ch5',
      title: 'जीव विज्ञान Chapter 5: जैव प्रक्रम',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.9 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Biology',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-bio-coord',
      title: 'जीव विज्ञान Chapter 6: नियंत्रण एवं समन्वय',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Biology',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-bio-reprod',
      title: 'जीव विज्ञान Chapter 7: जीव जनन कैसे करते हैं?',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Biology',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-bio-heredity',
      title: 'जीव विज्ञान Chapter 8: आनुवंशिकता एवं जैव विकास',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Biology',
      medium: 'Hindi'
    },
    // Physics (Hindi)
    {
      id: 'sc-hi-phy-light',
      title: 'भौतिक विज्ञान Chapter 9: प्रकाश – परावर्तन तथा अपवर्तन',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '3.1 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Physics',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-phy-eye',
      title: 'भौतिक विज्ञान Chapter 10: मानव नेत्र तथा रंग-बिरंगी दुनिया',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.7 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Physics',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-phy-elec',
      title: 'भौतिक विज्ञान Chapter 11: विद्युत',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Physics',
      medium: 'Hindi'
    },
    {
      id: 'sc-hi-phy-mag',
      title: 'भौतिक विज्ञान Chapter 12: विद्युत धारा के चुंबकीय प्रभाव',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '2.5 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Physics',
      medium: 'Hindi'
    },
    // Environment (Hindi)
    {
      id: 'sc-hi-env-our',
      title: 'पर्यावरण Chapter 13: हमारा पर्यावरण',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.3 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Environment',
      medium: 'Hindi'
    },

    // --- SST Revision Notes (English Medium) ---
    // History (English)
    {
      id: 'sst-en-hist-ch1',
      title: 'History Chapter 1: The Rise of Nationalism in Europe',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.5 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'English'
    },
    {
      id: 'sst-en-hist-ch2',
      title: 'History Chapter 2: Nationalism in India',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.7 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'English'
    },
    {
      id: 'sst-en-hist-ch3',
      title: 'History Chapter 3: The Making of a Global World',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'English'
    },
    {
      id: 'sst-en-hist-ch4',
      title: 'History Chapter 4: The Age of Industrialisation',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'English'
    },
    {
      id: 'sst-en-hist-ch5',
      title: 'History Chapter 5: Print Culture and the Modern World',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'English'
    },
    // Geography (English)
    {
      id: 'sst-en-geo-ch1',
      title: 'Geography Chapter 1: Resources and Development',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'English'
    },
    {
      id: 'sst-en-geo-ch2',
      title: 'Geography Chapter 2: Forest and Wildlife Resources',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'English'
    },
    {
      id: 'sst-en-geo-ch3',
      title: 'Geography Chapter 3: Water Resources',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.5 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'English'
    },
    {
      id: 'sst-en-geo-ch4',
      title: 'Geography Chapter 4: Agriculture',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.2 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'English'
    },
    {
      id: 'sst-en-geo-ch5',
      title: 'Geography Chapter 5: Minerals and Energy Resources',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.6 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'English'
    },
    {
      id: 'sst-en-geo-ch6',
      title: 'Geography Chapter 6: Manufacturing Industries',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'English'
    },
    {
      id: 'sst-en-geo-ch7',
      title: 'Geography Chapter 7: Lifelines of National Economy',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'English'
    },
    // Civics (English)
    {
      id: 'sst-en-civ-ch1',
      title: 'Political Science Chapter 1: Power Sharing',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.7 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'English'
    },
    {
      id: 'sst-en-civ-ch2',
      title: 'Political Science Chapter 2: Federalism',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'English'
    },
    {
      id: 'sst-en-civ-ch3',
      title: 'Political Science Chapter 3: Gender, Religion and Caste',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'English'
    },
    {
      id: 'sst-en-civ-ch4',
      title: 'Political Science Chapter 4: Political Parties',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'English'
    },
    {
      id: 'sst-en-civ-ch5',
      title: 'Political Science Chapter 5: Outcomes of Democracy',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.6 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'English'
    },
    // Economics (English)
    {
      id: 'sst-en-eco-ch1',
      title: 'Economics Chapter 1: Development',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'English'
    },
    {
      id: 'sst-en-eco-ch2',
      title: 'Economics Chapter 2: Sectors of the Indian Economy',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.2 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'English'
    },
    {
      id: 'sst-en-eco-ch3',
      title: 'Economics Chapter 3: Money and Credit',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'English'
    },
    {
      id: 'sst-en-eco-ch4',
      title: 'Economics Chapter 4: Globalisation and the Indian Economy',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'English'
    },
    {
      id: 'sst-en-eco-ch5',
      title: 'Economics Chapter 5: Consumer Rights',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.5 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'English'
    },

    // --- SST Revision Notes (Hindi Medium - हिन्दी माध्यम) ---
    // History (Hindi)
    {
      id: 'sst-hi-hist-ch1',
      title: 'इतिहास Chapter 1: यूरोप में राष्ट्रवाद का उदय',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.6 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-hist-ch2',
      title: 'इतिहास Chapter 2: भारत में राष्ट्रवाद',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.8 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-hist-ch3',
      title: 'इतिहास Chapter 3: भूमंडलीकृत विश्व का बनना',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.2 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-hist-ch4',
      title: 'इतिहास Chapter 4: औद्योगीकरण का युग',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-hist-ch5',
      title: 'इतिहास Chapter 5: मुद्रण संस्कृति और आधुनिक दुनिया',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'History',
      medium: 'Hindi'
    },
    // Geography (Hindi)
    {
      id: 'sst-hi-geo-ch1',
      title: 'भूगोल Chapter 1: संसाधन एवं विकास',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.5 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-geo-ch2',
      title: 'भूगोल Chapter 2: वन एवं वन्य जीव संसाधन',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-geo-ch3',
      title: 'भूगोल Chapter 3: जल संसाधन',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.6 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-geo-ch4',
      title: 'भूगोल Chapter 4: कृषि',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-geo-ch5',
      title: 'भूगोल Chapter 5: खनिज तथा ऊर्जा संसाधन',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.7 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-geo-ch6',
      title: 'भूगोल Chapter 6: विनिर्माण उद्योग',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-geo-ch7',
      title: 'भूगोल Chapter 7: राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएँ',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Geography',
      medium: 'Hindi'
    },
    // Civics (Hindi)
    {
      id: 'sst-hi-civ-ch1',
      title: 'नागरिक शास्त्र Chapter 1: सत्ता की साझेदारी',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-civ-ch2',
      title: 'नागरिक शास्त्र Chapter 2: संघवाद',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-civ-ch3',
      title: 'नागरिक शास्त्र Chapter 3: लैंगिक, धर्म और जाति',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.2 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-civ-ch4',
      title: 'नागरिक शास्त्र Chapter 4: राजनीतिक दल',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-civ-ch5',
      title: 'नागरिक शास्त्र Chapter 5: लोकतंत्र के परिणाम',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.7 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Civics',
      medium: 'Hindi'
    },
    // Economics (Hindi)
    {
      id: 'sst-hi-eco-ch1',
      title: 'अर्थशास्त्र Chapter 1: विकास',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.9 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-eco-ch2',
      title: 'अर्थशास्त्र Chapter 2: भारतीय अर्थव्यवस्था के क्षेत्रक',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-eco-ch3',
      title: 'अर्थशास्त्र Chapter 3: मुद्रा और साख',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-eco-ch4',
      title: 'अर्थशास्त्र Chapter 4: वैश्वीकरण और भारतीय अर्थव्यवस्था',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'Hindi'
    },
    {
      id: 'sst-hi-eco-ch5',
      title: 'अर्थशास्त्र Chapter 5: उपभोक्ता अधिकार',
      subject: 'SST',
      classLevel: 'Class 10th',
      fileSize: '1.6 MB',
      fileType: 'PDF',
      downloadUrl: '#',
      branch: 'Economics',
      medium: 'Hindi'
    },
    // --- Mathematics Revision Notes ---
    {
      id: 'notes-quad-eq',
      title: 'Quadratic Equations Formula Guide & Short Notes',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '1.8 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'notes-real-nums',
      title: 'Real Numbers Chapter Summary Class 10th',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '1.2 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'notes-trigo-formulas',
      title: 'Trigonometry Value Table & Identities Formula Sheet',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '2.0 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    }
  ];

  // Test Series & Worksheets
  const testSeries: ResourceItem[] = [
    {
      id: 'test-math-mock1',
      title: 'Class 10th Mathematics Full Syllabus Mock Test - I',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '1.1 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'test-sci-mock1',
      title: 'Class 10th Science Full Syllabus Board Specimen Paper',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '1.5 MB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'test-math-chapwise',
      title: 'Algebra and Arithmetic Progression Chapter-wise Worksheet',
      subject: 'Mathematics',
      classLevel: 'Class 10th',
      fileSize: '850 KB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    },
    {
      id: 'test-sci-acid',
      title: 'Acids, Bases, and Salts Complete Chapter Practice Sheet',
      subject: 'Science',
      classLevel: 'Class 10th',
      fileSize: '920 KB',
      fileType: 'PDF',
      downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
    }
  ];

  // Previous Year Papers (PYQ) for CBSE and MP Board
  const previousYearPapers = {
    cbse: [
      {
        id: 'pyq-cbse-math-2024',
        title: 'CBSE Class 10th Mathematics Standard Question Paper 2024',
        subject: 'Mathematics',
        classLevel: 'Class 10th',
        fileSize: '2.1 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-cbse-sci-2024',
        title: 'CBSE Class 10th Science Question Paper 2024 (All Sets)',
        subject: 'Science',
        classLevel: 'Class 10th',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-cbse-math-2023',
        title: 'CBSE Class 10th Mathematics Question Paper 2023',
        subject: 'Mathematics',
        classLevel: 'Class 10th',
        fileSize: '1.9 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-cbse-sci-2023',
        title: 'CBSE Class 10th Science Question Paper 2023',
        subject: 'Science',
        classLevel: 'Class 10th',
        fileSize: '2.3 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      }
    ],
    mp: [
      {
        id: 'pyq-mp-math-2024',
        title: 'MP Board Class 10th Mathematics (Ganit) Question Paper 2024',
        subject: 'Mathematics',
        classLevel: 'Class 10th',
        fileSize: '1.8 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-mp-sci-2024',
        title: 'MP Board Class 10th Science (Vigyan) Question Paper 2024',
        subject: 'Science',
        classLevel: 'Class 10th',
        fileSize: '2.0 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-mp-math-2023',
        title: 'MP Board Class 10th Mathematics (Ganit) Question Paper 2023',
        subject: 'Mathematics',
        classLevel: 'Class 10th',
        fileSize: '1.7 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      },
      {
        id: 'pyq-mp-sci-2023',
        title: 'MP Board Class 10th Science (Vigyan) Question Paper 2023',
        subject: 'Science',
        classLevel: 'Class 10th',
        fileSize: '2.1 MB',
        fileType: 'PDF',
        downloadUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173'
      }
    ]
  };

  // Handler to force file opening / alert
  const handleDownload = (item: ResourceItem) => {
    window.open(item.downloadUrl, '_blank');
  };

  // Filter Items Based on Tab and Search
  const matchesSearch = (item: ResourceItem) => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query) || 
           item.subject.toLowerCase().includes(query) ||
           item.classLevel.toLowerCase().includes(query);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Hero Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-black tracking-widest uppercase rounded-full mb-4 border border-brand-orange/20"
          >
            <Sparkles size={14} />
            <span>Academic Excellence Resources</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold text-brand-navy tracking-tight mb-4"
          >
            Free Study Material & <span className="text-brand-orange underline decoration-wavy decoration-2">Downloads</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg font-medium leading-relaxed"
          >
            Access official NCERT books class wise, custom mock test series, chapter notes, and past board papers optimized for score acceleration.
          </motion.p>
        </div>

        {/* Search Bar & Primary Navigation Tags */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-12">
          
          {/* Tag Selector */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Resources', icon: <Layers size={16} /> },
              { id: 'ncert', label: 'NCERT Books', icon: <BookOpen size={16} /> },
              { id: 'notes', label: 'Revision Notes', icon: <FileText size={16} /> },
              { id: 'test-series', label: 'Test Series', icon: <ClipboardList size={16} /> },
              { id: 'pyq', label: 'Previous Year Papers', icon: <Award size={16} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 transform active:scale-95 ${
                  activeTab === tab.id 
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-[1.02]' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-brand-navy'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative md:w-80 w-full">
            <input
              type="text"
              placeholder="Search subjects or chapters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-2xl text-slate-700 font-bold placeholder-slate-400 focus:outline-none transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>

        {/* SECTION 1: Previous Year Question Papers (With CBSE & MP Board Separate Options) */}
        {(activeTab === 'all' || activeTab === 'pyq') && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 bg-gradient-to-br from-brand-navy to-slate-900 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden"
          >
            {/* Ambient Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange opacity-10 rounded-full blur-3xl translate-x-12 -translate-y-12" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 opacity-10 rounded-full blur-3xl -translate-x-12 translate-y-12" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 pb-6 border-b border-white/10">
              <div>
                <span className="text-brand-orange font-black uppercase tracking-widest text-xs inline-block mb-2">Exams & Boards archive</span>
                <h2 className="text-3xl font-extrabold tracking-tight">Previous Year Solved Board Papers</h2>
                <p className="text-slate-350 text-sm mt-1 max-w-lg">
                  Practice authentic question papers from the past 3 seasons to master actual exam patterns.
                </p>
              </div>

              {/* CBSE vs MP Board Selection Controls */}
              <div className="flex bg-white/5 border border-white/15 p-1 rounded-2xl self-stretch sm:self-auto">
                <button
                  onClick={() => setPyqBoard('cbse')}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    pyqBoard === 'cbse' 
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CheckCircle size={16} className={pyqBoard === 'cbse' ? 'opacity-100' : 'opacity-0'} />
                  <span>CBSE Board</span>
                </button>
                <button
                  onClick={() => setPyqBoard('mp')}
                  className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    pyqBoard === 'mp' 
                      ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CheckCircle size={16} className={pyqBoard === 'mp' ? 'opacity-100' : 'opacity-0'} />
                  <span>MP Board</span>
                </button>
              </div>
            </div>

            {/* PYQ Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="wait">
                {previousYearPapers[pyqBoard]
                  .filter(matchesSearch)
                  .map((paper, idx) => (
                    <motion.div
                      key={paper.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-orange/40 rounded-3xl p-6 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-1 bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-wider">
                            {paper.subject}
                          </span>
                          <span className="text-white/40 text-xs font-bold">{paper.classLevel}</span>
                        </div>
                        <h4 className="font-extrabold text-lg text-white group-hover:text-brand-orange transition-colors mb-4 line-clamp-2">
                          {paper.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="text-xs text-slate-450 font-semibold uppercase">
                          Size: {paper.fileSize} | Type: {paper.fileType}
                        </div>
                        <button
                          onClick={() => handleDownload(paper)}
                          className="flex items-center gap-1 text-brand-orange font-black text-sm group-hover:translate-x-1 transition-all"
                        >
                          <span>Download Paper</span>
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                }
              </AnimatePresence>
            </div>
            
            {previousYearPapers[pyqBoard].filter(matchesSearch).length === 0 && (
              <div className="text-center py-12 text-slate-450">
                No question papers matched your search query.
              </div>
            )}
          </motion.div>
        )}

        {/* SECTION 2: NCERT Book Series */}
        {(activeTab === 'all' || activeTab === 'ncert') && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-brand-orange/10 rounded-2xl text-brand-orange">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-brand-navy">Official NCERT Textbooks</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Direct Download from NCERT servers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ncertBooks.filter(matchesSearch).map((book, idx) => (
                <div 
                  key={book.id}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase border border-emerald-100">
                        {book.subject}
                      </span>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-wider">{book.classLevel}</span>
                    </div>

                    <h4 className="font-extrabold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-4">
                      {book.title}
                    </h4>
                  </div>

                  <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-450 font-semibold">{book.fileSize} • Direct Official Link</span>
                    <button
                      onClick={() => handleDownload(book)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-brand-navy hover:bg-brand-orange hover:text-white font-bold text-xs rounded-xl transition-all"
                    >
                      <span>Obtain Book</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {ncertBooks.filter(matchesSearch).length === 0 && (
              <p className="text-slate-500 font-bold text-center py-8">No NCERT books match your query.</p>
            )}
          </div>
        )}

        {/* SECTION 3: Chapter Revision Notes */}
        {(activeTab === 'all' || activeTab === 'notes') && (
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-brand-orange/10 rounded-2xl text-brand-orange">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-brand-navy">Revision & Chapter Summary Notes</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Carefully prepared for quick revision</p>
                </div>
              </div>

              {/* Sub-sections tabs for Science & SST */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl self-start md:self-auto border border-slate-200">
                {[
                  { id: 'all', label: 'All Subjects' },
                  { id: 'science', label: 'Science' },
                  { id: 'sst', label: 'SST' },
                  { id: 'math', label: 'Mathematics' }
                ].map(subTab => {
                  const isActive = notesSubject === subTab.id;
                  return (
                    <button
                      key={subTab.id}
                      onClick={() => setNotesSubject(subTab.id as any)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-navy text-white shadow-md'
                          : 'text-slate-600 hover:text-brand-navy hover:bg-slate-200/60'
                      }`}
                    >
                      {subTab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Science Specific Filters */}
            {notesSubject === 'science' && (
              <div className="bg-slate-50 border border-slate-100/80 p-5 rounded-3xl mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                {/* Branch selection */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-black text-brand-navy uppercase tracking-wider">Select Science Branch / शाखा चुनें</span>
                  <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl shadow-xs border border-slate-200/80">
                    {[
                      { id: 'all', label: 'All / सभी' },
                      { id: 'Chemistry', label: '🧪 Chemistry / रसायन' },
                      { id: 'Biology', label: '🌿 Biology / जीव' },
                      { id: 'Physics', label: '⚡ Physics / भौतिक' },
                      { id: 'Environment', label: '🌍 Environment / पर्यावरण' }
                    ].map(b => (
                      <button
                        key={b.id}
                        onClick={() => setScienceBranch(b.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          scienceBranch === b.id
                            ? 'bg-brand-orange text-white shadow-xs'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-brand-navy'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Medium toggle */}
                <div className="flex flex-col gap-2 md:items-end">
                  <span className="text-xs font-black text-brand-navy uppercase tracking-wider md:text-right">Study Medium / माध्यम</span>
                  <div className="flex gap-1.5 bg-white p-1 rounded-xl shadow-xs border border-slate-200/80">
                    {[
                      { id: 'all', label: 'All / सभी' },
                      { id: 'English', label: '🇬🇧 English Medium' },
                      { id: 'Hindi', label: '🇮🇳 हिन्दी माध्यम' }
                    ].map(med => (
                      <button
                        key={med.id}
                        onClick={() => setNotesMedium(med.id as any)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          notesMedium === med.id
                            ? 'bg-brand-navy text-white shadow-xs'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-brand-navy'
                        }`}
                      >
                        {med.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SST Specific Filters */}
            {notesSubject === 'sst' && (
              <div className="bg-slate-50 border border-slate-100/80 p-5 rounded-3xl mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                {/* Branch selection */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-black text-brand-navy uppercase tracking-wider">Select SST Branch / शाखा चुनें</span>
                  <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl shadow-xs border border-slate-200/80">
                    {[
                      { id: 'all', label: 'All / सभी' },
                      { id: 'History', label: '🏛️ History / इतिहास' },
                      { id: 'Geography', label: '🌍 Geography / भूगोल' },
                      { id: 'Civics', label: '🗳️ Civics / नागरिक शास्त्र' },
                      { id: 'Economics', label: '💰 Economics / अर्थशास्त्र' }
                    ].map(b => (
                      <button
                        key={b.id}
                        onClick={() => setSstBranch(b.id as any)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          sstBranch === b.id
                            ? 'bg-brand-orange text-white shadow-xs'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-brand-navy'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Medium toggle */}
                <div className="flex flex-col gap-2 md:items-end">
                  <span className="text-xs font-black text-brand-navy uppercase tracking-wider md:text-right">Study Medium / माध्यम</span>
                  <div className="flex gap-1.5 bg-white p-1 rounded-xl shadow-xs border border-slate-200/80">
                    {[
                      { id: 'all', label: 'All / सभी' },
                      { id: 'English', label: '🇬🇧 English Medium' },
                      { id: 'Hindi', label: '🇮🇳 हिन्दी माध्यम' }
                    ].map(med => (
                      <button
                        key={med.id}
                        onClick={() => setNotesMedium(med.id as any)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          notesMedium === med.id
                            ? 'bg-brand-navy text-white shadow-xs'
                            : 'text-slate-650 hover:bg-slate-100 hover:text-brand-navy'
                        }`}
                      >
                        {med.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {revisionNotes
                .filter(matchesSearch)
                .filter((notes) => {
                  // Subject selection
                  if (notesSubject === 'science' && notes.subject !== 'Science') return false;
                  if (notesSubject === 'sst' && notes.subject !== 'SST') return false;
                  if (notesSubject === 'math' && notes.subject !== 'Mathematics') return false;

                  // Science Branch & Medium filters
                  if (notes.subject === 'Science') {
                    if (scienceBranch !== 'all' && notes.branch !== scienceBranch) return false;
                    if (notesMedium !== 'all' && notes.medium !== notesMedium) return false;
                  }

                  // SST Branch & Medium filters
                  if (notes.subject === 'SST') {
                    if (sstBranch !== 'all' && notes.branch !== sstBranch) return false;
                    if (notesMedium !== 'all' && notes.medium !== notesMedium) return false;
                  }
                  return true;
                })
                .map((notes) => (
                  <div 
                    key={notes.id}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            notes.subject === 'Science' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              : notes.subject === 'SST'
                              ? 'bg-blue-50 text-blue-600 border border-blue-100'
                              : 'bg-brand-orange/10 text-brand-orange border border-brand-orange/10'
                          }`}>
                            {notes.subject}
                          </span>
                          {notes.branch && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[9px] font-extrabold uppercase">
                              {notes.branch === 'Chemistry' ? '🧪 Chemistry' : 
                               notes.branch === 'Biology' ? '🌿 Biology' : 
                               notes.branch === 'Physics' ? '⚡ Physics' : 
                               notes.branch === 'Environment' ? '🌍 Env' : 
                               notes.branch === 'History' ? '🏛️ History' : 
                               notes.branch === 'Geography' ? '🌍 Geography' : 
                               notes.branch === 'Civics' ? '🗳️ Civics' : 
                               notes.branch === 'Economics' ? '💰 Economics' : notes.branch}
                            </span>
                          )}
                          {notes.medium && (
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase ${
                              notes.medium === 'English' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                            }`}>
                              {notes.medium === 'English' ? 'English' : 'हिन्दी'}
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400 text-xs font-black">{notes.classLevel}</span>
                      </div>

                      <h4 className="font-extrabold text-lg text-brand-navy group-hover:text-brand-orange transition-colors mb-4 text-left">
                        {notes.title}
                      </h4>
                    </div>

                    <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs text-slate-450 font-semibold">{notes.fileSize} • PDF format</span>
                      <button
                        onClick={() => handleDownload(notes)}
                        className="inline-flex items-center gap-1.5 text-brand-orange font-bold text-sm"
                      >
                        <span>Download Notes</span>
                        <Download size={15} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            
            {revisionNotes
              .filter(matchesSearch)
              .filter((notes) => {
                if (notesSubject === 'science' && notes.subject !== 'Science') return false;
                if (notesSubject === 'sst' && notes.subject !== 'SST') return false;
                if (notesSubject === 'math' && notes.subject !== 'Mathematics') return false;

                if (notes.subject === 'Science') {
                  if (scienceBranch !== 'all' && notes.branch !== scienceBranch) return false;
                  if (notesMedium !== 'all' && notes.medium !== notesMedium) return false;
                }
                
                if (notes.subject === 'SST') {
                  if (sstBranch !== 'all' && notes.branch !== sstBranch) return false;
                  if (notesMedium !== 'all' && notes.medium !== notesMedium) return false;
                }
                return true;
              }).length === 0 && (
                <p className="text-slate-500 font-bold text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                  No revision notes match your selection.
                </p>
              )}
          </div>
        )}

        {/* SECTION 4: Mock Test Series */}
        {(activeTab === 'all' || activeTab === 'test-series') && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-brand-orange/10 rounded-2xl text-brand-orange">
                <ClipboardList size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-brand-navy">Sample Papers & Mock Test Series</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">Self-assess your Board level readiness</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {testSeries.filter(matchesSearch).map((test) => (
                <div 
                  key={test.id}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-orange/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -z-0 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100">
                        {test.subject}
                      </span>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">{test.classLevel}</span>
                    </div>

                    <h4 className="font-extrabold text-xl text-brand-navy group-hover:text-brand-orange transition-colors mb-4 max-w-md">
                      {test.title}
                    </h4>
                  </div>

                  <div className="pt-6 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 relative z-10">
                    <span className="text-xs text-slate-450 font-bold uppercase tracking-widest">
                      FILE SIZE: {test.fileSize}
                    </span>
                    <button
                      onClick={() => handleDownload(test)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white hover:bg-brand-orange/90 font-black text-xs rounded-xl shadow-md shadow-brand-orange/15 transition-all"
                    >
                      <span>Download Test Pack</span>
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {testSeries.filter(matchesSearch).length === 0 && (
              <p className="text-slate-500 font-bold text-center py-8">No Test Series matches your query.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
