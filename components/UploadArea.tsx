"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function UploadArea() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("youtube");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const router = useRouter();

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleAnalyze = async () => {
    setError("");
    if (mode === "youtube" && !url.trim()) {
      setError("Cole o link do YouTube antes de continuar.");
      return;
    }
    if (mode === "upload" && !file) {
      setError("Selecione um video antes de continuar.");
      return;
    }
    setUploading(true);
    try {
      if (mode === "upload" && file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(API_URL + "/api/videos/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Erro ao enviar video.");
        const data = await res.json();
        router.push("/processing?job_id=" + data.job_id);
      } else {
        router.push("/processing?url=" + encodeURIComponent(url));
      }
    } catch {
      setError("Erro ao conectar com o servidor.");
      setUploading(false);
    }
  };

  return (
    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Nova analise</h2>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Envie um video ou cole o link do YouTube</p>
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "#f1f5f9", borderRadius: 8, padding: 4 }}>
        {["youtube", "upload"].map((m) => (
          <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
            flex: 1, padding: "7px 0", border: "none", cursor: "pointer", borderRadius: 6, fontSize: 13, fontWeight: 500,
            background: mode === m ? "#fff" : "transparent", color: mode === m ? "var(--text)" : "var(--muted)",
            transition: "all 0.15s",
          }}>
            {m === "youtube" ? "YouTube" : "Upload"}
          </button>
        ))}
      </div>
      {mode === "youtube" ? (
        <input type="text" placeholder="https://youtube.com/watch?v=..." value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 14, outline: "none", marginBottom: 12, fontFamily: "inherit" }} />
      ) : (
        <div onClick={() => fileRef.current?.click()}
          style={{ border: "2px dashed " + (file ? "#0ea5e9" : "var(--border)"), borderRadius: 8, padding: "28px 20px", textAlign: "center", marginBottom: 12, cursor: "pointer", color: "var(--muted)", fontSize: 14 }}>
          <p style={{ fontSize: 28, marginBottom: 8 }}>{file ? "OK" : "Video"}</p>
          {file ? <p style={{ fontWeight: 600, color: "#0ea5e9" }}>{file.name}</p> : <p>Arraste o video ou clique para selecionar</p>}
          <input ref={fileRef} type="file" accept="video/mp4,video/quicktime" onChange={handleFile} style={{ display: "none" }} />
        </div>
      )}
      {error && <p style={{ fontSize: 13, color: "#dc2626", marginBottom: 10 }}>{error}</p>}
      <button onClick={handleAnalyze} disabled={uploading}
        style={{ width: "100%", padding: "11px 0", borderRadius: 8, background: uploading ? "#94a3b8" : "var(--brand)", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: uploading ? "not-allowed" : "pointer" }}>
        {uploading ? "Enviando..." : "Analisar partida"}
      </button>
    </div>
  );
}
