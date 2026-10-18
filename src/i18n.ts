/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Lang = 'en' | 'te' | 'hi';
export type Role = 'student' | 'parent';
export type Tab = 'dashboard' | 'bot' | 'room' | 'dynamic' | 'sync';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  subBranding: string;
  demoNotice: string;
  studentMode: string;
  parentMode: string;
  roleSwitcherAria: string;
  langSelectorAria: string;
  
  // Login / Landing Page
  loginTitle: string;
  loginSubtitle: string;
  loginStudentBtn: string;
  loginParentBtn: string;
  loginStudentDesc: string;
  loginParentDesc: string;
  logoutBtn: string;
  studentBadge: string;
  parentBadge: string;
  welcomeBack: string;

  // New Navigation, Auth & Landing Keys
  goBack: string;
  selectRolePrompt: string;
  loginAsTitle: string;
  emailLabel: string;
  passwordLabel: string;
  signInBtn: string;
  forgotPasswordLink: string;
  forgotPasswordTitle: string;
  forgotPasswordDesc: string;
  resendPasswordBtn: string;
  backToLogin: string;
  resetSentToast: string;

  // Dashboard Landing States & New Buttons
  studentLandingHeadline: string;
  parentLandingHeadline: string;
  fillFormBtn: string;
  viewScholarshipsBtn: string;
  scholarshipsModalTitle: string;
  scholarshipsModalSubtitle: string;
  closeModal: string;
  
  // Tabs
  tabs: {
    dashboard: string;
    bot: string;
    room: string;
    roadmap: string;
    budget: string;
    sync: string;
  };

  // Dashboard - General
  studentProfileBannerTitle: string;
  studentProfileBannerDesc: string;
  parentProfileBannerTitle: string;
  parentProfileBannerDesc: string;
  analyzeBtn: string;
  analyzing: string;
  syncRequiredWarning: string;
  waitingForPartnerPending: string;
  sendReminderBtn: string;
  reminderSentBtn: string;
  forceSyncDemo: string;
  forceSyncActive: string;
  editInputs: string;
  analysisComplete: string;
  demoEstimateNotice: string;
  familyAlignmentTitle: string;
  highHarmony: string;
  moderateHarmony: string;
  metricBranchFit: string;
  metricBudgetRisk: string;
  metricSafetyDist: string;
  riskLowJvd: string;
  scholarshipAlertTitle: string;
  scholarshipNoticeTitle: string;
  scholarshipBadge: string;
  scholarshipDisclaim: string;
  topMatchesTitle: string;
  filteredRegionTag: string;
  safetyScoreLabel: string;
  discussInRoomBtn: string;
  familyRoomCtaTitle: string;
  familyRoomCtaDesc: string;
  openRoomBtn: string;
  disclaimerFootnote: string;

  // Student Form Questions & Options
  sq1Label: string;
  sq1Options: { [key: string]: string };
  sq2Label: string;
  sq2Options: { [key: string]: string };
  sq3Label: string;
  sq3Options: { [key: string]: string };
  sq4Label: string;
  sq4Options: { [key: string]: string };
  sq5Label: string;
  sq5Options: { [key: string]: string };
  sq6Label: string;
  sq6Options: { [key: string]: string };
  sq7Label: string;
  sq7Options: { [key: string]: string };
  sq8Label: string;
  sq8Options: { [key: string]: string };

  // Parent Form Questions & Options
  pq1Label: string;
  pq1Options: { [key: string]: string };
  pq2Label: string;
  pq2Options: { [key: string]: string };
  pq3Label: string;
  pq4Label: string;
  pq4Options: { [key: string]: string };
  pq5Label: string;
  pq5Options: { [key: string]: string };
  pq6Label: string;
  pq6Options: { [key: string]: string };
  pq7Label: string;
  pq7Options: { [key: string]: string };
  pq8Label: string;
  pq8Options: { [key: string]: string };
  pq9Label: string;
  pq9Options: { [key: string]: string };

  // AI Counselor (Tab 2)
  botTitle: string;
  botSubtitle: string;
  botWelcome: string;
  botInputPlaceholderStudent: string;
  botInputPlaceholderParent: string;
  botSendAria: string;
  botPromptChips: string[];
  botTyping: string;
  keyboardTip: string;
  quickPhrasesTitle: string;
  quickPhrases: string[];

  // Family Room (Tab 3)
  roomTitle: string;
  roomSubtitle: string;
  participantStudent: string;
  participantParent: string;
  participantAi: string;
  seedStudentText: string;
  seedParentText: string;
  seedParentTeOriginal: string;
  seedAiCompromise: string;
  micSpeakLabel: string;
  micListeningLabel: string;
  micStopLabel: string;
  micRequestingPermission: string;
  micReadyLabel: string;
  micUnsupported: string;
  micPermissionError: string;
  micSpeechDetected: string;
  micNoSpeech: string;
  micNetworkError: string;
  micStoppedLabel: string;
  roomInputPlaceholderStudent: string;
  roomInputPlaceholderParent: string;
  voiceNoteAria: string;
  roomNoteDemo: string;

  // Career Roadmap (Tab 4 Student)
  roadmapTitle: string;
  roadmapHeading: string;
  roadmapDesc: string;
  y1Title: string;
  y1Sem: string;
  y1Desc: string;
  y1Tasks: string[];
  y2Title: string;
  y2Sem: string;
  y2Desc: string;
  y2Tasks: string[];
  y3Title: string;
  y3Sem: string;
  y3Desc: string;
  y3Tasks: string[];
  y4Title: string;
  y4Sem: string;
  y4Desc: string;
  y4Tasks: string[];

  // Budget Planner (Tab 4 Parent)
  budgetToolTitle: string;
  budgetToolHeading: string;
  budgetToolDesc: string;
  adjustBudgetLabel: string;
  estTuitionLabel: string;
  estHostelLabel: string;
  estFoodTransportLabel: string;
  estBooksExamLabel: string;
  grossCostLabel: string;
  jvdReimbursementLabel: string;
  netOutOfPocketLabel: string;
  budgetRemainingLabel: string;
  budgetDeficitLabel: string;
  statusSafe: string;
  statusStrained: string;
  budgetSummarySafe: string;
  budgetSummaryStrained: string;
  budgetDisclaimer: string;

  // Family Sync (Tab 5)
  syncTitle: string;
  syncHeading: string;
  syncDesc: string;
  studentSyncSectionTitle: string;
  studentSyncInput1Label: string;
  studentSyncInput1Placeholder: string;
  studentSyncInput2Label: string;
  studentSyncInput2Placeholder: string;
  parentSyncSectionTitle: string;
  parentSyncInput1Label: string;
  parentSyncInput1Placeholder: string;
  parentSyncInput2Label: string;
  parentSyncInput2Placeholder: string;
  inviteBtn: string;
  linkBtn: string;
  activeMembersTitle: string;
  memberStudentLabel: string;
  memberStudentDesc: string;
  memberParentLabel: string;
  memberParentDesc: string;
  connectedBadge: string;
  copyShareLinkBtn: string;
  parentControlsTitle: string;
  budgetCeilingLabel: string;
  budgetCeilingDesc: string;
  jvdCheckerLabel: string;
  jvdCheckerDesc: string;
  demoInviteToast: string;
  demoLinkToast: string;
  emailInvalidToast: string;
  linkCopiedToast: string;
}

export const translations: Record<Lang, TranslationDictionary> = {
  en: {
    appName: 'SikshaSetu AI',
    tagline: 'Bridging Dreams & Family Realities',
    subBranding: 'Tier-2 & Tier-3 Family Decision Support',
    demoNotice: 'Prototype Demonstration · Educational Planning',
    studentMode: 'Student Mode',
    parentMode: 'Parent Mode',
    roleSwitcherAria: 'Select user role',
    langSelectorAria: 'Select language',

    loginTitle: 'Welcome to SikshaSetu AI',
    loginSubtitle: 'AI-Enabled Family Decision-Support Platform for Engineering Education',
    loginStudentBtn: 'Login as Student',
    loginParentBtn: 'Login as Parent',
    loginStudentDesc: 'Explore branch options, 4-year tech roadmap & college matches',
    loginParentDesc: 'Review 4-year costs, JVD scholarship, campus safety & budget limits',
    logoutBtn: 'Sign Out',
    studentBadge: 'Student',
    parentBadge: 'Parent',
    welcomeBack: 'Select your portal to continue',

    goBack: 'Go Back',
    selectRolePrompt: 'Select your role to continue',
    loginAsTitle: 'Sign In as {role}',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    signInBtn: 'Sign In',
    forgotPasswordLink: 'Forgot Password?',
    forgotPasswordTitle: 'Reset Your Password',
    forgotPasswordDesc: 'Enter your registered email address and we will resend password recovery instructions.',
    resendPasswordBtn: 'Resend Password',
    backToLogin: 'Back to Sign In',
    resetSentToast: 'Password reset instructions resent to {email}',

    studentLandingHeadline: 'Find the campus that matches your vibe. Drop your stats below.',
    parentLandingHeadline: 'Plan your child’s engineering journey with complete clarity on costs, scholarships, and campus safety.',
    fillFormBtn: 'Fill the form',
    viewScholarshipsBtn: 'View Scholarships',
    scholarshipsModalTitle: 'State & Central Engineering Scholarships',
    scholarshipsModalSubtitle: 'Verified fee reimbursement policies, eligibility requirements, and application procedures.',
    closeModal: 'Close',

    tabs: {
      dashboard: 'Dashboard',
      bot: 'AI Counselor',
      room: 'Family Room',
      roadmap: 'Roadmap',
      budget: 'Budget',
      sync: 'Family Sync',
    },

    studentProfileBannerTitle: 'Student Aspirations Profile',
    studentProfileBannerDesc: 'Capture your genuine branch passions and 4-year tech career milestones.',
    parentProfileBannerTitle: 'Parent Family Reality Profile',
    parentProfileBannerDesc: 'Set real financial limits, safety requirements, and distance parameters.',
    analyzeBtn: 'Analyze with AI',
    analyzing: 'Matching Aspirations & Family Constraints...',
    syncRequiredWarning: 'Sync Required: Please link your parent/student account in the Family Sync section before analyzing.',
    waitingForPartnerPending: 'Waiting for Data: Your preferences are saved, but we are waiting for your linked family member to complete their form.',
    sendReminderBtn: 'Send Reminder',
    reminderSentBtn: 'Reminder Sent!',
    forceSyncDemo: 'Force Sync (Demo)',
    forceSyncActive: '✓ Partner Form Synced (Demo Active)',
    editInputs: 'Modify Preferences',
    analysisComplete: 'AI Synthesis Complete (Demo)',
    demoEstimateNotice: 'Simulated AI Analysis based on your selected inputs',
    familyAlignmentTitle: 'Family Alignment Score',
    highHarmony: 'High Harmony',
    moderateHarmony: 'Balanced Harmony',
    metricBranchFit: 'Branch Fit',
    metricBudgetRisk: 'Budget Risk',
    metricSafetyDist: 'Safety Dist.',
    riskLowJvd: 'Low (JVD Covered)',
    scholarshipAlertTitle: 'State Scholarship Alert',
    scholarshipNoticeTitle: 'AP State Portal Verification Guide',
    scholarshipBadge: 'Potential Eligibility for Jagananna Vidya Deevena (JVD) - 100% Tuition Fee Reimbursed',
    scholarshipDisclaim: 'Official notice: JVD eligibility requires a valid White Ration Card / Income Certificate (<₹2.5L/yr). Actual disbursement depends on government norms.',
    topMatchesTitle: 'Top Recommended Matches (Illustrative)',
    filteredRegionTag: 'Filtered for AP / TS Region',
    safetyScoreLabel: 'Campus Safety Rating',
    discussInRoomBtn: 'Discuss in Family Room',
    familyRoomCtaTitle: 'Resolve Doubts Together',
    familyRoomCtaDesc: 'Open the 3-Way Family Chat with AI Mediator',
    openRoomBtn: 'Open Room',
    disclaimerFootnote: 'Disclaimer: Cutoffs, fees, and college placements are illustrative demo estimates for counseling guidance.',

    // Student Questions & Options
    sq1Label: 'Expected EAPCET/JEE Rank',
    sq1Options: {
      'Top 1-15k': 'Top 1-15k (Top Tier Merit Seats)',
      'Mid 15k-50k': 'Mid 15k-50k (Competitive Autonomous)',
      'Safe 50k-1L': 'Safe 50k-1L (District Colleges)',
      'Not Qualified': 'Not Qualified / Management Query',
    },
    sq2Label: 'Planned Admission Route',
    sq2Options: {
      'Merit+JVD Scholarship': 'Merit + JVD Scholarship (100% Fee Waived)',
      'Merit Self-funded': 'Merit Self-funded (Govt Cap Fee)',
      'Mgmt Quota': 'Management Quota (Cat-B Non-Merit)',
    },
    sq3Label: 'Top Branch Choice',
    sq3Options: {
      'Software CSE/IT': 'Software CSE / Information Tech',
      'Future Tech AI/DS': 'Future Tech: AI, Data Science & Cyber',
      'Electronics ECE/EEE': 'Electronics ECE / EEE (Dual Opportunity)',
      'Core Mech/Civil': 'Core Mechanical / Civil Engineering',
    },
    sq4Label: 'Why this branch?',
    sq4Options: {
      'Genuine passion': 'Genuine passion for coding & computers',
      'High salary jobs': 'High salary software jobs & placements',
      'Family/Friends advised': 'Family/Friends & seniors advised',
      'Just want any IT job': 'Just want any secure IT job',
    },
    sq5Label: 'Preferred Accommodation',
    sq5Options: {
      'Hosteler': 'Hosteler (Stay on campus with friends)',
      'Day Scholar': 'Day Scholar (Travel daily from home)',
      'Private PG': 'Private PG / Shared Apartment nearby',
    },
    sq6Label: 'What matters most in selecting a college?',
    sq6Options: {
      'Good placements/salary': 'Good placements & high median salary',
      'Discipline/safety': 'Discipline & campus safety',
      'College reputation': 'College reputation & alumni network',
      'Affordable fees': 'Affordable fees & low expense',
      'Location nearby': 'Location nearby my hometown',
    },
    sq7Label: 'Goal after 4 Years',
    sq7Options: {
      'High-paying Tech Job': 'High-paying Tech Job (₹8+ LPA)',
      'MS/M.Tech Abroad': 'MS / M.Tech in US/Germany/IITs',
      'Startup': 'Launch Tech Startup / Freelancing',
      'Govt/Core Job': 'Govt (ISRO/GATE) or PSU Core Job',
    },
    sq8Label: 'Backup Plan',
    sq8Options: {
      'Lower college + Dream branch': 'Lower college + Dream branch (CSE/AI)',
      'Top college + Any branch': 'Top college + Any branch (ECE/Mech)',
      'Drop a year': 'Drop a year for Long-term coaching',
    },

    // Parent Questions & Options
    pq1Label: 'Preferred Branch for Student',
    pq1Options: {
      'Software CSE/IT': 'Software CSE / Information Tech (Job Guarantee)',
      'Future Tech AI/DS': 'Future Tech AI/DS (New Generation)',
      'Electronics ECE/EEE': 'Electronics ECE/EEE (Both Govt & IT)',
      'Core Mech/Civil': 'Core Mech / Civil (Permanent Stability)',
    },
    pq2Label: "How important is the child's interest?",
    pq2Options: {
      'Balance family + student': 'Balance family practicalities + student passion',
      'Very important': 'Very important (Child must be happy)',
      'Important but need jobs': 'Important, but high placement is non-negotiable',
      'Career stability first': 'Career stability & safety first',
    },
    pq3Label: 'Maximum 4-Year Total Budget',
    pq4Label: 'Primary Funding Source',
    pq4Options: {
      'Govt Fee Reimbursement JVD': 'Govt Fee Reimbursement JVD (White Card)',
      'Bank Loan': 'Bank Education Loan',
      'Family Savings': 'Family Savings / Agriculture Income',
      'Partial Scholarships': 'Partial NGO / Merit Scholarships',
    },
    pq5Label: 'Distance Limit from Home',
    pq5Options: {
      'Nearby under 150km': 'Nearby under 150km (Within 3 hrs travel)',
      'Local under 30km': 'Local under 30km (Must return daily)',
      'Anywhere in AP': 'Anywhere in Andhra Pradesh',
      'Anywhere in India': 'Anywhere in India (If top institute)',
    },
    pq6Label: 'Accommodation Rule',
    pq6Options: {
      'Strict College Hostel': 'Strict College Hostel with In-campus Warden',
      'Day Scholar': 'Day Scholar from Home only',
      'Relatives': 'Stay with Trusted Relatives in town',
      'Private PG': 'Private PG only if high security',
    },
    pq7Label: 'What matters most in selecting a college?',
    pq7Options: {
      'Good placements/salary': 'Good placements & guaranteed campus offers',
      'Discipline/safety': 'Discipline, anti-ragging & safe environment',
      'Affordable fees': 'Affordable fees & zero hidden costs',
      'College reputation': 'Legacy brand reputation in society',
      'Location nearby': 'Location close to hometown',
    },
    pq8Label: 'Biggest Concern / Fear',
    pq8Options: {
      'Hidden Fees/Debt': 'Hidden Fees & taking unmanageable Debt',
      'Lack of Safety/Discipline': 'Lack of Safety, Ragging or Bad Influence',
      'Unemployment': 'Unemployment after spending lakhs',
      'Academic Pressure': 'Excessive Academic Strain on child',
    },
    pq9Label: 'Definition of College Success',
    pq9Options: {
      'Getting a job immediately': 'Getting a respectable job immediately after graduation',
      'Strict/Safe Environment': 'Passing out in a Strict, Safe, Cultured Environment',
      'Gateway to Higher Studies': 'Strong foundation for MS / Higher Studies',
      'Low Financial Strain': 'Graduating with Low or Zero Family Debt',
    },

    // AI Counselor
    botTitle: '1-on-1 Private Counselor',
    botSubtitle: 'Trained on AP/TS EAPCET, JVD norms & career paths',
    botWelcome: 'Namaste! I am your SikshaSetu 1-on-1 Education Advisor. Ask me anything about EAPCET counseling, CSE vs ECE, JVD fee reimbursement, or hostel safety.',
    botInputPlaceholderStudent: 'Ask about cutoff, syllabus, internships, CSE vs ECE...',
    botInputPlaceholderParent: 'Ask about hostel safety, JVD reimbursement, loans...',
    botSendAria: 'Send question to AI counselor',
    botPromptChips: [
      'Ask me about CSE vs ECE',
      'Are education loans safe?',
      'How can we reduce college expenses?',
      'Which career path suits my interests?',
    ],
    botTyping: 'AI Counselor is typing...',
    keyboardTip: 'Type in English, Telugu, or Hindi using your phone/OS keyboard or IME.',
    quickPhrasesTitle: 'Quick Phrases',
    quickPhrases: [
      'What is the CSE cutoff for GVPCE?',
      'How does JVD fee reimbursement work?',
      'Are girls campus hostels safe?',
      'Can I prepare for coding from ECE branch?',
    ],

    // Family Room
    roomTitle: 'Family Decision Room',
    roomSubtitle: 'Live Mediation: Student + Parent + AI Mediator',
    participantStudent: 'Student',
    participantParent: 'Parent',
    participantAi: 'AI Mediator',
    seedStudentText: 'I want to study CSE in the city for better hackathons.',
    seedParentText: 'Not too far, fees must be affordable and campus must be safe.',
    seedParentTeOriginal: 'చాలా దూరం వద్దు, ఫీజులు అందుబాటులో ఉండాలి.',
    seedAiCompromise: 'Compromise Suggestion: Look at Tier-2 autonomous colleges within 100km. If applicable State Fee Reimbursement is available, the student may be able to study CSE while keeping the total cost within the family’s ₹3 lakh budget.',
    micSpeakLabel: 'Speak in English (Microphone)',
    micListeningLabel: 'Listening in English (en-IN)... Speak now',
    micStopLabel: 'Stop Recording',
    micRequestingPermission: 'Requesting microphone permission...',
    micReadyLabel: 'Microphone ready. Click to speak in English.',
    micUnsupported: 'Speech recognition is not supported in this browser. You can type directly in the input bar.',
    micPermissionError: 'Microphone permission denied. Please allow microphone access in browser settings (HTTPS or localhost required).',
    micSpeechDetected: 'Speech recognized and inserted into draft. Review before sending!',
    micNoSpeech: 'No speech was detected. Please try speaking again.',
    micNetworkError: 'Network or device error during speech recognition. Please type your message.',
    micStoppedLabel: 'Microphone stopped.',
    roomInputPlaceholderStudent: 'Type student view (e.g. "College has 95% placement...")',
    roomInputPlaceholderParent: 'Type parent view (e.g. "Hostel security must be verified...")',
    voiceNoteAria: 'Voice note audio sample',
    roomNoteDemo: 'Note: Web Speech recognition transcribes live audio in your chosen language directly into the draft message bar for easy review.',

    // Career Roadmap
    roadmapTitle: 'Engineering Career Roadmap',
    roadmapHeading: '4-Year High-Placement Blueprint',
    roadmapDesc: 'Follow these verified milestones from Year 1 to unlock ₹8LPA+ off-campus and on-campus tech placements.',
    y1Title: 'Year 1: Foundations & C++',
    y1Sem: 'Semester 1-2',
    y1Desc: 'Master programming basics, C++ STL, problem solving, mathematics, and basic projects.',
    y1Tasks: [
      'Master C / C++ syntax & pointer memory concepts',
      'Set up GitHub profile & push 3 practice projects',
      'Solve first 50 LeetCode Easy & maintain 8.5+ CGPA',
    ],
    y2Title: 'Year 2: Core Subjects',
    y2Sem: 'Semester 3-4',
    y2Desc: 'Data structures & algorithms, databases (SQL), operating systems, and first college hackathon.',
    y2Tasks: [
      'Solve 150 LeetCode / GFG DSA questions (Trees, Graphs, DP)',
      'Build a full-stack web application (React + Node.js)',
      'Participate in Smart India Hackathon (SIH) or college codefest',
    ],
    y3Title: 'Year 3: Internships & AI Certifications',
    y3Sem: 'Semester 5-6',
    y3Desc: 'Practical projects, internship preparation, AI/ML fundamentals, certifications, and teamwork.',
    y3Tasks: [
      'Secure a 2-month summer tech internship or research project',
      'Complete Cloud Practitioner or GenAI Certification',
      'Practice mock technical interviews and core system design',
    ],
    y4Title: 'Year 4: Placements',
    y4Sem: 'Semester 7-8',
    y4Desc: 'Placement preparation, aptitude, DSA revision, technical interviews, resume refinement, and job applications.',
    y4Tasks: [
      'Crack Tier-1 Product & Super Dream companies (₹10LPA+)',
      'Secure Day-1 IT Services offer as safety backup',
      'Complete final year capstone project with industry mentor',
    ],

    // Budget Planner
    budgetToolTitle: 'Parent Financial Dashboard',
    budgetToolHeading: '4-Year "What-If" Expense Simulator',
    budgetToolDesc: 'Slide your budget to test real tuition, hostel fees, and see how JVD Govt Reimbursement protects your family savings.',
    adjustBudgetLabel: 'Adjust Planned 4-Year Budget',
    estTuitionLabel: '4-Year Estimated Govt Cap Tuition:',
    estHostelLabel: 'Estimated Hostel & Accommodation (4 Years):',
    estFoodTransportLabel: 'Estimated Food, Mess & Transport:',
    estBooksExamLabel: 'Books, Examination & Laptop Setup:',
    grossCostLabel: 'Estimated Gross Total Expenditure:',
    jvdReimbursementLabel: 'Govt JVD Reimbursement (if eligible):',
    netOutOfPocketLabel: 'Net Family Out-of-Pocket Expense:',
    budgetRemainingLabel: 'Budget Surplus (Savings):',
    budgetDeficitLabel: 'Budget Shortfall (Assistance Needed):',
    statusSafe: 'Safe & Manageable',
    statusStrained: 'Financially Strained',
    budgetSummarySafe: 'With State JVD tuition support, your planned budget is sufficient to cover campus hostel and living expenses without high-interest loans.',
    budgetSummaryStrained: 'Your selected budget is tight for hostel fees. Consider autonomous colleges closer to home as a Day Scholar or apply for Vasathi Deevena food assistance.',
    budgetDisclaimer: 'Note: All numbers are illustrative planning estimates based on AP fee regulatory norms. Actual fees vary per institution.',

    // Family Sync
    syncTitle: 'Google Families-style Link',
    syncHeading: 'Family Group Sync Engine',
    syncDesc: 'Connect family members to share real-time cutoff alerts, agreed budgets, and counseling option forms with zero dispute.',
    studentSyncSectionTitle: 'Invite Parents & Guardians',
    studentSyncInput1Label: 'Family Member 1 (Primary) — Parent Email',
    studentSyncInput1Placeholder: 'Enter parent email (e.g. appa@gmail.com)',
    studentSyncInput2Label: 'Family Member 2 (Optional) — Guardian Email',
    studentSyncInput2Placeholder: 'Enter guardian email (e.g. uncle@gmail.com)',
    parentSyncSectionTitle: 'Parental Supervision & Sync',
    parentSyncInput1Label: 'Link Child Account — Student Email',
    parentSyncInput1Placeholder: 'Enter student email (e.g. rahul@gmail.com)',
    parentSyncInput2Label: 'Add Co-Parent / Guardian — Partner Email',
    parentSyncInput2Placeholder: 'Enter partner email (e.g. mother@gmail.com)',
    inviteBtn: 'Invite',
    linkBtn: 'Link',
    activeMembersTitle: 'Active Family Members (Demo Sync)',
    memberStudentLabel: 'You (Student)',
    memberStudentDesc: 'Admin · College dreamlist control',
    memberParentLabel: 'Father (V. Apparao)',
    memberParentDesc: 'Supervisory role · Can view & review fees',
    connectedBadge: 'Connected',
    copyShareLinkBtn: 'Copy WhatsApp Family Join Link',
    parentControlsTitle: 'Parental Safeguards',
    budgetCeilingLabel: 'Budget Ceiling Lock',
    budgetCeilingDesc: 'Alerts if shortlisted college exceeds your budget limit',
    jvdCheckerLabel: 'JVD Eligibility Checker',
    jvdCheckerDesc: 'Auto-validates white ration card guidelines',
    demoInviteToast: 'Demo: Invitation prepared for {email}; no real email was sent.',
    demoLinkToast: 'Demo: Child link request prepared for {email}; no real email was sent.',
    emailInvalidToast: 'Please enter a valid email address.',
    linkCopiedToast: 'Family WhatsApp join link copied to clipboard!',
  },

  te: {
    appName: 'శిక్షా సేతు AI',
    tagline: 'విద్యార్థి లక్ష్యాలు - కుటుంబ భద్రతకు వారధి',
    subBranding: 'కుటుంబ నిర్ణయ మద్దతు వేదిక',
    demoNotice: 'నమూనా ప్రదర్శన · ఇంజనీరింగ్ విద్యా ప్రణాళిక',
    studentMode: 'విద్యార్థి విధానం',
    parentMode: 'తల్లిదండ్రుల విధానం',
    roleSwitcherAria: 'వినియోగదారు విధానాన్ని ఎంచుకోండి',
    langSelectorAria: 'భాషను ఎంచుకోండి',

    loginTitle: 'శిక్షాసేతు AI కి స్వాగతం',
    loginSubtitle: 'ఇంజనీరింగ్ విద్యలో కుటుంబ నిర్ణయాలకు తోడ్పడే AI వేదిక',
    loginStudentBtn: 'విద్యార్థిగా లాగిన్ అవ్వండి',
    loginParentBtn: 'తల్లిదండ్రులుగా లాగిన్ అవ్వండి',
    loginStudentDesc: 'బ్రాంచ్‌ల ఎంపిక, 4 ఏళ్ల కెరీర్ రోడ్‌మ్యాప్ & కళాశాలల వివరాలు',
    loginParentDesc: '4 ఏళ్ల ఖర్చులు, JVD స్కాలర్‌షిప్, హాస్టల్ భద్రత & బడ్జెట్ ప్రణాళిక',
    logoutBtn: 'లాగౌట్',
    studentBadge: 'విద్యార్థి',
    parentBadge: 'తల్లిదండ్రులు',
    welcomeBack: 'కొనసాగడానికి మీ ప్రవేశాన్ని ఎంచుకోండి',

    goBack: 'వెనుకకు వెళ్లండి',
    selectRolePrompt: 'కొనసాగడానికి మీ పాత్రను ఎంచుకోండి',
    loginAsTitle: '{role} గా సైన్ ఇన్ చేయండి',
    emailLabel: 'ఈమెయిల్ చిరునామా',
    passwordLabel: 'పాస్‌వర్డ్',
    signInBtn: 'సైన్ ఇన్',
    forgotPasswordLink: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    forgotPasswordTitle: 'పాస్‌వర్డ్‌ను రీసెట్ చేయండి',
    forgotPasswordDesc: 'పాస్‌వర్డ్ రికవరీ సూచనలను అందుకోవడానికి మీ నమోదిత ఈమెయిల్ చిరునామాను నమోదు చేయండి.',
    resendPasswordBtn: 'పాస్‌వర్డ్‌ను మళ్లీ పంపండి',
    backToLogin: 'లాగిన్‌కి తిరిగి వెళ్లండి',
    resetSentToast: '{email} కు పాస్‌వర్డ్ రీసెట్ లింక్ పంపబడింది',

    studentLandingHeadline: 'Find the campus that matches your vibe. Drop your stats below.',
    parentLandingHeadline: 'ఖర్చులు, స్కాలర్‌షిప్‌లు మరియు హాస్టల్ భద్రతపై పూర్తి స్పష్టతతో మీ పిల్లల ఇంజనీరింగ్ ప్రణాళికను సిద్ధం చేసుకోండి.',
    fillFormBtn: 'ఫారమ్ పూరించండి',
    viewScholarshipsBtn: 'స్కాలర్‌షిప్‌లను చూడండి',
    scholarshipsModalTitle: 'రాష్ట్ర & కేంద్ర ప్రభుత్వ ఇంజనీరింగ్ స్కాలర్‌షిప్‌లు',
    scholarshipsModalSubtitle: 'ధ్రువీకరించిన ఫీజు రీయింబర్స్‌మెంట్ నియమాలు, అర్హతలు మరియు దరఖాస్తు విధానం.',
    closeModal: 'మూసివేయి',

    tabs: {
      dashboard: 'డాష్‌బోర్డ్',
      bot: 'AI కౌన్సిలర్',
      room: 'కుటుంబ గది',
      roadmap: 'రోడ్‌మ్యాప్',
      budget: 'బడ్జెట్',
      sync: 'ఫ్యామిలీ సింక్',
    },

    studentProfileBannerTitle: 'విద్యార్థి ఆశయాల ప్రొఫైల్',
    studentProfileBannerDesc: 'మీ ఇష్టమైన బ్రాంచ్ ఎంపికలు మరియు 4 సంవత్సరాల కెరీర్ మైలురాళ్లను నమోదు చేయండి.',
    parentProfileBannerTitle: 'కుటుంబ ఆర్థిక & భద్రతా ప్రొఫైల్',
    parentProfileBannerDesc: 'కుటుంబ ఖర్చు పరిమితులు, హాస్టల్ భద్రత మరియు దూర పరిమితులను నిర్ధారించండి.',
    analyzeBtn: 'AI ద్వారా విశ్లేషించండి',
    analyzing: 'కుటుంబ బడ్జెట్ మరియు కోరికలను విశ్లేషిస్తున్నాము...',
    syncRequiredWarning: 'Sync Required: Please link your parent/student account in the Family Sync section before analyzing.',
    waitingForPartnerPending: 'Waiting for Data: Your preferences are saved, but we are waiting for your linked family member to complete their form.',
    sendReminderBtn: 'Send Reminder',
    reminderSentBtn: 'Reminder Sent!',
    forceSyncDemo: 'Force Sync (Demo)',
    forceSyncActive: '✓ Partner Form Synced (Demo Active)',
    editInputs: 'ఎంపికలను మార్చండి',
    analysisComplete: 'AI విశ్లేషణ పూర్తయింది (నమూనా)',
    demoEstimateNotice: 'మీరు ఎంచుకున్న వివరాల ఆధారంగా రూపొందించిన నమూనా అంచనా',
    familyAlignmentTitle: 'కుటుంబ ఏకాభిప్రాయ స్కోర్',
    highHarmony: 'ఉత్తమ అనుకూలత',
    moderateHarmony: 'సమతుల్య అనుకూలత',
    metricBranchFit: 'బ్రాంచ్ సరిపోలిక',
    metricBudgetRisk: 'బడ్జెట్ భద్రత',
    metricSafetyDist: 'దూర పరిమితి',
    riskLowJvd: 'సురక్షితం (JVD వర్తింపు)',
    scholarshipAlertTitle: 'ప్రభుత్వ స్కాలర్‌షిప్ సమాచారం',
    scholarshipNoticeTitle: 'ఆంధ్రప్రదేశ్ రాష్ట్ర ఫీజు రీయింబర్స్‌మెంట్ గైడ్',
    scholarshipBadge: 'జగనన్న విద్యా దీవెన (JVD) కి అర్హత అవకాశం - 100% ట్యూషన్ ఫీజు మినహాయింపు',
    scholarshipDisclaim: 'గమనిక: JVD పూర్తి ఫీజు వర్తింపుకు తెల్ల రేషన్ కార్డు / ఆదాయ ధ్రువీకరణ పత్రం (<₹2.5 లక్షలు) అవసరం. ప్రభుత్వం అధికారికంగా ధ్రువీకరించాల్సి ఉంటుంది.',
    topMatchesTitle: 'ఉత్తమ సరిపోలిన ఇంజనీరింగ్ కళాశాలలు (నమూనా)',
    filteredRegionTag: 'ఆంధ్రప్రదేశ్ / తెలంగాణ ప్రాంతానికి ఫిల్టర్ చేయబడింది',
    safetyScoreLabel: 'క్యాంపస్ భద్రతా రేటింగ్',
    discussInRoomBtn: 'కుటుంబ గదిలో చర్చించండి',
    familyRoomCtaTitle: 'అనుమానాలను కలిసి పరిష్కరించుకోండి',
    familyRoomCtaDesc: 'AI మధ్యవర్తిత్వంతో 3-వైపుల కుటుంబ గ్రూప్ చాట్ తెరవండి',
    openRoomBtn: 'గదిని తెరవండి',
    disclaimerFootnote: 'గమనిక: కటాఫ్ ర్యాంకులు, ఫీజులు మరియు ప్లేస్‌మెంట్ వివరాలు కౌన్సిలింగ్ అవగాహన కోసం అందించిన నమూనా అంచనాలు మాత్రమే.',

    // Student Questions & Options in Telugu
    sq1Label: 'ఆశించిన EAPCET/JEE ర్యాంక్',
    sq1Options: {
      'Top 1-15k': 'టాప్ 1-15 వేలు (టాప్ మెరిట్ సీట్లు)',
      'Mid 15k-50k': 'మధ్యస్థం 15k-50 వేలు (ప్రముఖ ఆటోనమస్ కళాశాలలు)',
      'Safe 50k-1L': 'సేఫ్ 50k-1 లక్ష (జిల్లా కళాశాలలు)',
      'Not Qualified': 'క్వాలిఫై కాలేదు / మేనేజ్‌మెంట్ కోటా',
    },
    sq2Label: 'ప్రవేశ మార్గం (అడ్మిషన్ రూట్)',
    sq2Options: {
      'Merit+JVD Scholarship': 'మెరిట్ + JVD స్కాలర్‌షిప్ (100% ట్యూషన్ ఫీజు ఉచితం)',
      'Merit Self-funded': 'మెరిట్ స్వీయ నిధులు (ప్రభుత్వ ఫీజు)',
      'Mgmt Quota': 'మేనేజ్‌మెంట్ కోటా (క్యాట్-బి ఫీజు)',
    },
    sq3Label: 'మీ మొదటి ప్రాధాన్యత బ్రాంచ్',
    sq3Options: {
      'Software CSE/IT': 'సాఫ్ట్‌వేర్ CSE / IT బ్రాంచ్',
      'Future Tech AI/DS': 'ఫ్యూచర్ టెక్నాలజీస్: AI, డేటా సైన్స్, సైబర్',
      'Electronics ECE/EEE': 'ఎలక్ట్రానిక్స్ ECE / EEE (కోర్ & IT రెండూ)',
      'Core Mech/Civil': 'కోర్ మెకానికల్ / సివిల్ ఇంజనీరింగ్',
    },
    sq4Label: 'ఈ బ్రాంచ్ ఎందుకు ఎంచుకుంటున్నారు?',
    sq4Options: {
      'Genuine passion': 'కంప్యూటర్లు & కోడింగ్ అంటే నిజమైన ఆసక్తి',
      'High salary jobs': 'సాఫ్ట్‌వేర్‌లో అధిక వేతన ఉద్యోగాలు వస్తాయి',
      'Family/Friends advised': 'కుటుంబం, స్నేహితులు మరియు సీనియర్లు సలహా ఇచ్చారు',
      'Just want any IT job': 'ఏదైనా సురక్షితమైన IT ఉద్యోగం వస్తే చాలు',
    },
    sq5Label: 'నివాస ప్రాధాన్యత',
    sq5Options: {
      'Hosteler': 'కాలేజ్ హాస్టలర్ (క్యాంపస్ హాస్టల్ బస)',
      'Day Scholar': 'డే స్కాలర్ (ఇంటి నుంచే రోజూ రాకపోకలు)',
      'Private PG': 'ప్రైవేట్ PG లేదా స్నేహితులతో గది అద్దెకు',
    },
    sq6Label: 'కళాశాల ఎంపికలో అత్యంత ముఖ్యమైనది ఏది?',
    sq6Options: {
      'Good placements/salary': 'మంచి ప్లేస్‌మెంట్లు & అధిక జీతాలు',
      'Discipline/safety': 'క్రమశిక్షణ & క్యాంపస్ భద్రత',
      'College reputation': 'కళాశాల పేరు & పూర్వ విద్యార్థుల నెట్‌వర్క్',
      'Affordable fees': 'తక్కువ ఫీజులు & అందుబాటులో ఉండే ఖర్చు',
      'Location nearby': 'సొంత ఊరికి సమీపంలో ఉండటం',
    },
    sq7Label: '4 ఏళ్ల తర్వాత మీ లక్ష్యం',
    sq7Options: {
      'High-paying Tech Job': 'అధిక వేతనంతో కూడిన టెక్ ఉద్యోగం (₹8+ LPA)',
      'MS/M.Tech Abroad': 'విదేశాలలో MS / భారతదేశంలో M.Tech (IIT)',
      'Startup': 'సొంత టెక్ స్టార్టప్ ప్రారంభించడం',
      'Govt/Core Job': 'ప్రభుత్వ ఉద్యోగం (GATE/ISRO) లేదా కోర్ PSU',
    },
    sq8Label: 'మీ బ్యాకప్ ప్లాన్ (ప్రత్యామ్నాయం)',
    sq8Options: {
      'Lower college + Dream branch': 'మధ్యస్థ కళాశాల అయినా ఇష్టమైన బ్రాంచ్ (CSE/AI)',
      'Top college + Any branch': 'టాప్ కళాశాల అయితే ఏదైనా బ్రాంచ్ (ECE/Mech)',
      'Drop a year': 'లాంగ్ టర్మ్ కోచింగ్ కోసం ఒక సంవత్సరం డ్రాప్',
    },

    // Parent Questions & Options in Telugu
    pq1Label: 'విద్యార్థి కోసం మీ ప్రాధాన్యత బ్రాంచ్',
    pq1Options: {
      'Software CSE/IT': 'సాఫ్ట్‌వేర్ CSE / IT (ఉద్యోగ భద్రత)',
      'Future Tech AI/DS': 'ఫ్యూచర్ టెక్నాలజీస్ AI/DS (నూతన రంగం)',
      'Electronics ECE/EEE': 'ఎలక్ట్రానిక్స్ ECE/EEE (ప్రభుత్వ & IT రెండూ)',
      'Core Mech/Civil': 'కోర్ మెకానికల్ / సివిల్ (శాశ్వత స్థిరత్వం)',
    },
    pq2Label: 'విద్యార్థి ఆసక్తికి మీరు ఎంత ప్రాధాన్యత ఇస్తారు?',
    pq2Options: {
      'Balance family + student': 'కుటుంబ పరిస్థితులు + పిల్లల ఆసక్తి రెండింటి సమతుల్యత',
      'Very important': 'చాలా ముఖ్యం (పిల్లలు సంతోషంగా చదవాలి)',
      'Important but need jobs': 'ముఖ్యమే, కానీ ఉద్యోగం రావడం తప్పనిసరి',
      'Career stability first': 'కెరీర్ స్థిరత్వం మరియు కుటుంబ భద్రతే ముఖ్యం',
    },
    pq3Label: '4 సంవత్సరాలకు గరిష్ట బడ్జెట్',
    pq4Label: 'ప్రధాన ఫండింగ్ వనరు',
    pq4Options: {
      'Govt Fee Reimbursement JVD': 'ప్రభుత్వ ఫీజు రీయింబర్స్‌మెంట్ JVD (వైట్ కార్డు)',
      'Bank Loan': 'బ్యాంక్ విద్యా రుణం',
      'Family Savings': 'కుటుంబ పొదుపు / వ్యవసాయ ఆదాయం',
      'Partial Scholarships': 'ప్రైవేట్ లేదా మెరిట్ స్కాలర్‌షిప్‌లు',
    },
    pq5Label: 'ఇంటి నుండి దూర పరిమితి',
    pq5Options: {
      'Nearby under 150km': 'సమీపంలో 150 కి.మీ లోపు (3 గంటల ప్రయాణం)',
      'Local under 30km': 'లోకల్ 30 కి.మీ లోపు (రోజూ ఇంటికి రావాలి)',
      'Anywhere in AP': 'ఆంధ్రప్రదేశ్‌లో ఎక్కడైనా పర్వాలేదు',
      'Anywhere in India': 'భారతదేశంలో ఎక్కడైనా (టాప్ ఇన్‌స్టిట్యూట్ అయితే)',
    },
    pq6Label: 'నివాస నియమం',
    pq6Options: {
      'Strict College Hostel': 'వార్డెన్ పర్యవేక్షణ గల కఠినమైన కాలేజ్ హాస్టల్',
      'Day Scholar': 'ఇంటి నుంచే డే స్కాలర్‌గా వెళ్లాలి',
      'Relatives': 'నమ్మకమైన బంధువుల ఇంట్లో ఉండి చదవాలి',
      'Private PG': 'పూర్తి భద్రత ఉంటేనే ప్రైవేట్ PG',
    },
    pq7Label: 'కళాశాల ఎంపికలో మీకు అత్యంత ముఖ్యమైనది',
    pq7Options: {
      'Good placements/salary': 'మంచి ప్లేస్‌మెంట్లు & హామీతో కూడిన ఉద్యోగాలు',
      'Discipline/safety': 'క్రమశిక్షణ, ర్యాగింగ్ లేని సురక్షిత వాతావరణం',
      'Affordable fees': 'అందుబాటులో ఉండే ఖర్చు & దాగివున్న ఫీజులు ఉండకూడదు',
      'College reputation': 'సమాజంలో మంచి పేరున్న కళాశాల',
      'Location nearby': 'సొంత ఊరికి సమీపంలో ఉండటం',
    },
    pq8Label: 'మీ ప్రధాన ఆందోళన / భయం',
    pq8Options: {
      'Hidden Fees/Debt': 'అదనపు ఫీజుల భారం & అప్పుల పాలు కావడం',
      'Lack of Safety/Discipline': 'భద్రత లోపించడం, ర్యాగింగ్ లేదా చెడు సావాసాలు',
      'Unemployment': 'లక్షలు ఖర్చు చేశాక ఉద్యోగం రాకపోవడం',
      'Academic Pressure': 'పిల్లలపై మితిమీరిన చదువుల ఒత్తిడి',
    },
    pq9Label: 'కాలేజ్ విజయం అంటే మీ దృష్టిలో ఏమిటి?',
    pq9Options: {
      'Getting a job immediately': 'గ్రాడ్యుయేషన్ పూర్తి కాగానే మంచి ఉద్యోగం రావడం',
      'Strict/Safe Environment': 'మంచి సంస్కృతి, భద్రత గల వాతావరణంలో చదవడం',
      'Gateway to Higher Studies': 'పైచదువులకు బలమైన పునాది ఏర్పడటం',
      'Low Financial Strain': 'కుటుంబంపై అప్పుల భారం లేకుండా పట్టా అందుకోవడం',
    },

    // AI Counselor in Telugu
    botTitle: '1-ఆన్-1 ప్రైవేట్ కౌన్సిలర్',
    botSubtitle: 'EAPCET కౌన్సిలింగ్, JVD నియమాలు & కెరీర్ మార్గాలపై శిక్షణ పొందినది',
    botWelcome: 'నమస్కారం! నేను మీ శిక్షా సేతు విద్యా సలహాదారుడిని. EAPCET కౌన్సిలింగ్, CSE వర్సెస్ ECE, JVD ఫీజు రీయింబర్స్‌మెంట్ లేదా హాస్టల్ భద్రత గురించి నన్ను ఏదైనా అడగండి.',
    botInputPlaceholderStudent: 'కటాఫ్, సిలబస్, ఇంటర్న్‌షిప్‌లు, CSE vs ECE గురించి అడగండి...',
    botInputPlaceholderParent: 'హాస్టల్ ఫీజులు, భద్రత, JVD రీయింబర్స్‌మెంట్ గురించి అడగండి...',
    botSendAria: 'AI కౌన్సిలర్‌కు ప్రశ్న పంపండి',
    botPromptChips: [
      'CSE వర్సెస్ ECE గురించి చెప్పండి',
      'విద్యా రుణాలు సురక్షితమేనా?',
      'కళాశాల ఖర్చులను ఎలా తగ్గించవచ్చు?',
      'నాకు సరిపోయే కెరీర్ మార్గం ఏది?',
    ],
    botTyping: 'AI కౌన్సిలర్ సమాధానం సిద్ధం చేస్తున్నారు...',
    keyboardTip: 'మీ ఫోన్ లేదా కంప్యూటర్ కీబోర్డ్ ద్వారా తెలుగు లేదా ఇంగ్లీషులో టైప్ చేయవచ్చు.',
    quickPhrasesTitle: 'త్వరిత ప్రశ్నలు',
    quickPhrases: [
      'GVPCE కాలేజ్ CSE కటాఫ్ ఎంత?',
      'JVD ఫీజు రీయింబర్స్‌మెంట్ ఎలా వర్తిస్తుంది?',
      'గర్ల్స్ క్యాంపస్ హాస్టల్స్ సురక్షితమేనా?',
      'ECE బ్రాంచ్ నుండి కోడింగ్ నేర్చుకోవచ్చా?',
    ],

    // Family Room in Telugu
    roomTitle: 'కుటుంబ చర్చా గది',
    roomSubtitle: 'లైవ్ మధ్యవర్తిత్వం: విద్యార్థి + తల్లిదండ్రులు + AI మధ్యవర్తి',
    participantStudent: 'విద్యార్థి',
    participantParent: 'తల్లిదండ్రులు',
    participantAi: 'AI మధ్యవర్తి',
    seedStudentText: 'మంచి హ్యాకథాన్‌లు, కోడింగ్ కోసం నేను నగరంలో CSE చదవాలనుకుంటున్నాను.',
    seedParentText: 'చాలా దూరం వద్దు, ఫీజులు అందుబాటులో ఉండాలి, భద్రత ముఖ్యం.',
    seedParentTeOriginal: 'చాలా దూరం వద్దు, ఫీజులు అందుబాటులో ఉండాలి.',
    seedAiCompromise: 'రాజీ సలహా: 100 కి.మీ పరిధిలోని టైర్-2 ఆటోనమస్ కళాశాలలను పరిశీలించండి. రాష్ట్ర ఫీజు రీయింబర్స్‌మెంట్ (JVD) వినియోగిస్తే, విద్యార్థికి CSE బ్రాంచ్ లభిస్తుంది మరియు మీ ₹3 లక్షల బడ్జెట్ పరిమితిలోనే మొత్తం ఖర్చు పూర్తవుతుంది.',
    micSpeakLabel: 'తెలుగులో మాట్లాడండి (మైక్రోఫోన్)',
    micListeningLabel: 'తెలుగులో వింటున్నాము (te-IN)... మాట్లాడండి',
    micStopLabel: 'రికార్డింగ్ ఆపండి',
    micRequestingPermission: 'మైక్రోఫోన్ అనుమతి కోరుతున్నాము...',
    micReadyLabel: 'మైక్రోఫోన్ సిద్ధంగా ఉంది. తెలుగులో మాట్లాడటానికి నొక్కండి.',
    micUnsupported: 'ఈ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ సదుపాయం అందుబాటులో లేదు. దయచేసి టైప్ చేయండి.',
    micPermissionError: 'మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతి ఇవ్వండి (HTTPS లేదా localhost అవసరం).',
    micSpeechDetected: 'మీ మాటలు రికార్డ్ అయ్యాయి! పంపే ముందు సరిచూసుకోండి.',
    micNoSpeech: 'ఎటువంటి మాటలు గుర్తించబడలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.',
    micNetworkError: 'స్పీచ్ రికగ్నిషన్ సమయంలో నెట్‌వర్క్ లేదా మైక్ సమస్య ఏర్పడింది. దయచేసి టైప్ చేయండి.',
    micStoppedLabel: 'మైక్రోఫోన్ నిలిపివేయబడింది.',
    roomInputPlaceholderStudent: 'విద్యార్థి సందేశం (ఉదా: "కాలేజీలో 90% ప్లేస్‌మెంట్లు ఉన్నాయి...")',
    roomInputPlaceholderParent: 'తల్లిదండ్రుల సందేశం (ఉదా: "హాస్టల్ భద్రత ఖచ్చితంగా ఉండాలి...")',
    voiceNoteAria: 'వాయిస్ నోట్ ఆడియో నమూనా',
    roomNoteDemo: 'గమనిక: వెబ్ స్పీచ్ రికగ్నిషన్ ద్వారా మీ మాటలు నేరుగా మెసేజ్ బాక్స్‌లో టైప్ అవుతాయి, మీరు సరిచూసి పంపవచ్చు.',

    // Career Roadmap in Telugu
    roadmapTitle: 'ఇంజనీరింగ్ కెరీర్ రోడ్‌మ్యాప్',
    roadmapHeading: '4 సంవత్సరాల హై-ప్లేస్‌మెంట్ బ్లూప్రింట్',
    roadmapDesc: 'మొదటి సంవత్సరం నుంచే ఈ మైలురాళ్లను అనుసరించి ₹8 లక్షల కంటే ఎక్కువ వార్షిక ప్యాకేజీ టెక్ ఉద్యోగాలను సాధించండి.',
    y1Title: 'సంవత్సరం 1: బేసిక్స్ & C++',
    y1Sem: 'సెమిస్టర్ 1-2',
    y1Desc: 'ప్రోగ్రామింగ్ ప్రాథమిక అంశాలు, C++ STL, మ్యాథమెటిక్స్ మరియు చిన్న ప్రాజెక్టులు నేర్చుకోండి.',
    y1Tasks: [
      'C / C++ సింటాక్స్ & మెమరీ కాన్సెప్టులను క్షుణ్ణంగా నేర్చుకోండి',
      'GitHub ప్రొఫైల్ ఏర్పాటు చేసుకుని 3 ప్రాజెక్టులు అప్‌లోడ్ చేయండి',
      'LeetCode లో మొదటి 50 ఈజీ సమస్యలు సాధించండి & 8.5+ CGPA సాధించండి',
    ],
    y2Title: 'సంవత్సరం 2: కోర్ సబ్జెక్టులు & హ్యాకథాన్‌లు',
    y2Sem: 'సెమిస్టర్ 3-4',
    y2Desc: 'డేటా స్ట్రక్చర్స్ & అల్గారిథమ్స్, డేటాబేస్ (SQL), ఆపరేటింగ్ సిస్టమ్స్ మరియు మొదటి హ్యాకథాన్.',
    y2Tasks: [
      '150 DSA ప్రశ్నలు సాధించండి (ట్రీస్, గ్రాఫ్స్, డైనమిక్ ప్రోగ్రామింగ్)',
      'పూర్తి ఫుల్-స్టాక్ వెబ్ ప్రాజెక్ట్ తయారు చేయండి (React + Node.js)',
      'స్మార్ట్ ఇండియా హ్యాకథాన్ (SIH) లేదా కళాశాల పోటీలలో పాల్గొనండి',
    ],
    y3Title: 'సంవత్సరం 3: ఇంటర్న్‌షిప్‌లు & AI సర్టిఫికేషన్లు',
    y3Sem: 'సెమిస్టర్ 5-6',
    y3Desc: 'ప్రాక్టికల్ ప్రాజెక్టులు, సమ్మర్ ఇంటర్న్‌షిప్, AI/ML ప్రాథమిక అంశాలు మరియు టీమ్‌వర్క్ నైపుణ్యాలు.',
    y3Tasks: [
      '2 నెలల పెయిడ్ సమ్మర్ టెక్ ఇంటర్న్‌షిప్ సాధించండి',
      'క్లౌడ్ లేదా జనరేటివ్ AI సర్టిఫికేషన్ పూర్తి చేయండి',
      'మాక్ టెక్నికల్ ఇంటర్వ్యూలు మరియు సిస్టమ్ డిజైన్ ప్రాక్టీస్ చేయండి',
    ],
    y4Title: 'సంవత్సరం 4: ప్లేస్‌మెంట్లు & ఫైనల్ ఆఫర్లు',
    y4Sem: 'సెమిస్టర్ 7-8',
    y4Desc: 'ప్లేస్‌మెంట్ ప్రిపరేషన్, ఆప్టిట్యూడ్, టెక్నికల్ ఇంటర్వ్యూలు మరియు రెజ్యూమ్ మెరుగుపరచడం.',
    y4Tasks: [
      'టాప్ ప్రోడక్ట్ కంపెనీలలో ₹10LPA+ సూపర్‌డ్రీమ్ ఆఫర్ సాధించండి',
      'భద్రత కోసం డే-1 సర్వీస్ కంపెనీ ఆఫర్ సురక్షితం చేసుకోండి',
      'పరిశ్రమ మార్గదర్శకుడితో ఫైనల్ ఇయర్ క్యాప్‌స్టోన్ ప్రాజెక్ట్ పూర్తి చేయండి',
    ],

    // Budget Planner in Telugu
    budgetToolTitle: 'తల్లిదండ్రుల ఆర్థిక డ్యాష్‌బోర్డ్',
    budgetToolHeading: '4 సంవత్సరాల ఖర్చుల అనుకరణ (What-If)',
    budgetToolDesc: 'బడ్జెట్ స్లైడర్‌ను సర్దుబాటు చేసి కాలేజీ ఫీజులు, హాస్టల్ ఖర్చులు మరియు JVD సహాయం ఎలా రక్షణ కల్పిస్తుందో చూడండి.',
    adjustBudgetLabel: 'మీ ప్రణాళికా బడ్జెట్‌ను మార్చండి',
    estTuitionLabel: '4 ఏళ్ల అంచనా ట్యూషన్ ఫీజు:',
    estHostelLabel: '4 ఏళ్ల హాస్టల్ & బస ఖర్చులు:',
    estFoodTransportLabel: 'భోజనం, మెస్ & ప్రయాణ ఖర్చులు:',
    estBooksExamLabel: 'పుస్తకాలు, పరీక్ష ఫీజులు & ల్యాప్‌టాప్:',
    grossCostLabel: 'మొత్తం స్థూల వ్యయం:',
    jvdReimbursementLabel: 'ప్రభుత్వ JVD ఫీజు మినహాయింపు:',
    netOutOfPocketLabel: 'కుటుంబం చెల్లించాల్సిన నికర ఖర్చు:',
    budgetRemainingLabel: 'మిగిలే పొదుపు మొత్తం:',
    budgetDeficitLabel: 'అదనంగా అవసరమయ్యే సహాయం:',
    statusSafe: 'పూర్తి సురక్షితం & అందుబాటులో ఉంది',
    statusStrained: 'ఆర్థికంగా కొద్దిగా భారమైనది',
    budgetSummarySafe: 'రాష్ట్ర ప్రభుత్వ JVD పూర్తి ట్యూషన్ మినహాయింపుతో మీ బడ్జెట్ హాస్టల్ ఖర్చులకు సరిపోతుంది. అప్పులు చేయాల్సిన అవసరం లేదు.',
    budgetSummaryStrained: 'హాస్టల్ ఖర్చులకు మీ బడ్జెట్ కొద్దిగా తక్కువగా ఉంది. ఇంటికి దగ్గరగా ఉండి డే స్కాలర్‌గా చదవడం లేదా వసతి దీవెన సహాయం పొందడం ఉత్తమం.',
    budgetDisclaimer: 'గమనిక: ఈ లెక్కలన్నీ ఆంధ్రప్రదేశ్ ఫీజు నిబంధనల ఆధారంగా రూపొందించిన నమూనా అంచనాలు. ఖచ్చితమైన ఫీజుల కోసం కళాశాలలను సంప్రదించండి.',

    // Family Sync in Telugu
    syncTitle: 'Google ఫ్యామిలీస్ తరహా లింక్',
    syncHeading: 'కుటుంబ గ్రూప్ సింక్ ఇంజిన్',
    syncDesc: 'కౌన్సిలింగ్ వెబ్ ఆప్షన్లు, బడ్జెట్ అంచనాలు మరియు కటాఫ్ వివరాలను కుటుంబమంతా కలిసి ఎటువంటి వివాదాలు లేకుండా పంచుకోండి.',
    studentSyncSectionTitle: 'తల్లిదండ్రులు & సంరక్షకులను ఆహ్వానించండి',
    studentSyncInput1Label: 'కుటుంబ సభ్యుడు 1 (ప్రధాన) — తల్లిదండ్రుల ఈమెయిల్',
    studentSyncInput1Placeholder: 'తండ్రి/తల్లి ఈమెయిల్ నమోదు చేయండి (e.g. appa@gmail.com)',
    studentSyncInput2Label: 'కుటుంబ సభ్యుడు 2 (ఐచ్ఛికం) — సంరక్షకుడి ఈమెయిల్',
    studentSyncInput2Placeholder: 'సంరక్షకుడి ఈమెయిల్ నమోదు చేయండి (e.g. uncle@gmail.com)',
    parentSyncSectionTitle: 'తల్లిదండ్రుల పర్యవేక్షణ & సింక్',
    parentSyncInput1Label: 'విద్యార్థి ఖాతాను లింక్ చేయండి — విద్యార్థి ఈమెయిల్',
    parentSyncInput1Placeholder: 'విద్యార్థి ఈమెయిల్ నమోదు చేయండి (e.g. rahul@gmail.com)',
    parentSyncInput2Label: 'తోటి భాగస్వామి / సంరక్షకుడిని చేర్చండి',
    parentSyncInput2Placeholder: 'భాగస్వామి ఈమెయిల్ నమోదు చేయండి (e.g. mother@gmail.com)',
    inviteBtn: 'ఆహ్వానించండి',
    linkBtn: 'లింక్ చేయండి',
    activeMembersTitle: 'యాక్టివ్ కుటుంబ సభ్యులు (నమూనా సింక్)',
    memberStudentLabel: 'మీరు (విద్యార్థి)',
    memberStudentDesc: 'అడ్మిన్ · కాలేజ్ డ్రీమ్‌లిస్ట్ నియంత్రణ',
    memberParentLabel: 'తండ్రి (వి. అప్పారావు)',
    memberParentDesc: 'పర్యవేక్షణ · కాలేజీలను, ఫీజులను పరిశీలించవచ్చు',
    connectedBadge: 'కనెక్ట్ అయింది',
    copyShareLinkBtn: 'వాట్సాప్ ఫ్యామిలీ లింక్ కాపీ చేయండి',
    parentControlsTitle: 'తల్లిదండ్రుల భద్రతా నియంత్రణలు',
    budgetCeilingLabel: 'బడ్జెట్ పరిమితి లాక్',
    budgetCeilingDesc: 'కళాశాల ఫీజు మీ పరిమితిని దాటితే అలర్ట్ చేస్తుంది',
    jvdCheckerLabel: 'JVD అర్హత ధ్రువీకరణ',
    jvdCheckerDesc: 'రేషన్ కార్డు మార్గదర్శకాలను ఆటోమేటిక్‌గా ధ్రువీకరిస్తుంది',
    demoInviteToast: 'నమూనా: {email} కి ఆహ్వానం సిద్ధమైంది; నిజమైన ఈమెయిల్ పంపబడలేదు.',
    demoLinkToast: 'నమూనా: {email} కి లింక్ రిక్వెస్ట్ సిద్ధమైంది; నిజమైన ఈమెయిల్ పంపబడలేదు.',
    emailInvalidToast: 'దయచేసి సరైన ఈమెయిల్ చిరునామాను నమోదు చేయండి.',
    linkCopiedToast: 'కుటుంబ వాట్సాప్ జాయిన్ లింక్ కాపీ చేయబడింది!',
  },

  hi: {
    appName: 'शिक्षा सेतु AI',
    tagline: 'छात्र के सपने और परिवार की सुरक्षा का संगम',
    subBranding: 'परिवार निर्णय सहायता मंच',
    demoNotice: 'प्रोटोटाइप प्रदर्शन · इंजीनियरिंग शिक्षा योजना',
    studentMode: 'विद्यार्थी मोड',
    parentMode: 'अभिभावक मोड',
    roleSwitcherAria: 'उपयोगकर्ता मोड चुनें',
    langSelectorAria: 'भाषा चुनें',

    loginTitle: 'शिक्षासेतु AI में आपका स्वागत है',
    loginSubtitle: 'इंजीनियरिंग शिक्षा के लिए परिवार निर्णय-समर्थन AI मंच',
    loginStudentBtn: 'विद्यार्थी के रूप में लॉगिन करें',
    loginParentBtn: 'अभिभावक के रूप में लॉगिन करें',
    loginStudentDesc: 'इंजीनियरिंग ब्रांच, 4-वर्षीय रोडमैप और कॉलेज विकल्प',
    loginParentDesc: '4-वर्षीय खर्च, JVD छात्रवृत्ति, सुरक्षा और बजट योजना',
    logoutBtn: 'लॉगआउट',
    studentBadge: 'विद्यार्थी',
    parentBadge: 'अभिभावक',
    welcomeBack: 'आगे बढ़ने के लिए अपना पोर्टल चुनें',

    goBack: 'वापस जाएं',
    selectRolePrompt: 'आगे बढ़ने के लिए अपनी भूमिका चुनें',
    loginAsTitle: '{role} के रूप में साइन इन करें',
    emailLabel: 'ईमेल पता',
    passwordLabel: 'पासवर्ड',
    signInBtn: 'साइन इन',
    forgotPasswordLink: 'पासवर्ड भूल गए?',
    forgotPasswordTitle: 'अपना पासवर्ड रीसेट करें',
    forgotPasswordDesc: 'पासवर्ड पुनर्प्राप्ति निर्देश प्राप्त करने के लिए अपना पंजीकृत ईमेल पता दर्ज करें।',
    resendPasswordBtn: 'पासवर्ड पुनः भेजें',
    backToLogin: 'साइन इन पर वापस जाएं',
    resetSentToast: '{email} पर पासवर्ड रीसेट लिंक भेजा गया',

    studentLandingHeadline: 'Find the campus that matches your vibe. Drop your stats below.',
    parentLandingHeadline: 'फीस, छात्रवृत्ति और परिसर सुरक्षा की पूरी स्पष्टता के साथ अपने बच्चे की इंजीनियरिंग यात्रा की योजना बनाएं।',
    fillFormBtn: 'फॉर्म भरें',
    viewScholarshipsBtn: 'छात्रवृत्तियां देखें',
    scholarshipsModalTitle: 'राज्य और केंद्रीय इंजीनियरिंग छात्रवृत्तियां',
    scholarshipsModalSubtitle: 'सत्यापित शुल्क प्रतिपूर्ति नीतियां, पात्रता मानदंड और आवेदन प्रक्रिया।',
    closeModal: 'बंद करें',

    tabs: {
      dashboard: 'डैशबोर्ड',
      bot: 'AI सलाहकार',
      room: 'फैमिली रूम',
      roadmap: 'रोडमैप',
      budget: 'बजट',
      sync: 'फैमिली सिंक',
    },

    studentProfileBannerTitle: 'विद्यार्थी महत्वाकांक्षा प्रोफ़ाइल',
    studentProfileBannerDesc: 'अपनी पसंदीदा ब्रांच और 4-वर्षीय तकनीकी करियर के लक्ष्यों को दर्ज करें।',
    parentProfileBannerTitle: 'पारिवारिक वित्तीय और सुरक्षा प्रोफ़ाइल',
    parentProfileBannerDesc: 'बजट सीमा, हॉस्टल सुरक्षा और दूरी की प्राथमिकताएं निर्धारित करें।',
    analyzeBtn: 'AI से विश्लेषण करें',
    analyzing: 'विद्यार्थी की रुचि और परिवार की क्षमता का मिलान...',
    syncRequiredWarning: 'Sync Required: Please link your parent/student account in the Family Sync section before analyzing.',
    waitingForPartnerPending: 'Waiting for Data: Your preferences are saved, but we are waiting for your linked family member to complete their form.',
    sendReminderBtn: 'Send Reminder',
    reminderSentBtn: 'Reminder Sent!',
    forceSyncDemo: 'Force Sync (Demo)',
    forceSyncActive: '✓ Partner Form Synced (Demo Active)',
    editInputs: 'प्राथमिकताएं बदलें',
    analysisComplete: 'AI विश्लेषण पूर्ण (डेमो)',
    demoEstimateNotice: 'आपके द्वारा चुने गए विकल्पों पर आधारित सिमुलेटेड विश्लेषण',
    familyAlignmentTitle: 'पारिवारिक सहमति स्कोर',
    highHarmony: 'उत्कृष्ट सामंजस्य',
    moderateHarmony: 'संतुलित सामंजस्य',
    metricBranchFit: 'ब्रांच उपयुक्तता',
    metricBudgetRisk: 'बजट सुरक्षा',
    metricSafetyDist: 'दूरी उपयुक्तता',
    riskLowJvd: 'सुरक्षित (JVD पात्र)',
    scholarshipAlertTitle: 'सरकारी छात्रवृत्ति अलर्ट',
    scholarshipNoticeTitle: 'राज्य शुल्क प्रतिपूर्ति मार्गदर्शिका',
    scholarshipBadge: 'JVD छात्रवृत्ति के तहत संभावित पात्रता - 100% ट्यूशन फीस प्रतिपूर्ति',
    scholarshipDisclaim: 'सूचना: JVD पूर्ण शुल्क प्रतिपूर्ति के लिए वैध सफेद राशन कार्ड / आय प्रमाण पत्र (<₹2.5 लाख) आवश्यक है। आधिकारिक पुष्टि सरकारी नियमों पर निर्भर है।',
    topMatchesTitle: 'सर्वश्रेष्ठ अनुशंसित कॉलेज (उदाहरण)',
    filteredRegionTag: 'AP / TS क्षेत्र के अनुसार फ़िल्टर किया गया',
    safetyScoreLabel: 'परिसर सुरक्षा रेटिंग',
    discussInRoomBtn: 'फैमिली रूम में चर्चा करें',
    familyRoomCtaTitle: 'संदेह एक साथ सुलझाएं',
    familyRoomCtaDesc: 'AI मध्यस्थ के साथ 3-तरफ़ा पारिवारिक ग्रुप चैट खोलें',
    openRoomBtn: 'रूम खोलें',
    disclaimerFootnote: 'अस्वीकरण: कटऑफ, फीस और प्लेसमेंट आंकड़े केवल काउंसलिंग मार्गदर्शन हेतु डेमो अनुमान हैं।',

    // Student Questions & Options in Hindi
    sq1Label: 'अपेक्षित EAPCET/JEE रैंक',
    sq1Options: {
      'Top 1-15k': 'टॉप 1-15 हजार (शीर्ष मेरिट सीटें)',
      'Mid 15k-50k': 'मध्यम 15k-50 हजार (प्रमुख ऑटोनॉमस कॉलेज)',
      'Safe 50k-1L': 'सुरक्षित 50k-1 लाख (जिला स्तरीय कॉलेज)',
      'Not Qualified': 'क्वालीफाई नहीं / मैनेजमेंट कोटा प्रश्न',
    },
    sq2Label: 'प्रवेश मार्ग (एडमिशन रूट)',
    sq2Options: {
      'Merit+JVD Scholarship': 'मेरिट + JVD छात्रवृत्ति (100% ट्यूशन फीस माफ)',
      'Merit Self-funded': 'मेरिट स्व-वित्तपोषित (सरकारी निर्धारित शुल्क)',
      'Mgmt Quota': 'मैनेजमेंट कोटा (कैट-बी शुल्क)',
    },
    sq3Label: 'शीर्ष पसंदीदा ब्रांच',
    sq3Options: {
      'Software CSE/IT': 'सॉफ्टवेयर CSE / इनफार्मेशन टेक्नोलॉजी',
      'Future Tech AI/DS': 'फ्यूचर टेक: AI, डेटा साइंस और साइबर',
      'Electronics ECE/EEE': 'इलेक्ट्रॉनिक्स ECE / EEE (कोर और IT दोनों)',
      'Core Mech/Civil': 'कोर मैकेनिकल / सिविल इंजीनियरिंग',
    },
    sq4Label: 'यह ब्रांच क्यों चुनना चाहते हैं?',
    sq4Options: {
      'Genuine passion': 'कोडिंग और कंप्यूटर में वास्तविक रुचि',
      'High salary jobs': 'सॉफ्टवेयर क्षेत्र में उच्च वेतन वाली नौकरियां',
      'Family/Friends advised': 'परिवार, दोस्तों और वरिष्ठों की सलाह',
      'Just want any IT job': 'कोई भी सुरक्षित IT नौकरी पाना चाहते हैं',
    },
    sq5Label: 'पसंदीदा आवास (रहने की व्यवस्था)',
    sq5Options: {
      'Hosteler': 'हॉस्टलर (कॉलेज कैंपस हॉस्टल में रहना)',
      'Day Scholar': 'डे स्कॉलर (रोज घर से आना-जाना)',
      'Private PG': 'प्राइवेट PG या दोस्तों के साथ कमरा',
    },
    sq6Label: 'कॉलेज चयन में सबसे महत्वपूर्ण क्या है?',
    sq6Options: {
      'Good placements/salary': 'अच्छे प्लेसमेंट और उच्च औसत वेतन',
      'Discipline/safety': 'अनुशासन और सुरक्षित वातावरण',
      'College reputation': 'कॉलेज की प्रतिष्ठा और पूर्व छात्रों का नेटवर्क',
      'Affordable fees': 'किफायती फीस और कम खर्च',
      'Location nearby': 'गृह नगर के निकट होना',
    },
    sq7Label: '4 साल बाद आपका मुख्य लक्ष्य',
    sq7Options: {
      'High-paying Tech Job': 'उच्च वेतन वाली टेक नौकरी (₹8+ LPA)',
      'MS/M.Tech Abroad': 'विदेश में MS / IIT से M.Tech',
      'Startup': 'खुद का तकनीकी स्टार्टअप शुरू करना',
      'Govt/Core Job': 'सरकारी नौकरी (ISRO/GATE) या कोर PSU',
    },
    sq8Label: 'आपकी बैकअप योजना',
    sq8Options: {
      'Lower college + Dream branch': 'मध्यम कॉलेज में मनपसंद ब्रांच (CSE/AI)',
      'Top college + Any branch': 'शीर्ष कॉलेज में कोई भी उपलब्ध ब्रांच',
      'Drop a year': 'लॉन्ग-टर्म कोचिंग के लिए 1 साल का ड्रॉप',
    },

    // Parent Questions & Options in Hindi
    pq1Label: 'विद्यार्थी के लिए आपकी पसंदीदा ब्रांच',
    pq1Options: {
      'Software CSE/IT': 'सॉफ्टवेयर CSE / IT (नौकरी की सुरक्षा)',
      'Future Tech AI/DS': 'फ्यूचर टेक AI/DS (नई पीढ़ी की तकनीक)',
      'Electronics ECE/EEE': 'इलेक्ट्रॉनिक्स ECE/EEE (सरकारी व IT दोनों)',
      'Core Mech/Civil': 'कोर मैकेनिकल / सिविल (स्थायी स्थिरता)',
    },
    pq2Label: 'बच्चे की रुचि आपके लिए कितनी महत्वपूर्ण है?',
    pq2Options: {
      'Balance family + student': 'पारिवारिक स्थिति और बच्चे की रुचि का संतुलन',
      'Very important': 'अत्यंत महत्वपूर्ण (बच्चे की खुशी सर्वोपरि)',
      'Important but need jobs': 'महत्वपूर्ण, लेकिन नौकरी की गारंटी जरूरी है',
      'Career stability first': 'करियर की स्थिरता और सुरक्षा पहले',
    },
    pq3Label: '4 साल का अधिकतम कुल बजट',
    pq4Label: 'प्राथमिक फंडिंग स्रोत',
    pq4Options: {
      'Govt Fee Reimbursement JVD': 'सरकारी शुल्क प्रतिपूर्ति JVD (सफेद कार्ड)',
      'Bank Loan': 'बैंक शिक्षा ऋण',
      'Family Savings': 'पारिवारिक बचत / कृषि आय',
      'Partial Scholarships': 'आंशिक गैर-सरकारी / मेरिट छात्रवृत्ति',
    },
    pq5Label: 'घर से दूरी की सीमा',
    pq5Options: {
      'Nearby under 150km': '150 किमी के भीतर (3 घंटे की यात्रा)',
      'Local under 30km': '30 किमी के भीतर (रोज घर लौटना आवश्यक)',
      'Anywhere in AP': 'आंध्र प्रदेश में कहीं भी',
      'Anywhere in India': 'पूरे भारत में कहीं भी (यदि शीर्ष संस्थान हो)',
    },
    pq6Label: 'आवास का नियम',
    pq6Options: {
      'Strict College Hostel': 'वार्डन की देखरेख वाला सुरक्षित कॉलेज हॉस्टल',
      'Day Scholar': 'केवल घर से डे स्कॉलर',
      'Relatives': 'शहर में भरोसेमंद रिश्तेदारों के पास',
      'Private PG': 'पूरी सुरक्षा होने पर ही प्राइवेट PG',
    },
    pq7Label: 'कॉलेज चयन में सबसे महत्वपूर्ण क्या है?',
    pq7Options: {
      'Good placements/salary': 'विश्वसनीय प्लेसमेंट और सुरक्षित रोजगार',
      'Discipline/safety': 'अनुशासन, रैगिंग मुक्त सुरक्षित माहौल',
      'Affordable fees': 'किफायती फीस और बिना किसी छिपे खर्च के',
      'College reputation': 'समाज में प्रतिष्ठित और विश्वसनीय कॉलेज',
      'Location nearby': 'घर के पास होना',
    },
    pq8Label: 'आपकी सबसे बड़ी चिंता / डर',
    pq8Options: {
      'Hidden Fees/Debt': 'अतिरिक्त छिपे हुए शुल्क और कर्ज का बोझ',
      'Lack of Safety/Discipline': 'सुरक्षा की कमी, रैगिंग या गलत संगत',
      'Unemployment': 'लाखों खर्च करने के बाद भी बेरोजगारी',
      'Academic Pressure': 'बच्चे पर अत्यधिक पढ़ाई का मानसिक तनाव',
    },
    pq9Label: 'कॉलेज में सफलता की आपकी परिभाषा',
    pq9Options: {
      'Getting a job immediately': 'ग्रेजुएशन के तुरंत बाद सम्मानजनक नौकरी मिलना',
      'Strict/Safe Environment': 'संस्कारी, सुरक्षित और अनुशासित माहौल में पढ़ना',
      'Gateway to Higher Studies': 'उच्च शिक्षा (MS/M.Tech) के लिए मजबूत आधार',
      'Low Financial Strain': 'परिवार पर बिना किसी भारी कर्ज के डिग्री प्राप्त करना',
    },

    // AI Counselor in Hindi
    botTitle: '1-ऑन-1 निजी सलाहकार',
    botSubtitle: 'EAPCET काउंसलिंग, JVD नियम और करियर मार्गदर्शन में प्रशिक्षित',
    botWelcome: 'नमस्ते! मैं आपका शिक्षा सेतु शिक्षा सलाहकार हूँ। EAPCET काउंसलिंग, CSE बनाम ECE, JVD फीस माफी या हॉस्टल सुरक्षा के बारे में कुछ भी पूछें।',
    botInputPlaceholderStudent: 'कटऑफ, सिलेबस, इंटर्नशिप, CSE vs ECE के बारे में पूछें...',
    botInputPlaceholderParent: 'हॉस्टल फीस, सुरक्षा, JVD प्रतिपूर्ति के बारे में पूछें...',
    botSendAria: 'AI सलाहकार को संदेश भेजें',
    botPromptChips: [
      'CSE बनाम ECE के बारे में बताएं',
      'क्या शिक्षा ऋण लेना सुरक्षित है?',
      'कॉलेज के खर्च कैसे कम करें?',
      'मेरी रुचि के लिए कौन सा करियर बेहतर है?',
    ],
    botTyping: 'AI सलाहकार उत्तर तैयार कर रहा है...',
    keyboardTip: 'अपने फोन या कंप्यूटर कीबोर्ड के माध्यम से हिंदी या अंग्रेजी में टाइप कर सकते हैं।',
    quickPhrasesTitle: 'त्वरित प्रश्न',
    quickPhrases: [
      'GVPCE कॉलेज का CSE कटऑफ क्या है?',
      'JVD शुल्क प्रतिपूर्ति कैसे लागू होती है?',
      'क्या गर्ल्स कैंपस हॉस्टल सुरक्षित हैं?',
      'क्या ECE ब्रांच से कोडिंग की तैयारी कर सकते हैं?',
    ],

    // Family Room in Hindi
    roomTitle: 'पारिवारिक निर्णय कक्ष',
    roomSubtitle: 'लाइव मध्यस्थता: विद्यार्थी + अभिभावक + AI मध्यस्थ',
    participantStudent: 'विद्यार्थी',
    participantParent: 'अभिभावक',
    participantAi: 'AI मध्यस्थ',
    seedStudentText: 'मैं बेहतर हैकथॉन और टेक अवसरों के लिए शहर में CSE पढ़ना चाहता हूँ।',
    seedParentText: 'बहुत दूर नहीं जाना है, फीस बजट में होनी चाहिए और सुरक्षा जरूरी है।',
    seedParentTeOriginal: 'చాలా దూరం వద్దు, ఫీజులు అందుబాటులో ఉండాలి.',
    seedAiCompromise: 'समझौता सुझाव: 100 किमी के दायरे में टियर-2 ऑटोनॉमस कॉलेजों पर विचार करें। राज्य शुल्क प्रतिपूर्ति (JVD) का उपयोग करके छात्र को CSE ब्रांच मिल सकती है और कुल खर्च परिवार के ₹3 लाख के बजट में ही रहेगा।',
    micSpeakLabel: 'हिंदी में बोलें (माइक्रोफ़ोन)',
    micListeningLabel: 'हिंदी में सुन रहे हैं (hi-IN)... बोलिए',
    micStopLabel: 'रिकॉर्डिंग रोकें',
    micRequestingPermission: 'माइक्रोफ़ोन अनुमति का अनुरोध किया जा रहा है...',
    micReadyLabel: 'माइक्रोफ़ोन तैयार है। हिंदी में बोलने के लिए क्लिक करें।',
    micUnsupported: 'इस ब्राउज़र में वाक् पहचान (Speech Recognition) समर्थित नहीं है। कृपया टाइप करें।',
    micPermissionError: 'माइक्रोफ़ोन की अनुमति अस्वीकृत की गई। कृपया ब्राउज़र सेटिंग्स में अनुमति दें (HTTPS या localhost आवश्यक)।',
    micSpeechDetected: 'आपकी आवाज पहचानी गई और इनपुट में जोड़ी गई! भेजने से पहले समीक्षा करें।',
    micNoSpeech: 'कोई आवाज़ सुनाई नहीं दी। कृपया पुनः प्रयास करें।',
    micNetworkError: 'वाक् पहचान के दौरान नेटवर्क या ऑडियो त्रुटि उत्पन्न हुई। कृपया लिखकर भेजें।',
    micStoppedLabel: 'माइक्रोफ़ोन रोक दिया गया।',
    roomInputPlaceholderStudent: 'छात्र का दृष्टिकोण लिखें (उदा. "कॉलेज में 95% प्लेसमेंट है...")',
    roomInputPlaceholderParent: 'अभिभावक का दृष्टिकोण लिखें (उदा. "हॉस्टल सुरक्षा की जांच जरूरी है...")',
    voiceNoteAria: 'वॉइस नोट ऑडियो नमूना',
    roomNoteDemo: 'नोट: वेब स्पीच रिकग्निशन द्वारा आपकी आवाज़ सीधे मैसेज बॉक्स में टाइप हो जाएगी, ताकि आप जांच कर भेज सकें।',

    // Career Roadmap in Hindi
    roadmapTitle: 'इंजीनियरिंग करियर रोडमैप',
    roadmapHeading: '4-वर्षीय उच्च-प्लेसमेंट ब्लूप्रिंट',
    roadmapDesc: 'प्रथम वर्ष से इन प्रमाणित चरणों का पालन करें और ₹8LPA+ के आकर्षक टेक प्लेसमेंट हासिल करें।',
    y1Title: 'वर्ष 1: आधारभूत शिक्षा और C++',
    y1Sem: 'सेमेस्टर 1-2',
    y1Desc: 'प्रोग्रामिंग बेसिक्स, C++ STL, गणित और बुनियादी कोडिंग प्रोजेक्ट्स में निपुणता हासिल करें।',
    y1Tasks: [
      'C / C++ सिंटैक्स और पॉइंटर मेमोरी कॉन्सेप्ट्स में महारत हासिल करें',
      'GitHub प्रोफाइल बनाएं और 3 प्रोजेक्ट्स अपलोड करें',
      'LeetCode पर पहले 50 आसान प्रश्न हल करें और 8.5+ CGPA बनाए रखें',
    ],
    y2Title: 'वर्ष 2: कोर विषय और हैकथॉन',
    y2Sem: 'सेमेस्टर 3-4',
    y2Desc: 'डेटा स्ट्रक्चर्स और एल्गोरिदम, डेटाबेस (SQL), ऑपरेटिंग सिस्टम और कॉलेज हैकथॉन।',
    y2Tasks: [
      '150 DSA प्रश्न हल करें (ट्रीज, ग्राफ्स, डायनामिक प्रोग्रामिंग)',
      'फुल-स्टैक वेब एप्लिकेशन बनाएं (React + Node.js)',
      'स्मार्ट इंडिया हैकथॉन (SIH) या कोडिंग प्रतियोगिताओं में भाग लें',
    ],
    y3Title: 'वर्ष 3: इंटर्नशिप और AI प्रमाणपत्र',
    y3Sem: 'सेमेस्टर 5-6',
    y3Desc: 'व्यावहारिक प्रोजेक्ट्स, समर इंटर्नशिप, AI/ML बेसिक्स, सर्टिफिकेशन और टीमवर्क।',
    y3Tasks: [
      '2 महीने की सशुल्क समर टेक इंटर्नशिप प्राप्त करें',
      'क्लाउड प्रैक्टिशनर या जेनरेटिव AI सर्टिफिकेशन पूरा करें',
      'मॉक टेक्निकल इंटरव्यू और सिस्टम डिज़ाइन का अभ्यास करें',
    ],
    y4Title: 'वर्ष 4: प्लेसमेंट और अंतिम चयन',
    y4Sem: 'सेमेस्टर 7-8',
    y4Desc: 'प्लेसमेंट तैयारी, एप्टीट्यूड, कोर DSA रिवीजन, साक्षात्कार और बायोडाटा सुधार।',
    y4Tasks: [
      'शीर्ष प्रोडक्ट कंपनियों में ₹10LPA+ का सुपर ड्रीम ऑफर हासिल करें',
      'सुरक्षा के लिए डे-1 सर्विस कंपनी का ऑफर सुरक्षित करें',
      'उद्योग मेंटर के मार्गदर्शन में अंतिम वर्ष का मुख्य प्रोजेक्ट पूरा करें',
    ],

    // Budget Planner in Hindi
    budgetToolTitle: 'अभिभावक वित्तीय डैशबोर्ड',
    budgetToolHeading: '4-वर्षीय खर्चों का सिमुलेटर (What-If)',
    budgetToolDesc: 'बजट स्लाइडर को आगे-पीछे करके वास्तविक ट्यूशन, हॉस्टल फीस और सरकारी JVD छात्रवृत्ति की सुरक्षा देखें।',
    adjustBudgetLabel: 'अपना नियोजित 4-वर्षीय बजट समायोजित करें',
    estTuitionLabel: '4 साल का अनुमानित सरकारी ट्यूशन शुल्क:',
    estHostelLabel: '4 साल का अनुमानित हॉस्टल और आवास खर्च:',
    estFoodTransportLabel: 'अनुमानित भोजन, मेस और यात्रा खर्च:',
    estBooksExamLabel: 'किताबें, परीक्षा शुल्क और लैपटॉप सेटअप:',
    grossCostLabel: 'अनुमानित कुल सकल व्यय:',
    jvdReimbursementLabel: 'सरकारी JVD शुल्क प्रतिपूर्ति (यदि पात्र हैं):',
    netOutOfPocketLabel: 'परिवार द्वारा देय शुद्ध खर्च:',
    budgetRemainingLabel: 'बजट बचत (अधिशेष):',
    budgetDeficitLabel: 'अतिरिक्त आवश्यक वित्तीय सहायता:',
    statusSafe: 'सुरक्षित और प्रबंधनीय',
    statusStrained: 'आर्थिक रूप से थोड़ा भारी',
    budgetSummarySafe: 'राज्य JVD शुल्क सहायता के साथ, आपका बजट बिना किसी भारी कर्ज के हॉस्टल और रहने के खर्च को आराम से कवर करता है।',
    budgetSummaryStrained: 'हॉस्टल फीस के लिए आपका चुना गया बजट थोड़ा कम पड़ सकता है। घर के पास रहकर डे स्कॉलर बनने या वसति दीवेना सहायता पर विचार करें।',
    budgetDisclaimer: 'नोट: सभी आंकड़े आंध्र प्रदेश नियामक मानदंडों पर आधारित डेमो अनुमान हैं। वास्तविक शुल्क कॉलेज अनुसार भिन्न हो सकते हैं।',

    // Family Sync in Hindi
    syncTitle: 'Google फ़ैमिलीज़ शैली लिंक',
    syncHeading: 'पारिवारिक ग्रुप सिंक इंजन',
    syncDesc: 'काउंसलिंग विकल्प, कटऑफ अलर्ट और सहमत बजट को पूरे परिवार के साथ बिना किसी मतभेद के साझा करें।',
    studentSyncSectionTitle: 'माता-पिता और अभिभावकों को आमंत्रित करें',
    studentSyncInput1Label: 'परिवार सदस्य 1 (प्राथमिक) — माता-पिता का ईमेल',
    studentSyncInput1Placeholder: 'माता-पिता का ईमेल दर्ज करें (उदा. appa@gmail.com)',
    studentSyncInput2Label: 'परिवार सदस्य 2 (वैकल्पिक) — अभिभावक का ईमेल',
    studentSyncInput2Placeholder: 'अभिभावक का ईमेल दर्ज करें (उदा. uncle@gmail.com)',
    parentSyncSectionTitle: 'अभिभावकीय देखरेख और सिंक',
    parentSyncInput1Label: 'बच्चे का खाता लिंक करें — विद्यार्थी ईमेल',
    parentSyncInput1Placeholder: 'विद्यार्थी का ईमेल दर्ज करें (उदा. rahul@gmail.com)',
    parentSyncInput2Label: 'सह-अभिभावक / साथी को जोड़ें — ईमेल',
    parentSyncInput2Placeholder: 'साथी का ईमेल दर्ज करें (उदा. mother@gmail.com)',
    inviteBtn: 'आमंत्रित करें',
    linkBtn: 'लिंक करें',
    activeMembersTitle: 'सक्रिय परिवार के सदस्य (डेमो सिंक)',
    memberStudentLabel: 'आप (विद्यार्थी)',
    memberStudentDesc: 'एडमिन · कॉलेज शॉर्टलिस्ट नियंत्रण',
    memberParentLabel: 'पिता (वी. अप्पाराव)',
    memberParentDesc: 'पर्यवेक्षक · कॉलेजों और फीस की समीक्षा कर सकते हैं',
    connectedBadge: 'जुड़े हुए हैं',
    copyShareLinkBtn: 'व्हाट्सएप फैमिली लिंक कॉपी करें',
    parentControlsTitle: 'अभिभावक सुरक्षा नियंत्रण',
    budgetCeilingLabel: 'बजट सीमा लॉक',
    budgetCeilingDesc: 'यदि शॉर्टलिस्ट किया गया कॉलेज बजट सीमा पार करता है तो सचेत करेगा',
    jvdCheckerLabel: 'JVD पात्रता सत्यापन',
    jvdCheckerDesc: 'सफेद राशन कार्ड के दिशा-निर्देशों की स्वचालित जांच करता है',
    demoInviteToast: 'डेमो: {email} के लिए आमंत्रण तैयार किया गया; कोई वास्तविक ईमेल नहीं भेजा गया।',
    demoLinkToast: 'डेमो: {email} के लिए लिंक अनुरोध तैयार किया गया; कोई वास्तविक ईमेल नहीं भेजा गया।',
    emailInvalidToast: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
    linkCopiedToast: 'पारिवारिक व्हाट्सएप लिंक क्लिपबोर्ड पर कॉपी किया गया!',
  },
};

// College Matches localized descriptions
export interface LocalizedCollegeMatch {
  name: string;
  code: string;
  location: Record<Lang, string>;
  branchKey: string;
  cutoff: Record<Lang, string>;
  fourYearFee: Record<Lang, string>;
  avgPackage: string;
  safetyScore: Record<Lang, string>;
  explanation: Record<Lang, string>;
  pros: Record<Lang, string[]>;
}

export const sampleColleges: LocalizedCollegeMatch[] = [
  {
    name: 'Gayatri Vidya Parishad College of Engineering (Autonomous)',
    code: 'GVPCE · Visakhapatnam',
    location: {
      en: 'Madhurawada, Visakhapatnam (Tier-2 Coastal Hub)',
      te: 'మధురవాడ, విశాఖపట్నం (టైర్-2 తీరప్రాంత కేంద్రం)',
      hi: 'मधुरवाड़ा, विशाखापत्तनम (टियर-2 तटीय केंद्र)',
    },
    branchKey: 'Software CSE/IT',
    cutoff: {
      en: 'EAPCET Demo Cutoff ~8,400 - 18,200',
      te: 'EAPCET నమూనా కటాఫ్ ~8,400 - 18,200',
      hi: 'EAPCET डेमो कटऑफ ~8,400 - 18,200',
    },
    fourYearFee: {
      en: '₹2,84,000 Est. (₹0 Tuition with JVD)',
      te: '₹2,84,000 అంచనా (JVD తో ₹0 ట్యూషన్)',
      hi: '₹2,84,000 अनु. (JVD से ₹0 ट्यूशन)',
    },
    avgPackage: '₹6.8 LPA',
    safetyScore: {
      en: '98% Safety & Strict Discipline',
      te: '98% భద్రత & కఠిన క్రమశిక్షణ',
      hi: '98% सुरक्षा और कड़ा अनुशासन',
    },
    explanation: {
      en: 'Optimal balance: High campus placement track record without excessive metro living expenses. Highly secure campus hostel and standard state fee reimbursement approval.',
      te: 'ఉత్తమ సమతుల్యత: మెట్రో నగరాల అధిక ఖర్చులు లేకుండా అద్భుతమైన క్యాంపస్ ప్లేస్‌మెంట్లు. బయోమెట్రిక్ భద్రత గల హాస్టల్ మరియు పూర్తి ప్రభుత్వ ఫీజు వర్తింపు.',
      hi: 'उत्तम संतुलन: बड़े शहरों के अत्यधिक खर्च के बिना उत्कृष्ट कैंपस प्लेसमेंट। बायोमेट्रिक सुरक्षा वाला सुरक्षित हॉस्टल और सरकारी शुल्क प्रतिपूर्ति का लाभ।',
    },
    pros: {
      en: ['Autonomous NAAC A Grade', '92% Campus Placement in CSE', '24/7 Gated In-Campus Hostel'],
      te: ['ఆటోనమస్ NAAC A గ్రేడ్', 'CSE లో 92% ప్లేస్‌మెంట్లు', '24/7 సెక్యూరిటీ గల క్యాంపస్ హాస్టల్'],
      hi: ['ऑटोनॉमस NAAC A ग्रेड', 'CSE में 92% प्लेसमेंट', '24/7 सुरक्षित इन-कैंपस हॉस्टल'],
    },
  },
  {
    name: 'VR Siddhartha Engineering College',
    code: 'VRSEC · Vijayawada',
    location: {
      en: 'Kanuru, Vijayawada (AP Capital Region)',
      te: 'కనూరు, విజయవాడ (రాజధాని ప్రాంతం)',
      hi: 'कानुरु, विजयवाड़ा (राजधानी क्षेत्र)',
    },
    branchKey: 'Software CSE/IT',
    cutoff: {
      en: 'EAPCET Demo Cutoff ~11,200 - 24,000',
      te: 'EAPCET నమూనా కటాఫ్ ~11,200 - 24,000',
      hi: 'EAPCET डेमो कटऑफ ~11,200 - 24,000',
    },
    fourYearFee: {
      en: '₹2,92,000 Est. (₹0 Tuition with JVD)',
      te: '₹2,92,000 అంచనా (JVD తో ₹0 ట్యూషన్)',
      hi: '₹2,92,000 अनु. (JVD से ₹0 ट्यूशन)',
    },
    avgPackage: '₹6.2 LPA',
    safetyScore: {
      en: '96% Verified Safe Hostel',
      te: '96% ధ్రువీకరించిన సురక్షిత హాస్టల్',
      hi: '96% सत्यापित सुरक्षित हॉस्टल',
    },
    explanation: {
      en: 'Superb compromise: Meets student desire for modern tech clubs and hackathons while satisfying parental preference for convenient road and train connectivity across coastal districts.',
      te: 'అనువైన రాజీ మార్గం: విద్యార్థికి సాంకేతిక హ్యాకథాన్‌ల అవకాశాలతో పాటు, కోస్తా జిల్లాల నుండి తల్లిదండ్రులు సులభంగా చేరుకోగల రవాణా సౌకర్యం.',
      hi: 'शानदार समझौता: छात्र की आधुनिक टेक क्लबों और हैकथॉन की चाहत पूरी होती है, साथ ही माता-पिता के लिए सुविधाजनक आवागमन की सुविधा मिलती है।',
    },
    pros: {
      en: ['Industry Centers of Excellence (Cisco, TCS)', 'State JVD Approved', 'Affordable Campus Mess (~₹3,200/mo)'],
      te: ['టాప్ కంపెనీల శిక్షణ కేంద్రాలు (TCS, Cisco)', 'JVD పూర్తి ఆమోదం', 'తక్కువ ఖర్చుతో కూడిన మెస్ (~₹3,200/నెలకు)'],
      hi: ['उद्योग सहयोग केंद्र (Cisco, TCS)', 'राज्य JVD स्वीकृत', 'किफायती परिसर मेस (~₹3,200/माह)'],
    },
  },
  {
    name: 'Sree Vidyanikethan Engineering College',
    code: 'SVEC · Tirupati',
    location: {
      en: 'A.Rangampet, Tirupati Region',
      te: 'ఎ.రంగంపేట, తిరుపతి ప్రాంతం',
      hi: 'ए.रंगमपेट, तिरुपति क्षेत्र',
    },
    branchKey: 'Future Tech AI/DS',
    cutoff: {
      en: 'EAPCET Demo Cutoff ~19,000 - 38,000',
      te: 'EAPCET నమూనా కటాఫ్ ~19,000 - 38,000',
      hi: 'EAPCET डेमो कटऑफ ~19,000 - 38,000',
    },
    fourYearFee: {
      en: '₹2,60,000 Est. (₹0 Tuition with JVD)',
      te: '₹2,60,000 అంచనా (JVD తో ₹0 ట్యూషన్)',
      hi: '₹2,60,000 अनु. (JVD से ₹0 ट्यूशन)',
    },
    avgPackage: '₹5.6 LPA',
    safetyScore: {
      en: '99% Biometric Campus Security',
      te: '99% బయోమెట్రిక్ క్యాంపస్ భద్రత',
      hi: '99% बायोमेट्रिक परिसर सुरक्षा',
    },
    explanation: {
      en: 'Best match for safety: Strictly monitored residential atmosphere that offers peace of mind to parents while providing specialized AI/DS and electronics labs for the student.',
      te: 'భద్రతకు అత్యుత్తమ ఎంపిక: తల్లిదండ్రులకు పూర్తి మనశ్శాంతినిచ్చే నివాస క్రమశిక్షణతో పాటు విద్యార్థికి ఆధునిక AI/DS ల్యాబ్‌ల సౌకర్యం.',
      hi: 'सुरक्षा के लिए सर्वोत्तम: कड़े अनुशासन वाला सुरक्षित आवासीय वातावरण जो माता-पिता को निश्चिंत करता है, साथ ही आधुनिक AI/DS लैब की सुविधा देता है।',
    },
    pros: {
      en: ['Strict Anti-Ragging Policy', 'Free Skill Certifications', 'High Core & IT Recruitment Numbers'],
      te: ['కఠినమైన యాంటీ-ర్యాగింగ్ నియమాలు', 'ఉచిత స్కిల్ సర్టిఫికేషన్లు', 'మంచి కోర్ & IT రిక్రూట్‌మెంట్'],
      hi: ['सख्त एंटी-रैगिंग नीति', 'मुफ्त कौशल प्रमाणन', 'मजबूत कोर और IT प्लेसमेंट'],
    },
  },
];
