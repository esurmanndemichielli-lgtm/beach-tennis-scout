"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultsContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("job_id");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!jobId) return;
    fetch(API + "/api/videos/status/" + jobId)
      .then(r => r.json())
      .then(data => {
        setStats(data.stats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jobId, API]);

  if (loading) return <div style={{ textAlign: "center", padding: 60 }}><p>Carregando resultados...</p></div>;
  if (!stats) return <div style={{ textAlign: "center", padding: 60 }}><p>Nenhum resultado encontrado.</p></div>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ background: "var(--court)", borderRadius: 16, padding: "24px 28px", marginBottom: 28, color: "#fff" }}>
        <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
          Análise concluída pela IA
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>Resultados do processamento</h1>
        <p style={{ opacity: 0.7, fontSize: 14 }}>Detectado pelo YOLOv8 · {stats.total_frames} frames analisados</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Duração do vídeo", value: Math.round(stats.duration_seconds) + "s", icon: "⏱" },
          { label: "FPS", value: stats.fps, icon: "🎬" },
          { label: "Jogadores detectados", value: stats.players_detected, icon: "👤" },
          { label: "Detecções da bola", value: stats.ball_detections, icon: "🎾" },
          { label: "Pontos estimados", value: stats.estimated_points, icon: "📊" },
          { label: "Aproveit. de saque", value: stats.serve_accuracy + "%", icon: "✅" },
          { label: "Aces estimados", value: stats.estimated_aces, icon: "🎯" },
          { label: "Winners estimados", value: stats.estimated_winners, icon: "🏆" },
          { label: "Erros estimados", value: stats.estimated_errors, icon: "❌" },
        ].map((s) => (
          <div key={s.label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px" }}>
            <p style={{ fontSize: 20, marginBottom: 8 }}>{s.icon}</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", margin: "0 0 4px" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Posições detectadas da bola</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {(stats.ball_positions || []).slice(0, 20).map((p, i) => (
            <span key={i} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "#eff6ff", color: "#1d4ed8" }}>
              Frame {p.frame} · ({Math.round(p.x)}, {Math.round(p.y)})
            </span>
          ))}
          {(stats.ball_positions || []).length > 20 && (
            <span style={{ fontSize: 11, color: "var(--muted)" }}>+{stats.ball_positions.length - 20} mais...</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: 60 }}><p>Carregando...</p></div>}>
      <ResultsContent />
    </Suspense>
  );
}
