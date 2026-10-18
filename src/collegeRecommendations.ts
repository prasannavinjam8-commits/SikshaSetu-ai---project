/**
 * Mock recommendation database (3 sets).
 *   Set A -> CSE / IT focus          (high placement focus)
 *   Set B -> Core ECE / Mech / Civil (core tech focus)
 *   Set C -> High budget / premium   (everything else)
 * All cutoffs, fees and packages are DEMO estimates, like the originals.
 */
import { LocalizedCollegeMatch, sampleColleges } from './i18n.ts';

export interface RecommendedCollege extends LocalizedCollegeMatch {
  matchPct: number;
}

export type RecommendationSetKey = 'A' | 'B' | 'C';

const withMatch = (c: LocalizedCollegeMatch, matchPct: number): RecommendedCollege => ({ ...c, matchPct });

// ---------- SET A : CSE / IT (reuses your existing 3 colleges) ----------
const SET_A: RecommendedCollege[] = [
  withMatch(sampleColleges[0], 94), // Gayatri Vidya Parishad
  withMatch(sampleColleges[1], 89), // VR Siddhartha
  withMatch(sampleColleges[2], 83), // Sree Vidyanikethan
];

// ---------- SET B : Core ECE / Mech / Civil ----------
const SET_B: RecommendedCollege[] = [
  {
    matchPct: 93,
    name: 'JNTU Anantapur College of Engineering',
    code: 'JNTUA · Anantapur',
    location: {
      en: 'Ananthapuramu, Rayalaseema Region',
      te: 'అనంతపురం, రాయలసీమ ప్రాంతం',
      hi: 'अनंतपुरमु, रायलसीमा क्षेत्र',
    },
    branchKey: 'Electronics ECE/EEE',
    cutoff: {
      en: 'EAPCET Demo Cutoff ~6,000 - 16,000',
      te: 'EAPCET నమూనా కటాఫ్ ~6,000 - 16,000',
      hi: 'EAPCET डेमो कटऑफ ~6,000 - 16,000',
    },
    fourYearFee: {
      en: '₹1,90,000 Est. (₹0 Tuition with JVD)',
      te: '₹1,90,000 అంచనా (JVD తో ₹0 ట్యూషన్)',
      hi: '₹1,90,000 अनु. (JVD से ₹0 ट्यूशन)',
    },
    avgPackage: '₹5.2 LPA',
    safetyScore: {
      en: '95% Safe University Hostel',
      te: '95% సురక్షిత యూనివర్సిటీ హాస్టల్',
      hi: '95% सुरक्षित विश्वविद्यालय हॉस्टल',
    },
    explanation: {
      en: 'Strong core-branch pick: government university with deep ECE/EEE and Mechanical labs, very low fees and steady core-sector and PSU recruitment.',
      te: 'కోర్ బ్రాంచ్‌లకు బలమైన ఎంపిక: ECE/EEE, మెకానికల్ ల్యాబ్‌లు, చాలా తక్కువ ఫీజులు మరియు కోర్ & PSU రిక్రూట్‌మెంట్.',
      hi: 'कोर ब्रांच के लिए मजबूत विकल्प: ECE/EEE और मैकेनिकल लैब, बेहद कम फीस और कोर व PSU भर्ती।',
    },
    pros: {
      en: ['Government University Campus', 'Strong Core Lab Infrastructure', 'Very Low Fee Structure'],
      te: ['ప్రభుత్వ యూనివర్సిటీ క్యాంపస్', 'బలమైన కోర్ ల్యాబ్ సౌకర్యాలు', 'చాలా తక్కువ ఫీజులు'],
      hi: ['सरकारी विश्वविद्यालय परिसर', 'मजबूत कोर लैब सुविधाएँ', 'बहुत कम फीस'],
    },
  },
  {
    matchPct: 88,
    name: 'SVU College of Engineering',
    code: 'SVUCE · Tirupati',
    location: {
      en: 'Tirupati (S.V. University Campus)',
      te: 'తిరుపతి (ఎస్.వి. యూనివర్సిటీ క్యాంపస్)',
      hi: 'तिरुपति (एस.वी. विश्वविद्यालय परिसर)',
    },
    branchKey: 'Core Mech/Civil',
    cutoff: {
      en: 'EAPCET Demo Cutoff ~7,500 - 19,000',
      te: 'EAPCET నమూనా కటాఫ్ ~7,500 - 19,000',
      hi: 'EAPCET डेमो कटऑफ ~7,500 - 19,000',
    },
    fourYearFee: {
      en: '₹2,05,000 Est. (₹0 Tuition with JVD)',
      te: '₹2,05,000 అంచనా (JVD తో ₹0 ట్యూషన్)',
      hi: '₹2,05,000 अनु. (JVD से ₹0 ट्यूशन)',
    },
    avgPackage: '₹5.0 LPA',
    safetyScore: {
      en: '96% Secure Campus Hostel',
      te: '96% సురక్షిత క్యాంపస్ హాస్టల్',
      hi: '96% सुरक्षित कैंपस हॉस्टल',
    },
    explanation: {
      en: 'Reliable core option: well-established Mechanical, Civil and ECE departments with strong alumni networks and affordable, safe hostel living.',
      te: 'నమ్మదగిన కోర్ ఎంపిక: మెకానికల్, సివిల్, ECE విభాగాలు, బలమైన పూర్వ విద్యార్థుల నెట్‌వర్క్, సురక్షిత హాస్టల్.',
      hi: 'भरोसेमंद कोर विकल्प: मैकेनिकल, सिविल और ECE विभाग, मजबूत पूर्व छात्र नेटवर्क और सुरक्षित हॉस्टल।',
    },
    pros: {
      en: ['Established Core Departments', 'Active Alumni Network', 'Affordable Hostel & Mess'],
      te: ['స్థిరమైన కోర్ విభాగాలు', 'చురుకైన పూర్వ విద్యార్థుల నెట్‌వర్క్', 'తక్కువ ఖర్చుతో హాస్టల్ & మెస్'],
      hi: ['स्थापित कोर विभाग', 'सक्रिय पूर्व छात्र नेटवर्क', 'किफायती हॉस्टल और मेस'],
    },
  },
  {
    matchPct: 84,
    name: 'RVR & JC College of Engineering',
    code: 'RVRJC · Guntur',
    location: {
      en: 'Chowdavaram, Guntur',
      te: 'చౌడవరం, గుంటూరు',
      hi: 'चौडावरम, गुंटूर',
    },
    branchKey: 'Electronics ECE/EEE',
    cutoff: {
      en: 'EAPCET Demo Cutoff ~10,000 - 22,000',
      te: 'EAPCET నమూనా కటాఫ్ ~10,000 - 22,000',
      hi: 'EAPCET डेमो कटऑफ ~10,000 - 22,000',
    },
    fourYearFee: {
      en: '₹2,70,000 Est. (₹0 Tuition with JVD)',
      te: '₹2,70,000 అంచనా (JVD తో ₹0 ట్యూషన్)',
      hi: '₹2,70,000 अनु. (JVD से ₹0 ट्यूशन)',
    },
    avgPackage: '₹5.5 LPA',
    safetyScore: {
      en: '94% Monitored Hostel',
      te: '94% పర్యవేక్షణ గల హాస్టల్',
      hi: '94% निगरानी वाला हॉस्टल',
    },
    explanation: {
      en: 'Balanced core pick: autonomous college with good ECE, EEE and Mechanical placements, close to the AP capital region and easy for families to visit.',
      te: 'సమతుల్య కోర్ ఎంపిక: ఆటోనమస్ కళాశాల, ECE, EEE, మెకానికల్‌లో మంచి ప్లేస్‌మెంట్లు, రాజధాని ప్రాంతానికి దగ్గర.',
      hi: 'संतुलित कोर विकल्प: ऑटोनॉमस कॉलेज, ECE, EEE और मैकेनिकल में अच्छी प्लेसमेंट, राजधानी क्षेत्र के पास।',
    },
    pros: {
      en: ['Autonomous Status', 'Good Core Recruiter Visits', 'Easy Road & Rail Access'],
      te: ['ఆటోనమస్ హోదా', 'కోర్ కంపెనీల రిక్రూట్‌మెంట్', 'రోడ్డు & రైలు సౌకర్యం'],
      hi: ['ऑटोनॉमस दर्जा', 'कोर कंपनियों की भर्ती', 'सड़क और रेल संपर्क'],
    },
  },
];

// ---------- SET C : High budget / premium ----------
const SET_C: RecommendedCollege[] = [
  {
    matchPct: 92,
    name: 'Amrita Vishwa Vidyapeetham (Amaravati)',
    code: 'AMRITA · Amaravati',
    location: {
      en: 'Amaravati, Guntur District (AP Capital Region)',
      te: 'అమరావతి, గుంటూరు జిల్లా (రాజధాని ప్రాంతం)',
      hi: 'अमरावती, गुंटूर जिला (राजधानी क्षेत्र)',
    },
    branchKey: 'Future Tech AI/DS',
    cutoff: {
      en: 'Entrance / Merit Demo Cutoff ~ Top 15%',
      te: 'ప్రవేశ / మెరిట్ నమూనా కటాఫ్ ~ టాప్ 15%',
      hi: 'प्रवेश / मेरिट डेमो कटऑफ ~ शीर्ष 15%',
    },
    fourYearFee: {
      en: '₹14,00,000 Est. (Private, no JVD)',
      te: '₹14,00,000 అంచనా (ప్రైవేట్, JVD లేదు)',
      hi: '₹14,00,000 अनु. (निजी, JVD नहीं)',
    },
    avgPackage: '₹7.5 LPA',
    safetyScore: {
      en: '99% Premium Secure Campus',
      te: '99% ప్రీమియం సురక్షిత క్యాంపస్',
      hi: '99% प्रीमियम सुरक्षित कैंपस',
    },
    explanation: {
      en: 'Premium choice: deemed university with modern labs, research culture and strong recruiter access. Best suited to families with a higher budget and no reliance on fee reimbursement.',
      te: 'ప్రీమియం ఎంపిక: ఆధునిక ల్యాబ్‌లు, పరిశోధన సంస్కృతి, బలమైన రిక్రూటర్ల సంబంధాలు. అధిక బడ్జెట్ గల కుటుంబాలకు అనుకూలం.',
      hi: 'प्रीमियम विकल्प: आधुनिक लैब, शोध संस्कृति और मजबूत रिक्रूटर संपर्क। अधिक बजट वाले परिवारों के लिए उपयुक्त।',
    },
    pros: {
      en: ['Deemed University Status', 'Modern Research Labs', 'Strong Recruiter Network'],
      te: ['డీమ్డ్ యూనివర్సిటీ హోదా', 'ఆధునిక పరిశోధనా ల్యాబ్‌లు', 'బలమైన రిక్రూటర్ నెట్‌వర్క్'],
      hi: ['डीम्ड विश्वविद्यालय दर्जा', 'आधुनिक शोध लैब', 'मजबूत रिक्रूटर नेटवर्क'],
    },
  },
  {
    matchPct: 87,
    name: 'SRM University AP',
    code: 'SRMAP · Amaravati',
    location: {
      en: 'Neerukonda, Mangalagiri (AP Capital Region)',
      te: 'నీరుకొండ, మంగళగిరి (రాజధాని ప్రాంతం)',
      hi: 'नीरुकोंडा, मंगलगिरी (राजधानी क्षेत्र)',
    },
    branchKey: 'Software CSE/IT',
    cutoff: {
      en: 'SRMJEEE / Merit Demo Cutoff ~ Top 20%',
      te: 'SRMJEEE / మెరిట్ నమూనా కటాఫ్ ~ టాప్ 20%',
      hi: 'SRMJEEE / मेरिट डेमो कटऑफ ~ शीर्ष 20%',
    },
    fourYearFee: {
      en: '₹11,50,000 Est. (Private, scholarships vary)',
      te: '₹11,50,000 అంచనా (ప్రైవేట్, స్కాలర్‌షిప్‌లు మారుతాయి)',
      hi: '₹11,50,000 अनु. (निजी, छात्रवृत्ति भिन्न)',
    },
    avgPackage: '₹7.0 LPA',
    safetyScore: {
      en: '97% Gated Residential Campus',
      te: '97% గేటెడ్ రెసిడెన్షియల్ క్యాంపస్',
      hi: '97% गेटेड आवासीय कैंपस',
    },
    explanation: {
      en: 'Premium private option: large residential campus, global collaborations and merit scholarships that can reduce the effective fee for high scorers.',
      te: 'ప్రీమియం ప్రైవేట్ ఎంపిక: పెద్ద రెసిడెన్షియల్ క్యాంపస్, అంతర్జాతీయ సహకారాలు, మెరిట్ స్కాలర్‌షిప్‌లు.',
      hi: 'प्रीमियम निजी विकल्प: बड़ा आवासीय कैंपस, वैश्विक सहयोग और मेरिट छात्रवृत्तियाँ।',
    },
    pros: {
      en: ['Merit Scholarships Available', 'Global University Tie-ups', 'Large Residential Campus'],
      te: ['మెరిట్ స్కాలర్‌షిప్‌లు', 'అంతర్జాతీయ యూనివర్సిటీ ఒప్పందాలు', 'పెద్ద రెసిడెన్షియల్ క్యాంపస్'],
      hi: ['मेरिट छात्रवृत्ति उपलब्ध', 'वैश्विक विश्वविद्यालय साझेदारी', 'बड़ा आवासीय कैंपस'],
    },
  },
  {
    matchPct: 85,
    name: 'VIT-AP University',
    code: 'VITAP · Amaravati',
    location: {
      en: 'Inavolu, Amaravati (AP Capital Region)',
      te: 'ఇనవోలు, అమరావతి (రాజధాని ప్రాంతం)',
      hi: 'इनावोलु, अमरावती (राजधानी क्षेत्र)',
    },
    branchKey: 'Software CSE/IT',
    cutoff: {
      en: 'VITEEE Demo Rank ~ Top 25,000',
      te: 'VITEEE నమూనా ర్యాంక్ ~ టాప్ 25,000',
      hi: 'VITEEE डेमो रैंक ~ शीर्ष 25,000',
    },
    fourYearFee: {
      en: '₹12,00,000 Est. (Private, merit waivers vary)',
      te: '₹12,00,000 అంచనా (ప్రైవేట్, మెరిట్ రాయితీలు మారుతాయి)',
      hi: '₹12,00,000 अनु. (निजी, मेरिट छूट भिन्न)',
    },
    avgPackage: '₹7.2 LPA',
    safetyScore: {
      en: '98% Secure Hostel & Campus',
      te: '98% సురక్షిత హాస్టల్ & క్యాంపస్',
      hi: '98% सुरक्षित हॉस्टल और कैंपस',
    },
    explanation: {
      en: 'Premium tech-focused campus: strong coding culture, active student clubs and a large recruiter pool, suited to families able to fund a higher-cost private degree.',
      te: 'ప్రీమియం టెక్ క్యాంపస్: బలమైన కోడింగ్ సంస్కృతి, చురుకైన క్లబ్‌లు, పెద్ద రిక్రూటర్ల జాబితా.',
      hi: 'प्रीमियम टेक कैंपस: मजबूत कोडिंग संस्कृति, सक्रिय क्लब और बड़ा रिक्रूटर पूल।',
    },
    pros: {
      en: ['Strong Coding & Hackathon Culture', 'Large Recruiter Pool', 'Modern Hostel Facilities'],
      te: ['బలమైన కోడింగ్ & హ్యాకథాన్ సంస్కృతి', 'పెద్ద రిక్రూటర్ల జాబితా', 'ఆధునిక హాస్టల్ సౌకర్యాలు'],
      hi: ['मजबूत कोडिंग व हैकथॉन संस्कृति', 'बड़ा रिक्रूटर पूल', 'आधुनिक हॉस्टल सुविधाएँ'],
    },
  },
];

export const COLLEGE_RECOMMENDATION_SETS: Record<RecommendationSetKey, RecommendedCollege[]> = {
  A: SET_A,
  B: SET_B,
  C: SET_C,
};

/** Picks the set from the "Top Branch Choice" dropdown value. */
export function pickRecommendationSet(topBranch: string): RecommendationSetKey {
  if (topBranch === 'Software CSE/IT') return 'A';
  if (topBranch === 'Electronics ECE/EEE' || topBranch === 'Core Mech/Civil') return 'B';
  return 'C';
}