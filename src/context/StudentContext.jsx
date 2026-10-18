/* oxlint-disable react/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

// ==========================================
// DEFAULT MOCK & INITIAL STATE
// ==========================================

const INITIAL_PROFILE = {
  fullName: "Alex Rivera",
  email: "alex.rivera@example.com",
  phone: "+1 (555) 019-2834",
  dateOfBirth: "2001-08-14",
  nationality: "International",
  passportNumber: "Z98471203",

  highestQualification: "Bachelor's",
  fieldOfStudy: "Computer Science",
  institution: "State Technological University",
  cgpa: "8.4",
  graduationYear: "2024",

  ieltsListening: "7.5",
  ieltsReading: "7.0",
  ieltsWriting: "6.5",
  ieltsSpeaking: "7.0",
  ieltsOverall: "7.0",

  availableBudget: "35000",
  annualFamilyIncome: "28000",

  preferredStartDate: "Sep 2026",

  workExperience: "1–2 years",
  currentJobTitle: "Software Developer Intern",
  company: "Apex Tech Labs"
};

const INITIAL_MULTI_SELECT = {
  provinces: ["Ontario", "British Columbia"],
  studyFields: ["Computer Science", "Data Science & AI"],
  fundingSources: ["Personal Savings", "Family Support"],
  skills: ["Python", "JavaScript", "SQL", "Machine Learning"],
  programTypes: ["Postgraduate Diploma", "Master's Degree"]
};

const INITIAL_APPLICATIONS = [
  {
    id: 1,
    title: "Cloud Computing - Humber College",
    deadline: "2026-10-01",
    status: "In Progress",
    items: [
      { name: "Online Application Form", done: true, ai: "Ready to start" },
      { name: "Academic Transcripts", done: true, ai: "Can reuse from your profile" },
      { name: "English Language Test", done: false, ai: "Upload required" },
      { name: "Statement of Purpose", done: false, ai: "Needs customization for program" },
      { name: "Resume / CV", done: false, ai: "Upload required" },
      { name: "Financial Proof", done: true, ai: "Can reuse from application" },
      { name: "Application Fee Payment", done: false, ai: "$100 estimated" },
    ],
  },
  {
    id: 2,
    title: "Data Science - Global Tech Institute",
    deadline: "2026-11-15",
    status: "In Progress",
    items: [
      { name: "Online Application Form", done: true, ai: "All fields validated" },
      { name: "Academic Transcripts", done: true, ai: "Documents verified" },
      { name: "English Language Test", done: false, ai: "Upload required" },
      { name: "Statement of Purpose", done: false, ai: "Score 72% - needs improvement" },
      { name: "Letters of Recommendation (2)", done: true, ai: "Both uploaded" },
      { name: "Financial Proof", done: true, ai: "Documents available" },
      { name: "Application Fee Payment", done: false, ai: "$95 estimated" },
    ],
  },
];

const INITIAL_ANALYSIS = {
  overall_score: 84,
  breakdown: {
    academic: { score: 89, weight: 25, status: "Strong" },
    language: { score: 90, weight: 20, status: "Strong" },
    financial: { score: 85, weight: 20, status: "Strong" },
    career: { score: 82, weight: 20, status: "High Demand" },
    visa_pr: { score: 88, weight: 15, status: "Favorable" }
  },
  recommendations: [
    { career: "AI / ML Engineer", score: 94 },
    { career: "Data Scientist", score: 90 },
    { career: "Full Stack Developer", score: 87 },
    { career: "Cloud Solutions Architect", score: 84 }
  ],
  risks_and_gaps: [
    "Verify provincial PNP tech draw cutoff points for Ontario OINP.",
    "Ensure minimum CAD $20,635 available for standard Canadian GIC deposit."
  ],
  actionable_tips: [
    "Retake IELTS writing to achieve 7.0+ for maximal CRS Express Entry score boost.",
    "Show GIC Certificate ($20,635 CAD) to maximize financial readiness score.",
    "Target British Columbia and Ontario tech streams for expedited provincial nomination."
  ],
  timestamp: new Date().toISOString()
};

// ==========================================
// CLIENT-SIDE SCORING ENGINE (OFFLINE FALLBACK)
// ==========================================
function calculateLocalScoring(profile, multiSelect) {
  const cgpaNum = parseFloat(profile.cgpa) || 7.5;
  const normCgpa = cgpaNum <= 10.0 ? cgpaNum / 10.0 : cgpaNum / 100.0;
  let acadScore = Math.min(Math.max(normCgpa * 100.0, 40.0), 100.0);
  if (["Bachelor's", "Master's"].includes(profile.highestQualification)) {
    acadScore = Math.min(100.0, acadScore + 5);
  }

  const overallIelts = parseFloat(profile.ieltsOverall) || 6.5;
  const listening = parseFloat(profile.ieltsListening) || 6.5;
  const reading = parseFloat(profile.ieltsReading) || 6.5;
  const writing = parseFloat(profile.ieltsWriting) || 6.0;
  const speaking = parseFloat(profile.ieltsSpeaking) || 6.0;

  const minBand = Math.min(listening, reading, writing, speaking);
  const gaps = [];

  if (minBand < 6.0) {
    gaps.push(`Sub-band below SDS requirement (6.0). Lowest: ${minBand}`);
  }

  let langScore = 72.0;
  if (overallIelts >= 7.5) langScore = 98.0;
  else if (overallIelts >= 7.0) langScore = 90.0;
  else if (overallIelts >= 6.5) langScore = 82.0;

  const budget = parseFloat(profile.availableBudget) || 35000;
  let finScore = 60.0;
  if (budget >= 45000) finScore = 95.0;
  else if (budget >= 35000) finScore = 85.0;
  else if (budget >= 25000) finScore = 72.0;
  else {
    finScore = 55.0;
    gaps.push("Budget may be tight for 1-year tuition + living costs in high-density areas");
  }

  const skillsLower = (multiSelect.skills || []).map(s => s.toLowerCase());
  let careerScore = 70.0;
  if (skillsLower.length >= 3) careerScore += 15;
  if (skillsLower.some(s => ["python", "machine learning", "cloud", "aws", "react"].includes(s))) {
    careerScore += 10;
  }
  careerScore = Math.min(100, careerScore);

  const primaryProvince = (multiSelect.provinces && multiSelect.provinces[0]) || "Ontario";
  const provinceBonuses = {
    "Ontario": 88.0,
    "British Columbia": 90.0,
    "Alberta": 85.0,
    "Nova Scotia": 82.0,
    "Manitoba": 84.0
  };
  let visaScore = provinceBonuses[primaryProvince] || 80.0;
  if (gaps.length > 0) visaScore -= 5.0;

  const composite = Math.round(
    (acadScore * 0.25) +
    (langScore * 0.20) +
    (finScore * 0.20) +
    (careerScore * 0.20) +
    (visaScore * 0.15)
  );

  const careers = [];
  if (skillsLower.includes("python") || skillsLower.includes("machine learning")) {
    careers.push({ career: "AI / ML Engineer", score: Math.min(96, composite + 6) });
  }
  if (skillsLower.includes("sql") || skillsLower.includes("data science")) {
    careers.push({ career: "Data Scientist / Analyst", score: Math.min(94, composite + 4) });
  }
  if (skillsLower.includes("javascript") || skillsLower.includes("react")) {
    careers.push({ career: "Full Stack Developer", score: Math.min(92, composite + 2) });
  }
  if (skillsLower.includes("cloud") || skillsLower.includes("aws")) {
    careers.push({ career: "Cloud Solutions Architect", score: Math.min(90, composite + 1) });
  }
  if (careers.length === 0) {
    careers.push({ career: "Software Engineer", score: composite });
    careers.push({ career: "IT Systems Analyst", score: Math.max(75, composite - 5) });
  }

  return {
    overall_score: composite,
    breakdown: {
      academic: { score: Math.round(acadScore), weight: 25, status: acadScore >= 80 ? "Strong" : "Average" },
      language: { score: Math.round(langScore), weight: 20, status: langScore >= 80 ? "Strong" : "Needs Improvement" },
      financial: { score: Math.round(finScore), weight: 20, status: finScore >= 80 ? "Strong" : "Moderate" },
      career: { score: Math.round(careerScore), weight: 20, status: "High Demand" },
      visa_pr: { score: Math.round(visaScore), weight: 15, status: "Favorable" }
    },
    recommendations: careers,
    risks_and_gaps: gaps.length ? gaps : ["Ensure all academic transcripts are WES-evaluated if required."],
    actionable_tips: [
      writing < 6.5 ? "Retake IELTS writing to achieve 6.5+ for a +6% score increase" : "IELTS writing meets SDS guidelines",
      "Show GIC Certificate ($20,635 CAD) to maximize financial readiness score",
      `Target ${primaryProvince} PNP streams for accelerated permanent residency pathways`
    ],
    timestamp: new Date().toISOString()
  };
}

// ==========================================
// CONTEXT CREATION
// ==========================================

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  // 1. Profile Data
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem("arvian_profile");
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  // 2. Multi-select checkboxes
  const [multiSelect, setMultiSelect] = useState(() => {
    try {
      const saved = localStorage.getItem("arvian_multiselect");
      return saved ? JSON.parse(saved) : INITIAL_MULTI_SELECT;
    } catch {
      return INITIAL_MULTI_SELECT;
    }
  });

  // 3. Analysis Results
  const [analysisResult, setAnalysisResult] = useState(() => {
    try {
      const saved = localStorage.getItem("arvian_analysis");
      return saved ? JSON.parse(saved) : INITIAL_ANALYSIS;
    } catch {
      return INITIAL_ANALYSIS;
    }
  });

  // 4. Applications Tracker
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem("arvian_applications");
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // 5. Chat Messages
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("arvian_chat");
      return saved ? JSON.parse(saved) : [
        {
          id: 1,
          sender: "ai",
          text: "Hi! I'm here to help with your study and PR pathway. Ask me anything about your programs, scores, or applications.",
          time: "10:00 AM"
        }
      ];
    } catch {
      return [
        {
          id: 1,
          sender: "ai",
          text: "Hi! I'm here to help with your study and PR pathway. Ask me anything about your programs, scores, or applications.",
          time: "10:00 AM"
        }
      ];
    }
  });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("arvian_profile", JSON.stringify(profileData));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [profileData]);

  useEffect(() => {
    try {
      localStorage.setItem("arvian_multiselect", JSON.stringify(multiSelect));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [multiSelect]);

  useEffect(() => {
    try {
      localStorage.setItem("arvian_analysis", JSON.stringify(analysisResult));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [analysisResult]);

  useEffect(() => {
    try {
      localStorage.setItem("arvian_applications", JSON.stringify(applications));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem("arvian_chat", JSON.stringify(chatMessages));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [chatMessages]);

  // Update profile fields
  const updateProfileField = (name, value) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Toggle multi-select checkbox arrays
  const toggleMultiSelect = (key, value) => {
    setMultiSelect(prev => {
      const currentList = prev[key] || [];
      const updated = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return { ...prev, [key]: updated };
    });
  };

  // Toggle checklist item
  const toggleApplicationItem = (applicationId, itemIndex) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id !== applicationId) return app;
        const updatedItems = app.items.map((item, idx) =>
          idx === itemIndex ? { ...item, done: !item.done } : item
        );
        return { ...app, items: updatedItems };
      })
    );
  };

  // Add new application
  const addApplication = (newApp) => {
    setApplications(prev => [...prev, newApp]);
  };

  // Add chat message
  const addChatMessage = (msg) => {
    setChatMessages(prev => [...prev, msg]);
  };

  // Main analyze profile function: calls FastAPI backend if running, falls back to local scoring
  const analyzeProfile = async () => {
    const preferredProvince = (multiSelect.provinces && multiSelect.provinces[0]) || "Ontario";
    let workExperienceYears = 1;
    switch (profileData.workExperience) {
      case "Less than 1 year": workExperienceYears = 0.5; break;
      case "1–2 years": workExperienceYears = 1; break;
      case "2–5 years": workExperienceYears = 3; break;
      case "5+ years": workExperienceYears = 5; break;
      default: workExperienceYears = 1;
    }

    const payload = {
      cgpa: Number(profileData.cgpa) || 7.5,
      qualification: profileData.highestQualification || "Bachelor's",
      ielts_overall: Number(profileData.ieltsOverall) || 6.5,
      ielts_listening: Number(profileData.ieltsListening) || 6.5,
      ielts_reading: Number(profileData.ieltsReading) || 6.5,
      ielts_writing: Number(profileData.ieltsWriting) || 6.0,
      ielts_speaking: Number(profileData.ieltsSpeaking) || 6.0,
      available_budget_cad: Number(profileData.availableBudget) || 35000,
      annual_income_cad: Number(profileData.annualFamilyIncome) || 25000,
      funding_sources: multiSelect.fundingSources || [],
      work_experience_years: workExperienceYears,
      skills: multiSelect.skills || [],
      preferred_province: preferredProvince
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        // Format if standard scoring engine output
        const formatted = {
          ...data,
          timestamp: new Date().toISOString(),
          source: "FastAPI Backend"
        };
        setAnalysisResult(formatted);
        return { success: true, data: formatted, source: "backend" };
      }
    } catch {
      // Backend is offline, run robust local scoring model
    }

    const localResult = calculateLocalScoring(profileData, multiSelect);
    localResult.source = "Local Engine (Offline Fallback)";
    setAnalysisResult(localResult);
    return { success: true, data: localResult, source: "local" };
  };

  const value = {
    profileData,
    updateProfileField,
    multiSelect,
    toggleMultiSelect,
    analysisResult,
    setAnalysisResult,
    analyzeProfile,
    applications,
    toggleApplicationItem,
    addApplication,
    chatMessages,
    addChatMessage
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
}
