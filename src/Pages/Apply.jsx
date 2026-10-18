import React, { useState } from "react";
import { useStudent } from "../context/StudentContext.jsx";
import "./Apply.css";

// Helper to calculate days remaining until deadline
function getDaysRemaining(deadlineStr) {
  if (!deadlineStr) return null;
  const deadlineDate = new Date(deadlineStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { text: "Deadline Passed", status: "passed" };
  if (diffDays === 0) return { text: "Due Today!", status: "urgent" };
  if (diffDays <= 14) return { text: `${diffDays} days left`, status: "urgent" };
  return { text: `${diffDays} days left`, status: "normal" };
}

// AI Copilot guidance generator for individual checklist requirements
function getAiGuidanceForRequirement(itemName, appTitle) {
  const lower = itemName.toLowerCase();

  if (lower.includes("statement of purpose") || lower.includes("sop")) {
    return {
      title: "Statement of Purpose AI Copilot",
      tip: `Tailor your SOP directly to ${appTitle}. Structure your essay with: (1) Academic foundations & key technical capstones, (2) Career motivations, (3) Why this specific faculty & curriculum matches your goals, and (4) Clear post-graduation intent. Keep length between 750–1,000 words.`,
      targetPage: "AI Chat",
      actionText: "Draft SOP with AI Copilot"
    };
  }

  if (lower.includes("english") || lower.includes("ielts") || lower.includes("toefl")) {
    return {
      title: "Language Proficiency Verification",
      tip: "Ensure your IELTS Academic score meets the minimum 6.5 overall band (with no sub-band below 6.0) or TOEFL iBT 88+. Upload your official Test Report Form (TRF) scan or order electronic score reporting via institutional code.",
      targetPage: "Profile",
      actionText: "Update IELTS Scores"
    };
  }

  if (lower.includes("transcript") || lower.includes("academic")) {
    return {
      title: "Academic Transcripts & Credential Evaluation",
      tip: "Upload consolidated official semester marksheets and provisional degree certificate in a single legible PDF (< 10MB). For Canadian universities, ensure grading scale (percentage or CGPA conversion) is visible.",
      targetPage: "Profile",
      actionText: "View Academic Details"
    };
  }

  if (lower.includes("resume") || lower.includes("cv")) {
    return {
      title: "Canadian-Standard Resume / CV",
      tip: "Format your resume in standard 1–2 page reverse-chronological order without personal photos or marital status. Highlight technical skill proficiencies, GitHub/portfolio links, internships, and measurable project impact.",
      targetPage: "AI Chat",
      actionText: "Consult AI on Resume"
    };
  }

  if (lower.includes("financial") || lower.includes("fund") || lower.includes("proof")) {
    return {
      title: "Financial Proof & GIC Requirements",
      tip: "Verify adequate proof of funds: 1st year tuition fee plus IRCC living cost threshold ($20,635 CAD). Prepare 6-month bank statements, education loan sanction letter, or Scotiabank/CIBC GIC confirmation.",
      targetPage: "Score Breakdown",
      actionText: "Review Financial Health"
    };
  }

  if (lower.includes("fee") || lower.includes("payment")) {
    return {
      title: "Application Processing Fee",
      tip: "Pay the required non-refundable application fee ($95–$150 CAD / ₹1,500–₹3,000 INR) through international credit card, Flywire, or the college portal. Keep payment reference number for tracking.",
      targetPage: "AI Chat",
      actionText: "Payment Gateway Help"
    };
  }

  if (lower.includes("recommendation") || lower.includes("lor")) {
    return {
      title: "Letters of Recommendation (LOR)",
      tip: "Obtain 2 academic/professional references on official institutional letterhead. Ensure your referees have active institutional email addresses (.edu/.ac.in) for automated email verification.",
      targetPage: "AI Chat",
      actionText: "LOR Guidance"
    };
  }

  return {
    title: "Application Requirement AI Guidance",
    tip: "Verify all documents match the official institution admissions checklist. Documents should be in clear PDF format with correct filenames.",
    targetPage: "AI Chat",
    actionText: "Ask AI Assistant"
  };
}

const PRESET_PROGRAMS = [
  {
    title: "M.Sc. in Applied Computing (AI) - University of Toronto",
    deadline: "2026-12-01",
    fee: "$34,000 CAD"
  },
  {
    title: "B.Tech in Artificial Intelligence - IIT Hyderabad",
    deadline: "2026-07-15",
    fee: "₹2,25,000 INR"
  },
  {
    title: "Big Data Analytics - Seneca Polytechnic",
    deadline: "2026-11-01",
    fee: "$18,500 CAD"
  },
  {
    title: "Full Stack Web Systems - Delhi Technological University (DTU)",
    deadline: "2026-06-30",
    fee: "₹1,90,000 INR"
  },
  {
    title: "Post-Degree Diploma in Web & Mobile - Langara College",
    deadline: "2026-10-15",
    fee: "$17,200 CAD"
  },
  {
    title: "Cyber Security Analysis - Southern Alberta Institute of Tech (SAIT)",
    deadline: "2026-11-30",
    fee: "$19,800 CAD"
  }
];

let chatMsgCounter = 5000;
function createChatMessage(sender, text) {
  chatMsgCounter += 1;
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return { id: chatMsgCounter, sender, text, time };
}

const Apply = ({ setSelectedPage }) => {
  const {
    applications,
    toggleApplicationItem,
    addApplication,
    addChatMessage,
    profileData
  } = useStudent();

  // Active Modals State
  const [detailsAppId, setDetailsAppId] = useState(null);
  const [continueAppId, setContinueAppId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New Application Form State
  const [newTitle, setNewTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("2026-11-30");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getProgress = (items) => {
    if (!items || items.length === 0) return 0;
    const completed = items.filter((item) => item.done).length;
    return Math.round((completed / items.length) * 100);
  };

  const getStatus = (progress) => {
    if (progress === 0) return "Not Started";
    if (progress === 100) return "Completed";
    return "In Progress";
  };

  // Find currently active application objects reactively from context
  const detailsApp = applications.find((a) => a.id === detailsAppId) || null;
  const continueApp = applications.find((a) => a.id === continueAppId) || null;

  // Next incomplete requirement for Continue modal
  const nextIncompleteIdx = continueApp
    ? continueApp.items.findIndex((item) => !item.done)
    : -1;

  // Handle Complete Step in Continue Modal
  const handleCompleteCurrentStep = () => {
    if (!continueApp || nextIncompleteIdx === -1) return;
    const currentItem = continueApp.items[nextIncompleteIdx];
    toggleApplicationItem(continueApp.id, nextIncompleteIdx);
    showToast(`✓ Marked "${currentItem.name}" as completed!`);
  };

  // Launch AI Advisor with personalized context and navigate to AI Chat
  const handleAskAiAdvisor = (app, currentItem, customQuestion = null) => {
    const collegeName = app.title.split("-")[1]?.trim() || app.title;
    const guidance = getAiGuidanceForRequirement(currentItem.name, app.title);

    const defaultQuestion = `I'm continuing my application for "${app.title}". I'm on the "${currentItem.name}" step — what are the best advice, formatting rules, and approval criteria for ${collegeName}?`;
    const questionText = customQuestion || defaultQuestion;

    const userMsg = createChatMessage("user", questionText);
    const aiResponseText =
      `Here is your personalized roadmap for **${currentItem.name}** (${app.title}):\n\n` +
      `✦ **Expert Strategy:**\n${guidance.tip}\n\n` +
      `📋 **Approval Guidelines for ${collegeName}:**\n` +
      `1. **Format & Verification:** Standard PDF format (<10MB) with official seal/letterhead, labeled \`[YourName]_${currentItem.name.replace(/\\s+/g, '_')}.pdf\`.\n` +
      `2. **Department Fit:** Explicitly cite faculty labs or specific course modules offered at ${collegeName}.\n` +
      `3. **Profile Consistency:** All metrics must match your student profile (${profileData?.highestQualification || "Bachelor's"} with ${profileData?.cgpa || "8.4"} CGPA).\n\n` +
      `Would you like me to review your draft, check document requirements, or help write the next paragraph?`;

    const aiMsg = createChatMessage("ai", aiResponseText);

    if (addChatMessage) {
      addChatMessage(userMsg);
      addChatMessage(aiMsg);
    }

    setContinueAppId(null);
    if (setSelectedPage) {
      setSelectedPage("AI Chat");
    }
  };

  // Handle Add Application Submission
  const handleCreateApplication = (presetTitle = null, presetDeadline = null) => {
    const titleToUse = (presetTitle || newTitle).trim();
    const deadlineToUse = presetDeadline || newDeadline;

    if (!titleToUse) {
      alert("Please enter or select a program title.");
      return;
    }

    const nextId = applications.length > 0 ? Math.max(...applications.map((a) => a.id)) + 1 : 1;
    const newApp = {
      id: nextId,
      title: titleToUse,
      deadline: deadlineToUse,
      status: "Not Started",
      items: [
        { name: "Online Application Form", done: false, ai: "Ready to start" },
        { name: "Academic Transcripts", done: false, ai: "Requires verified marksheets" },
        { name: "English Language Test", done: false, ai: "Upload official TRF" },
        { name: "Statement of Purpose", done: false, ai: "Needs customization for program" },
        { name: "Resume / CV", done: false, ai: "Canadian standard format" },
        { name: "Financial Documents", done: false, ai: "Proof of funds ($20,635 CAD GIC/tuition)" },
        { name: "Application Fee Payment", done: false, ai: "Payment receipt required" },
      ],
    };

    addApplication(newApp);
    setShowAddModal(false);
    setNewTitle("");
    showToast(`🎉 Application added for "${titleToUse}"`);
  };

  return (
    <div className="apply-page">

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="apply-toast">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}>✕</button>
        </div>
      )}

      {/* HEADING */}
      <div className="apply-heading">
        <h1>My Applications</h1>
        <p>Track checklists, deadlines, and live AI requirements for your university applications</p>
      </div>

      {/* APPLICATIONS LIST */}
      <div className="applications-list">
        {applications.map((application) => {
          const progress = getProgress(application.items);
          const status = getStatus(progress);
          const daysInfo = getDaysRemaining(application.deadline);
          const completedCount = application.items.filter((i) => i.done).length;

          return (
            <div className="application-card" key={application.id}>

              {/* CARD TOP */}
              <div className="application-top">
                <div>
                  <h2>{application.title}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px", flexWrap: "wrap" }}>
                    <p className="deadline" style={{ margin: 0 }}>
                      📅 Deadline: {application.deadline}
                    </p>
                    {daysInfo && (
                      <span
                        style={{
                          fontSize: "12px",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          background: daysInfo.status === "urgent" ? "#451a1a" : "#172b4d",
                          color: daysInfo.status === "urgent" ? "#f87171" : "#38bdf8",
                          border: daysInfo.status === "urgent" ? "1px solid #7f1d1d" : "1px solid #234e70",
                          fontWeight: "600"
                        }}
                      >
                        ⏱ {daysInfo.text}
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={`application-status ${
                    status.toLowerCase().replace(" ", "-")
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* PROGRESS */}
              <div className="progress-header">
                <span>
                  {completedCount} of {application.items.length} items completed
                </span>
                <strong>{progress}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* CHECKLIST ITEMS */}
              <div className="application-items">
                {application.items.map((item, index) => (
                  <div
                    className="application-item"
                    key={index}
                    onClick={() => {
                      toggleApplicationItem(application.id, index);
                      showToast(
                        item.done
                          ? `Unchecked "${item.name}"`
                          : `✓ Completed "${item.name}"`
                      );
                    }}
                    title="Click to toggle completion"
                  >
                    <button
                      type="button"
                      className={`check-circle ${item.done ? "checked" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleApplicationItem(application.id, index);
                        showToast(
                          item.done
                            ? `Unchecked "${item.name}"`
                            : `✓ Completed "${item.name}"`
                        );
                      }}
                    >
                      {item.done ? "✓" : ""}
                    </button>

                    <div className="item-content">
                      <p className={item.done ? "item-name completed" : "item-name"}>
                        {item.name}
                      </p>
                      <p className="ai-status">
                        <span>AI:</span> {item.ai}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CARD ACTION BUTTONS */}
              <div className="application-buttons">
                <button
                  type="button"
                  className="details-btn"
                  onClick={() => setDetailsAppId(application.id)}
                >
                  📋 View Details
                </button>

                <button
                  type="button"
                  className="continue-btn"
                  onClick={() => setContinueAppId(application.id)}
                >
                  ▶ Continue
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* ADD NEW APPLICATION BUTTON */}
      <button
        type="button"
        className="add-application-btn"
        onClick={() => setShowAddModal(true)}
      >
        <span>+ Add New Application</span>
        <strong>→</strong>
      </button>

      {/* ========================================================
          1️⃣ VIEW DETAILS MODAL
      ======================================================== */}
      {detailsApp && (
        <div className="apply-modal-overlay" onClick={() => setDetailsAppId(null)}>
          <div
            className="apply-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="apply-modal-header">
              <div>
                <span className="apply-modal-tag">Application Details</span>
                <h2>{detailsApp.title}</h2>
              </div>
              <button
                type="button"
                className="apply-modal-close"
                onClick={() => setDetailsAppId(null)}
              >
                ✕
              </button>
            </div>

            {/* METRICS ROW */}
            <div className="details-metrics-grid">
              <div className="details-metric-item">
                <span className="metric-label">Deadline</span>
                <span className="metric-value">{detailsApp.deadline}</span>
                {(() => {
                  const d = getDaysRemaining(detailsApp.deadline);
                  return d ? (
                    <span className={`metric-sub ${d.status}`}>
                      ⏱ {d.text}
                    </span>
                  ) : null;
                })()}
              </div>

              <div className="details-metric-item">
                <span className="metric-label">Status</span>
                <span className="metric-value">
                  {getStatus(getProgress(detailsApp.items))}
                </span>
                <span className="metric-sub">
                  {detailsApp.items.filter((i) => i.done).length} / {detailsApp.items.length} Tasks
                </span>
              </div>

              <div className="details-metric-item">
                <span className="metric-label">Progress</span>
                <span className="metric-value">
                  {getProgress(detailsApp.items)}%
                </span>
                <span className="metric-sub cyan">AI Tracked</span>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="progress-bar" style={{ margin: "18px 0 22px" }}>
              <div
                className="progress-fill"
                style={{ width: `${getProgress(detailsApp.items)}%` }}
              ></div>
            </div>

            {/* DETAILED CHECKLIST WITH IN-MODAL TOGGLE */}
            <div className="modal-checklist-section">
              <h3>Requirements Checklist (Click to Update)</h3>
              <div className="modal-items-list">
                {detailsApp.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`modal-item-row ${item.done ? "done" : ""}`}
                    onClick={() => {
                      toggleApplicationItem(detailsApp.id, idx);
                      showToast(
                        item.done
                          ? `Unchecked "${item.name}"`
                          : `✓ Completed "${item.name}"`
                      );
                    }}
                  >
                    <button
                      type="button"
                      className={`check-circle ${item.done ? "checked" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleApplicationItem(detailsApp.id, idx);
                        showToast(
                          item.done
                            ? `Unchecked "${item.name}"`
                            : `✓ Completed "${item.name}"`
                        );
                      }}
                    >
                      {item.done ? "✓" : ""}
                    </button>

                    <div style={{ flex: 1 }}>
                      <div className="modal-item-name">{item.name}</div>
                      <div className="modal-item-ai">
                        <span>AI Status:</span> {item.ai}
                      </div>
                    </div>

                    <span className={`modal-status-pill ${item.done ? "complete" : "pending"}`}>
                      {item.done ? "Completed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MODAL ACTIONS */}
            <div className="apply-modal-actions">
              <button
                type="button"
                className="continue-btn"
                onClick={() => {
                  setDetailsAppId(null);
                  setContinueAppId(detailsApp.id);
                }}
              >
                ▶ Continue Application Process
              </button>

              <button
                type="button"
                className="advisor-btn"
                onClick={() => {
                  setDetailsAppId(null);
                  if (setSelectedPage) setSelectedPage("AI Chat");
                }}
              >
                💬 Ask AI Advisor
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setDetailsAppId(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2️⃣ CONTINUE WORKFLOW MODAL
      ======================================================== */}
      {continueApp && (
        <div className="apply-modal-overlay" onClick={() => setContinueAppId(null)}>
          <div
            className="apply-modal-box continue-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="apply-modal-header">
              <div>
                <span className="apply-modal-tag">Application Workflow</span>
                <h2>{continueApp.title}</h2>
              </div>
              <button
                type="button"
                className="apply-modal-close"
                onClick={() => setContinueAppId(null)}
              >
                ✕
              </button>
            </div>

            {/* CASE A: ALL COMPLETED */}
            {nextIncompleteIdx === -1 ? (
              <div className="continue-complete-screen">
                <div className="complete-badge-big">🎉 100%</div>
                <h3>All Application Requirements Completed!</h3>
                <p>
                  Every document and requirement for <strong>{continueApp.title}</strong> has been
                  verified and marked ready. You are ready to submit your official application.
                </p>

                <div className="complete-next-steps">
                  <h4>Recommended Final Steps:</h4>
                  <ul>
                    <li>✓ Review all uploaded PDF attachments for legibility</li>
                    <li>✓ Confirm your passport expiration date is at least 6 months past intended travel</li>
                    <li>✓ Submit application through the official university portal</li>
                  </ul>
                </div>

                <div className="apply-modal-actions" style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    className="ai-hero-chat-btn"
                    onClick={() => {
                      setContinueAppId(null);
                      if (setSelectedPage) setSelectedPage("AI Chat");
                    }}
                  >
                    💬 Chat with Admissions Advisor →
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setContinueAppId(null)}
                  >
                    Back to Applications
                  </button>
                </div>
              </div>
            ) : (
              /* CASE B: ACTIVE PENDING REQUIREMENT - OPTIMIZED HERO AI ADVISOR */
              <div>
                {/* STEP PROGRESS INDICATOR */}
                <div className="continue-step-header">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="step-counter">
                      Step {nextIncompleteIdx + 1} of {continueApp.items.length}
                    </span>
                    <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: "600" }}>
                      {getProgress(continueApp.items)}% Completed
                    </span>
                  </div>
                  <span className="step-title-highlight">
                    {continueApp.items[nextIncompleteIdx].name}
                  </span>
                </div>

                <div className="progress-bar" style={{ margin: "10px 0 18px" }}>
                  <div
                    className="progress-fill"
                    style={{ width: `${getProgress(continueApp.items)}%` }}
                  ></div>
                </div>

                {/* ========================================================
                    HERO "ASK AI ADVISOR" POPUP SECTION
                ======================================================== */}
                {(() => {
                  const currentItem = continueApp.items[nextIncompleteIdx];
                  const guidance = getAiGuidanceForRequirement(
                    currentItem.name,
                    continueApp.title
                  );
                  const collegeName = continueApp.title.split("-")[1]?.trim() || continueApp.title;

                  return (
                    <div className="ai-advisor-hero-card">
                      <div className="ai-advisor-badge-row">
                        <div className="ai-beacon">
                          <span className="ai-beacon-dot"></span>
                          <span>AI Pathway Advisor Active</span>
                        </div>
                        <span className="ai-verified-tag">Live Consultation</span>
                      </div>

                      <div className="ai-advisor-hero-content">
                        <h3>Need Help with "{currentItem.name}"?</h3>
                        <p className="ai-advisor-hero-desc">
                          {guidance.tip}
                        </p>
                      </div>

                      {/* PRIMARY POPUP BUTTON: ASK AI ADVISOR & OPEN AI CHAT */}
                      <button
                        type="button"
                        className="ai-hero-chat-btn"
                        onClick={() => handleAskAiAdvisor(continueApp, currentItem)}
                      >
                        <span className="ai-btn-icon">✦</span>
                        <span className="ai-btn-text">Ask AI Advisor &amp; Open AI Chat</span>
                        <span className="ai-btn-arrow">→</span>
                      </button>

                      {/* INTERACTIVE QUICK PROMPT CHIPS */}
                      <div className="ai-quick-prompts-section">
                        <span className="quick-prompts-label">Instant 1-Click Questions:</span>
                        <div className="quick-prompts-chips">
                          <button
                            type="button"
                            className="prompt-chip"
                            onClick={() =>
                              handleAskAiAdvisor(
                                continueApp,
                                currentItem,
                                `How should I draft and structure my "${currentItem.name}" specifically for ${collegeName}?`
                              )
                            }
                          >
                            💬 "How to structure {currentItem.name}?"
                          </button>

                          <button
                            type="button"
                            className="prompt-chip"
                            onClick={() =>
                              handleAskAiAdvisor(
                                continueApp,
                                currentItem,
                                `What are the exact admission criteria and official guidelines for ${continueApp.title}?`
                              )
                            }
                          >
                            💬 "Admission guidelines for {collegeName}"
                          </button>

                          <button
                            type="button"
                            className="prompt-chip"
                            onClick={() =>
                              handleAskAiAdvisor(
                                continueApp,
                                currentItem,
                                `What are the most common rejection mistakes students make regarding ${currentItem.name}?`
                              )
                            }
                          >
                            💬 "Common rejection mistakes to avoid"
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* UPCOMING REQUIREMENTS REMINDER */}
                <div className="upcoming-tasks-box">
                  <h4>Remaining Tasks for this Application:</h4>
                  <div className="remaining-pills">
                    {continueApp.items
                      .map((item, idx) => ({ ...item, idx }))
                      .filter((item) => !item.done)
                      .map((item) => (
                        <span
                          key={item.idx}
                          className={`remaining-pill ${
                            item.idx === nextIncompleteIdx ? "active" : ""
                          }`}
                        >
                          {item.idx === nextIncompleteIdx ? "▶ " : "⏳ "}
                          {item.name}
                        </span>
                      ))}
                  </div>
                </div>

                {/* SECONDARY MANUAL ACTION BUTTONS */}
                <div className="continue-secondary-actions">
                  <button
                    type="button"
                    className="manual-complete-btn"
                    onClick={handleCompleteCurrentStep}
                  >
                    ✓ Mark "{continueApp.items[nextIncompleteIdx].name}" as Completed
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setContinueAppId(null)}
                  >
                    Done for Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          3️⃣ ADD NEW APPLICATION MODAL
      ======================================================== */}
      {showAddModal && (
        <div className="apply-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="apply-modal-box add-app-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="apply-modal-header">
              <div>
                <span className="apply-modal-tag">New Application</span>
                <h2>Add Target University Application</h2>
              </div>
              <button
                type="button"
                className="apply-modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ marginTop: "16px" }}>
              <p style={{ color: "#8fa3c5", fontSize: "14px", marginBottom: "12px" }}>
                Select from recommended accredited tech programs or enter a custom university pathway:
              </p>

              {/* QUICK PRESETS */}
              <div className="preset-grid">
                {PRESET_PROGRAMS.map((preset, pIdx) => (
                  <div
                    key={pIdx}
                    className="preset-card"
                    onClick={() => handleCreateApplication(preset.title, preset.deadline)}
                  >
                    <div className="preset-title">{preset.title}</div>
                    <div className="preset-meta">
                      <span>📅 {preset.deadline}</span>
                      <span>💰 {preset.fee}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CUSTOM ENTRY */}
              <div className="custom-app-form">
                <h4 style={{ fontSize: "15px", margin: "16px 0 8px" }}>Or Enter Custom Program:</h4>
                <label style={{ fontSize: "13px", color: "#8fa3c5", display: "block", marginBottom: "4px" }}>
                  Program Title &amp; Institution
                </label>
                <input
                  type="text"
                  placeholder="e.g. M.Sc. in Computer Science - University of British Columbia"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="add-input"
                />

                <label style={{ fontSize: "13px", color: "#8fa3c5", display: "block", margin: "12px 0 4px" }}>
                  Application Deadline
                </label>
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="add-input"
                />
              </div>

              {/* ACTIONS */}
              <div className="apply-modal-actions" style={{ marginTop: "22px" }}>
                <button
                  type="button"
                  className="continue-btn"
                  onClick={() => handleCreateApplication()}
                >
                  + Create Application Checklist
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Apply;