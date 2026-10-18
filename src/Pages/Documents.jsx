import React, { useState } from "react";
import { useStudent } from "../context/StudentContext.jsx";

const REQUIRED_DOCUMENTS = [
  {
    id: "transcripts",
    title: "Official Academic Transcripts",
    category: "Academic",
    status: "Verified",
    description: "Consolidated semester-wise marksheets and provisional/final degree certificates.",
    aiNote: "CGPA 8.4 verified against official transcript scale."
  },
  {
    id: "ielts",
    title: "English Language Proficiency (IELTS / TOEFL)",
    category: "Language",
    status: "Action Required",
    description: "Official Test Report Form (TRF) showing Listening, Reading, Writing, and Speaking bands.",
    aiNote: "Upload required to confirm overall 7.0 band meets university cutoff."
  },
  {
    id: "sop",
    title: "Statement of Purpose (SOP)",
    category: "Essays",
    status: "Draft Ready",
    description: "Personal statement tailored to intended academic department and research goals.",
    aiNote: "AI Copilot analysis: 72% alignment. Recommend adding faculty research focus."
  },
  {
    id: "resume",
    title: "Canadian-Format Resume / CV",
    category: "Professional",
    status: "Verified",
    description: "Standard 2-page reverse-chronological CV highlighting software projects and skills.",
    aiNote: "Includes Python, SQL, Machine Learning keywords matching target programs."
  },
  {
    id: "financial",
    title: "Proof of Financial Support",
    category: "Financial",
    status: "Verified",
    description: "Bank balance certificates, loan sanction letters, or Scotiabank GIC receipts.",
    aiNote: "Available funds meet standard IRCC threshold ($20,635 CAD living + 1st year fees)."
  },
  {
    id: "passport",
    title: "Passport Identification",
    category: "Identity",
    status: "Verified",
    description: "Valid international passport bio pages with minimum 6 months validity.",
    aiNote: "Passport valid through 2029."
  }
];

function Documents({ setSelectedPage }) {
  const { profileData } = useStudent();
  const [docs, setDocs] = useState(REQUIRED_DOCUMENTS);

  const isIndian = profileData.nationality?.trim().toLowerCase() === "indian";
  const displayDocs = isIndian ? docs.filter((d) => d.id !== "passport") : docs;

  const toggleStatus = (id) => {
    setDocs((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const nextStatus = d.status === "Verified" ? "Action Required" : "Verified";
        return { ...d, status: nextStatus };
      })
    );
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "30px 20px 120px", color: "white" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "8px" }}>Documents Vault</h1>
        <p style={{ color: "#8fa3c5", fontSize: "15px" }}>
          Upload, verify, and organize mandatory admission and visa documents.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {displayDocs.map((doc) => (
          <div
            key={doc.id}
            style={{
              background: "#121d34",
              border: "1px solid #273957",
              borderRadius: "14px",
              padding: "18px 20px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    color: "#00d7d0",
                    background: "#083344",
                    padding: "2px 8px",
                    borderRadius: "4px"
                  }}
                >
                  {doc.category}
                </span>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#f8fafc", marginTop: "6px" }}>
                  {doc.title}
                </h3>
              </div>

              <button
                onClick={() => toggleStatus(doc.id)}
                style={{
                  background: doc.status === "Verified" ? "#0d382b" : "#3b1e22",
                  color: doc.status === "Verified" ? "#34d399" : "#f87171",
                  border: doc.status === "Verified" ? "1px solid #059669" : "1px solid #991b1b",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                {doc.status === "Verified" ? "✓ Verified" : "⏳ Action Required"}
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "#94a3b8", margin: "6px 0 10px" }}>
              {doc.description}
            </p>

            <div
              style={{
                background: "#0d2238",
                border: "1px solid #143e69",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "12px",
                color: "#7dd3fc"
              }}
            >
              <span>✦ AI Insight:</span> {doc.aiNote}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <button
          onClick={() => setSelectedPage && setSelectedPage("Apply")}
          style={{
            background: "#3188ed",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "12px 24px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Return to Applications →
        </button>
      </div>
    </div>
  );
}

export default Documents;
