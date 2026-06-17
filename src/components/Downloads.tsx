import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  BookOpen, 
  X, 
  Printer, 
  ZoomIn, 
  CheckCircle, 
  Calendar, 
  Filter, 
  Search, 
  FileQuestion, 
  ChevronRight, 
  FileCheck,
  ArrowLeft
} from 'lucide-react';

interface SubjectBlueprint {
  id: string;
  nameEn: string;
  nameHi: string;
  color: string;
  iconBg: string;
  fileSize: string;
  description: string;
}

interface Chapter {
  num: number;
  name: string;
  marks: string | number;
}

interface Unit {
  id: number;
  title: string;
  chapters: Chapter[];
}

interface QuestionSection {
  titleEn: string;
  titleHi: string;
  questions: string[];
}

interface PastPaper {
  id: string;
  subjectId: string;
  subjectNameEn: string;
  subjectNameHi: string;
  year: number;
  fileSize: string;
  totalMarks: number;
  duration: string;
  examType: string;
  examTypeHi: string;
  color: string;
  sections: QuestionSection[];
}

export const Downloads: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'pyq'>('blueprint');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [activeSubjectId, setActiveSubjectId] = useState<'hindi' | 'social_science' | 'science' | 'math' | 'sanskrit' | null>(null);
  
  // PYQ States
  const [pyqSubjectFilter, setPyqSubjectFilter] = useState<string>('hindi');
  const [pyqYearFilter, setPyqYearFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePyqPaper, setActivePyqPaper] = useState<PastPaper | null>(null);
  const [activePyqSectionIdx, setActivePyqSectionIdx] = useState<number>(0);
  const [rollNumber, setRollNumber] = useState<string>('');
  const [showToast, setShowToast] = useState<{ year: string } | null>(null);

  const handleYearFilterClick = (year: string) => {
    if (['2026', '2025', '2024', '2023', '2022'].includes(year)) {
      setShowToast({ year });
      // Clear after 3 seconds
      const timer = setTimeout(() => {
        setShowToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setPyqYearFilter(year);
    }
  };

  const subjects: SubjectBlueprint[] = [
    {
      id: 'hindi',
      nameEn: 'Hindi',
      nameHi: 'हिंदी',
      color: 'from-orange-500 to-amber-500',
      iconBg: 'bg-orange-50 text-orange-600 border-orange-100',
      fileSize: '1.2 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & detailed chapter-wise marks distribution.'
    },
    {
      id: 'english',
      nameEn: 'English',
      nameHi: 'अंग्रेजी',
      color: 'from-blue-500 to-indigo-500',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      fileSize: '1.1 MB',
      description: 'Marking pattern for reading skills, writing, grammar, and textbook exercises.'
    },
    {
      id: 'math',
      nameEn: 'Mathematics',
      nameHi: 'गणित',
      color: 'from-rose-500 to-pink-500',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      fileSize: '1.5 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & chapter-wise marks distribution.'
    },
    {
      id: 'science',
      nameEn: 'Science',
      nameHi: 'विज्ञान',
      color: 'from-emerald-500 to-teal-500',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      fileSize: '1.4 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & chapter-wise marks distribution.'
    },
    {
      id: 'social_science',
      nameEn: 'Social Science',
      nameHi: 'सामाजिक विज्ञान',
      color: 'from-amber-500 to-yellow-600',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      fileSize: '1.6 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & chapter-wise marks distribution.'
    },
    {
      id: 'sanskrit',
      nameEn: 'Sanskrit',
      nameHi: 'संस्कृत',
      color: 'from-purple-500 to-violet-500',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
      fileSize: '1.0 MB',
      description: 'Interactive Board Exam Blueprint (अंक योजना) & chapter-wise marks distribution.'
    }
  ];

  // High Fidelity data structures representing Blueprints
  const hindiBlueprint: Unit[] = [
    {
      id: 1,
      title: 'क्षितिज भाग - 2 एवं काव्य बोध (Hindi Part-1)',
      chapters: [
        {
          num: 1,
          name: 'क्षितिज भाग - 2 काव्य खण्ड :\n• ऊधौ, तुम हौ अति बड़भागी\n• मन की मन ही माँझ रही\n• हमारे हरि हारिल की लकरी\n• हरि हैं राजनीति पढ़ि आए\n• राम-लक्ष्मण परशुराम संवाद\n• आत्मकथ्य\n• उत्साह\n• अट नहीं रही है\n• यह दंतुरित मुसकान\n• फसल\n• संगतकार\n• पद्य साहित्य का इतिहास एवं काल विभाजन (रीतिकाल, आधुनिक काल, प्रयोगवाद, प्रगतिवाद, नई कविता)\n• कवि परिचय\n• भावार्थ (सन्दर्भ, प्रसंग, भावार्थ, काव्य सौन्दर्य)\n• सौन्दर्य बोध तथा भाव एवं विषय वस्तु पर आधारित प्रश्न',
          marks: '17'
        },
        {
          num: 2,
          name: 'काव्य बोध :\n• काव्य की परिभाषा एवं भेद (प्रबन्ध काव्य के भेद)\n• रस : अंग एवं प्रकार उदाहरण सहित\n• छन्द : दोहा एवं चौपाई\n• अलंकार : मानवीकरण, पुनरुक्तिप्रकाश, अतिशयोक्ति, अन्योक्ति अलंकार\n• शब्द गुण का सामान्य परिचय',
          marks: '10'
        }
      ]
    },
    {
      id: 2,
      title: 'क्षितिज भाग - 2 गद्य खण्ड, भाषा बोध एवं कृतिका (Hindi Part-2)',
      chapters: [
        {
          num: 3,
          name: 'क्षितिज भाग - 2 गद्य खण्ड :\n• नेताजी का चश्मा\n• बालगोबिन भगत\n• लखनवी अंदाज\n• एक कहानी यह भी\n• नौबतखाने में इबादत\n• संस्कृति\n• गद्य की प्रमुख एवं गौण विधाएँ\n• लेखक परिचय\n• व्याख्या (सन्दर्भ, प्रसंग, व्याख्या, विशेष)\n• विषय वस्तु एवं विचार बोध पर आधारित प्रश्न',
          marks: '17'
        },
        {
          num: 4,
          name: 'भाषा बोध :\n• संधि एवं समास (भेद एवं उदाहरण), वाच्य, क्रिया के भेद एवं क्रिया विशेषण\n• मुहावरें एवं लोकोक्तियाँ, अनेकार्थी शब्द, वाक्यांश के लिए एक शब्द\n• वाक्य के भेद (अर्थ के आधार पर)\n• शब्द शक्ति का सामान्य परिचय',
          marks: '08'
        },
        {
          num: 5,
          name: 'कृतिका भाग-2 :\n• पूरक पाठ्यपुस्तक से विविध पाठों पर आधारित प्रश्न\n1. माता का अंचल  2. साना-साना हाथ जोड़ि......  3. मैं क्यों लिखता हूँ ?',
          marks: '08'
        }
      ]
    },
    {
      id: 3,
      title: 'अपठित बोध, पत्र एवं निबंध लेखन (Hindi Part-3)',
      chapters: [
        {
          num: 6,
          name: 'अपठित बोध :\n• अपठित काव्यांश / गद्यांश',
          marks: '04'
        },
        {
          num: 7,
          name: 'पत्र लेखन :\n• औपचारिक पत्र / अनौपचारिक पत्र',
          marks: '04'
        },
        {
          num: 8,
          name: 'लेखन कार्य :\n• अनुच्छेद लेखन / संवाद लेखन / विज्ञापन लेखन / सूचना लेखन\n• निबन्ध लेखन (रूपरेखा सहित)',
          marks: '07'
        }
      ]
    }
  ];

  const socialScienceBlueprint: Unit[] = [
    {
      id: 1,
      title: 'समकालीन भारत-2 (भूगोल)',
      chapters: [
        { num: 1, name: 'संसाधन एवं विकास', marks: '4' },
        { num: 2, name: 'वन एवं वन्य जीव संसाधन', marks: '4' },
        { num: 3, name: 'जल संसाधन', marks: '2' },
        { num: 4, name: 'कृषि', marks: '3' },
        { num: 5, name: 'खनिज तथा ऊर्जा संसाधन', marks: '4 (मानचित्र)' },
        { num: 6, name: 'विनिर्माण उद्योग', marks: '3' },
        { num: 7, name: 'राष्ट्रीय अर्थव्यवस्था की जीवन रेखाएं', marks: '5' }
      ]
    },
    {
      id: 2,
      title: 'भारत और समकालीन विश्व-2 (इतिहास)',
      chapters: [
        { num: 1, name: 'यूरोप में राष्ट्रवाद का उदय', marks: '2' },
        { num: 2, name: 'भारत में राष्ट्रवाद', marks: '5' },
        { num: 3, name: 'भूमण्डलीकृत विश्व का बनना', marks: '3' },
        { num: 4, name: 'औद्योगिकीकरण का युग', marks: '4' },
        { num: 5, name: 'मुद्रण संस्कृति और आधुनिक दुनिया', marks: '4' },
        { num: 6, name: 'अमर बलिदानी', marks: '2' }
      ]
    },
    {
      id: 3,
      title: 'लोकतांत्रिक राजनीति-2 (राजनीति विज्ञान)',
      chapters: [
        { num: 1, name: 'सत्ता की साझेदारी', marks: '2' },
        { num: 2, name: 'संघवाद', marks: '4' },
        { num: 3, name: 'जाति, धर्म और लैंगिक मसले', marks: '2' },
        { num: 4, name: 'राजनीतिक दल', marks: '4' },
        { num: 5, name: 'लोकतंत्र के परिणाम', marks: '3' }
      ]
    },
    {
      id: 4,
      title: 'आर्थिक विकास की समझ (अर्थशास्त्र)',
      chapters: [
        { num: 1, name: 'विकास', marks: '2' },
        { num: 2, name: 'भारतीय अर्थव्यवस्था के क्षेत्रक', marks: '4' },
        { num: 3, name: 'मुद्रा और साख', marks: '4' },
        { num: 4, name: 'वैश्वीकरण और भारतीय अर्थव्यवस्था', marks: '3' },
        { num: 5, name: 'उपभोक्ता अधिकार', marks: '2' }
      ]
    }
  ];

  const scienceBlueprint: Unit[] = [
    {
      id: 1,
      title: 'विज्ञान विषय वस्तु (Science Course Chapters)',
      chapters: [
        { num: 1, name: 'रासायनिक अभिक्रियाएं एवं समीकरण', marks: '7' },
        { num: 2, name: 'अम्ल क्षार एवं लवण', marks: '6' },
        { num: 3, name: 'धातु एवं अधतु', marks: '5' },
        { num: 4, name: 'कार्बन एवं उसके यौगिक', marks: '6' },
        { num: 5, name: 'जैव प्रक्रम', marks: '8' },
        { num: 6, name: 'नियंत्रण एवं समन्वय', marks: '6' },
        { num: 7, name: 'जीव जनन कैसे करते है?', marks: '6' },
        { num: 8, name: 'अनुवांशिकता', marks: '4' },
        { num: 9, name: 'प्रकाश परावर्तन एवं अपवर्तन', marks: '8' },
        { num: 10, name: 'मानव नेत्र एवं रंग बिरंगा संसार', marks: '5' },
        { num: 11, name: 'विद्युत', marks: '5' },
        { num: 12, name: 'विद्युत धारा के चुंबकीय प्रभाव', marks: '6' },
        { num: 13, name: 'हमारा पर्यावरण', marks: '3' }
      ]
    }
  ];

  const mathBlueprint: Unit[] = [
    {
      id: 1,
      title: 'गणित Basic / गणित Standard विषय वस्तु (Maths Course Chapters)',
      chapters: [
        { num: 1, name: 'अध्याय-1 वास्तविक संख्याएँ - भूमिका, अंकगणित की आधारभूत प्रमेय, अपरिमेय संख्याओं का पुनर्भ्रमण, सारांश', marks: '6' },
        { num: 2, name: 'अध्याय-2 बहुपद - भूमिका, बहुपदों के शून्यकों का ज्यामितीय अर्थ, किसी बहुपद के शून्यकों और गुणांकों में संबंध, सारांश', marks: '5' },
        { num: 3, name: 'अध्याय-3 दो चर वाले रैखिक समीकरण युग्म - भूमिका, रैखिक समीकरण युग्म का ग्राफीय विधि से हल, एक रैखिक समीकरण युग्म को हल करने की बीजगणितीय विधि (प्रतिस्थापन विधि, विलोपन विधि), सारांश', marks: '7' },
        { num: 4, name: 'अध्याय-4 द्विघात समीकरण - भूमिका, द्विघात समीकरण, गुणनखंडों द्वारा द्विघात समीकरण का हल, मूलों की प्रकृति, सारांश', marks: '5' },
        { num: 5, name: 'अध्याय-5 समांतर श्रेढ़ियाँ - भूमिका, समांतर श्रेढ़ियाँ, A.P. का nवाँ पद, A.P. के प्रथम n पदों का योग, सारांश', marks: '5' },
        { num: 6, name: 'अध्याय-6 त्रिभुज - भूमिका, समरूप आकृतियाँ, त्रिभुजों की समरूपता, त्रिभुजों की समरूपता के लिए कसौटियाँ, सारांश', marks: '5' },
        { num: 7, name: 'अध्याय-7 निर्देशांक ज्यामिति - भूमिका, दूरी सूत्र, विभाजन सूत्र, सारांश', marks: '5' },
        { num: 8, name: 'अध्याय-8 त्रिकोणमिति का परिचय - भूमिका, त्रिकोणमितीय अनुपात, कुछ विशिष्ट कोणों के त्रिकोणमितीय अनुपात, त्रिकोणमितीय सर्वसमिकाएँ, सारांश', marks: '5' },
        { num: 9, name: 'अध्याय-9 त्रिकोणमिति के कुछ अनुप्रयोग - ऊँचाइयाँ और दूरियाँ, सारांश', marks: '5' },
        { num: 10, name: 'अध्याय-10 वृत्त - भूमिका, वृत्त की स्पर्श रेखा, एक बिन्दु से एक वृत्त पर स्पर्श रेखाओं की संख्या, सारांश', marks: '5' },
        { num: 11, name: 'अध्याय-11 वृत्तों से संबंधित क्षेत्रफल - त्रिज्यखंड और वृत्तखंड के क्षेत्रफल, सारांश', marks: '5' },
        { num: 12, name: 'अध्याय-12 पृष्ठीय क्षेत्रफल और आयतन - भूमिका, ठोसों के संयोजन का पृष्ठीय क्षेत्रफल, ठोसों के संयोजन का आयतन, सारांश', marks: '6' },
        { num: 13, name: 'अध्याय-13 सांख्यिकी - भूमिका, वर्गीकृत आँकड़ों का माध्य, वर्गीकृत आँकड़ों का बहुलक, वर्गीकृत आँकड़ों का माध्यक, सारांश', marks: '5' },
        { num: 14, name: 'अध्याय-14 प्रायिकता - प्रायिकता-एक सैद्धांतिक दृष्टिकोण, सारांश', marks: '6' }
      ]
    }
  ];

  const sanskritBlueprint: Unit[] = [
    {
      id: 1,
      title: 'संस्कृत विषय वस्तु (Sanskrit Course Chapters)',
      chapters: [
        { num: 1, name: 'शब्दरूपाणि + अव्यया:', marks: '4 + 2 = 6' },
        { num: 2, name: 'धातुरूपाणि + उपसर्गा:', marks: '4 + 2 = 6' },
        { num: 3, name: 'सन्धय: + समासा:', marks: '3 + 3 = 6' },
        { num: 4, name: 'प्रत्यया: + एकपदेन प्रश्नोत्तराणि', marks: '3 + 3 = 6' },
        { num: 5, name: 'विशेषणं / विशेष्यम् + पर्याय: + विलोम:', marks: '2 + 2 + 2 = 6' },
        { num: 6, name: 'पाठगतप्रश्नोत्तराणि', marks: '10' },
        { num: 7, name: 'प्रश्ननिर्माणम्', marks: '2' },
        { num: 8, name: 'क: कं प्रति कथयति', marks: '2' },
        { num: 9, name: 'श्लोककण्ठस्थीकरणम् (पाठ्यपुस्तकात्)', marks: '2' },
        { num: 10, name: 'अशुद्धकारकसंशोधनम्', marks: '2' },
        { num: 11, name: 'पाठगतरिक्तस्थानपूर्ति:', marks: '½ × 4 = 2' },
        { num: 12, name: 'पाठाधारितकथाक्रमसंयोजनम्', marks: '½ × 4 = 2' },
        { num: 13, name: 'वाच्यपरिवर्तनम्', marks: '2' },
        { num: 14, name: 'गद्यांशम् अधिकृत्य अवबोधनात्मकप्रश्नानि', marks: '3' },
        { num: 15, name: 'पद्यांशम् अधिकृत्य अवबोधनात्मकप्रश्नानि', marks: '3' },
        { num: 16, name: 'नाट्यांशम् अधिकृत्य अवबोधनात्मकप्रश्नानि', marks: '3' },
        { num: 17, name: 'अपठितगद्यांशम्', marks: '4' },
        { num: 18, name: 'पत्रलेखनम् / आवेदनपत्रलेखनम्', marks: '4' },
        { num: 19, name: 'निबन्धलेखनम्', marks: '4' }
      ]
    }
  ];

  // High Fidelity dataset for Previous Year Papers (PYQs)
  const pastPapers: PastPaper[] = [
    {
      id: 'hi_2024',
      subjectId: 'hindi',
      subjectNameEn: 'Hindi',
      subjectNameHi: 'हिंदी',
      year: 2024,
      fileSize: '1.2 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Main Board Exam',
      examTypeHi: 'मुख्य वार्षिक परीक्षा',
      color: 'from-orange-500 to-amber-500',
      sections: [
        {
          titleEn: 'Section A - Objective Type Questions',
          titleHi: `खण्ड 'अ' - वस्तुनिष्ठ प्रश्न (1-4)`,
          questions: [
            `प्रश्न 1: 'सूरसागर' के रचनाकार कौन हैं? \n(अ) सूरदास (ब) कबीरदास (स) तुलसीदास (द) रसखान ।\nउत्तर विकल्प चुनें और रोल नंबर प्रविष्ट कर जाँचें।`,
            `प्रश्न 2: रामचरितमानस की भाषा कौन सी है? \n(अ) अवधी (ब) ब्रजभाषा (स) खड़ीबोली (द) बुंदेली।`,
            `प्रश्न 3: शांत रस का स्थायी भाव क्या है? \n(अ) निर्वेद (ब) रति (स) शोक (द) क्रोध।`,
            `प्रश्न 4: रिक्त स्थानों की पूर्ति कीजिए:\n(क) नेताजी का चश्मा विधा की रचना _______ (कहानी / संस्मरण) है।\n(ख) चौपाई छन्द के प्रत्येक चरण में _______ (16 / 24) मात्राएँ होती हैं।`
          ]
        },
        {
          titleEn: 'Section B - Short Answer Type Questions',
          titleHi: `खण्ड 'ब' - अति लघु उत्तरीय प्रश्न`,
          questions: [
            `प्रश्न 5: सूरदास अथवा जयशंकर प्रसाद की काव्यगत विशेषताएँ निम्न बिन्दुओं के आधार पर लिखिए:\n(i) दो रचनाएँ  (ii) कला पक्ष / भाव पक्ष।`,
            `प्रश्न 6: लक्ष्मण ने वीर योद्धा की क्या-क्या विशेषताएँ बताई हैं? कोई दो विशेषताएँ विस्तार से लिखिए।`,
            `प्रश्न 7: गोपियों के अनुसार राजा का धर्म क्या होना चाहिए?`,
            `प्रश्न 8: महाकाव्य और खण्डकाव्य में कोई दो मुख्य अंतर स्पष्ट कीजिए।`
          ]
        },
        {
          titleEn: 'Section C - Long Answer Type Questions',
          titleHi: `खण्ड 'स' - गद्य खण्ड एवं भाषा बोध`,
          questions: [
            `प्रश्न 9: सेनानी न होते हुए भी चश्मेवाले को लोग कैप्टन क्यों कहते थे?`,
            `प्रश्न 10: बालगोबिन भगत की पुत्रवधू उन्हें अकेले क्यों नहीं छोड़ना चाहती थी?`,
            `प्रश्न 11: संधि और समास में कोई तीन मुख्य अंतर उदाहरण सहित समझाइए।`,
            `प्रश्न 12: मुहावरों का अर्थ स्पष्ट कर वाक्य में प्रयोग कीजिए:\n(क) आँखों का तारा होना  (ख) ईद का चाँद होना।`
          ]
        },
        {
          titleEn: 'Section D - Letter & Essay Writing',
          titleHi: `खण्ड 'द' - पत्र लेखन, अपठित एवं निबंध सस्वर`,
          questions: [
            `प्रश्न 13: अपने विद्यालय के प्राचार्य को 'शाला शुल्क मुक्ति' (Fee Waiver) हेतु एक प्रार्थना पत्र विस्तार से लिखिए।`,
            `प्रश्न 14: अनुज को अपने जन्मदिन पर आमंत्रित करने हेतु आमंत्रण पत्र औपचारिक रूप से प्रेषित करें।`,
            `प्रश्न 15: निम्नलिखित विषयों में से किसी एक पर लगभग 120 शब्दों में रूपरेखा सहित सारगर्भित निबंध लिखिए:\n(अ) विद्यार्थी और अनुशासन\n(ब) विज्ञान: वरदान या अभिशाप\n(स) पर्यावरण प्रदूषण और निवारण\n(द) मेरी प्रिय पुस्तक।`
          ]
        }
      ]
    },
    {
      id: 'ma_2024',
      subjectId: 'math',
      subjectNameEn: 'Mathematics',
      subjectNameHi: 'गणित',
      year: 2024,
      fileSize: '1.4 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Main Board Exam',
      examTypeHi: 'मुख्य वार्षिक परीक्षा',
      color: 'from-rose-500 to-pink-500',
      sections: [
        {
          titleEn: 'Section A - Objective Type Questions (MCQs)',
          titleHi: `खण्ड 'अ' - सही विकल्प चुनिए`,
          questions: [
            `प्रश्न 1: 96 और 404 का HCF (महत्तम समापवर्तक) क्या होगा? \n(अ) 4 (ब) 120 (स) 8 (द) 2।`,
            `प्रश्न 2: यदि द्विघात बहुपद $ax^2 + bx + c$ के शून्यक $\\alpha$ और $\\beta$ हों, तो $\\alpha\\cdot\\beta$ का मान होगा:\n(अ) $c/a$ (ब) $-b/a$ (स) $a/c$ (द) $-c/a$।`,
            `प्रश्न 3: समीकरण $x - 2y = 0$ और $3x + 4y - 20 = 0$ की रेखाएँ होंगी:\n(अ) प्रतिच्छेद करती हैं (ब) सम्पाती हैं (स) समान्तर हैं (द) कोई नहीं।`,
            `प्रश्न 4: श्रेणी 2, 7, 12, ... का 10वाँ पद ज्ञात कीजिए:\n(अ) 45 (ब) 47 (स) 49 (द) 50।`
          ]
        },
        {
          titleEn: 'Section B - Very Short Answer Type Questions',
          titleHi: `खण्ड 'ब' - अति लघु उत्तरीय प्रश्न`,
          questions: [
            `प्रश्न 5: जाँच कीजिए कि क्या $(x-2)(x+1) = (x-1)(x+3)$ एक द्विघात समीकरण है?`,
            `प्रश्न 6: द्विघात बहुपद $t^2 - 15$ के शून्यक ज्ञात कीजिए तथा शून्यकों एवं गुणांकों के बीच संबंध की सत्यता की जाँच कीजिए।`,
            `प्रश्न 7: बिन्दुओं $P(2, 3)$ और $Q(4, 1)$ के बीच की दूरी ज्ञात कीजिए।`
          ]
        },
        {
          titleEn: 'Section C - Calculations and Proofs',
          titleHi: `खण्ड 'स' - ज्यामितीय एवं बीजगणितीय गणनाएँ`,
          questions: [
            `प्रश्न 8: प्रतिस्थापन विधि द्वारा निम्न रैखिक समीकरण युग्म को हल कीजिए:\n$7x - 15y = 2$\n$x + 2y = 3$`,
            `प्रश्न 9: सिद्ध कीजिए कि दो संकेंद्रीय वृत्तों में बड़े वृत्त की जीवा, जो छोटे वृत्त को स्पर्श करती है, स्पर्श बिन्दु पर समविभाजित होती है।`,
            `प्रश्न 10: भूमि के एक बिन्दु से, जो मीनार के पाद-बिन्दु से 30 मीटर की दूरी पर है, मीनार के शिखर का उन्नयन कोण $30^\\circ$ है। मीनार की ऊँचाई ज्ञात कीजिए।`
          ]
        },
        {
          titleEn: 'Section D - Analytical & High Scoring Questions',
          titleHi: `खण्ड 'द' - सांख्यिकी, प्रायिकता एवं दीर्घ प्रश्न`,
          questions: [
            `प्रश्न 11: सिद्ध कीजिए कि $\\sqrt{3}$ एक अपरिमेय संख्या है।`,
            `प्रश्न 12: एक ठोस खिलौना एक अर्धगोले के आकार का है जिस पर एक लम्ब वृत्तीय शंकु आरोपित है। शंकु की ऊँचाई 2 सेमी है और आधार का व्यास 4 सेमी है। इस अर्धगोलीय खिलौने का आयतन ज्ञात कीजिए।`,
            `प्रश्न 13: किसी फैक्टरी के 50 श्रमिकों की दैनिक मजदूरी के बंटन के लिए माध्य दैनिक मजदूरी ज्ञात कीजिए।`
          ]
        }
      ]
    },
    {
      id: 'sc_2024',
      subjectId: 'science',
      subjectNameEn: 'Science',
      subjectNameHi: 'विज्ञान',
      year: 2024,
      fileSize: '1.3 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Main Board Exam',
      examTypeHi: 'मुख्य वार्षिक परीक्षा',
      color: 'from-emerald-500 to-teal-500',
      sections: [
        {
          titleEn: 'Section A - Basic Concepts & Chemical Equations',
          titleHi: `खण्ड 'अ' - रासायनिक क्रियाएँ एवं बहुविकल्पीय`,
          questions: [
            `प्रश्न 1: लोहे के चूर्ण पर तनु हाइड्रोक्लोरिक अम्ल डालने से क्या होता है? \n(अ) Hydrogen गैस एवं आयरन क्लोराइड बनता है।\n(ब) Chlorine गैस एवं आयरन हाइड्रोक्साइड बनता है।\n(स) कोई अभिक्रिया नहीं होती।\n(द) आयरन लवण एवं जल बनता है।`,
            `प्रश्न 2: खाद्य पदार्थ के डिब्बों पर जिंक की बजाय टिन का लेप होता है क्योंकि:\n(अ) टिन की अपेक्षा जिंक अधिक क्रियाशील है।\n(ब) जिंक का गलनांक अधिक है।\n(स) टिन की अपेक्षा जिंक कम क्रियाशील है।\n(द) टिन महंगा है।`
          ]
        },
        {
          titleEn: 'Section B - Life Processes & Human Biology',
          titleHi: `खण्ड 'ब' - जैव प्रक्रम एवं जीव विज्ञान`,
          questions: [
            `प्रश्न 3: स्वपोषी पोषण एवं विषमपोषी पोषण में आवश्यक अंतर लिखिए।`,
            `प्रश्न 4: हमारे शरीर में वसा का पाचन कैसे होता है? यह प्रक्रम कहाँ पूरा होता है?`,
            `प्रश्न 5: तंत्रिका कोशिका (Neuron) का स्वच्छ एवं नामांकित चित्र बनाइए।`
          ]
        },
        {
          titleEn: 'Section C - Physics & Light Phenomenon',
          titleHi: `खण्ड 'स' - प्रकाश परावर्तन, अपवर्तन एवं लेंस सूत्र`,
          questions: [
            `प्रश्न 6: अवतल दर्पण के मुख्य फोकस की परिभाषा लिखिए तथा एक उपयोग बताइए।`,
            `प्रश्न 7: किसी ऑटोमोबाइल में पीछे का दृश्य देखने के लिए उपयोग होने वाले उत्तल दर्पण की वक्रता त्रिज्या 3.00 मीटर है। यदि एक बस इस दर्पण से 5.00 मीटर की दूरी पर स्थित है, तो प्रतिबिम्ब की स्थिति, प्रकृति तथा आकार ज्ञात कीजिए।`
          ]
        },
        {
          titleEn: 'Section D - Electricity & Magnetism',
          titleHi: `खण्ड 'द' - विद्युत प्रभाव एवं चुम्बकीय क्षेत्र`,
          questions: [
            `प्रश्न 8: ओम का नियम लिखिए। किसी चालक का प्रतिरोध किन-किन कारकों पर निर्भर करता है? विस्तार से समझाइए।`,
            `प्रश्न 9: फ्लेमिंग का वामहस्त (Left hand) का नियम क्या है? संक्षेप में समझाइए।`,
            `प्रश्न 10: ओजोन परत के क्षय होने के क्या कारण हैं? इसके बचाव के उपाय सुझाइए।`
          ]
        }
      ]
    },
    {
      id: 'hi_2023',
      subjectId: 'hindi',
      subjectNameEn: 'Hindi',
      subjectNameHi: 'हिंदी',
      year: 2023,
      fileSize: '1.1 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Past Board Exam',
      examTypeHi: 'वार्षिक परीक्षा 2023',
      color: 'from-orange-400 to-amber-500',
      sections: [
        {
          titleEn: 'Section A - Basic Grammar',
          titleHi: `खण्ड 'अ' - काव्य बोध एवं वस्तुनिष्ठ`,
          questions: [
            `प्रश्न 1: रौद्र रस का स्थायी भाव क्या है? \n(अ) विस्मय (ब) क्रोध (स) निर्वेद (द) भयो।`,
            `प्रश्न 2: राम-लक्ष्मण-परशुराम संवाद मुख्य रूप से किस ग्रंथ से उधृत है? \n(अ) रामचरितमानस (ब) कवितावली (स) गीतावली (द) विनयपत्रिका।`
          ]
        },
        {
          titleEn: 'Section B - Textbook Questions',
          titleHi: `खण्ड 'ब' - पाठ्यपुस्तक क्षितिज भाग-2 काव्य`,
          questions: [
            `प्रश्न 3: उद्धव द्वारा दिए गए योग के संदेश ने गोपियों की विरहाग्नि में घी का काम कैसे किया?`,
            `प्रश्न 4: कवि जयशंकर प्रसाद ने अपनी आत्मकथा न लिखने के क्या कारण बताए हैं?`
          ]
        }
      ]
    },
    {
      // Social Science 2024
      id: 'ss_2024',
      subjectId: 'social_science',
      subjectNameEn: 'Social Science',
      subjectNameHi: 'सामाजिक विज्ञान',
      year: 2024,
      fileSize: '1.4 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Main Board Exam',
      examTypeHi: 'मुख्य वार्षिक परीक्षा',
      color: 'from-amber-500 to-yellow-600',
      sections: [
        {
          titleEn: 'Section A - Map Work & Resources',
          titleHi: `खण्ड 'अ' - पर्यावरण, मृदा एवं मानचित्र अंकन`,
          questions: [
            `प्रश्न 1: भारत में काली मिट्टी मुख्य रूप से किस राज्य में पाई जाती है? \n(अ) महाराष्ट्र (ब) उत्तर प्रदेश (स) पंजाब (द) राजस्थान।`,
            `प्रश्न 2: भारत के दिए गए रेखा-मानचित्र में तापीय ऊर्जा केन्द्र 'सिंगरौली' एवं लौह अयस्क क्षेत्र 'बैलाडीला' को चिन्हित कीजिए।`
          ]
        },
        {
          titleEn: 'Section B - Indian History & Movements',
          titleHi: `खण्ड 'ब' - भारत में राष्ट्रवाद एवं असहयोग आन्दोलन`,
          questions: [
            `प्रश्न 3: गांधीजी ने असहयोग आन्दोलन को वापस लेने का फैसला क्यों लिया? चौरी-चौरा की घटना का महत्व बताइए।`,
            `प्रश्न 4: 'सिल्क मार्ग' (Silk Route) से आप क्या समझते हैं? प्राचीन विश्व व्यापार में इसका महत्व समझाइए।`
          ]
        }
      ]
    },
    {
      // English 2024
      id: 'en_2024',
      subjectId: 'english',
      subjectNameEn: 'English',
      subjectNameHi: 'अंग्रेजी',
      year: 2024,
      fileSize: '1.2 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Main Board Exam',
      examTypeHi: 'मुख्य वार्षिक परीक्षा',
      color: 'from-blue-500 to-indigo-500',
      sections: [
        {
          titleEn: 'Section A - Reading & Comprehension Passage',
          titleHi: `खण्ड 'अ' - अपठित अनसीन पैसेज`,
          questions: [
            `Question 1: Read the passage carefully and answer the questions:\n"Nature is a great teacher..."\n(a) What is the great teacher? \n(b) How does silence heal our mind?`,
            `Question 2: Read the passage and make notes on it, also suggest a suitable title.`
          ]
        },
        {
          titleEn: 'Section B - Writing Skills & Grammar',
          titleHi: `खण्ड 'ब' - निबंध लेखन, पत्र एवं ग्रामर`,
          questions: [
            `Question 3: Write an essay in about 150 words on "Wonders of Science" or "Value of Games and Sports".`,
            `Question 4: Fill in the correct option:\n(a) Mount Everest is _______ highest peak. (a/an/the)\n(b) He died _______ cancer. (of / off / by)\n(c) Look _______ you leap. (before/after).`
          ]
        }
      ]
    },
    {
      id: 'ma_2026',
      subjectId: 'math',
      subjectNameEn: 'Mathematics (Practice Paper)',
      subjectNameHi: 'गणित (अभ्यास प्रश्न पत्र)',
      year: 2026,
      fileSize: '1.5 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Practice Paper',
      examTypeHi: 'अभ्यास परीक्षा 2026',
      color: 'from-rose-500 to-pink-500',
      sections: [
        {
          titleEn: 'Section A - Multi-Choice Questions',
          titleHi: `खण्ड 'अ' - सही विकल्प चुनिए`,
          questions: [
            `प्रश्न 1: शून्यकों की संख्या ज्ञात कीजिए यदि वक्र x-अक्ष को तीन बिंदुओं पर प्रतिच्छेद करता है।\n(अ) 1 (ब) 2 (स) 3 (द) 4`,
            `प्रश्न 2: क्या $x^2 + 5x + 6 = 0$ के वास्तविक मूल हैं?\n(अ) हाँ (ब) नहीं (स) दोनों (द) कह नहीं सकते।`
          ]
        },
        {
          titleEn: 'Section B - Objective and Concepts',
          titleHi: `खण्ड 'ब' - अति लघु उत्तरीय एवं प्रमेय`,
          questions: [
            `प्रश्न 3: समांतर श्रेढ़ी 5, 8, 11, 14... का सार्व अंतर (d) क्या होगा?`,
            `प्रश्न 4: पाइथागोरस प्रमेय का कथन लिखिए।`
          ]
        }
      ]
    },
    {
      id: 'hi_2026',
      subjectId: 'hindi',
      subjectNameEn: 'Hindi (Practice Paper)',
      subjectNameHi: 'हिंदी (अभ्यास प्रश्न पत्र)',
      year: 2026,
      fileSize: '1.2 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Practice Paper',
      examTypeHi: 'अभ्यास परीक्षा 2026',
      color: 'from-orange-500 to-amber-500',
      sections: [
        {
          titleEn: 'Section A - Objective Questions',
          titleHi: `खण्ड 'अ' - सही जोड़ी बनाइए एवं वस्तुनिष्ठ`,
          questions: [
            `प्रश्न 1: 'कबीर ग्रन्थावली' किस कवि के पदों का संग्रह है?\n(अ) कबीरदास (ब) तुलसीदास (स) सूरदास (द) जायसी।`,
            `प्रश्न 2: 'महाकाव्य' में कम से कम कितने सर्ग होने चाहिए?\n(अ) 8 (ब) 4 (स) 5 (द) 10।`
          ]
        },
        {
          titleEn: 'Section B - Prose and Grammar',
          titleHi: `खण्ड 'ब' - गद्य एवं व्याकरण बोध`,
          questions: [
            `प्रश्न 3: बालगोबिन भगत के संगीत को लेखक ने जादू क्यों कहा है?`,
            `प्रश्न 4: द्वंद्व समास की सोदाहरण परिभाषा लिखिए।`
          ]
        }
      ]
    },
    {
      id: 'sc_2025',
      subjectId: 'science',
      subjectNameEn: 'Science',
      subjectNameHi: 'विज्ञान',
      year: 2025,
      fileSize: '1.3 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Main Board Exam',
      examTypeHi: 'वार्षिक परीक्षा 2025',
      color: 'from-emerald-500 to-teal-500',
      sections: [
        {
          titleEn: 'Section A - Interactive Objective Revision',
          titleHi: `खण्ड 'अ' - महत्वपूर्ण बहुविकल्पीय प्रश्न`,
          questions: [
            `प्रश्न 1: धोने के सोडा का रासायनिक सूत्र क्या है? \n(अ) Na2CO3.10H2O (ब) NaHCO3 (स) NaOH (द) CaOCl2.`,
            `प्रश्न 2: टमाटर में कौन सा अम्ल उपस्थित होता है?\n(अ) ऑक्सेलिक अम्ल (ब) सिट्रिक अम्ल (स) टार्टरिक अम्ल (द) मेथेनॉइक अम्ल।`
          ]
        },
        {
          titleEn: 'Section B - Physics & Chemistry Basic',
          titleHi: `खण्ड 'ब' - भौतिकी एवं रसायन लघु उत्तरीय`,
          questions: [
            `प्रश्न 3: उदासीनीकरण अभिक्रिया किसे कहते हैं? एक रासायनिक समीकरण लिखिए।`,
            `प्रश्न 4: तारे क्यों टिमटिमाते हैं? सचित्र व्याख्या कीजिए।`
          ]
        }
      ]
    },
    {
      id: 'ss_2025',
      subjectId: 'social_science',
      subjectNameEn: 'Social Science',
      subjectNameHi: 'सामाजिक विज्ञान',
      year: 2025,
      fileSize: '1.5 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Past Board Exam',
      examTypeHi: 'वार्षिक परीक्षा 2025',
      color: 'from-amber-500 to-yellow-600',
      sections: [
        {
          titleEn: 'Section A - Geographics & Economics',
          titleHi: `खण्ड 'अ' - भूगोल और संसाधन विश्लेषण`,
          questions: [
            `प्रश्न 1: भारत में वन्य जीव संरक्षण अधिनियम कब लागू किया गया?\n(अ) 1972 (ब) 1980 (स) 1992 (द) 2002।`,
            `प्रश्न 2: सूचना अधिकार (RTI) भारत में कब लागू हुआ?\n(अ) अक्टूबर 2005 (ब) जनवरी 2006 (स) मार्च 2004 (द) दिसंबर 2005।`
          ]
        },
        {
          titleEn: 'Section B - History And Politics',
          titleHi: `खण्ड 'ब' - इतिहास और नागरिक शास्त्र`,
          questions: [
            `प्रश्न 3: जलियांवाला बाग हत्याकांड पर संक्षिप्त टिप्पणी लिखिए।`,
            `प्रश्न 4: लोकतंत्र में राजनीतिक दलों की आवश्यकता क्यों है?`
          ]
        }
      ]
    },
    {
      id: 'ma_2022',
      subjectId: 'math',
      subjectNameEn: 'Mathematics',
      subjectNameHi: 'गणित',
      year: 2022,
      fileSize: '1.4 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Past Board Exam',
      examTypeHi: 'वार्षिक परीक्षा 2022',
      color: 'from-rose-500 to-pink-500',
      sections: [
        {
          titleEn: 'Section A - Numerical Ability',
          titleHi: `खण्ड 'अ' - संख्यात्मक योग्यता बहुविकल्पी`,
          questions: [
            `प्रश्न 1: द्विघात समीकरण $ax^2 + bx + c = 0$ के दो बराबर वास्तविक मूल होते हैं यदि विभेदक (D):\n(अ) $b^2 - 4ac = 0$ (ब) $b^2 - 4ac > 0$ (स) $b^2 - 4ac < 0$ (द) $b^2 + 4ac = 0$।`,
            `प्रश्न 2: वृत्त के क्षेत्रफल का सूत्र क्या होगा?\n(अ) $\\pi r^2$ (ब) $2\\pi r$ (स) $\\pi r$ (द) $2\\pi r^2$।`
          ]
        },
        {
          titleEn: 'Section B - Geometry Theorems',
          titleHi: `खण्ड 'ब' - ज्यामिति और त्रिकोणमिति`,
          questions: [
            `प्रश्न 3: $\\sin 60^\\circ \\cos 30^\\circ + \\sin 30^\\circ \\cos 60^\\circ$ का मान ज्ञात कीजिए।`,
            `प्रश्न 4: वृत्त के किसी बिन्दु पर स्पर्श रेखा स्पर्श बिन्दु से जाने वाली त्रिज्या पर लम्ब होती है, सिद्ध कीजिए।`
          ]
        }
      ]
    },
    {
      id: 'en_2022',
      subjectId: 'english',
      subjectNameEn: 'English',
      subjectNameHi: 'अंग्रेजी',
      year: 2022,
      fileSize: '1.2 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Past Board Exam',
      examTypeHi: 'वार्षिक परीक्षा 2022',
      color: 'from-blue-500 to-indigo-500',
      sections: [
        {
          titleEn: 'Section A - Reading Comprehension',
          titleHi: `खण्ड 'अ' - अपठित गद्यांश (Unseen Passage)`,
          questions: [
            `Question 1: Read the passage carefully and choose the correct answer:\n"Discipline is the key to success..."\n(a) What is the key to success? \n(b) Why is discipline important for students?`
          ]
        },
        {
          titleEn: 'Section B - Functional Grammar',
          titleHi: `खण्ड 'ब' - व्याकरण एवं वाक्य निर्माण`,
          questions: [
            `Question 2: Fill in the blanks with correct prepositions:\n(a) The book is _______ the table. (on/at/in)\n(b) She has been studying _______ morning. (since/for).`
          ]
        }
      ]
    },
    {
      id: 'hi_2021',
      subjectId: 'hindi',
      subjectNameEn: 'Hindi',
      subjectNameHi: 'हिंदी',
      year: 2021,
      fileSize: '1.1 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Past Board Exam',
      examTypeHi: 'वार्षिक परीक्षा 2021',
      color: 'from-orange-500 to-amber-500',
      sections: [
        {
          titleEn: 'Section A - Literary History',
          titleHi: `खण्ड 'अ' - हिंदी साहित्य का इतिहास`,
          questions: [
            `प्रश्न 1: छायावाद के जनक किसे माना जाता है?\n(अ) जयशंकर प्रसाद (ब) सुमित्रानंदन पंत (स) सूर्यकांत त्रिपाठी निराला (द) महादेवी वर्मा।`,
            `प्रश्न 2: काव्य के कितने भेद होते हैं? \n(अ) 2 (ब) 3 (स) 4 (द) 5।`
          ]
        },
        {
          titleEn: 'Section B - Textbook Explanations',
          titleHi: `खण्ड 'ब' - पाठ्यपुस्तक सस्वर व्याख्या`,
          questions: [
            `प्रश्न 3: परशुराम के क्रोध करने पर लक्ष्मण ने धनुष के टूट जाने के लिए कौन-कौन से तर्क दिए?`,
            `प्रश्न 4: वीर रस की परिभाषा उद्धरण सहित लिखिए।`
          ]
        }
      ]
    },
    {
      id: 'sc_2021',
      subjectId: 'science',
      subjectNameEn: 'Science',
      subjectNameHi: 'विज्ञान',
      year: 2021,
      fileSize: '1.3 MB',
      totalMarks: 75,
      duration: '3 Hours',
      examType: 'Past Board Exam',
      examTypeHi: 'वार्षिक परीक्षा 2021',
      color: 'from-emerald-500 to-teal-500',
      sections: [
        {
          titleEn: 'Section A - Basic Scientific Formulae',
          titleHi: `खण्ड 'अ' - आधारभूत वैज्ञानिक अवधारणाएँ`,
          questions: [
            `प्रश्न 1: प्रकाश के अपवर्तन का नियम क्या है? \n(अ) स्नेल का नियम (ब) न्यूटन का नियम (स) ओम का नियम (द) चार्ल्स का नियम।`,
            `प्रश्न 2: मानव रक्त का pH मान कितना होता है?\n(अ) 7.4 (ब) 6.0 (स) 8.2 (द) 7.0।`
          ]
        },
        {
          titleEn: 'Section B - Conceptual Explanation',
          titleHi: `खण्ड 'ब' - रासायनिक एवं जैविक प्रक्रियाएँ`,
          questions: [
            `प्रश्न 3: धमनी और शिरा में कोई तीन मुख्य अंतर लिखिए।`,
            `प्रश्न 4: प्रकाश संश्लेषण प्रक्रिया के रासायनिक समीकरण को लिखिए तथा मुख्य चरणों को समझाइए।`
          ]
        }
      ]
    },
    {
      id: 'en_2021',
      subjectId: 'english',
      subjectNameEn: 'English (Special)',
      subjectNameHi: 'अंग्रेजी (विशिष्ट)',
      year: 2021,
      fileSize: '1.5 MB',
      totalMarks: 100,
      duration: '3 Hours',
      examType: 'Past Board Exam',
      examTypeHi: 'वार्षिक परीक्षा 2021',
      color: 'from-blue-600 to-indigo-600',
      sections: [
        {
          titleEn: 'SECTION-A (Reading)',
          titleHi: 'खण्ड \'अ\' - अपठित बोध (Reading)',
          questions: [
            `Question 1: Read the following passage carefully and answer the questions given below:\n\nWhen Alexander Fleming was sixteen, he had to work to earn his living. He found a job in a shipping office in London. The wages were small and the work rather uninteresting. He also worked as a volunteer soldier on weekends and holidays. It was soon discovered that the sturdy young man from Scotland was a fine shot and a very good swimmer.\n\nJust afterwards, a relative died, leaving him a small but useful sum of money. His brother Thomas advised him to give up the job at the shipping office and spend the money on his training as a doctor. Alexander said later, "My brother Thomas pushed me into medicine."\n\nSo he joined St. Mary's hospital school. He attended lectures and watched operations, he also swam and acted in plays. Yet he was always the top student in the examination. He won many prizes and scholarships. It came to be known about his memory that he could remember the whole book after reading it just once.\n\nQuestions:\n(i) Alexander Fleming was fond of :-\n(a) travelling  (b) hunting  (c) swimming  (d) music\n\n(ii) He had to work to earn his living when he was in :-\n(a) his teens  (b) his twenties  (c) his thirties  (d) his forties\n\n(iii) "Thomas advised him to give up the job at the shipping office." The meaning of the underlined phrasal verb 'give up' is:-\n(a) to hand over  (b) to abandon  (c) to surrender  (d) to delay\n\n(iv) Name the place where Alexander was born.\n(v) How did Fleming like the job?\n(vi) What made it possible for Fleming to become a doctor?`,
            `Question 2: Read the following poem carefully and answer the questions given below:\n\nThe rain had fallen, the poet rose\nHe passed by the town and out of the street,\nA light wind blew from the gates of the sun,\nAnd waves of shadow went over the wheat,\nAnd he sat him down in a lonely place\nAnd chanted a melody loud and sweet\nThat made the wild swan pause in her cloud,\nAnd the lark drop down at his feet,\nThe swallow as he haunted the fly\nThe snake slid under a spray.\nThe wild hawk stood with the swan on his beak\nAnd stared with his foot on the prey.\nAnd the nightingale thought, "I have sung many songs"\nBut never a one so gay.\n\nQuestions:\n(a) The phrase 'gates of the sun' means:-\n(i) behind the hills\n(ii) the east direction\n(iii) the street in the town\n(iv) the gates of the town\n\n(b) Say whether the statement is 'true' or 'false':\n'The wild hawk was staring at its prey.'\n\n(c) What made the wild swan pause in her cloud ?\n(i) a sweet melody\n(ii) loud wind\n(iii) waves of shadow\n(iv) the swallow\n\n(d) How did the snake react to the poet's song ?\n(i) the snake danced\n(ii) the snake slid under flower\n(iii) the snake gave the tree a spray\n(iv) the snake slid under a small branch\n\n(e) What did the poet do when rain had fallen?\n(f) What did the nightingale think about the poet's song ?`,
            `Question 3: Read the passage carefully and answer the questions given below it:\n\nWhy is it that there are very few women players in our orchestras ? If one could reply flatly sex determination they don't want women in orchestras that would be a definite answer. But one can't say that. As a matter of fact there are, if not many, a few women playing today in symphony orchestras. Nevertheless, it is true that male orchestral players are in an overwhelming majority. Why is that? I'm afraid, there is no one to answer. \n\nThere are physical reasons why women don't perform well on certain instruments. The average woman is not likely to possess sufficient lung power and sheer muscular strength to play the tuba just as an average woman's hands are not likely to be large enough to finger a double bass satisfactorily. But what about the other instruments ?\n\nI think social and family pressure have been very strong in keeping women out of orchestras. Think of the prejudice that existed half a century ago against the so called 'nice girls going on stage'. The stage was won out for the simple reason that it had to have women to play feminine roles in plays and operas, and was willing to offer a young woman more money than she could make in any other profession. Moreover, on stage, she was appearing as an individual, as a centre of attraction. This was gratifying to both her and her family. To this day, while the average parents are reconciled to seeing their daughter become an opera singer or concert artist, they don't like the idea of seeing her submerging her personality to become the member of a chorus of the orchestra.\n\nQuestions:\n(a) The word similar in meaning to 'a group of musicians' is -\n(i) orchestra\n(ii) chorus\n(iii) stage\n(iv) melody\n\n(b) Say 'True' or 'False':\nAs a matter of fact there are absolutely no women playing today in symphony.\n\n(c) The meaning of majority is -\n(i) very few in number\n(ii) dozen\n(iii) maximum in number\n(iv) a score\n\n(d) What is the prime reason for a few number of women in orchestras ? (in one word)\n(e) What are the genetic deficiencies in women for playing instruments ?\n(f) What are the reasons according to the narrator that keep women away from orchestras ?\n(g) What are the changing behaviours of parents now-a-days ?\n(h) Why were the parents not willing for women to appear on a stage ?\n(i) Why was the stage won out ?`
          ]
        },
        {
          titleEn: 'SECTION-B (Writing)',
          titleHi: 'खण्ड \'ब\' - लेखन कौशल (Writing)',
          questions: [
            `Question 4: "Beauty strikes the eyes but goodness moves to heart." Explain your views.\nOR\n"United we stand, divided we fall" - Elaborate this thought.`,
            `Question 5: Your school is going to organise social work for the welfare of the poor living in slum areas of your city. Draft a notice from the Principal of your school.\nOR\nWrite a telegram to your friend congratulating him on his success in the board examination.`,
            `Question 6: Write an article for your school level competition on 'Say No to Polythene Bags'. Write it with the help of the points given below: (in about 150 words)\n(i) Say 'No to Polythene - A Campaign\n(ii) Harmful effects of the polythene\n(iii) Awareness among people\n(iv) Efforts and their implementations\n(v) Replacement of polythenes.\n\nOR\nLook at the environmental inputs showing plastic clutter and produce a text-based description about it. Write in 120-150 words.`,
            `Question 7: You are Rohit Gupta, residing at 56, Gandhi Nagar, Rewa. Write a letter to your friend inviting him to spend a part of summer vacation with you at any hill station.\nOR\nWrite a letter to the District Health Officer drawing his attention to the insanitary conditions prevailing in your locality.`,
            `Question 8: Write an essay on any one of the following topics in about 250 words:\n(i) Importance of Trees.\n(ii) Science in our daily life.\n(iii) Corona - A threat to our society.\n(iv) Value of Discipline.\n(v) Save Animals.\n(vi) Values of Games and Sports.`
          ]
        },
        {
          titleEn: 'SECTION-C (Grammar)',
          titleHi: 'खण्ड \'स\' - व्यावहारिक व्याकरण (Grammar)',
          questions: [
            `Question 9: Fill in the blanks with suitable words given in the brackets: (any ten)\n\n(i) Diamond is ______ hardest of all metals. (a, an, the)\n(ii) I am not interested ______ politics. (to, of, in)\n(iii) Where there is a will, there ______ a way. (are, was, is)\n(iv) Look ______ you leap. (before, after, with)\n(v) There isn't ______ rice in the bowl. (much, many)\n(vi) Will it make ______ difference to you ? (some, any, many)\n(vii) Either Sita or Gita ______ come. (has, have, are)\n(viii) Speak slowly ______ you should listen. (lest, but, and)\n(ix) My father ______ cross the river, when he was young. (was, could, can)\n(x) We ______ to serve our nation. (should, ought, need)\n(xi) If you work hard you ______ be selected. (should, would, will)\n(xii) You must abide ______ the rules of road. (by, with, to)`,
            `Question 10: Do as directed: (any five)\n\n(i) They went to school every day. (Change into interrogative)\n(ii) He does his work very neatly. (Change into negative)\n(iii) Reema said, "Dogs bark at strangers." (Rewrite the sentence into indirect speech)\n(iv) The garden has lovely flowers. The garden is in front of my house. (Combine the sentences using 'Relative Clause')\n(v) Twenty rupees are not a big amount. (Correct the sentence)\n(vi) She is so poor that she can not pay her fees. (Rewrite the sentence using 'too-to')\n(vii) I am glad that I have met my friend. (Rewrite the sentence using 'an infinitive')`
          ]
        },
        {
          titleEn: 'SECTION-D (Text Book)',
          titleHi: 'खण्ड \'द\' - पाठ्यपुस्तक (Text Book)',
          questions: [
            `Question 11: Read the extract carefully from the poem and answer the questions given below:\n\n"Old man", said a fellow pilgrim, near\n"You are wasting strength with building here"\nYour journey will end with the ending day;\nYou never again must pass this way.\n\nQuestions:\n(a) This extract is taken from the poem....\n(i) The Bridge Builder  (ii) To the Cuckoo  (iii) Gitanjali\n\n(b) Who addressed the old man ?\n(i) A woman  (ii) A child  (iii) A fellow traveller\n\n(c) Who was building the bridge ? Where? Why ?`,
            `Question 12: Read the extract of the poem and answer the questions given below:\n\nIn one salutation to thee, my God let\nall my senses spread out and touch this\nworld at thy feet like a rain-cloud of July hung low\nwith its burden of unshed showers\nall my mind bend down at thy door in one\nsalutation to thee.\n\nQuestions:\n(a) The poet of these lines is -\n(i) John Keats  (ii) Robert Frost  (iii) Rabindranath Tagore  (iv) William Wordsworth\n\n(b) The one word used for 'something loaded' in the extract is :\n(i) burden  (ii) mind  (iii) showers  (iv) door\n\n(c) What is the cloud burdened with ?`,
            `Question 13: Answer any one of the following questions: (in about 120-150 words)\n(i) What were the qualities of Wasserkopf that the Principal and the Masters evaluated ?\nOR\n(ii) Describe how Jean and Pierre managed to get the pie.`,
            `Question 14: Answer any four of the following questions in about 30-40 words:\n(a) What happened to the statue of the Happy Prince at last ?\n(b) What is Bacon's advice on extraordinary expenses ?\n(c) What did the author see when he looked through the glass partition?\n(d) How did Behrman save Johnsy's life ?\n(e) What would Helen like to see in the eyes of her teacher ?`,
            `Question 15: Answer any one of the questions in about 75-100 words:\n(i) What do the Jataka stories recount?\nOR\nWrite a note on the importance of hard work in life.`
          ]
        }
      ]
    }
  ];

  // Helper to handle client-side interactive actions and static PDF downloads
  const handleAction = (id: string, nameEn: string) => {
    const isInteractive = id === 'hindi' || id === 'social_science' || id === 'science' || id === 'math' || id === 'sanskrit';
    if (isInteractive) {
      setActiveSubjectId(id as any);
    } else {
      if (downloadedIds.includes(id)) return;
      setDownloadingId(id);
      setTimeout(() => {
        setDownloadingId(null);
        setDownloadedIds(prev => [...prev, id]);
      }, 1500);
    }
  };

  const handlePyqDownload = (id: string) => {
    if (downloadedIds.includes(id)) return;
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds(prev => [...prev, id]);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const getActiveBlueprintData = () => {
    switch (activeSubjectId) {
      case 'hindi':
        return hindiBlueprint;
      case 'social_science':
        return socialScienceBlueprint;
      case 'science':
        return scienceBlueprint;
      case 'math':
        return mathBlueprint;
      case 'sanskrit':
        return sanskritBlueprint;
      default:
        return [];
    }
  };

  const getActiveSubjectName = () => {
    switch (activeSubjectId) {
      case 'hindi':
        return 'हिन्दी (Hindi)';
      case 'social_science':
        return 'सामाजिक विज्ञान (SST)';
      case 'science':
        return 'विज्ञान (Science)';
      case 'math':
        return 'गणित (Mathematics)';
      case 'sanskrit':
        return 'संस्कृत (Sanskrit)';
      default:
        return '';
    }
  };

  // Filter Past Papers
  const filteredPapers = pastPapers.filter((paper) => {
    const matchesSubject = pyqSubjectFilter === 'all' || paper.subjectId === pyqSubjectFilter;
    const matchesYear = pyqYearFilter === 'all' || paper.year.toString() === pyqYearFilter;
    const matchesSearch = 
      paper.subjectNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subjectNameHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.year.toString().includes(searchQuery);
    return matchesSubject && matchesYear && matchesSearch;
  });

  const activeBlueprintData = getActiveBlueprintData();
  const activeSubjectName = getActiveSubjectName();

  return (
    <div className="bg-slate-50 min-h-[90vh] py-16 px-4 md:px-6 relative overflow-hidden animate-fade-in flex flex-col items-center">
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-brand-orange rounded-full blur-[120px] -translate-y-1/3" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-brand-navy rounded-full blur-[120px] translate-y-1/3" />
      </div>

      <div className="max-w-6xl w-full z-10">
        {!activePyqPaper && (
          <div className="animate-fade-in">
            {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-black tracking-widest uppercase rounded-full mb-4 border border-brand-orange/20"
          >
            <Sparkles size={14} />
            <span>Syllabus & Material Portal</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-brand-navy tracking-tight mb-3 uppercase">
            Downloads <span className="text-brand-orange">/</span> डाउनलोड्स
          </h1>
          <p className="text-slate-500 font-bold max-w-xl mx-auto text-base">
            Bilingual educational blueprints and previous board exam papers with solutions.
            <span className="block text-brand-orange mt-1">विशेष पाठ्यक्रम ब्लूप्रिंट और पिछले वर्षों के परीक्षा पत्र</span>
          </p>
        </div>

        {/* CUSTOM SEGMENTED TAB SELECTOR WITH BEAUTIFUL TRANSITION */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex gap-2">
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-5 py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'blueprint'
                  ? 'bg-brand-navy text-white shadow-lg'
                  : 'text-slate-500 hover:text-brand-navy hover:bg-slate-50'
              }`}
            >
              <BookOpen size={16} />
              <span>Syllabus Blueprint / ब्लूप्रिंट class 10th</span>
            </button>
            <button
              onClick={() => setActiveTab('pyq')}
              className={`px-5 py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'pyq'
                  ? 'bg-brand-navy text-white shadow-lg'
                  : 'text-slate-500 hover:text-brand-navy hover:bg-slate-50'
              }`}
            >
              <FileQuestion size={16} className={activeTab === 'pyq' ? 'text-brand-orange animate-pulse' : ''} />
              <span>Previous Papers / पुराने पेपर</span>
            </button>
          </div>
        </div>

        {/* CONDITIONAL RENDERING OF BOTH TAB WORKFLOWS */}
        <AnimatePresence mode="wait">
          {activeTab === 'blueprint' ? (
            <motion.div
              key="blueprint-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* Subjects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => {
                  const isDownloading = downloadingId === subject.id;
                  const isDownloaded = downloadedIds.includes(subject.id);
                  const isInteractive = subject.id === 'hindi' || subject.id === 'social_science' || subject.id === 'science' || subject.id === 'math' || subject.id === 'sanskrit';

                  return (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white rounded-3xl p-6 shadow-xl border flex flex-col justify-between group hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${
                        isInteractive ? 'border-brand-orange/50 ring-2 ring-brand-orange/10 shadow-brand-orange/5' : 'border-slate-100'
                      }`}
                    >
                      {/* Decorative border accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${subject.color}`} />

                      <div>
                        {/* Top line with Icon & Size */}
                        <div className="flex justify-between items-center mb-4 mt-2">
                          <div className={`p-3.5 rounded-2xl border ${subject.iconBg} relative`}>
                            <BookOpen size={24} />
                            {isInteractive && (
                              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-brand-orange rounded-full animate-ping" />
                            )}
                          </div>
                          <span className="text-xs font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-xl">
                            {isInteractive ? 'Interactive' : subject.fileSize}
                          </span>
                        </div>

                        {/* Bilingual Title */}
                        <div className="mb-3">
                          <h3 className="text-2xl font-black text-brand-navy leading-none mb-1 group-hover:text-brand-orange transition-colors">
                            {subject.nameEn}
                          </h3>
                          <p className="text-sm text-slate-400 font-black tracking-wide uppercase">
                            {subject.nameHi}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-slate-500 text-xs font-bold leading-relaxed mb-6">
                          {subject.description}
                        </p>
                      </div>

                      {/* Download / Interactive Button */}
                      <button
                        disabled={isDownloading}
                        onClick={() => handleAction(subject.id, subject.nameEn)}
                        className={`w-full py-3.5 rounded-2xl font-black uppercase text-sm tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isDownloading
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : isInteractive
                            ? 'bg-brand-navy text-white hover:bg-brand-navy/95 shadow-lg shadow-brand-navy/15 hover:scale-[1.02] border border-brand-navy'
                            : isDownloaded
                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                            : 'bg-brand-orange text-white hover:bg-brand-orange/90 shadow-lg shadow-brand-orange/15 hover:scale-[1.02]'
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <div className="w-5 h-5 border-3 border-slate-400 border-t-transparent rounded-full animate-spin" />
                            <span>Downloading...</span>
                          </>
                        ) : isInteractive ? (
                          <>
                            <ZoomIn size={18} className="text-brand-orange" />
                            <span>View Blueprint / देखें</span>
                          </>
                        ) : isDownloaded ? (
                          <>
                            <CheckCircle size={18} />
                            <span>Downloaded / डाउनलोड हो गया</span>
                          </>
                        ) : (
                          <>
                            <Download size={18} />
                            <span>Download Blueprint</span>
                          </>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="pyq-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 animate-fade-in"
            >
              {/* FILTERS & SEARCH CONTROL PANEL */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="text-brand-orange" size={20} />
                    <h2 className="text-xl font-black text-brand-navy uppercase tracking-tight">
                      Search & Filters <span className="text-brand-orange">/</span> खोजें
                    </h2>
                  </div>
                  
                  {/* Dynamic Search Bar */}
                  <div className="relative w-full md:max-w-xs">
                    <input
                      type="text"
                      placeholder="Search subject / year..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:bg-white transition-all shadow-inner"
                    />
                    <Search className="absolute left-3.5 top-3.5 text-slate-400" size={16} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-slate-50">
                  {/* Subject Selector */}
                  <div className="flex items-center gap-2">
                    <BookOpen size={14} className="text-brand-orange" />
                    <span className="text-xs font-black text-brand-navy uppercase tracking-wider">Subject:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'hindi', label: 'Hindi' },
                      { key: 'english', label: 'English' },
                      { key: 'math', label: 'Mathematics' },
                      { key: 'science', label: 'Science' },
                      { key: 'social_science', label: 'SST' }
                    ].map((subj) => (
                      <button
                        key={subj.key}
                        onClick={() => setPyqSubjectFilter(subj.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          pyqSubjectFilter === subj.key
                            ? 'bg-brand-orange text-white border-brand-orange/30 shadow-md'
                            : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        {subj.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-slate-50">
                  {/* Year Selector */}
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-brand-navy" />
                    <span className="text-xs font-black text-brand-navy uppercase tracking-wider">Year:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['all', '2026', '2025', '2024', '2023', '2022', '2021'].map((year) => {
                      const isComingSoon = ['2026', '2025', '2024', '2023', '2022'].includes(year);
                      return (
                        <button
                          key={year}
                          onClick={() => handleYearFilterClick(year)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1 ${
                            pyqYearFilter === year
                              ? 'bg-brand-navy text-white border-brand-navy/30 shadow-md'
                              : isComingSoon
                              ? 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100 italic'
                              : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100'
                          }`}
                        >
                          <span>{year === 'all' ? 'All Years' : `${year} Exam`}</span>
                          {isComingSoon && (
                            <span className="text-[8px] bg-amber-500/15 text-amber-600 px-1 py-0.2 rounded font-black tracking-wider uppercase">
                              Soon
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* PAST PAPERS GRID CONTAINER */}
              {filteredPapers.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPapers.map((paper, index) => {
                    const isDownloading = downloadingId === paper.id;
                    const isDownloaded = downloadedIds.includes(paper.id);

                    return (
                      <motion.div
                        key={paper.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${paper.color}`} />
                        
                        <div>
                          {/* Year and Type display */}
                          <div className="flex justify-between items-center mb-4 mt-2">
                            <span className="text-[10px] font-black text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full uppercase tracking-wider">
                              Board Exam ${paper.year}
                            </span>
                            <span className="text-xs font-bold text-slate-400">
                              &nbsp;${paper.fileSize}
                            </span>
                          </div>

                          {/* Titles */}
                          <div className="mb-4">
                            <h3 className="text-2xl font-black text-brand-navy group-hover:text-brand-orange transition-colors">
                              ${paper.subjectNameEn}
                            </h3>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-0.5">
                              ${paper.subjectNameHi}
                            </p>
                          </div>

                          {/* Quick details */}
                          <div className="bg-slate-50 rounded-2xl p-4 mb-6 space-y-2 text-xs font-bold text-slate-500">
                            <div className="flex justify-between">
                              <span>Maximum Marks / पूर्णांक:</span>
                              <span className="text-brand-navy font-black">${paper.totalMarks} Marks</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time Duration / समय:</span>
                              <span className="text-brand-navy font-black">${paper.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Exam Type / श्रेणी:</span>
                              <span className="text-brand-orange font-black">${paper.examTypeHi}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Buttons footer */}
                        <div className="space-y-2.5">
                          {/* Quick interactive test view booklet */}
                          <button
                            onClick={() => {
                              setActivePyqPaper(paper);
                            }}
                            className="w-full py-3 bg-brand-navy text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-navy/90 transition-all flex items-center justify-center gap-2 cursor-pointer border border-brand-navy shadow-md shadow-brand-navy/10"
                          >
                            <ZoomIn size={14} className="text-brand-orange" />
                            <span>Quick Practice / देखें</span>
                          </button>

                          {/* Download PDF simulation */}
                          <button
                            onClick={() => handlePyqDownload(paper.id)}
                            disabled={isDownloading}
                            className={`w-full py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                              isDownloading
                                ? 'bg-slate-100 text-slate-400 border-slate-100 cursor-not-allowed'
                                : isDownloaded
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                                : 'bg-slate-100 text-brand-navy border-slate-200/60 hover:bg-slate-200'
                            }`}
                          >
                            {isDownloading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                <span>Generating...</span>
                              </>
                            ) : isDownloaded ? (
                              <>
                                <CheckCircle size={14} />
                                <span>Downloaded PDF / डाउनलोड सफल</span>
                              </>
                            ) : (
                              <>
                                <Download size={14} />
                                <span>Download PDF / पीडीएफ</span>
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center bg-white rounded-3xl p-12 border border-slate-100 shadow-md">
                  <FileText className="mx-auto text-slate-300 mb-4" size={48} />
                  <p className="text-slate-400 font-bold">No results found matching your query.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Board Portal Notice */}
            <div className="mt-16 text-center text-xs font-black text-slate-400 uppercase tracking-widest border-t border-slate-200/60 pt-8">
              <span>* Compiled from MPBSE Board Regulatory Schema</span>
            </div>
          </div>
        )}
      </div>

      {/* STUNNING INTERACTIVE MODAL FOR BLUEPRINT INTERACTIVE DETAILS */}
      <AnimatePresence>
        {activeSubjectId && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubjectId(null)}
              className="fixed inset-0 bg-brand-navy/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="bg-white rounded-3xl sm:rounded-[2.5rem] w-full max-w-4xl shadow-2xl relative z-10 overflow-hidden border border-slate-100 flex flex-col my-2 sm:my-8 print:my-0 print:border-none print:shadow-none max-h-[95vh] sm:max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-brand-navy text-white p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative print:bg-white print:text-black print:p-0 print:border-b-2 print:border-slate-800">
                <div className="space-y-1.5 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-brand-orange print:hidden" />
                    <span className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-brand-orange/90 print:text-slate-600">
                      मप्र माध्यमिक शिक्षा मण्डल (MPBSE)
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight flex items-center gap-2">
                    अंक योजना <span className="text-brand-orange">|</span> Blueprint
                  </h2>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm font-semibold text-slate-300 print:text-slate-800">
                    <div>कक्षा :- <strong className="text-white print:text-black font-extrabold text-sm">10वीं</strong></div>
                    <div>विषय :- <strong className="text-white print:text-black font-extrabold text-sm">{activeSubjectName}</strong></div>
                    <div>पूर्णांक :- <strong className="text-brand-orange font-extrabold text-sm">75</strong></div>
                    <div>समय :- <strong className="text-white print:text-black font-extrabold text-sm">3:00 घंटे</strong></div>
                  </div>
                </div>

                {/* Close Button & Print button */}
                <div className="flex items-center gap-2 self-end sm:self-center print:hidden">
                  <button
                    onClick={handlePrint}
                    className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl text-white transition-colors cursor-pointer"
                    title="Print Document"
                  >
                    <Printer size={18} />
                  </button>
                  <button
                    onClick={() => setActiveSubjectId(null)}
                    className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl text-white transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content Grid representing the Blueprint perfectly */}
              <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 sm:space-y-6 print:p-0">
                {activeBlueprintData.map((unit) => (
                  <div key={unit.id} className="border border-slate-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
                    {/* Unit Header */}
                    <div className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 text-white font-black text-sm sm:text-base md:text-lg">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-brand-orange text-white flex items-center justify-center text-[10px] sm:text-sm font-bold">
                          {unit.id}
                        </span>
                        <span className="font-extrabold">{unit.title}</span>
                      </div>
                    </div>

                    {/* Responsive Table Wrapper */}
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-0">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
                            <th className="px-3 py-2 sm:px-6 sm:py-3.5 w-12 sm:w-16 text-center">क्र.</th>
                            <th className="px-3 py-2 sm:px-6 sm:py-3.5">अध्याय / विषय वस्तु (Topic Details)</th>
                            <th className="px-3 py-2 sm:px-6 sm:py-3.5 w-28 sm:w-36 text-center">आवंटित अंक</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {unit.chapters.map((ch) => (
                            <tr key={ch.num} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-3 py-2 sm:px-6 sm:py-3 text-center font-bold text-slate-400 text-xs sm:text-sm">
                                {ch.num}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-3 font-semibold text-brand-navy text-xs sm:text-sm md:text-base whitespace-pre-line leading-relaxed py-3">
                                {ch.name}
                              </td>
                              <td className="px-3 py-2 sm:px-6 sm:py-3 text-center font-black text-brand-orange text-xs sm:text-sm md:text-base">
                                {ch.marks}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                {/* Footer Total */}
                <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center border border-slate-800 shadow-md">
                  <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-orange font-black">Final Aggregate / महायोग</span>
                    <h4 className="text-xl sm:text-2xl font-black leading-none mt-1">कुल आवंटित अंक</h4>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">Total Marks:</span>
                    <span className="text-2xl sm:text-4xl font-black text-white px-4 py-1.5 sm:px-6 sm:py-2 bg-brand-orange rounded-xl sm:rounded-2xl animate-pulse">75</span>
                  </div>
                </div>
              </div>

              {/* Modal Action Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between print:hidden">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide">
                  * Based on official Board marking guidelines.
                </span>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-4 py-2.5 sm:px-6 sm:py-3 bg-brand-navy text-white rounded-xl font-bold uppercase text-[10px] sm:text-xs tracking-wider hover:bg-brand-navy/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Print Blueprint</span>
                  </button>
                  <button
                    onClick={() => setActiveSubjectId(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 sm:px-6 sm:py-3 bg-slate-200 text-slate-700 rounded-xl font-bold uppercase text-[10px] sm:text-xs tracking-wider hover:bg-slate-300 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <span>Close / बंद करें</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIRECT INLINE RENDER FOR PREVIOUS YEAR PAPERS (AS A PAGE, NOT POPUP) */}
      <AnimatePresence mode="wait">
        {activePyqPaper && (
          <div className="w-full">
            {/* Simulated Booklet Body */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-3xl w-full max-w-6xl xl:max-w-7xl shadow-2xl relative overflow-hidden border border-slate-200/80 flex flex-col my-2 print:border-none print:shadow-none"
            >
              {/* Back breadcrumb bar */}
              <div className="bg-slate-50 border-b border-slate-200/60 p-4 flex items-center justify-between text-xs font-bold text-slate-600 print:hidden">
                <button
                  onClick={() => setActivePyqPaper(null)}
                  className="flex items-center gap-2 text-brand-navy hover:text-brand-orange transition-colors cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Previous Papers / सूची पर वापस जाएं</span>
                </button>
                <span className="text-[10px] font-black tracking-widest text-brand-orange uppercase">
                  MPBSE Practice Mode / मुख्य परीक्षा अभ्यास पत्र
                </span>
              </div>
              {/* Board Header styling like a physical test paper cover */}
              <div className="bg-amber-500/10 text-brand-navy border-b border-amber-500/20 p-5 md:p-6 relative print:bg-white print:text-black">
                {/* Board watermark icon */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none print:hidden">
                  <FileText size={120} className="text-brand-navy" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-600 tracking-wider">
                    <FileCheck size={14} />
                    <span>HIGH SCHOOL CERTIFICATE EXAMINATION - {activePyqPaper.year} (MAIN)</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase">
                    {activePyqPaper.subjectNameHi} <span className="text-slate-400 font-normal text-xl">|</span> {activePyqPaper.subjectNameEn}
                  </h2>
                  
                  {/* Grid for Roll Number and Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-slate-200/50 text-xs font-bold text-slate-600">
                    <div>
                      <span>Max Marks / पूर्णांक:</span>
                      <span className="block text-brand-navy font-black text-sm">{activePyqPaper.totalMarks}</span>
                    </div>
                    <div>
                      <span>Duration / समय:</span>
                      <span className="block text-brand-navy font-black text-sm">{activePyqPaper.duration}</span>
                    </div>
                    <div>
                      <span>Year / शैक्षणिक वर्ष:</span>
                      <span className="block text-brand-orange font-black text-sm">{activePyqPaper.year}</span>
                    </div>
                    {/* Interactive Roll No entry */}
                    <div className="print:hidden">
                      <label htmlFor="rollNoInput" className="block text-[10px] text-amber-700 tracking-wider uppercase mb-0.5 font-bold">
                        Roll Number / रोल नंबर:
                      </label>
                      <input
                        id="rollNoInput"
                        type="text"
                        maxLength={9}
                        placeholder="Enter 9-digit Roll"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="bg-white/80 border border-slate-300 rounded-lg px-2 py-1 text-xs font-black text-slate-800 tracking-widest placeholder:tracking-normal w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Right actions */}
                <div className="absolute right-4 top-4 flex gap-2 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-xl transition-colors cursor-pointer"
                    title="Print Exam Paper"
                  >
                    <Printer size={16} />
                  </button>
                  <button
                    onClick={() => setActivePyqPaper(null)}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-xl transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* BOOKLET LAYOUT GENERAL INSTRUCTIONS */}
              <div className="bg-slate-50 border-b border-light-gray-200 px-6 py-4 flex flex-col md:flex-row justify-between text-xs font-semibold text-slate-500 leading-relaxed gap-2 max-h-36 overflow-y-auto">
                <div className="space-y-1">
                  <p className="font-extrabold text-slate-700">General Instructions / सामान्य निर्देश:</p>
                  <p>1. All questions are compulsory. (सभी प्रश्न अनिवार्य हैं।)</p>
                  <p>2. Read instructions carefully before writing answers. (प्रश्नों के उत्तर लिखने से पूर्व निर्देश ध्यानपूर्वक पढ़ें।)</p>
                </div>
                <div className="text-right flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-black tracking-widest text-brand-orange">
                    BOARD PATTERN PRACTICE PORTAL
                  </span>
                  <span>* Simulated for Board Exam revision</span>
                </div>
              </div>

              {/* SECTION CONTROLLER - TABS FOR HIGH PERFORMANCE READING */}
              <div className="bg-slate-100/50 border-b border-slate-200/50 px-4 py-2.5 flex overflow-x-auto gap-2 scrollbar-none print:hidden">
                {activePyqPaper.sections.map((sec, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePyqSectionIdx(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      activePyqSectionIdx === idx
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <span>Section - {String.fromCharCode(65 + idx)}</span>
                    <span className="text-brand-orange">|</span>
                    <span className="font-bold text-[10px]">{sec.titleHi.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              {/* SECTION QUESTION CONTENT CARDS REVIEW */}
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                <div className="border border-amber-500/20 bg-amber-50/20 rounded-2xl p-4 mb-2">
                  <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md">
                    Selected Component / सक्रिय भाग
                  </span>
                  <h4 className="text-base font-extrabold text-brand-navy mt-1">
                    {activePyqPaper.sections[activePyqSectionIdx]?.titleHi}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-wide">
                    {activePyqPaper.sections[activePyqSectionIdx]?.titleEn}
                  </p>
                </div>

                <div className="space-y-4">
                  {activePyqPaper.sections[activePyqSectionIdx]?.questions.map((quest, qIdx) => (
                    <div 
                      key={qIdx} 
                      className="p-4 border border-slate-100 rounded-2xl bg-white hover:border-brand-orange/30 transition-all flex gap-3 group relative cursor-text"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {qIdx + 1}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base font-semibold text-brand-navy leading-relaxed whitespace-pre-line">
                        {quest}
                      </div>

                      {/* Interactive practice checkbox */}
                      <div className="absolute right-3 bottom-3 print:hidden opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-black text-brand-orange border border-brand-orange/20 bg-brand-orange/5 px-2.5 py-1 rounded-lg">
                          Read / हल कर लिया?
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OPTIONAL PRACTICE FOOTER WITH FEEDBACK */}
              <div className="p-5 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row gap-4 items-center justify-between print:hidden">
                <div className="text-xs font-bold text-slate-500">
                  {rollNumber ? (
                    <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                      <CheckCircle size={14} /> Registered roll number {rollNumber} for board revision mode!
                    </span>
                  ) : (
                    <span>Type your Roll Number to simulate custom answer-sheet print tracking.</span>
                  )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none px-5 py-3 bg-brand-navy text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:bg-brand-navy/95 border border-brand-navy font-black shadow-md shadow-brand-navy/10"
                  >
                    <Printer size={14} />
                    <span>Print Board booklet / प्रिंट</span>
                  </button>
                  <button
                    onClick={() => setActivePyqPaper(null)}
                    className="flex-1 sm:flex-none px-5 py-3 bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer hover:bg-slate-300 font-black"
                  >
                    <span>Close / बंद करें</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant Coming Soon Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-950 text-white rounded-3xl p-5 shadow-2xl border border-brand-orange/40 flex flex-col gap-3 backdrop-blur-md bg-opacity-95"
          >
            <div className="flex items-start gap-3 col-span-1">
              <div className="p-2 rounded-xl bg-brand-orange/20 text-brand-orange shrink-0">
                <Sparkles size={20} className="animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-wider text-brand-orange">Coming Soon</h4>
                  <button 
                    onClick={() => setShowToast(null)}
                    className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
                <p className="text-base font-black text-white mt-1 font-sans">
                  {showToast.year} Paper Uploading...
                </p>
                <p className="text-xs text-slate-300 mt-1.5 font-bold leading-relaxed">
                  बोर्ड परीक्षा {showToast.year} के प्रश्न पत्र और अंक योजना जल्द ही आ रहे हैं! हमारे साथ तैयारी जारी रखें।
                </p>
              </div>
            </div>
            
            {/* Tiny progress bar simulating activity */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-brand-orange"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
