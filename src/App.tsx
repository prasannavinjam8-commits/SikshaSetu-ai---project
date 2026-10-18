/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Users,
  MessageSquare,
  Bot,
  Compass,
  Calculator,
  UserCheck,
  Send,
  Mic,
  MicOff,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Award,
  MapPin,
  CheckCircle2,
  Share2,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  LogOut,
  ArrowRight,
  ArrowLeft,
  X,
  FileText,
  Lock,
  Mail,
  ExternalLink
} from 'lucide-react';

import {
  Lang,
  Role,
  Tab,
  translations
} from './i18n.ts';
import {
  COLLEGE_RECOMMENDATION_SETS,
  pickRecommendationSet,
  RecommendedCollege
} from './collegeRecommendations.ts';
import {
  saveFamilySyncInvite,
  savePreferencesInBackground,
  StudentPreferencesRecord
} from './supabase.ts';

// Web Speech API interface augmentation
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  tag?: string;
}

interface RoomMessage {
  id: string;
  sender: 'student' | 'parent' | 'ai';
  text: string;
  timestamp: string;
  originalLanguageNote?: string;
}

type AuthStep = 'select-role' | 'login' | 'forgot';

export default function App() {
  // Safe LocalStorage Retrieval Helper
  const getStored = (key: string, fallback: string): string => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  };

  const setStored = (key: string, val: string) => {
    try {
      localStorage.setItem(key, val);
    } catch {
      // Ignored if local storage restricted
    }
  };

  // Auth Flow & Session State
  const [authStep, setAuthStep] = useState<AuthStep>('select-role');
  const [session, setSession] = useState<'student' | 'parent' | null>(null);
  const [selectedRole, setSelectedRole] = useState<'student' | 'parent'>('student');
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('student@sikshasetu.edu');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [forgotEmail, setForgotEmail] = useState('');

  // Dashboard Initial State & Modal State
  const [formVisible, setFormVisible] = useState(false);
  const [showScholarshipsModal, setShowScholarshipsModal] = useState(false);

  // Global Role & Language State
  const [role, setRoleState] = useState<Role>(() => (getStored('siksha_role', 'student') as Role));
  const [lang, setLangState] = useState<Lang>(() => (getStored('siksha_lang', 'en') as Lang));
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    setStored('siksha_role', newRole);
  };

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    setStored('siksha_lang', newLang);
  };

  // Active translation dictionary
  const t = translations[lang] || translations.en;

  // Student Form State (Using stable internal keys)
  const [studentForm, setStudentForm] = useState({
    eapcetRank: 'Mid 15k-50k',
    admissionRoute: 'Merit+JVD Scholarship',
    topBranch: 'Software CSE/IT',
    whyBranch: 'Genuine passion',
    accommodation: 'Hosteler',
    collegePriority: 'Good placements/salary',
    fourYearGoal: 'High-paying Tech Job',
    backupPlan: 'Top college + Any branch',
  });

  // Parent Form State (Using stable internal keys)
  const [parentForm, setParentForm] = useState({
    preferredBranch: 'Software CSE/IT',
    childInterestWeight: 'Balance family + student',
    maxBudget: 350000,
    fundingSource: 'Govt Fee Reimbursement JVD',
    distanceLimit: 'Nearby under 150km',
    accommodationRule: 'Strict College Hostel',
    collegePriority: 'Good placements/salary',
    biggestConcern: 'Hidden Fees/Debt',
    definitionOfSuccess: 'Getting a job immediately',
  });

  // Strict Two-Sided Sync Workflow State
  const [isFamilySynced, setIsFamilySynced] = useState(false);
  const [isPartnerFormFilled, setIsPartnerFormFilled] = useState(false);
  const [isNotificationDotVisible, setIsNotificationDotVisible] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isInvited, setIsInvited] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Colleges shown in "Top Recommended Matches" (filled by generateRecommendations)
  const [recommendedColleges, setRecommendedColleges] = useState<RecommendedCollege[]>(
    COLLEGE_RECOMMENDATION_SETS.A
  );

  // Parent Budget Slider State in Tab 4 (Draggable ₹1,50,000 to ₹8,00,000)
  const [parentToolBudget, setParentToolBudget] = useState<number>(350000);

  // Student Roadmap Progress State in Tab 4
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({
    'y1_1': true,
    'y1_2': true,
  });

  // AI Counselor Chat State (Tab 2)
  const [botMessages, setBotMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: t.botWelcome,
      timestamp: '10:15 AM',
      tag: 'Counselor',
    },
  ]);
  const [botInput, setBotInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Family Discussion Room Chat State (Tab 3)
  const [roomMessages, setRoomMessages] = useState<RoomMessage[]>([
    {
      id: 'm1',
      sender: 'student',
      text: t.seedStudentText,
      timestamp: '10:40 AM',
    },
    {
      id: 'm2',
      sender: 'parent',
      text: `${t.seedParentTeOriginal} (${t.seedParentText})`,
      timestamp: '10:42 AM',
      originalLanguageNote: 'Telugu (తెలుగు)',
    },
    {
      id: 'm3',
      sender: 'ai',
      text: t.seedAiCompromise,
      timestamp: '10:43 AM',
    },
  ]);
  const [roomInput, setRoomInput] = useState('');
  const [roomSender, setRoomSender] = useState<'student' | 'parent'>('student');

  type MicStatus = 'idle' | 'requesting' | 'listening' | 'recognized' | 'stopped' | 'error' | 'unsupported';
  const [micStatus, setMicStatus] = useState<MicStatus>('idle');
  const [speechStatusText, setSpeechStatusText] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  // Sync / Profile State (Tab 5)
  const [parentEmail, setParentEmail] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [childEmail, setChildEmail] = useState('');
  const [coParentEmail, setCoParentEmail] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const roomBottomRef = useRef<HTMLDivElement>(null);

  // Helper for UI toast notifications
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setNotifications(prev => [msg, ...prev]);
    setIsNotificationDotVisible(true);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --------------------------------------------------------------------------
  // Navigation & Authentication Handlers
  // --------------------------------------------------------------------------

  // Choose Role on Initial Screen
  const handleSelectRole = (r: 'student' | 'parent') => {
    setSelectedRole(r);
    if (r === 'student') {
      setLoginEmail('student@sikshasetu.edu');
    } else {
      setLoginEmail('parent@family.org');
    }
    setLoginPassword('password123');
    setAuthStep('login');
  };

  // Sign In Action
  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginEmail.trim()) {
      showToast(t.emailInvalidToast);
      return;
    }
    setRole(selectedRole);
    setSession(selectedRole);
    setActiveTab('dashboard');
    setFormVisible(false); // Start at catchy initial caption state per requirement
    setShowResults(false);
    showToast(selectedRole === 'student'
      ? (lang === 'te' ? 'విద్యార్థి పోర్టల్‌లోకి లాగిన్ అయ్యారు' : lang === 'hi' ? 'विद्यार्थी पोर्टल में प्रवेश किया' : 'Logged in as Student')
      : (lang === 'te' ? 'తల్లిదండ్రుల పోర్టల్‌లోకి లాగిన్ అయ్యారు' : lang === 'hi' ? 'अभिभावक पोर्टल में प्रवेश किया' : 'Logged in as Parent')
    );
  };

  // Resend Password Action
  const handleResendPassword = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const targetEmail = forgotEmail.trim() || loginEmail;
    if (!targetEmail) {
      showToast(t.emailInvalidToast);
      return;
    }
    showToast(t.resetSentToast.replace('{email}', targetEmail));
    setAuthStep('login');
  };

  // Logout / Return to Portal Selection
  const handleLogout = () => {
    setSession(null);
    setAuthStep('select-role');
    setFormVisible(false);
    setShowResults(false);
    setShowScholarshipsModal(false);
    setActiveTab('dashboard');
    showToast(lang === 'te' ? 'లాగౌట్ విజయవంతమైంది' : lang === 'hi' ? 'लॉगआउट सफल हुआ' : 'Signed out');
  };

  // Global "Go Back" Navigation Handler
  // Visible on every screen EXCEPT the initial login screen (authStep === 'select-role' && !session)
  const canGoBack = Boolean(
    showScholarshipsModal ||
    (session === null && authStep !== 'select-role') ||
    (session !== null)
  );

  const handleGoBack = () => {
    // 1. If scholarships modal is open, close it
    if (showScholarshipsModal) {
      setShowScholarshipsModal(false);
      return;
    }

    // 2. If on login or forgot password screens (pre-session)
    if (session === null) {
      if (authStep === 'login' || authStep === 'forgot') {
        setAuthStep('select-role');
        return;
      }
      return;
    }

    // 3. If in active dashboard session
    if (activeTab === 'dashboard') {
      if (showResults) {
        setShowResults(false);
        return;
      }
      if (formVisible) {
        setFormVisible(false);
        return;
      }
      // On dashboard landing state -> return to initial login
      handleLogout();
      return;
    }

    // 4. If on other tabs (Counselor, Room, Roadmap/Budget, Sync) -> return to Dashboard
    setActiveTab('dashboard');
  };

  // Scroll chats on new messages
  useEffect(() => {
    if (activeTab === 'bot') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [botMessages, activeTab, isBotTyping]);

  useEffect(() => {
    if (activeTab === 'room') {
      roomBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [roomMessages, activeTab, micStatus]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignored
        }
      }
    };
  }, []);

  // Safely stop speech session if user switches language while microphone is active
  useEffect(() => {
    if (micStatus === 'listening' && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Ignored
      }
      setMicStatus('stopped');
      setSpeechStatusText(t.micStoppedLabel);
    }
  }, [lang]);

  // Robust Web Speech API Implementation with independent permission handling
  const handleToggleSpeech = async () => {
    if (micStatus === 'listening') {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignored
        }
      }
      setMicStatus('stopped');
      setSpeechStatusText(t.micStoppedLabel);
      return;
    }

    const win = window as unknown as IWindow;
    const SpeechRecognitionConstructor = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      setMicStatus('unsupported');
      setSpeechStatusText(t.micUnsupported);
      showToast(t.micUnsupported);
      return;
    }

    setMicStatus('requesting');
    setSpeechStatusText(t.micRequestingPermission);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (permErr: any) {
        setMicStatus('error');
        const isDenied = permErr.name === 'NotAllowedError' || permErr.name === 'PermissionDeniedError';
        const msg = isDenied ? t.micPermissionError : t.micNetworkError;
        setSpeechStatusText(msg);
        showToast(msg);
        return;
      }
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignored
        }
      }

      const recognition = new SpeechRecognitionConstructor();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      const speechLangCode = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.lang = speechLangCode;

      recognition.onstart = () => {
        setMicStatus('listening');
        setSpeechStatusText(t.micListeningLabel.replace('{langCode}', speechLangCode));
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript && transcript.trim()) {
          setRoomInput((prev) => (prev ? `${prev} ${transcript.trim()}` : transcript.trim()));
          setMicStatus('recognized');
          setSpeechStatusText(t.micSpeechDetected);
          showToast(t.micSpeechDetected);
        } else {
          setMicStatus('error');
          setSpeechStatusText(t.micNoSpeech);
        }
      };

      recognition.onerror = (event: any) => {
        setMicStatus('error');
        if (event.error === 'not-allowed') {
          setSpeechStatusText(t.micPermissionError);
          showToast(t.micPermissionError);
        } else if (event.error === 'no-speech') {
          setSpeechStatusText(t.micNoSpeech);
        } else if (event.error === 'network' || event.error === 'audio-capture') {
          setSpeechStatusText(t.micNetworkError);
        } else {
          setSpeechStatusText(`Speech error: ${event.error || 'Check microphone'}`);
        }
      };

      recognition.onend = () => {
        setMicStatus((prev) => (prev === 'listening' ? 'stopped' : prev));
      };

      recognition.start();
    } catch (err: any) {
      setMicStatus('error');
      setSpeechStatusText(err?.message || t.micNetworkError);
      showToast(t.micNetworkError);
    }
  };

  // Form Analysis Trigger (Deterministic demo scoring)
  // Reads the "Top Branch Choice" dropdown and injects Set A / B / C into the 3 cards
  const generateRecommendations = () => {
    const topBranch = role === 'student' ? studentForm.topBranch : parentForm.preferredBranch;
    const setKey = pickRecommendationSet(topBranch);
    setRecommendedColleges(COLLEGE_RECOMMENDATION_SETS[setKey]);
  };

  const generateDynamicColleges = () => {
    generateRecommendations();
  };

  const hideSyncAlertAndRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    const alertBox = document.getElementById('sync-alert-box');
    if (alertBox) alertBox.classList.add('hidden');
    setActiveTab('sync');
    window.scrollTo(0, 0);
  };

  // Unified helper function to save student preferences to Supabase
  const saveCurrentStudentPreferences = () => {
    const studentEmail = session === 'student' ? (loginEmail || 'student@sikshasetu.edu') : (childEmail || 'student@sikshasetu.edu');
    const preferences: StudentPreferencesRecord = {
      student_email: studentEmail,
      expected_rank: studentForm.eapcetRank,
      top_branch_choice: studentForm.topBranch,
      preferred_accommodation: studentForm.accommodation,
      preferred_language: lang,
      admission_route: studentForm.admissionRoute,
      why_branch: studentForm.whyBranch,
      college_priority: studentForm.collegePriority,
      four_year_goal: studentForm.fourYearGoal,
      backup_plan: studentForm.backupPlan,
    };

    savePreferencesInBackground(preferences, (errMessage) => {
      console.warn('Supabase preferences insert notice:', errMessage);
    });
  };

  const triggerDemoBypass = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFamilySynced(true);
    setIsPartnerFormFilled(true);
    if (typeof window !== 'undefined') {
      window.isFamilySynced = true;
      window.isPartnerFormFilled = true;
    }
    
    const alertBox = document.getElementById('sync-alert-box');
    if (alertBox) alertBox.classList.add('hidden');
    
    showToast("Demo Mode: Sync Forced. Generating insights...");
    
    // Non-blocking save of student education preferences
    saveCurrentStudentPreferences();

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      generateDynamicColleges();
      setShowResults(true);
    }, 800);
  };

  const handleAnalyze = () => {
    // Check 1: Sync Blocker
    if (!isFamilySynced && !window.isFamilySynced) {
      const alertBox = document.getElementById('sync-alert-box');
      if (alertBox) alertBox.classList.remove('hidden');
      return;
    }

    // Check 2: Partner Completion Blocker
    if (!isPartnerFormFilled && !window.isPartnerFormFilled) {
      setIsNotificationDotVisible(true);
      setNotifications(prev => ["Waiting on Partner: Your family member must sign in and fill their form before AI analysis can begin.", ...prev]);
      showToast("Waiting on Partner: Your family member must sign in and fill their form before AI analysis can begin.");
      return;
    }

    // Success State
    const alertBox = document.getElementById('sync-alert-box');
    if (alertBox) alertBox.classList.add('hidden');
    
    showToast("Family alignment complete. Generating insights...");
    
    // Non-blocking save of student education preferences
    saveCurrentStudentPreferences();

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      generateDynamicColleges();
      setShowResults(true);
    }, 900);
  };

  // AI Counselor Response Generation in Selected Language
  const handleSendBotMessage = (textToSend?: string) => {
    const query = (textToSend || botInput).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setBotMessages((prev) => [...prev, userMsg]);
    setBotInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      let reply = '';
      const qLower = query.toLowerCase();

      if (lang === 'te') {
        if (qLower.includes('cutoff') || qLower.includes('ర్యాంక్') || qLower.includes('rank')) {
          reply = 'ఆంధ్రప్రదేశ్ మరియు తెలంగాణ EAPCET కౌన్సిలింగ్ ప్రకారం: టాప్ ఆటోనమస్ కళాశాలల్లో CSE కోసం 1-25,000 మధ్య ర్యాంక్ అవసరం. మీ ర్యాంక్ 40,000 దాటితే, AI/DS లేదా ECE బ్రాంచ్‌ను ఎంచుకోవడం మంచిది.';
        } else if (qLower.includes('jvd') || qLower.includes('రీయింబర్స్‌మెంట్') || qLower.includes('ఫీజు')) {
          reply = 'JVD మార్గదర్శకాలు: వైట్ రేషన్ కార్డు లేదా వార్షిక ఆదాయం ₹2.5 లక్షల లోపు ఉన్న విద్యార్థులకు రాష్ట్ర ప్రభుత్వం పూర్తి ట్యూషన్ ఫీజును రీయింబర్స్ చేస్తుంది. అదనపు హాస్టల్ ఖర్చులకు వసతి దీవెన సహాయం లభిస్తుంది.';
        } else if (qLower.includes('హాస్టల్') || qLower.includes('భద్రత') || qLower.includes('safety')) {
          reply = 'కళాశాల ఎంపికలో క్యాంపస్ లోపలి అధికారిక హాస్టల్స్ అత్యంత సురక్షితమైనవి. బయోమెట్రిక్ ప్రవేశం, 24/7 సెక్యూరిటీ మరియు మహిళా వార్డెన్ సౌకర్యాలు ఉన్నాయో లేదో ధ్రువీకరించుకోండి.';
        } else {
          reply = `మీ ప్రశ్నకు సమాధానం: "${query}". ఏపీ/తెలంగాణ ఇంజనీరింగ్ అడ్మిషన్ల ప్రక్రియలో విద్యార్థి ఇష్టమైన కోడింగ్ నైపుణ్యాలు మరియు కుటుంబ బడ్జెట్ రెండింటినీ సమతుల్యం చేయడం ద్వారా ఉత్తమ ఫలితం సాధించవచ్చు.`;
        }
      } else if (lang === 'hi') {
        if (qLower.includes('cutoff') || qLower.includes('रैंक') || qLower.includes('rank')) {
          reply = 'EAPCET और JEE कटऑफ विश्लेषण: प्रमुख ऑटोनॉमस इंजीनियरिंग कॉलेजों में CSE के लिए 1-25,000 रैंक सुरक्षित मानी जाती है। 35,000+ रैंक पर ECE या AI/DS विशेष ब्रांच चुनना व्यावहारिक विकल्प है।';
        } else if (qLower.includes('jvd') || qLower.includes('फीस') || qLower.includes('छात्रवृत्ति')) {
          reply = 'JVD नियम: सफेद राशन कार्ड या ₹2.5 लाख से कम पारिवारिक आय वाले पात्र छात्रों को 100% सरकारी ट्यूशन फीस प्रतिपूर्ति मिलती है। इससे परिवार पर शिक्षा ऋण का बोझ शून्य हो जाता है।';
        } else if (qLower.includes('हॉस्टल') || qLower.includes('सुरक्षा') || qLower.includes('safety')) {
          reply = 'माता-पिता के लिए सुझाव: दूर के प्राइवेट PG की तुलना में कॉलेज कैंपस के अंदर स्थित आधिकारिक हॉस्टल सबसे सुरक्षित होते हैं। बायोमेट्रिक सुरक्षा और वार्डन निगरानी आवश्यक है।';
        } else {
          reply = `आपके प्रश्न पर सलाह: "${query}". टियर-2 और टियर-3 परिवारों के लिए बिना कर्ज लिए उच्च प्लेसमेंट पाने का सबसे अच्छा तरीका मान्यता प्राप्त सरकारी या ऑटोनॉमस कॉलेज चुनना है।`;
        }
      } else {
        if (qLower.includes('cutoff') || qLower.includes('rank') || qLower.includes('cse')) {
          reply = 'EAPCET & JEE Analysis: For CSE in top accredited autonomous institutions, closing ranks range between 8k to 28k. If ranks exceed 35k, specialized branches like AI/DS or core ECE offer identical on-campus software placement eligibility.';
        } else if (qLower.includes('jvd') || qLower.includes('fee') || qLower.includes('scholarship') || qLower.includes('reimbursement')) {
          reply = 'JVD Fee Reimbursement Rules: Eligible candidates holding a verified White Ration Card or annual household income under ₹2.5 Lakhs receive 100% government tuition fee clearance directly to the institution.';
        } else if (qLower.includes('safety') || qLower.includes('hostel') || qLower.includes('distance')) {
          reply = 'Campus Safety Insight: Campus-managed gated hostels provide 24x7 security, strict biometric sign-out protocols, and dedicated wardens, significantly reducing daily commute risks.';
        } else {
          reply = `Counselor Guidance on "${query}": Balance modern tech ambition with financial security. Focus on colleges with verified median tech packages above ₹6.5 LPA and transparent hostel billing.`;
        }
      }

      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tag: 'Advisor',
      };

      setBotMessages((prev) => [...prev, botReply]);
      setIsBotTyping(false);
    }, 700);
  };

  // Family Discussion Room Message Handler
  const handleSendRoomMessage = () => {
    const text = roomInput.trim();
    if (!text) return;

    const newMsg: RoomMessage = {
      id: Date.now().toString(),
      sender: roomSender,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      originalLanguageNote: lang === 'te' ? 'Telugu (తెలుగు)' : lang === 'hi' ? 'Hindi (हिंदी)' : 'English',
    };

    setRoomMessages((prev) => [...prev, newMsg]);
    setRoomInput('');

    setTimeout(() => {
      let aiAdvice = '';
      if (lang === 'te') {
        aiAdvice = `AI మధ్యవర్తి సలహా: ${roomSender === 'student' ? 'విద్యార్థి' : 'తల్లిదండ్రుల'} దృక్పథం పరిశీలించబడింది. రాజీ మార్గం: 120 కి.మీ పరిధిలో సురక్షితమైన క్యాంపస్ హాస్టల్ కలిగిన నాక్-A+ ఆటోనమస్ కళాశాలను ఎంచుకోండి. JVD ద్వారా ఫీజు ఆదా చేస్తూ నగర కోడింగ్ హ్యాకథాన్లలో పాల్గొనవచ్చు.`;
      } else if (lang === 'hi') {
        aiAdvice = `AI मध्यस्थ समाधान: ${roomSender === 'student' ? 'छात्र' : 'अभिभावक'} के विचार के आधार पर साझा समझौता: 100 किमी के दायरे में NAAC 'A+' ऑटोनॉमस कॉलेज चुनें। JVD ट्यूशन छूट का लाभ लेकर बजट को सुरक्षित रखें और कोडिंग प्लेसमेंट दोनों हासिल करें।`;
      } else {
        aiAdvice = `AI Mediator Synthesis: Acknowledging ${roomSender === 'student' ? 'the student’s career vision' : 'the family’s budget & safety priority'}. Recommended Compromise: Target an autonomous college within 120km with verified 85%+ placements and 100% JVD fee clearance.`;
      }

      setRoomMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          sender: 'ai',
          text: aiAdvice,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  // Milestone check in student roadmap
  const toggleMilestone = (key: string) => {
    setCompletedMilestones((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Dynamic Budget Calculations for Parent Mode
  const annualGovtTuition = 70000;
  const fourYearTuition = annualGovtTuition * 4; // ₹2,80,000
  const isJvdEligible = parentForm.fundingSource.includes('JVD');
  const jvdDeduction = isJvdEligible ? fourYearTuition : 0;
  const fourYearHostelLiving = Math.round((parentToolBudget * 0.42) / 1000) * 1000;
  const fourYearFoodTransport = 75000;
  const fourYearBooksExamLaptop = 55000;
  const grossEstimatedCost = fourYearTuition + fourYearHostelLiving + fourYearFoodTransport + fourYearBooksExamLaptop;
  const netOutOfPocket = Math.max(15000, grossEstimatedCost - jvdDeduction);
  const remainingOrDeficit = parentToolBudget - netOutOfPocket;
  const isBudgetSafe = remainingOrDeficit >= 0;

  // Format INR Currency nicely
  const formatINR = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  // Email validation helper
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // --------------------------------------------------------------------------
  // Sub-renderers (Preserving exact existing glassmorphic UI, classes, inputs)
  // --------------------------------------------------------------------------

  // 1. Initial Screen: Role Selection
  const renderRoleSelection = () => (
    <div className="max-w-xl mx-auto w-full space-y-5 py-4 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm text-center space-y-3 relative overflow-hidden">
        <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-white shadow-md bg-[#476A8A]">
          <GraduationCap className="w-9 h-9" />
        </div>
        
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-full inline-block">
            {t.subBranding}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {t.loginTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed max-w-md mx-auto">
            {t.loginSubtitle}
          </p>
        </div>

        <div className="pt-3 text-xs text-slate-500 border-t border-slate-100">
          <p className="font-semibold text-slate-700">{t.selectRolePrompt}</p>
        </div>
      </div>

      {/* Role Selection Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Student Button */}
        <button
          onClick={() => handleSelectRole('student')}
          className="text-left p-5 rounded-xl text-white shadow-md border border-indigo-400/30 flex flex-col justify-between transition-all cursor-pointer group active:scale-[0.99] min-h-[140px] bg-[#476A8A] hover:bg-[#1E293B]"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
              {t.studentBadge}
            </span>
          </div>
          <div>
            <div className="text-base font-bold tracking-tight flex items-center justify-between">
              <span>{t.loginStudentBtn}</span>
              <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </div>
            <p className="text-[11px] text-indigo-100 font-medium mt-1 leading-snug">
              {t.loginStudentDesc}
            </p>
          </div>
        </button>

        {/* Parent Button */}
        <button
          onClick={() => handleSelectRole('parent')}
          className="text-left p-5 rounded-xl text-white shadow-md border border-emerald-400/30 flex flex-col justify-between transition-all cursor-pointer group active:scale-[0.99] min-h-[140px] bg-[#476A8A] hover:bg-[#1E293B]"
        >
          <div className="flex items-center justify-between w-full mb-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
              {t.parentBadge}
            </span>
          </div>
          <div>
            <div className="text-base font-bold tracking-tight flex items-center justify-between">
              <span>{t.loginParentBtn}</span>
              <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </div>
            <p className="text-[11px] text-emerald-100 font-medium mt-1 leading-snug">
              {t.loginParentDesc}
            </p>
          </div>
        </button>
      </div>

      {/* Highlights */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Platform Highlights</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 font-medium">
          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>AP & TS EAPCET Cutoffs</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% JVD Fee Guidance</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>3-Way Family Mediation</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. Glassmorphism Login Form Screen
  const renderLoginForm = () => (
    <div className="max-w-md mx-auto w-full space-y-5 py-6 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="text-center space-y-1">
          <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-white shadow-md ${
            selectedRole === 'student' ? 'bg-indigo-600' : 'bg-emerald-600'
          }`}>
            {selectedRole === 'student' ? <GraduationCap className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            {t.loginAsTitle.replace('{role}', selectedRole === 'student' ? t.studentBadge : t.parentBadge)}
          </h2>
          <p className="text-xs text-slate-500">
            {selectedRole === 'student' ? t.loginStudentDesc : t.loginParentDesc}
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.emailLabel}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700">
                {t.passwordLabel}
              </label>
              <button
                type="button"
                onClick={() => {
                  setForgotEmail(loginEmail);
                  setAuthStep('forgot');
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                {t.forgotPasswordLink}
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] ${
              selectedRole === 'student'
                ? 'bg-[#476A8A] hover:bg-[#1E293B]'
                : 'bg-[#476A8A] hover:bg-[#1E293B]'
            }`}
          >
            <span>{t.signInBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => setAuthStep('select-role')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            ← {t.selectRolePrompt}
          </button>
        </div>
      </div>
    </div>
  );

  // 3. Forgot Password Screen
  const renderForgotPassword = () => (
    <div className="max-w-md mx-auto w-full space-y-5 py-6 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/20 text-amber-700 border border-amber-300 flex items-center justify-center shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            {t.forgotPasswordTitle}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t.forgotPasswordDesc}
          </p>
        </div>

        <form onSubmit={handleResendPassword} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.emailLabel}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] bg-[#476A8A] hover:bg-[#1E293B]"
          >
            <span>{t.resendPasswordBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => setAuthStep('login')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            ← {t.backToLogin}
          </button>
        </div>
      </div>
    </div>
  );

  // 4. Student Dashboard Initial Landing State (Large Catchy Caption & Buttons)
  const renderStudentLandingState = () => (
    <div className="space-y-6 py-4 animate-fade-in max-w-4xl mx-auto w-full">
      <div className="rounded-xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden bg-[#1E293B]">
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-200 bg-white/10 border border-white/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>STUDENT ASPIRATIONS ENGINE</span>
          </span>

          {/* EXACT REQUIRED CAPTION */}
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            "{t.studentLandingHeadline}"
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-medium">
            Match your cutoff rank, favorite tech specialization, hackathon ambitions, and hostel preferences with genuine AP & TS engineering colleges.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* "Fill the form" Button */}
            <button
              onClick={() => setFormVisible(true)}
              className="py-3 px-6 rounded-xl bg-white text-indigo-900 font-extrabold text-xs sm:text-sm shadow-sm hover:bg-indigo-50 transition-all cursor-pointer flex items-center gap-2 active:scale-[0.99]"
            >
              <FileText className="w-4 h-4 text-indigo-700" />
              <span>{t.fillFormBtn}</span>
            </button>

            {/* "View Scholarships" Button */}
            <button
              onClick={() => setShowScholarshipsModal(true)}
              className="py-3 px-6 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-300/40 text-emerald-200 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>{t.viewScholarshipsBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 font-bold">
            1
          </div>
          <h4 className="text-xs font-bold text-slate-800">Cutoffs & Ranking</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Calibrated for EAPCET and JEE rank cutoffs across top autonomous colleges.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 font-bold">
            2
          </div>
          <h4 className="text-xs font-bold text-slate-800">4-Year Tech Roadmap</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Milestone checklist for C++, DSA, hackathons, and ₹8LPA+ tech internships.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 font-bold">
            3
          </div>
          <h4 className="text-xs font-bold text-slate-800">100% Fee Reimbursement</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Guidance on JVD guidelines so your education remains free of debt.
          </p>
        </div>
      </div>
    </div>
  );

  // 5. Parent Dashboard Initial Landing State (Large Catchy Caption & Buttons)
  const renderParentLandingState = () => (
    <div className="space-y-6 py-4 animate-fade-in max-w-4xl mx-auto w-full">
      <div className="rounded-xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden bg-[#1E293B]">
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-200 bg-white/10 border border-white/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>PARENT REALITY & SAFETY PORTAL</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
            "{t.parentLandingHeadline}"
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
            Simulate 4-year tuition & hostel living costs, verify in-campus security, and leverage government fee reimbursement for zero debt.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* "Fill the form" Button */}
            <button
              onClick={() => setFormVisible(true)}
              className="py-3 px-6 rounded-xl bg-white text-emerald-950 font-extrabold text-xs sm:text-sm shadow-sm hover:bg-emerald-50 transition-all cursor-pointer flex items-center gap-2 active:scale-[0.99]"
            >
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>{t.fillFormBtn}</span>
            </button>

            {/* "View Scholarships" Button */}
            <button
              onClick={() => setShowScholarshipsModal(true)}
              className="py-3 px-6 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-300/40 text-emerald-200 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-300" />
              <span>{t.viewScholarshipsBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 font-bold">
            1
          </div>
          <h4 className="text-xs font-bold text-slate-800">4-Year Budget Calculator</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Drag the budget slider to discover out-of-pocket costs and safety thresholds.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2 font-bold">
            2
          </div>
          <h4 className="text-xs font-bold text-slate-800">Campus Safety Verification</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Biometric hostels, 24/7 security, and distance constraints within hometown radius.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 font-bold">
            3
          </div>
          <h4 className="text-xs font-bold text-slate-800">3-Way Audio Mediation</h4>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Speak in Telugu or English to reconcile student dreams with family practicalities.
          </p>
        </div>
      </div>
    </div>
  );

  // 6. View Scholarships Modal View
  const renderScholarshipsModal = () => (
    <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl max-w-3xl w-full p-6 sm:p-8 shadow-sm space-y-6 my-auto">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800">
                <Award className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {t.scholarshipsModalTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {t.scholarshipsModalSubtitle}
            </p>
          </div>
          <button
            onClick={() => setShowScholarshipsModal(false)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scholarships List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* 1. JVD */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-200 px-2 py-0.5 rounded">
                Andhra Pradesh · 100% Tuition
              </span>
              <span className="text-xs font-bold text-emerald-700">₹0 Tuition Fee</span>
            </div>
            <h4 className="text-sm font-bold text-emerald-950">
              Jagananna Vidya Deevena (JVD) Scheme
            </h4>
            <p className="text-xs text-emerald-900 leading-relaxed font-medium">
              Provides full tuition fee reimbursement for polytechnic, ITI, and B.Tech engineering students admitted through APSCHE state counseling. 
            </p>
            <div className="text-[11px] text-emerald-800 border-t border-emerald-200/60 pt-2 space-y-1">
              <p><strong>Eligibility:</strong> Annual household income &lt; ₹2.5 Lakhs / valid White Ration Card.</p>
              <p><strong>Disbursement:</strong> Direct institutional clearance directly into college account.</p>
            </div>
          </div>

          {/* 2. Jagananna Vasathi Deevena */}
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider bg-teal-200 px-2 py-0.5 rounded">
                Andhra Pradesh · Hostel & Mess
              </span>
              <span className="text-xs font-bold text-teal-700">₹20,000 / Year</span>
            </div>
            <h4 className="text-sm font-bold text-teal-950">
              Jagananna Vasathi Deevena (Food & Accommodation)
            </h4>
            <p className="text-xs text-teal-900 leading-relaxed font-medium">
              Financial support deposited directly into the mother's bank account to cover campus hostel mess and boarding charges in two annual installments.
            </p>
          </div>

          {/* 3. AICTE Pragati Scholarship for Girls */}
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider bg-purple-200 px-2 py-0.5 rounded">
                Central Govt (AICTE) · Merit
              </span>
              <span className="text-xs font-bold text-purple-700">₹50,000 / Year</span>
            </div>
            <h4 className="text-sm font-bold text-purple-950">
              AICTE Pragati Scholarship for Girl Students
            </h4>
            <p className="text-xs text-purple-900 leading-relaxed font-medium">
              Encourages girl students admitted to first-year engineering degree programs in AICTE-approved institutions with a ₹50,000 annual contingency grant.
            </p>
          </div>

          {/* 4. Telangana ePASS */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-200 px-2 py-0.5 rounded">
                Telangana · Post-Matric
              </span>
              <span className="text-xs font-bold text-slate-800">State Approved RTF</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Telangana ePASS Post-Matric Scholarship
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Reimbursement of Tuition Fees (RTF) and Maintenance Charges (MTF) for eligible TS EAMCET engineering students.
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <span className="text-[11px] text-slate-500">
            Source: Official State Government & AICTE Counseling Portals.
          </span>
          <button
            onClick={() => setShowScholarshipsModal(false)}
            className="py-2.5 px-5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer"
          >
            {t.closeModal}
          </button>
        </div>
      </div>
    </div>
  );

  // Student Questions Form (8 Questions, responsive grid)
  const renderStudentQuestions = () => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-600" />
          <span>Student Education & Preference Form</span>
        </h3>
        <button
          onClick={() => setShowScholarshipsModal(true)}
          className="inline-block bg-slate-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-slate-700 transition-colors text-xs cursor-pointer flex items-center gap-1.5"
        >
          <Award className="w-3.5 h-3.5" />
          <span>{t.viewScholarshipsBtn}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Q1: Expected EAPCET/JEE Rank */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.sq1Label}
          </label>
          <select
            value={studentForm.eapcetRank}
            onChange={(e) => setStudentForm({ ...studentForm, eapcetRank: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {Object.keys(t.sq1Options).map((k) => (
              <option key={k} value={k}>{t.sq1Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q2: Planned Admission Route */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.sq2Label}
          </label>
          <select
            value={studentForm.admissionRoute}
            onChange={(e) => setStudentForm({ ...studentForm, admissionRoute: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {Object.keys(t.sq2Options).map((k) => (
              <option key={k} value={k}>{t.sq2Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q3: Top Branch Choice */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.sq3Label}
          </label>
          <select
            value={studentForm.topBranch}
            onChange={(e) => setStudentForm({ ...studentForm, topBranch: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {Object.keys(t.sq3Options).map((k) => (
              <option key={k} value={k}>{t.sq3Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q4: Why this branch? */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.sq4Label}
          </label>
          <select
            value={studentForm.whyBranch}
            onChange={(e) => setStudentForm({ ...studentForm, whyBranch: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {Object.keys(t.sq4Options).map((k) => (
              <option key={k} value={k}>{t.sq4Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q5: Preferred Accommodation */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.sq5Label}
          </label>
          <select
            value={studentForm.accommodation}
            onChange={(e) => setStudentForm({ ...studentForm, accommodation: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {Object.keys(t.sq5Options).map((k) => (
              <option key={k} value={k}>{t.sq5Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q6: What matters most in selecting a college? */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.sq6Label}
          </label>
          <select
            value={studentForm.collegePriority}
            onChange={(e) => setStudentForm({ ...studentForm, collegePriority: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {Object.keys(t.sq6Options).map((k) => (
              <option key={k} value={k}>{t.sq6Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q7: Goal after 4 Years */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.sq7Label}
          </label>
          <select
            value={studentForm.fourYearGoal}
            onChange={(e) => setStudentForm({ ...studentForm, fourYearGoal: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {Object.keys(t.sq7Options).map((k) => (
              <option key={k} value={k}>{t.sq7Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q8: Backup Plan */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.sq8Label}
          </label>
          <select
            value={studentForm.backupPlan}
            onChange={(e) => setStudentForm({ ...studentForm, backupPlan: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
          >
            {Object.keys(t.sq8Options).map((k) => (
              <option key={k} value={k}>{t.sq8Options[k]}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  // Parent Questions Form (9 Questions, responsive grid)
  const renderParentQuestions = () => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Parent Family Reality & Financial Form</span>
        </h3>
        <button
          onClick={() => setShowScholarshipsModal(true)}
          className="inline-block bg-slate-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-slate-700 transition-colors text-xs cursor-pointer flex items-center gap-1.5"
        >
          <Award className="w-3.5 h-3.5" />
          <span>{t.viewScholarshipsBtn}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Q1: Preferred Branch for Student */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.pq1Label}
          </label>
          <select
            value={parentForm.preferredBranch}
            onChange={(e) => setParentForm({ ...parentForm, preferredBranch: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.keys(t.pq1Options).map((k) => (
              <option key={k} value={k}>{t.pq1Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q2: How important is child's interest? */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.pq2Label}
          </label>
          <select
            value={parentForm.childInterestWeight}
            onChange={(e) => setParentForm({ ...parentForm, childInterestWeight: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.keys(t.pq2Options).map((k) => (
              <option key={k} value={k}>{t.pq2Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q3: Max 4-Year Budget Slider */}
        <div className="md:col-span-2 p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-700">
              {t.pq3Label}
            </label>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-lg tabular-nums">
              {formatINR(parentForm.maxBudget)}
            </span>
          </div>
          <input
            type="range"
            min="150000"
            max="800000"
            step="25000"
            value={parentForm.maxBudget}
            onChange={(e) => {
              const val = Number(e.target.value);
              setParentForm({ ...parentForm, maxBudget: val });
              setParentToolBudget(val);
            }}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-600 font-semibold mt-1">
            <span>₹1.5 Lakh</span>
            <span>₹4.5 Lakh</span>
            <span>₹8.0 Lakh</span>
          </div>
        </div>

        {/* Q4: Primary Funding Source */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.pq4Label}
          </label>
          <select
            value={parentForm.fundingSource}
            onChange={(e) => setParentForm({ ...parentForm, fundingSource: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.keys(t.pq4Options).map((k) => (
              <option key={k} value={k}>{t.pq4Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q5: Distance Limit */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.pq5Label}
          </label>
          <select
            value={parentForm.distanceLimit}
            onChange={(e) => setParentForm({ ...parentForm, distanceLimit: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.keys(t.pq5Options).map((k) => (
              <option key={k} value={k}>{t.pq5Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q6: Campus Safety & Accommodation Rule */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.pq6Label}
          </label>
          <select
            value={parentForm.accommodationRule}
            onChange={(e) => setParentForm({ ...parentForm, accommodationRule: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.keys(t.pq6Options).map((k) => (
              <option key={k} value={k}>{t.pq6Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q7: What matters most in selecting a college? */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.pq7Label}
          </label>
          <select
            value={parentForm.collegePriority}
            onChange={(e) => setParentForm({ ...parentForm, collegePriority: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.keys(t.pq7Options).map((k) => (
              <option key={k} value={k}>{t.pq7Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q8: Biggest Concern */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.pq8Label}
          </label>
          <select
            value={parentForm.biggestConcern}
            onChange={(e) => setParentForm({ ...parentForm, biggestConcern: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.keys(t.pq8Options).map((k) => (
              <option key={k} value={k}>{t.pq8Options[k]}</option>
            ))}
          </select>
        </div>

        {/* Q9: Definition of College Success */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.pq9Label}
          </label>
          <select
            value={parentForm.definitionOfSuccess}
            onChange={(e) => setParentForm({ ...parentForm, definitionOfSuccess: e.target.value })}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
          >
            {Object.keys(t.pq9Options).map((k) => (
              <option key={k} value={k}>{t.pq9Options[k]}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  // Common Action Button
  const renderAnalyzeButton = () => (
    <div className="space-y-3 w-full">
      {/* Inline Sync Alert Box */}
      <div id="sync-alert-box" className="hidden bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-sm text-slate-800 text-left">
        <span className="font-bold text-amber-800 bg-amber-200 px-2 py-1 rounded mr-2 text-xs">SYNC ALERT</span>
        <span className="font-bold">Sync Required</span>
        <p className="mt-2 text-slate-600">Sync Required: Please link your parent/student account in the Family Sync section before analyzing.</p>
        <a href="#" onClick={hideSyncAlertAndRedirect} className="inline-block mt-3 text-teal-700 font-bold cursor-pointer">Go to Family Sync tab &rarr;</a>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing}
        className={`w-full py-4 px-6 rounded-2xl text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
          role === 'student'
            ? 'bg-[#476A8A] hover:bg-[#1E293B]'
            : 'bg-[#476A8A] hover:bg-[#1E293B]'
        }`}
      >
        {isAnalyzing ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{t.analyzing}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>{t.analyzeBtn}</span>
          </>
        )}
      </button>

      {/* Demo Bypass Link */}
      {!showResults && (
        <a href="#" onClick={triggerDemoBypass} className="block text-center mt-3 text-xs text-slate-400 hover:text-slate-600">
          Force Sync
        </a>
      )}
    </div>
  );

  // Results View (Responsive cards & layout)
  const renderResults = () => (
    <div className="space-y-5 animate-fade-in">
      {/* Top Bar with Re-evaluate Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            {t.analysisComplete}
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            {t.demoEstimateNotice}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScholarshipsModal(true)}
            className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.viewScholarshipsBtn}</span>
          </button>
          <button
            onClick={() => setShowResults(false)}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 px-3 py-1.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.editInputs}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. FAMILY ALIGNMENT SCORE CARD */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {t.familyAlignmentTitle}
                </h3>
                <p className="text-3xl font-extrabold text-slate-900 mt-1 flex items-baseline gap-1.5">
                  86%
                  <span className="text-xs font-semibold text-emerald-600">
                    {t.highHarmony}
                  </span>
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl p-0.5 shadow-md bg-[#476A8A]">
                <div className="w-full h-full bg-white rounded-[14px] flex flex-col items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="text-[9px] font-bold">MATCH</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 mb-3">
              <div className="h-full rounded-full w-[86%] transition-all duration-1000 bg-[#476A8A]" />
            </div>
          </div>

          {/* Breakdown Metrics */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
            <div className="p-2 bg-slate-50/80 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-medium">{t.metricBranchFit}</span>
              <span className="text-xs font-bold text-slate-800">92%</span>
            </div>
            <div className="p-2 bg-slate-50/80 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-medium">{t.metricBudgetRisk}</span>
              <span className="text-xs font-bold text-emerald-600">{t.riskLowJvd}</span>
            </div>
            <div className="p-2 bg-slate-50/80 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-medium">{t.metricSafetyDist}</span>
              <span className="text-xs font-bold text-slate-800">&lt;100 km</span>
            </div>
          </div>
        </div>

        {/* 2. GREEN SCHOLARSHIP ALERT BADGE */}
        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-5 shadow-sm flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">
                {t.scholarshipAlertTitle}
              </span>
              <span className="text-xs font-bold text-emerald-900">{t.scholarshipNoticeTitle}</span>
            </div>
            <p className="text-xs font-bold text-emerald-950 leading-snug">
              {t.scholarshipBadge}
            </p>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              {t.scholarshipDisclaim}
            </p>
            <button
              onClick={() => setShowScholarshipsModal(true)}
              className="mt-3 inline-block bg-slate-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-slate-700 transition-colors text-xs cursor-pointer flex items-center"
            >
              <span>{t.viewScholarshipsBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. THREE TOP MATCH COLLEGE CARDS (Responsive Grid) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {t.topMatchesTitle}
          </h4>
          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {t.filteredRegionTag}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedColleges.map((col, idx) => {
            const matchPct = col.matchPct;
            const n = idx + 1; // card number used in the id attributes (college1-name ...)
            return (
              <div
                key={col.code}
                className="bg-[#476A8A] border border-slate-600 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between text-white"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-white/20 px-2 py-0.5 rounded-md inline-block">
                        {col.branchKey}
                      </span>
                      <h5 id={`college${n}-title`} className="text-sm font-bold text-white mt-1 leading-snug">{col.name}</h5>
                      <p className="text-[11px] text-slate-100 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-200 shrink-0" />
                        <span id={`college${n}-location`}>{col.location[lang] || col.location.en}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span id={`college${n}-match`} className="text-xs font-extrabold text-white bg-emerald-600/80 px-2 py-1 rounded-xl block shadow-sm">
                        {matchPct}% Match
                      </span>
                      <span className="text-[10px] text-slate-300 mt-0.5 block">{col.code}</span>
                    </div>
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-500/40 text-center">
                    <div className="p-1.5 bg-slate-800/40 border border-slate-500/50 rounded-md">
                      <span className="text-[9px] text-slate-300 block uppercase font-medium">Cutoff</span>
                      <span id={`college${n}-cutoff`} className="text-[11px] font-bold text-white leading-tight block mt-0.5">{col.cutoff[lang] || col.cutoff.en}</span>
                    </div>
                    <div className="p-1.5 bg-slate-800/40 border border-slate-500/50 rounded-md">
                      <span className="text-[9px] text-slate-300 block uppercase font-medium">4-Yr Fee</span>
                      <span id={`college${n}-fee`} className="text-[11px] font-bold text-white leading-tight block mt-0.5">{col.fourYearFee[lang] || col.fourYearFee.en}</span>
                    </div>
                    <div className="p-1.5 bg-slate-800/40 border border-slate-500/50 rounded-md">
                      <span className="text-[9px] text-slate-300 block uppercase font-medium">Median Tech</span>
                      <span id={`college${n}-salary`} className="text-[11px] font-bold text-indigo-200 leading-tight block mt-0.5">{col.avgPackage}</span>
                    </div>
                  </div>

                  {/* Safety */}
                  <div className="mt-2.5 flex items-center justify-between text-[11px] bg-white/10 p-2 rounded-xl">
                    <span className="text-white flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span>{col.safetyScore[lang] || col.safetyScore.en}</span>
                    </span>
                  </div>

                  <p id={`college${n}-description`} className="text-[11px] text-slate-100 mt-2 leading-relaxed opacity-90">
                    {col.explanation[lang] || col.explanation.en}
                  </p>
                </div>

                {/* Discuss in Room CTA */}
                <button
                  onClick={() => setActiveTab('room')}
                  className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                  <span>{t.discussInRoomBtn}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating CTA Banner */}
      <div className="rounded-xl p-5 text-white shadow-xl flex flex-wrap items-center justify-between gap-3 bg-[#1E293B]">
        <div>
          <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
            {t.familyRoomCtaTitle}
          </span>
          <p className="text-xs sm:text-sm font-semibold text-white/95 mt-0.5">
            {t.familyRoomCtaDesc}
          </p>
        </div>
        <button
          onClick={() => setActiveTab('room')}
          className="px-5 py-2.5 bg-white text-indigo-950 font-bold text-xs rounded-xl shadow-sm hover:bg-indigo-50 transition-all cursor-pointer shrink-0"
        >
          {t.openRoomBtn}
        </button>
      </div>

      <p className="text-[10px] text-center text-slate-500 pt-1 leading-normal">
        {t.disclaimerFootnote}
      </p>
    </div>
  );

  // Tab 1 for Student Dashboard (handles Landing State vs Form vs Results)
  const renderStudentTab1 = () => (
    <div className="space-y-4">
      {!formVisible && !showResults ? (
        renderStudentLandingState()
      ) : !showResults ? (
        <div className="space-y-4 max-w-4xl mx-auto w-full animate-fade-in">
          <div className="p-4 rounded-xl border flex items-start gap-3 bg-indigo-50 border-indigo-200/80 text-indigo-950">
            <div className="p-2 rounded-xl text-white shrink-0 bg-indigo-600">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-85">
                {t.studentProfileBannerTitle}
              </h2>
              <p className="text-xs font-medium mt-0.5 leading-relaxed">
                {t.studentProfileBannerDesc}
              </p>
            </div>
          </div>

          {renderStudentQuestions()}
          {renderAnalyzeButton()}
        </div>
      ) : (
        renderResults()
      )}
    </div>
  );

  // Tab 1 for Parent Dashboard (handles Landing State vs Form vs Results)
  const renderParentTab1 = () => (
    <div className="space-y-4">
      {!formVisible && !showResults ? (
        renderParentLandingState()
      ) : !showResults ? (
        <div className="space-y-4 max-w-4xl mx-auto w-full animate-fade-in">
          <div className="p-4 rounded-xl border flex items-start gap-3 bg-emerald-50 border-emerald-200/80 text-emerald-950">
            <div className="p-2 rounded-xl text-white shrink-0 bg-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider opacity-85">
                {t.parentProfileBannerTitle}
              </h2>
              <p className="text-xs font-medium mt-0.5 leading-relaxed">
                {t.parentProfileBannerDesc}
              </p>
            </div>
          </div>

          {renderParentQuestions()}
          {renderAnalyzeButton()}
        </div>
      ) : (
        renderResults()
      )}
    </div>
  );

  // Tab 2: 1-on-1 AI Counselor
  const renderCounselorTab = () => (
    <div className="space-y-4 max-w-4xl mx-auto w-full animate-fade-in">
      {/* Bot Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.botTitle}</h3>
          <p className="text-[11px] text-slate-500 font-medium">{t.botSubtitle}</p>
        </div>
      </div>

      {/* Quick Prompt Suggestion Chips */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block px-1">
          {t.quickPhrasesTitle}
        </span>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {t.botPromptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendBotMessage(chip)}
              className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200/80 text-[11px] font-semibold text-slate-700 hover:text-indigo-700 shadow-sm transition-all cursor-pointer shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm min-h-[380px] max-h-[460px] overflow-y-auto space-y-3">
        {botMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-white text-slate-800 border border-slate-200/70 rounded-bl-none'
              }`}
            >
              {msg.tag && (
                <span className="text-[9px] font-extrabold uppercase tracking-wider opacity-75 block mb-1">
                  {msg.tag}
                </span>
              )}
              <p className="leading-relaxed font-medium">{msg.text}</p>
            </div>
            <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isBotTyping && (
          <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl w-fit shadow-sm border border-slate-100">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
            <span className="text-[10px] text-slate-400 font-medium ml-1">{t.botTyping}</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm flex items-center gap-2">
        <input
          type="text"
          placeholder={role === 'student' ? t.botInputPlaceholderStudent : t.botInputPlaceholderParent}
          value={botInput}
          onChange={(e) => setBotInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendBotMessage()}
          className="flex-1 bg-transparent px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none"
        />
        <button
          onClick={() => handleSendBotMessage()}
          disabled={!botInput.trim()}
          className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
          aria-label={t.botSendAria}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[10px] text-slate-600 text-center font-medium">
        {t.keyboardTip}
      </p>
    </div>
  );

  // Tab 3: Family Discussion Room
  const renderFamilyRoomTab = () => (
    <div className="space-y-4 max-w-4xl mx-auto w-full animate-fade-in">
      {/* Room Header Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-md bg-[#476A8A]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">{t.roomTitle}</h3>
            <p className="text-[11px] text-slate-500 font-medium">{t.roomSubtitle}</p>
          </div>
        </div>

        {/* Sender Persona Switcher for Live Demonstration */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setRoomSender('student')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              roomSender === 'student' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            {t.participantStudent}
          </button>
          <button
            onClick={() => setRoomSender('parent')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              roomSender === 'parent' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            {t.participantParent}
          </button>
        </div>
      </div>

      {/* 3-Way Chat Messages Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm min-h-[360px] max-h-[440px] overflow-y-auto space-y-3">
        {roomMessages.map((m) => {
          if (m.sender === 'student') {
            return (
              <div key={m.id} className="flex flex-col items-start">
                <div className="max-w-[85%] sm:max-w-[70%] rounded-xl rounded-bl-none p-3.5 shadow-sm bg-blue-600 text-white">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200">
                      {t.participantStudent}
                    </span>
                    <span className="text-[9px] text-blue-200 font-mono">{m.timestamp}</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed">{m.text}</p>
                </div>
              </div>
            );
          }

          if (m.sender === 'parent') {
            return (
              <div key={m.id} className="flex flex-col items-end">
                <div className="max-w-[85%] sm:max-w-[70%] rounded-xl rounded-br-none p-3.5 shadow-sm bg-emerald-700 text-white">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
                      {t.participantParent}
                    </span>
                    <span className="text-[9px] text-emerald-200 font-mono">{m.timestamp}</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed">{m.text}</p>
                  {m.originalLanguageNote && (
                    <span className="text-[9px] text-emerald-300 font-mono mt-1 block">
                      Audio: {m.originalLanguageNote}
                    </span>
                  )}
                </div>
              </div>
            );
          }

          // AI Mediator (Center aligned, Amber/Gold, Glass Card)
          return (
            <div key={m.id} className="flex justify-center my-2">
              <div className="w-[96%] max-w-2xl bg-amber-500/15 border border-amber-500/40 rounded-xl p-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-1 pb-1 border-b border-amber-500/20">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.participantAi}</span>
                  </span>
                  <span className="text-[9px] text-amber-800 font-mono">{m.timestamp}</span>
                </div>
                <p className="text-xs text-amber-950 font-medium leading-relaxed">
                  {m.text}
                </p>
              </div>
            </div>
          );
        })}

        {/* Voice Listening UI Indicator */}
        {micStatus === 'listening' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
              <span className="text-xs font-bold text-red-700">
                {speechStatusText || t.micListeningLabel}
              </span>
            </div>
            <span className="text-[10px] text-red-500 font-semibold uppercase tracking-wider">
              {lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN'}
            </span>
          </div>
        )}

        {micStatus === 'requesting' && (
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-800 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
            <span>{speechStatusText || t.micRequestingPermission}</span>
          </div>
        )}

        {(micStatus === 'error' || micStatus === 'unsupported') && speechStatusText && (
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{speechStatusText}</span>
          </div>
        )}

        <div ref={roomBottomRef} />
      </div>

      {/* "SPEAK IN TELUGU / ENGLISH / HINDI" MICROPHONE BUTTON */}
      <div className="pt-1">
        <button
          onClick={handleToggleSpeech}
          className={`w-full py-3 px-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
            micStatus === 'listening'
              ? 'bg-red-600 text-white shadow-red-500/30'
              : 'text-white bg-[#476A8A] hover:bg-[#1E293B]'
          }`}
        >
          {micStatus === 'listening' ? (
            <>
              <MicOff className="w-4 h-4 animate-spin" />
              <span>{t.micStopLabel}</span>
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              <span>{t.micSpeakLabel}</span>
            </>
          )}
        </button>
        <p className="text-[10px] text-center text-slate-500 mt-1 leading-normal">
          {t.roomNoteDemo}
        </p>
      </div>

      {/* Text Input Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm flex items-center gap-2">
        <input
          type="text"
          placeholder={roomSender === 'student' ? t.roomInputPlaceholderStudent : t.roomInputPlaceholderParent}
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendRoomMessage()}
          className="flex-1 bg-transparent px-3 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none"
        />
        <button
          onClick={handleSendRoomMessage}
          disabled={!roomInput.trim()}
          className={`w-9 h-9 rounded-xl text-white flex items-center justify-center transition-all cursor-pointer shadow-md ${
            roomSender === 'student' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Tab 4 for Student Dashboard: Timeline Tool (Career Roadmap)
  const renderStudentRoadmap = () => (
    <div className="space-y-4 max-w-4xl mx-auto w-full animate-fade-in">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
              {t.roadmapTitle}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {t.roadmapHeading}
            </h3>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          {t.roadmapDesc}
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-200">
        {/* Year 1 */}
        <div className="relative group">
          <div className="absolute -left-[27px] sm:-left-[31px] top-1 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
            Y1
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{t.y1Title}</h4>
              <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                {t.y1Sem}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.y1Desc}</p>
            
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
              {t.y1Tasks.map((taskText, idx) => {
                const taskId = `y1_${idx + 1}`;
                return (
                  <label
                    key={taskId}
                    onClick={() => toggleMilestone(taskId)}
                    className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={!!completedMilestones[taskId]}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 cursor-pointer"
                    />
                    <span className={completedMilestones[taskId] ? 'line-through text-slate-400' : ''}>
                      {taskText}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Year 2 */}
        <div className="relative group">
          <div className="absolute -left-[27px] sm:-left-[31px] top-1 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
            Y2
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{t.y2Title}</h4>
              <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                {t.y2Sem}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.y2Desc}</p>
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
              {t.y2Tasks.map((taskText, idx) => {
                const taskId = `y2_${idx + 1}`;
                return (
                  <label
                    key={taskId}
                    onClick={() => toggleMilestone(taskId)}
                    className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={!!completedMilestones[taskId]}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-purple-600 accent-purple-600 cursor-pointer"
                    />
                    <span className={completedMilestones[taskId] ? 'line-through text-slate-400' : ''}>
                      {taskText}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Year 3 */}
        <div className="relative group">
          <div className="absolute -left-[27px] sm:-left-[31px] top-1 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
            Y3
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{t.y3Title}</h4>
              <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                {t.y3Sem}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.y3Desc}</p>
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
              {t.y3Tasks.map((taskText, idx) => {
                const taskId = `y3_${idx + 1}`;
                return (
                  <label
                    key={taskId}
                    onClick={() => toggleMilestone(taskId)}
                    className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={!!completedMilestones[taskId]}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-teal-600 accent-teal-600 cursor-pointer"
                    />
                    <span className={completedMilestones[taskId] ? 'line-through text-slate-400' : ''}>
                      {taskText}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Year 4 */}
        <div className="relative group">
          <div className="absolute -left-[27px] sm:-left-[31px] top-1 w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
            Y4
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{t.y4Title}</h4>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {t.y4Sem}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.y4Desc}</p>
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
              {t.y4Tasks.map((taskText, idx) => {
                const taskId = `y4_${idx + 1}`;
                return (
                  <label
                    key={taskId}
                    onClick={() => toggleMilestone(taskId)}
                    className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={!!completedMilestones[taskId]}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                    />
                    <span className={completedMilestones[taskId] ? 'line-through text-slate-400' : ''}>
                      {taskText}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Tab 4 for Parent Dashboard: Budget Tool (Responsive layout)
  const renderParentBudget = () => (
    <div className="space-y-4 max-w-5xl mx-auto w-full animate-fade-in">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
              {t.budgetToolTitle}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {t.budgetToolHeading}
            </h3>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Calculator className="w-5 h-5" />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          {t.budgetToolDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Slider & Status */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                {t.adjustBudgetLabel}
              </label>
              <span className="text-sm font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-xl tabular-nums">
                {formatINR(parentToolBudget)}
              </span>
            </div>

            <input
              type="range"
              min="150000"
              max="800000"
              step="25000"
              value={parentToolBudget}
              onChange={(e) => setParentToolBudget(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-[10px] text-slate-600 font-bold">
              <span>₹1.5 Lakh</span>
              <span>₹4.5 Lakh</span>
              <span>₹8.0 Lakh</span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className={`p-4 rounded-3xl border shadow-md ${
            isBudgetSafe
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
              : 'bg-amber-50/90 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                {isBudgetSafe ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                <span>{isBudgetSafe ? t.statusSafe : t.statusStrained}</span>
              </span>
              <span className="text-xs font-bold tabular-nums">
                {isBudgetSafe ? `+ ${formatINR(remainingOrDeficit)}` : `- ${formatINR(Math.abs(remainingOrDeficit))}`}
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed">
              {isBudgetSafe ? t.budgetSummarySafe : t.budgetSummaryStrained}
            </p>
          </div>
        </div>

        {/* Right: Itemized Breakdown Card */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              4-Year Itemized Cost Breakdown
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">AP / TS Normalized</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">{t.estTuitionLabel}</span>
              <span className="font-bold text-slate-800">{formatINR(fourYearTuition)}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">{t.estHostelLabel}</span>
              <span className="font-bold text-slate-800">{formatINR(fourYearHostelLiving)}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">{t.estFoodTransportLabel}</span>
              <span className="font-bold text-slate-800">{formatINR(fourYearFoodTransport)}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">{t.estBooksExamLabel}</span>
              <span className="font-bold text-slate-800">{formatINR(fourYearBooksExamLaptop)}</span>
            </div>

            <div className="flex justify-between items-center py-2 font-bold text-slate-900 border-b border-slate-200">
              <span>{t.grossCostLabel}</span>
              <span className="text-sm">{formatINR(grossEstimatedCost)}</span>
            </div>

            {/* JVD Subsidy Deduction */}
            <div className="flex justify-between items-center py-2 text-emerald-800 bg-emerald-50 px-3 rounded-xl border border-emerald-100">
              <span className="font-semibold">{t.jvdReimbursementLabel}</span>
              <span className="font-extrabold text-sm">- {formatINR(jvdDeduction)}</span>
            </div>

            {/* Net Out of Pocket */}
            <div className="flex justify-between items-center py-2.5 text-sm font-extrabold text-slate-900 bg-slate-50/90 px-3.5 rounded-xl border border-slate-200/60">
              <span>{t.netOutOfPocketLabel}</span>
              <span className="text-base text-emerald-700">{formatINR(netOutOfPocket)}</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 text-center pt-1">
            {t.budgetDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );

  // Tab 5 for Student Dashboard: Student Family Sync
  const renderStudentSync = () => (
    <div className="space-y-4 max-w-4xl mx-auto w-full animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
              {t.syncTitle}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {t.syncHeading}
            </h3>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          {t.syncDesc}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          {t.studentSyncSectionTitle}
        </h4>

        {/* Input 1: Primary Parent Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.studentSyncInput1Label}
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={t.studentSyncInput1Placeholder}
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => {
                if (parentEmail && isValidEmail(parentEmail)) {
                  const studentEmail = loginEmail || 'student@sikshasetu.edu';
                  const enteredParentEmail = parentEmail;

                  // Non-blocking asynchronous database write to Supabase
                  void (async () => {
                    try {
                      const res = await saveFamilySyncInvite({
                        student_email: studentEmail,
                        parent_email: enteredParentEmail,
                      });
                      if (!res.success) {
                        console.warn('Family Sync database notice:', res.error);
                      }
                    } catch (err) {
                      console.error('Supabase family_sync operation error:', err);
                    }
                  })();

                  setIsFamilySynced(true);
                  if (typeof window !== 'undefined') window.isFamilySynced = true;
                  setIsNotificationDotVisible(true);
                  setNotifications(prev => [`Invitation sent to ${enteredParentEmail} to complete their form.`, ...prev]);
                  setIsInvited(true);
                  setParentEmail('');
                  showToast(`Invitation sent to ${enteredParentEmail} to complete their form.`);
                } else {
                  showToast(t.emailInvalidToast);
                }
              }}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer min-w-[80px]"
            >
              {isInvited ? "Sent" : t.inviteBtn}
            </button>
          </div>
        </div>

        {/* Input 2: Secondary Guardian Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.studentSyncInput2Label}
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={t.studentSyncInput2Placeholder}
              value={guardianEmail}
              onChange={(e) => setGuardianEmail(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => {
                if (guardianEmail && isValidEmail(guardianEmail)) {
                  const studentEmail = loginEmail || 'student@sikshasetu.edu';
                  const enteredGuardianEmail = guardianEmail;

                  // Non-blocking asynchronous database write to Supabase
                  void (async () => {
                    try {
                      const res = await saveFamilySyncInvite({
                        student_email: studentEmail,
                        parent_email: enteredGuardianEmail,
                      });
                      if (!res.success) {
                        console.warn('Family Sync database notice:', res.error);
                      }
                    } catch (err) {
                      console.error('Supabase family_sync operation error:', err);
                    }
                  })();

                  setIsFamilySynced(true);
                  if (typeof window !== 'undefined') window.isFamilySynced = true;
                  setIsNotificationDotVisible(true);
                  setNotifications(prev => [`Invitation sent to ${enteredGuardianEmail} to complete their form.`, ...prev]);
                  setIsInvited(true);
                  setGuardianEmail('');
                  showToast(`Invitation sent to ${enteredGuardianEmail} to complete their form.`);
                } else {
                  showToast(t.emailInvalidToast);
                }
              }}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer min-w-[80px]"
            >
              {isInvited ? "Sent" : t.inviteBtn}
            </button>
          </div>
        </div>

        {/* Active Synced Family Members */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            {t.activeMembersTitle}
          </span>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  ME
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{t.memberStudentLabel}</span>
                  <span className="text-[10px] text-slate-400">{t.memberStudentDesc}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {t.connectedBadge}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  P
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{t.memberParentLabel}</span>
                  <span className="text-[10px] text-slate-400">{t.memberParentDesc}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {t.connectedBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Share WhatsApp Link */}
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText('https://sikshasetu.app/join/AP-9281');
            }
            showToast(t.linkCopiedToast);
          }}
          className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.copyShareLinkBtn}</span>
        </button>
      </div>
    </div>
  );

  // Tab 5 for Parent Dashboard: Parent Family Sync
  const renderParentSync = () => (
    <div className="space-y-4 max-w-4xl mx-auto w-full animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
              {t.syncTitle}
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {t.syncHeading}
            </h3>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          {t.syncDesc}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          {t.parentSyncSectionTitle}
        </h4>

        {/* Input 1: Link Child Account */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.parentSyncInput1Label}
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={t.parentSyncInput1Placeholder}
              value={childEmail}
              onChange={(e) => setChildEmail(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => {
                if (childEmail && isValidEmail(childEmail)) {
                  const currentParentEmail = loginEmail || 'parent@family.org';
                  const enteredChildEmail = childEmail;

                  // Non-blocking asynchronous database write to Supabase
                  void (async () => {
                    try {
                      const res = await saveFamilySyncInvite({
                        student_email: enteredChildEmail,
                        parent_email: currentParentEmail,
                      });
                      if (!res.success) {
                        console.warn('Family Sync database notice:', res.error);
                      }
                    } catch (err) {
                      console.error('Supabase family_sync operation error:', err);
                    }
                  })();

                  showToast(t.demoLinkToast.replace('{email}', childEmail));
                  setChildEmail('');
                } else {
                  showToast(t.emailInvalidToast);
                }
              }}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
            >
              {t.linkBtn}
            </button>
          </div>
        </div>

        {/* Input 2: Add Co-Parent / Partner */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {t.parentSyncInput2Label}
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={t.parentSyncInput2Placeholder}
              value={coParentEmail}
              onChange={(e) => setCoParentEmail(e.target.value)}
              className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => {
                if (coParentEmail && isValidEmail(coParentEmail)) {
                  const studentEmail = childEmail || 'student@sikshasetu.edu';
                  const enteredCoParentEmail = coParentEmail;

                  // Non-blocking asynchronous database write to Supabase
                  void (async () => {
                    try {
                      const res = await saveFamilySyncInvite({
                        student_email: studentEmail,
                        parent_email: enteredCoParentEmail,
                      });
                      if (!res.success) {
                        console.warn('Family Sync database notice:', res.error);
                      }
                    } catch (err) {
                      console.error('Supabase family_sync operation error:', err);
                    }
                  })();

                  setIsFamilySynced(true);
                  if (typeof window !== 'undefined') window.isFamilySynced = true;
                  setIsNotificationDotVisible(true);
                  setNotifications(prev => [`Invitation sent to ${enteredCoParentEmail} to complete their form.`, ...prev]);
                  setIsInvited(true);
                  setCoParentEmail('');
                  showToast(`Invitation sent to ${enteredCoParentEmail} to complete their form.`);
                } else {
                  showToast(t.emailInvalidToast);
                }
              }}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer min-w-[80px]"
            >
              {isInvited ? "Sent" : t.inviteBtn}
            </button>
          </div>
        </div>

        {/* Active Synced Family Members */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            {t.activeMembersTitle}
          </span>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  S
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{t.memberStudentLabel}</span>
                  <span className="text-[10px] text-slate-400">{t.memberStudentDesc}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {t.connectedBadge}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  ME
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">{t.memberParentLabel}</span>
                  <span className="text-[10px] text-slate-400">{t.memberParentDesc}</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {t.connectedBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Parent Safeguard Controls */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            {t.parentControlsTitle}
          </span>
          <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <div>
              <span className="text-xs font-bold text-slate-800 block">{t.budgetCeilingLabel}</span>
              <span className="text-[10px] text-slate-500">{t.budgetCeilingDesc}</span>
            </div>
            <span className="text-xs font-bold text-emerald-700">Enabled</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <div>
              <span className="text-xs font-bold text-slate-800 block">{t.jvdCheckerLabel}</span>
              <span className="text-[10px] text-slate-500">{t.jvdCheckerDesc}</span>
            </div>
            <span className="text-xs font-bold text-emerald-700">Active</span>
          </div>
        </div>

        {/* Share WhatsApp Link */}
        <button
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText('https://sikshasetu.app/join/AP-9281');
            }
            showToast(t.linkCopiedToast);
          }}
          className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.copyShareLinkBtn}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-start items-center py-0 sm:py-6 px-0 sm:px-4 lg:px-8 font-sans text-slate-800 antialiased selection:bg-[#476A8A] selection:text-white">

      {/* Responsive Full-Width Application Shell (Standard Responsive Webpage Layout) */}
      <div className="w-full max-w-6xl bg-white border border-slate-200 shadow-sm rounded-none sm:rounded-xl overflow-hidden min-h-screen sm:min-h-[880px] flex flex-col relative z-10 transition-all">
        
        {/* TOP STICKY HEADER */}
        <header className="sticky top-0 z-30 px-4 sm:px-8 py-3.5 bg-white border-b border-slate-200 flex items-center justify-between gap-3">
          {/* Left: Global "Go Back" Arrow Icon & App Branding */}
          <div className="flex items-center gap-3">
            {/* Global "Go Back" button shown on all screens except initial role selection */}
            {canGoBack && (
              <button
                onClick={handleGoBack}
                aria-label="Go Back"
                title={t.goBack}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white hover:bg-white border border-slate-200/80 text-slate-700 hover:text-indigo-600 shadow-sm transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t.goBack}</span>
              </button>
            )}

            {/* App Branding */}
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-md transition-all ${
                session === 'parent'
                  ? 'bg-[#476A8A]'
                  : 'bg-[#476A8A]'
              }`}>
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight tracking-tight">
                  {t.appName}
                </h1>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">{t.subBranding}</p>
              </div>
            </div>
          </div>

          {/* Right: Session Badge & Language Selector */}
          <div className="flex items-center gap-2">
            {/* Header Status Indicator: [ Student ] Badge */}
            {session === 'student' && (
              <button
                onClick={handleLogout}
                title={t.logoutBtn}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-xl shadow-sm text-xs font-bold text-indigo-700 transition-all cursor-pointer group"
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>[ Student ]</span>
                <LogOut className="w-3 h-3 text-indigo-400 group-hover:text-indigo-700 transition-colors ml-0.5" />
              </button>
            )}

            {/* Header Status Indicator: [ Parent ] Badge */}
            {session === 'parent' && (
              <button
                onClick={handleLogout}
                title={t.logoutBtn}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl shadow-sm text-xs font-bold text-emerald-700 transition-all cursor-pointer group"
              >
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>[ Parent ]</span>
                <LogOut className="w-3 h-3 text-emerald-400 group-hover:text-emerald-700 transition-colors ml-0.5" />
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-sm transition-all cursor-pointer relative"
              >
                <i className="fas fa-bell"></i>
                {isNotificationDotVisible && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                )}
              </button>
              
              {isNotificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-2 text-xs text-slate-500 italic">No new alerts</div>
                  ) : (
                    notifications.map((msg, idx) => (
                      <div key={idx} className="px-4 py-3 text-[11px] font-medium text-slate-700 border-b border-slate-50 last:border-0 leading-snug">
                        {msg}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Language Selector Dropdown (English, Telugu, Hindi) */}
            <div className="flex items-center gap-1 bg-white border border-slate-200/80 rounded-xl px-2.5 py-1.5 shadow-sm">
              <span className="text-xs" aria-hidden="true">🌐</span>
              <select
                aria-label={t.langSelectorAria}
                value={lang}
                onChange={(e) => {
                  const newL = e.target.value as Lang;
                  setLang(newL);
                  showToast(newL === 'te' ? 'భాష మార్చబడింది: తెలుగు' : newL === 'hi' ? 'भाषा बदली गई: हिंदी' : 'Language set to English');
                }}
                className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-1"
              >
                <option value="en">English (en-IN)</option>
                <option value="te">తెలుగు (te-IN)</option>
                <option value="hi">हिंदी (hi-IN)</option>
              </select>
            </div>
          </div>
        </header>

        {/* MAIN SCROLLABLE CONTENT AREA */}
        <main className={`flex-1 overflow-y-auto px-4 sm:px-8 py-5 ${session ? 'pb-28 sm:pb-8' : 'pb-8'}`}>

          {/* INITIAL VIEW: TRUE LOGIN FORM FLOW */}
          {session === null && (
            <div className="w-full">
              {authStep === 'select-role' && renderRoleSelection()}
              {authStep === 'login' && renderLoginForm()}
              {authStep === 'forgot' && renderForgotPassword()}
            </div>
          )}

          {/* DEDICATED STUDENT DASHBOARD CONTAINER */}
          {session === 'student' && (
            <div id="student-dashboard" className="space-y-4">
              {activeTab === 'dashboard' && renderStudentTab1()}
              {activeTab === 'bot' && renderCounselorTab()}
              {activeTab === 'room' && renderFamilyRoomTab()}
              {activeTab === 'dynamic' && renderStudentRoadmap()}
              {activeTab === 'sync' && renderStudentSync()}
            </div>
          )}

          {/* DEDICATED PARENT DASHBOARD CONTAINER */}
          {session === 'parent' && (
            <div id="parent-dashboard" className="space-y-4">
              {activeTab === 'dashboard' && renderParentTab1()}
              {activeTab === 'bot' && renderCounselorTab()}
              {activeTab === 'room' && renderFamilyRoomTab()}
              {activeTab === 'dynamic' && renderParentBudget()}
              {activeTab === 'sync' && renderParentSync()}
            </div>
          )}

        </main>

        {/* VIEW SCHOLARSHIPS MODAL */}
        {showScholarshipsModal && renderScholarshipsModal()}

        {/* TOAST POPUP FOR ACCESSIBLE INLINE FEEDBACK */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed top-20 right-4 z-50 bg-slate-900/95 text-white text-xs font-medium py-3 px-5 rounded-xl shadow-2xl flex items-center justify-between border border-white/20 animate-fade-in max-w-sm"
          >
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white ml-3 text-sm cursor-pointer"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        )}

        {/* RESPONSIVE 5-TAB BOTTOM NAVIGATION BAR (Shown only in active session) */}
        {session !== null && (
          <nav
            aria-label="Main application tabs"
            className="fixed sm:sticky bottom-0 left-0 right-0 z-30 bg-white border-t sm:border border-slate-200 sm:rounded-xl shadow-2xl px-3 py-2 sm:my-3 sm:max-w-xl sm:mx-auto transition-all"
          >
            <div className="grid grid-cols-5 items-center gap-1">
              
              {/* TAB 1: Dashboard */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? (session === 'parent' ? 'text-emerald-600 scale-105' : 'text-indigo-600 scale-105')
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Compass className="w-5 h-5 stroke-[2.2]" />
                <span className="text-[10px] font-bold tracking-tight mt-1">
                  {t.tabs.dashboard}
                </span>
              </button>

              {/* TAB 2: AI Bot */}
              <button
                onClick={() => setActiveTab('bot')}
                className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
                  activeTab === 'bot'
                    ? (session === 'parent' ? 'text-emerald-600 scale-105' : 'text-indigo-600 scale-105')
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Bot className="w-5 h-5 stroke-[2.2]" />
                <span className="text-[10px] font-bold tracking-tight mt-1">
                  {t.tabs.bot}
                </span>
              </button>

              {/* TAB 3: Family Room (Highlighted Core Feature) */}
              <button
                onClick={() => setActiveTab('room')}
                className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
                  activeTab === 'room'
                    ? (session === 'parent' ? 'text-emerald-600 scale-105' : 'text-indigo-600 scale-105')
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <span className="text-[10px] font-bold tracking-tight mt-1">
                  {t.tabs.room}
                </span>
              </button>

              {/* TAB 4: Dynamic Tool (Timeline Tool for Student, Budget Tool for Parent) */}
              <button
                onClick={() => setActiveTab('dynamic')}
                className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
                  activeTab === 'dynamic'
                    ? (session === 'parent' ? 'text-emerald-600 scale-105' : 'text-indigo-600 scale-105')
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {session === 'student' ? (
                  <TrendingUp className="w-5 h-5 stroke-[2.2]" />
                ) : (
                  <Calculator className="w-5 h-5 stroke-[2.2]" />
                )}
                <span className="text-[10px] font-bold tracking-tight mt-1">
                  {session === 'student' ? t.tabs.roadmap : t.tabs.budget}
                </span>
              </button>

              {/* TAB 5: Profile & Settings (Family Sync Engine) */}
              <button
                onClick={() => setActiveTab('sync')}
                className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
                  activeTab === 'sync'
                    ? (session === 'parent' ? 'text-emerald-600 scale-105' : 'text-indigo-600 scale-105')
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-5 h-5 stroke-[2.2]" />
                <span className="text-[10px] font-bold tracking-tight mt-1">
                  {t.tabs.sync}
                </span>
              </button>

            </div>
          </nav>
        )}

      </div>
    </div>
  );
}
