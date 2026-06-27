"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  {
    id: 1,
    label: "Extração de frames",
    detail: "frames extraídos",
    duration: 3000,
  },
  {
    id: 2,
    label: "Detecção de jogadores",
    detail: "4 jogadores identificados",
    duration: 4000,
  },
  {
    id: 3,
    label: "Rastreamento da bola",
    detail: "Analisando trajetória...",
    duration: 5000,
  },
  {
    id: 4,
    label: "Detecção de eventos",
    detail: "Identificando saques e pontos...",
    duration: 4000,
  },
  {
    id: 5,
    label: "Geração de estatísticas",
    detail: "Winners, aces, rallies...",
    duration: 3000,
  },
];

export default function ProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [frames, setFrames] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentStep >= STEPS.length) {
      setDone(true);
      setTotalProgress(100);
      setTimeout(() => router.push("/matches"), 1500);
      return;
    }

    const step = STEPS[currentStep];
    const interval = 50;
    const totalTicks = step.duration / interval;
    let tick = 0;

    const timer = setInterval(() => {
      tick++;
      const pct = Math.min((tick / totalTicks) * 100, 100);
      setStepProgress(pct);

      if (currentStep === 0) {
        setFrames(Math.floor((pct / 100) * 86400));
      }

      const base = (currentStep / STEPS.length) * 100;
      const stepContrib = (1 / STEPS.length) * pct;
      setTotalProgress(Math.min(base + stepContrib, 99));

      if (tick >= totalTicks) {
        clearInterval(timer);
        setCurrentStep((s) => s + 1);
        setStepProgress(0);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentStep, router]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "done";
    if (index === currentStep) return "active";
    return "pending";
  };

  const getStepDetail = (index: number) => {
    if (index === 0 && currentStep === 0) return frames.toLocaleString() + " frames extraídos";
    if (index === 0 && currentStep > 0) return "86.400 frames extraídos";
    return STEPS[index].detail;
  };

  return (
    <div style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: "40px 36px",
        width: "100%",
        maxWidth: 520,
      }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 16,
            background: done ? "#dcfce7" : "#eff6ff",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: 28,
            transition: "background 0.3s",
          }}>
            {done ? "✅" : "🤖"}
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>
            {done ? "Análise concluída!" : "Analisando partida"}
          </h1>
          <p style={{ fontSize: 14, color: "var(--muted)" }}>
            {done ? "Redirecionando para o dashboard..." : "A IA está processando o vídeo. Isso pode levar alguns minutos."}
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Progresso geral</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--brand)" }}>
              {done ? "100" : Math.round(totalProgress)}%
            </span>
          </div>
          <div style={{
            height: 8, background: "#e2e8f0",
            borderRadius: 99, overflow: "hidden",
          }}>
            <div style={{
              width: (done ? 100 : totalProgress) + "%",
              height: "100%",
              background: done ? "#16a34a" : "var(--brand)",
              borderRadius: 99,
              transition: "width 0.1s linear, background 0.3s",
            }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {STEPS.map((step, i) => {
            const status = getStepStatus(i);
            return (
              <div key={step.id} style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid " + (
                  status === "done" ? "#bbf7d0" :
                  status === "active" ? "#bfdbfe" :
                  "var(--border)"
                ),
                background:
                  status === "done" ? "#f0fdf4" :
                  status === "active" ? "#eff6ff" :
                  "#f8fafc",
                opacity: status === "pending" ? 0.5 : 1,
                transition: "all 0.3s",
              }}>
                <div style={{ fontSize: 20, flexShrink: 0 }}>
                  {status === "done" ? "✅" : status === "active" ? "⏳" : "⭕"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 13, fontWeight: 600, margin: "0 0 2px",
                    color: status === "done" ? "#15803d" :
                           status === "active" ? "#1d4ed8" :
                           "var(--muted)",
                  }}>
                    {step.label}
                  </p>
                  <p style={{
                    fontSize: 12, margin: 0,
                    color: status === "done" ? "#16a34a" :
                           status === "active" ? "#3b82f6" :
                           "var(--muted)",
                  }}>
                    {getStepDetail(i)}
                  </p>
                  {status === "active" && (
                    <div style={{
                      marginTop: 6, height: 3,
                      background: "#dbeafe", borderRadius: 99, overflow: "hidden",
                    }}>
                      <div style={{
                        width: stepProgress + "%",
                        height: "100%",
                        background: "#3b82f6",
                        borderRadius: 99,
                        transition: "width 0.1s linear",
                      }} />
                    </div>
                  )}
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, flexShrink: 0,
                  color: status === "done" ? "#16a34a" :
                         status === "active" ? "#3b82f6" :
                         "var(--muted)",
                }}>
                  {status === "done" ? "Concluído" :
                   status === "active" ? "Em andamento..." :
                   "Aguardando"}
                </span>
              </div>
            );
          })}
        </div>

        <p style={{
          textAlign: "center", fontSize: 12,
          color: "var(--muted)", marginTop: 20,
        }}>
          {done ? "✓ Tudo pronto!" : "⏱ Tempo estimado: ~2 minutos"}
        </p>
      </div>
    </div>
  );
}
