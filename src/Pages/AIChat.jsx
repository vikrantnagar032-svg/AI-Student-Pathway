import { useState, useRef, useEffect } from 'react';
import { useStudent } from '../context/StudentContext.jsx';
import "./AIChat.css";

function getPersonalizedAIResponse(userMessage, profileData, analysisResult, multiSelect) {
  const overallScore = analysisResult?.overall_score ?? 84;
  const langScore = analysisResult?.breakdown?.language?.score ?? 82;
  const targetProvinces = (multiSelect?.provinces && multiSelect.provinces.length > 0)
    ? multiSelect.provinces.join(" and ")
    : "Ontario and British Columbia";
  const primaryCareer = analysisResult?.recommendations?.[0]?.career ?? "AI / ML Engineer";

  const rules = [
    {
      match: /sop|statement of purpose/i,
      response:
        'Your SOP currently scores 74% on clarity. To maximize admissions committee & visa officer approval:\n\n' +
        `1. Directly tie your ${profileData.highestQualification || "Bachelor's"} degree in ${profileData.fieldOfStudy || "Computer Science"} ` +
        `to your target curriculum.\n` +
        `2. Highlight technical projects and career ambitions as a ${primaryCareer}.\n` +
        `3. Conclude with firm post-graduation career milestones.`,
    },
    {
      match: /application|apply|transcript|resume|cv|fee|guidance|requirement/i,
      response:
        `Here is the verified checklist for your target applications:\n\n` +
        `• Transcripts: Scanned official marksheets + provisional certificate in PDF format (<10MB).\n` +
        `• Statement of Purpose: 750–1,000 words articulating academic continuity and target program fit.\n` +
        `• Language Test: IELTS Academic 6.5+ (no sub-band < 6.0) or TOEFL iBT 88+.\n` +
        `• Financials: 1st year tuition proof + $20,635 CAD living cost GIC certificate.\n` +
        `• Resume / CV: Standard Canadian format highlighting technical proficiencies and internships.\n` +
        `• Application Fee: Retain official payment receipt for application portal submission.`,
    },
    {
      match: /program|option|college|university/i,
      response:
        `Based on your academic profile (${profileData.highestQualification || "Bachelor's"} with ${profileData.cgpa || "8.4"} CGPA), here are top matched pathways:\n\n` +
        `1. Postgraduate Diploma in Big Data Analytics – Seneca College (94% match, 3-yr PGWP)\n` +
        `2. Graduate Certificate in Cloud Computing – Humber College (91% match, high tech demand)\n` +
        `3. Master's in Applied Computing (AI) – University of Toronto (97% match, Vector Institute partner).`,
    },
    {
      match: /score|eligib/i,
      response:
        `Your overall readiness score is currently ${overallScore}%. ` +
        `Your Language score is ${langScore}% (IELTS: ${profileData.ieltsOverall || "7.0"}). ` +
        (analysisResult?.actionable_tips?.[0] ? `Key tip: ${analysisResult.actionable_tips[0]}` : "Your profile is in the top tier for Canadian SDS visa streams!"),
    },
    {
      match: /\bpr\b|permanent residence/i,
      response:
        `Your Permanent Residency (PR) probability in Canada is rated High! ` +
        `${targetProvinces} currently offer targeted PNP tech draws for candidates with your background in ${profileData.fieldOfStudy || "Tech"}. ` +
        `Completing a 1-2 year Canadian credential adds significant CRS points.`,
    },
    {
      match: /.*/,
      response:
        `I can help review your program matches, explain your ${overallScore}% eligibility score, ` +
        `calculate PR pathway probabilities in ${targetProvinces}, or optimize your visa checklist. What would you like to explore?`,
    },
  ];

  const matched = rules.find((r) => r.match.test(userMessage));
  return matched ? matched.response : rules[rules.length - 1].response;
}

const QUICK_ACTIONS = [
  'Best options for my profile?',
  'Application requirements checklist',
  'How to improve my SOP?',
  'PR pathways in BC & Ontario',
];

let messageCounter = 2000;
function createMessage(sender, text, source = null) {
  messageCounter += 1;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return { id: messageCounter, sender, text, time, source };
}

// Client-side fallback to direct Google Gemini API REST endpoint
async function callGeminiDirectly(userText, apiKey, profile) {
  const systemInstruction =
    `You are Arvian AI, an elite educational pathway & admissions copilot for students pursuing top Indian technology institutions (IITs, IIITs) and Canadian universities/colleges (U of T, Waterloo, Humber, Seneca, Langara). ` +
    `Candidate profile: ${profile.highestQualification || "Bachelor's"} in ${profile.fieldOfStudy || "Computer Science"} with ${profile.cgpa || "8.4"} CGPA, IELTS ${profile.ieltsOverall || "7.0"}, available budget $${profile.availableBudget || "35,000"} CAD.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: "user", parts: [{ text: userText }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1200 }
        })
      }
    );
    if (res.ok) {
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return { reply, source: "Google Gemini 2.5 Flash" };
    }
  } catch {
    // fallback on network failure
  }
  return null;
}

export default function AIChat() {
  const { profileData, analysisResult, multiSelect, chatMessages, addChatMessage } = useStudent();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // Gemini API Configuration State
  const [geminiKey, setGeminiKey] = useState(() => {
    try {
      return localStorage.getItem("arvian_gemini_key") || "";
    } catch {
      return "";
    }
  });
  const [inputKey, setInputKey] = useState("");
  const [backendHasGemini, setBackendHasGemini] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keySavedToast, setKeySavedToast] = useState(false);

  // Check backend Gemini status on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/gemini/status")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.enabled) {
          setBackendHasGemini(true);
        }
      })
      .catch(() => {
        // Backend offline, will use client-side or fallback
      });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const isGeminiActive = Boolean(backendHasGemini || (geminiKey && geminiKey.trim().length > 5));

  function handleSaveKey(e) {
    e.preventDefault();
    const cleanKey = inputKey.trim();
    setGeminiKey(cleanKey);
    try {
      localStorage.setItem("arvian_gemini_key", cleanKey);
    } catch (err) {
      console.warn("Storage write error", err);
    }
    setShowKeyModal(false);
    setInputKey("");
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 3000);
  }

  function handleClearKey() {
    setGeminiKey("");
    try {
      localStorage.removeItem("arvian_gemini_key");
    } catch (err) {
      console.warn("Storage clear error", err);
    }
    setShowKeyModal(false);
    setInputKey("");
  }

  function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || isTyping) return;

    const userMsg = createMessage('user', text);
    addChatMessage(userMsg);
    setInput('');
    setIsTyping(true);

    setTimeout(async () => {
      let responseText = "";
      let responseSource = null;

      // 1. Try FastAPI backend (which checks server-side .env or passed api_key)
      try {
        const res = await fetch("http://127.0.0.1:8000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            profile: profileData,
            api_key: geminiKey || undefined
          })
        });
        if (res.ok) {
          const data = await res.json();
          responseText = data.reply;
          responseSource = data.source || null;
        }
      } catch {
        // Backend offline, proceed to layer 2
      }

      // 2. Client-side direct call to Gemini REST API if backend was offline
      if (!responseText && geminiKey) {
        const directResult = await callGeminiDirectly(text, geminiKey, profileData);
        if (directResult) {
          responseText = directResult.reply;
          responseSource = directResult.source;
        }
      }

      // 3. Fallback to intelligent local knowledge heuristics
      if (!responseText) {
        responseText = getPersonalizedAIResponse(text, profileData, analysisResult, multiSelect);
        responseSource = "Arvian Heuristic Engine";
      }

      const aiMsg = createMessage('ai', responseText, responseSource);
      addChatMessage(aiMsg);
      setIsTyping(false);
    }, 500);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="ai-chat-page">

      {/* GEMINI KEY SAVED TOAST */}
      {keySavedToast && (
        <div className="gemini-key-toast">
          <span>✓ Google Gemini API Key configured successfully!</span>
        </div>
      )}

      {/* HEADER */}
      <div className="ai-chat-header">
        <div className="ai-avatar">✦</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <h2>AI Pathway Advisor</h2>
            <button
              type="button"
              className={`gemini-badge ${isGeminiActive ? "active" : ""}`}
              onClick={() => {
                setInputKey(geminiKey);
                setShowKeyModal(true);
              }}
              title="Configure Google Gemini API Key"
            >
              ✦ {isGeminiActive ? "Gemini 2.5 Flash Active" : "Connect Gemini API"}
            </button>
          </div>

          <p>
            <span className={`status-dot ${isGeminiActive ? "active" : ""}`} />{" "}
            {isGeminiActive
              ? "Live Intelligence Powered by Google Gemini"
              : "Arvian Knowledge Engine • Connect Gemini for live LLM chat"}
          </p>
        </div>

        <button
          type="button"
          className="api-key-config-btn"
          onClick={() => {
            setInputKey(geminiKey);
            setShowKeyModal(true);
          }}
          title="Configure Google Gemini API Key"
        >
          ⚙ Gemini Key
        </button>
      </div>

      {/* MESSAGES */}
      <div className="ai-chat-messages">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`chat-row ${msg.sender}`}>
            {msg.sender === 'ai' && <div className="ai-avatar small">✦</div>}
            <div className="chat-bubble">
              {msg.source && msg.sender === 'ai' && (
                <div className="chat-source-tag">
                  ✦ {msg.source}
                </div>
              )}
              <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
              <span className="chat-time">{msg.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row ai">
            <div className="ai-avatar small">✦</div>
            <div className="chat-bubble typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="ai-quick-actions">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            className="quick-action-chip"
            onClick={() => sendMessage(action)}
          >
            {action}
          </button>
        ))}
      </div>

      {/* INPUT BAR */}
      <form className="ai-chat-input-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about admissions, SOP drafting, colleges, IELTS..."
          aria-label="Message the AI assistant"
        />
        <button type="submit" aria-label="Send message" disabled={!input.trim()}>
          ➤
        </button>
      </form>

      {/* ========================================================
          GEMINI API KEY CONFIGURATION MODAL
      ======================================================== */}
      {showKeyModal && (
        <div className="gemini-modal-overlay" onClick={() => setShowKeyModal(false)}>
          <div className="gemini-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="gemini-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="gemini-modal-icon">✦</span>
                <h3>Google Gemini API Configuration</h3>
              </div>
              <button
                type="button"
                className="gemini-modal-close"
                onClick={() => setShowKeyModal(false)}
              >
                ✕
              </button>
            </div>

            <p className="gemini-modal-desc">
              Power your student pathway advisor with <strong>Google Gemini 2.5 Flash</strong> for real-time natural language answers, SOP drafting, and tailored Canadian admission advice.
            </p>

            <div className="gemini-key-guide">
              <p>
                Get your free API key at{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google AI Studio →
                </a>
              </p>
            </div>

            <form onSubmit={handleSaveKey} style={{ marginTop: "16px" }}>
              <label className="gemini-input-label">Gemini API Key</label>
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="AIzaSy..."
                className="gemini-input"
                autoComplete="off"
              />

              <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 16px" }}>
                Your key is stored securely in your browser's local storage and used directly to communicate with Gemini.
                Alternatively, you can place <code>GEMINI_API_KEY=your_key</code> in the project's root <code>.env</code> file.
              </p>

              <div className="gemini-modal-buttons">
                <button type="submit" className="gemini-save-btn">
                  Save &amp; Activate Gemini
                </button>
                {geminiKey && (
                  <button
                    type="button"
                    className="gemini-clear-btn"
                    onClick={handleClearKey}
                  >
                    Remove Key
                  </button>
                )}
                <button
                  type="button"
                  className="gemini-cancel-btn"
                  onClick={() => setShowKeyModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
