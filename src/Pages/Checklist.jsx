import React from "react";
import { useStudent } from "../context/StudentContext.jsx";

function Checklist({ setSelectedPage }) {
  const { applications, toggleApplicationItem } = useStudent();

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "30px 20px 120px", color: "white" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "8px" }}>Application Checklist</h1>
        <p style={{ color: "#8fa3c5", fontSize: "15px" }}>
          Consolidated checklist of all document submissions, testing requirements, and deadlines.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {applications.map((app) => {
          const completedCount = app.items.filter((i) => i.done).length;
          const percent = Math.round((completedCount / app.items.length) * 100);

          return (
            <div
              key={app.id}
              style={{
                background: "#121d34",
                border: "1px solid #273957",
                borderRadius: "16px",
                padding: "20px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: "600", color: "#f8fafc" }}>{app.title}</h3>
                  <span style={{ fontSize: "13px", color: "#38bdf8" }}>📅 Deadline: {app.deadline}</span>
                </div>
                <span
                  style={{
                    background: percent === 100 ? "#0d382b" : "#172b4d",
                    color: percent === 100 ? "#34d399" : "#38bdf8",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "600"
                  }}
                >
                  {percent}% Done
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {app.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleApplicationItem(app.id, idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "#15233e",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      border: "1px solid #20355a"
                    }}
                  >
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        border: item.done ? "none" : "2px solid #64748b",
                        background: item.done ? "#00e6a8" : "transparent",
                        color: "#071529",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: "bold",
                        flexShrink: 0
                      }}
                    >
                      {item.done ? "✓" : ""}
                    </span>

                    <span
                      style={{
                        fontSize: "14px",
                        flex: 1,
                        color: item.done ? "#64748b" : "#e2e8f0",
                        textDecoration: item.done ? "line-through" : "none"
                      }}
                    >
                      {item.name}
                    </span>

                    <span style={{ fontSize: "11px", color: "#00d7d0" }}>{item.ai}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
          Manage in Applications Dashboard →
        </button>
      </div>
    </div>
  );
}

export default Checklist;
