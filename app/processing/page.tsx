"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const STEPS = [
  { key: "Extração de frames", detail: "Extraindo frames do vídeo" },
  { key: "Detecção de jogadores", detail: "Identificando jogadores na quadra" },
  { key: "Rastreamento da bola", detail: "Rastreando trajetória da bola" },
  { key: "Detecção de eventos", detail: "Identificando saques e pontos" },
  { key: "Geração de estatísticas", detail: "Calculando estatísticas finais" },
];

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job_id");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!jobId) { router.push("/dashboard"); return; }
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:8000/api/videos/status/" + jobId);
        if (!res.ok) throw new Error("Job nao encontrado");
        const data = await res.json();
        setStatus(data);
        if (data.status === "completed") { clearInterval(interval); setTimeout(() => router.push("/matches"), 2000); }
        if (data.status === "error") { clearInterval(interval); setError(data.error || "Erro no processamento."); }
      } catch { setError("Erro ao conectar com o servidor."); clearInterval(interval); }
    }, 1000);
    return () => clearInterval(interval);
  }, [jobId, router]);

  const progress = status ? Math.round(status.progress * 100) : 0;
  const completed = status?.steps_completed || [];
  const done = status?.status === "completed";

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: "40px 36px", width: "100%", maxWidth: 520 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: done ? "#dcfce7" : "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>
            {done ? "✅" : "🤖"}
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
            {done ? "Análise concluída!" : error ? "Erro no processamento" : "Analisando partida"}
          </h1>
          <p style={{ fontSize: 14, color: "var(--muted)" }}>
            {done ? "Redirecionando..." : error ? error : "A IA está processando o vídeo..."}
          </p>
        </div>
        {!error && (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>Progresso geral</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand)" }}>{progress}%</span>
              </div>
              <div style={{ height: 8, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ width: progress + "%", height: "100%", background: done ? "#16a34a" : "var(--brand)", borderRadius: 99, transition: "width 0.5s ease" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {STEPS.map((step) => {
                const isDone = completed.includes(step.key);
                const isActive = !isDone && status?.current_step === step.key;
                return (
                  <div key={step.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "1px solid " + (isDone ? "#bbf7d0" : isActive ? "#bfdbfe" : "var(--border)"), background: isDone ? "#f0fdf4" : isActive ? "#eff6ff" : "#f8fafc", opacity: !isDone && !isActive ? 0.5 : 1, transition: "all 0.3s" }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{isDone ? "✅" : isActive ? "⏳" : "⭕"}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, margin: "0 0 2px", color: isDone ? "#15803d" : isActive ? "#1d4ed8" : "var(--muted)" }}>{step.key}</p>
                      <p style={{ fontSize: 12, margin: 0, color: isDone ? "#16a34a" : isActive ? "#3b82f6" : "var(--muted)" }}>{step.detail}</p>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: isDone ? "#16a34a" : isActive ? "#3b82f6" : "var(--muted)" }}>
                      {isDone ? "Concluído" : isActive ? "Em andamento..." : "Aguardando"}
                    </span>
                  </div>
                );
              })}
            </div>
            <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 20 }}>
              {done ? "✓ Tudo pronto!" : "⏱ Processando com YOLOv8..."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}><p>Carregando...</p></div>}>
      <ProcessingContent />
    </Suspense>
  );
}
