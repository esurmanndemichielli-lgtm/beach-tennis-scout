"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadArea() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("youtube");
  const router = useRouter();

  const handleAnalyze = () => {
    if (mode === "youtube" && !url.trim()) {
      alert("Cole o link do YouTube antes de continuar.");
      return;
    }
    router.push("/processing");
  };

  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: 24,
    }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Nova análise</h2>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
        Envie um vídeo ou cole o link do YouTube
      </p>

      <div style={{
        display: "flex", gap: 4, marginBottom: 20,
        background: "#f1f5f9", borderRadius: 8, padding: 4,
      }}>
        {["youtube", "upload"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              flex: 1, padding: "7px 0", border: "none", cursor: "pointer",
              borderRadius: 6, fontSize: 13, fontWeight: 500,
              background: mode === m ? "#fff" : "transparent",
              color: mode === m ? "var(--text)" : "var(--muted)",
              boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.15s",
            }}
          >
            {m === "youtube" ? "🔗 YouTube" : "📁 Upload"}
          </button>
        ))}
      </div>

      {mode === "youtube" ? (
        <input
          type="text"
          placeholder="https://youtube.com/watch?v=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%", padding: "10px 14px", borderRadius: 8,
            border: "1px solid var(--border)", fontSize: 14,
            outline: "none", marginBottom: 12,
            fontFamily: "inherit",
          }}
        />
      ) : (
        <div style={{
          border: "2px dashed var(--border)", borderRadius: 8,
          padding: "32px 20px", textAlign: "center", marginBottom: 12,
          cursor: "pointer", color: "var(--muted)", fontSize: 14,
        }}>
          <p style={{ fontSize: 28, marginBottom: 8 }}>📹</p>
          <p>Arraste o vídeo aqui ou clique para selecionar</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>MP4, MOV — máx. 2GB</p>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        style={{
          width: "100%", padding: "11px 0", borderRadius: 8,
          background: "var(--brand)", color: "#fff", border: "none",
          fontSize: 14, fontWeight: 600, cursor: "pointer",
          transition: "background 0.15s",
        }}>
        Analisar partida →
      </button>
    </div>
  );
}
