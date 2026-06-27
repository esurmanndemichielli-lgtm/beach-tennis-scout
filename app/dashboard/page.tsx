"use client";

import StatCard from "@/components/StatCard";
import UploadArea from "@/components/UploadArea";
import RecentMatches from "@/components/RecentMatches";

export default function DashboardPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
          Dashboard
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          Bem-vindo ao Beach Tennis Scout — analise partidas com inteligência artificial.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16,
        marginBottom: 32,
      }}>
        <StatCard label="Partidas analisadas" value="12" icon="🎾" trend="+3 este mês" />
        <StatCard label="Horas de vídeo" value="8.4h" icon="🎬" trend="+1.2h este mês" />
        <StatCard label="Jogadores mapeados" value="6" icon="👤" trend="2 duplas ativas" />
        <StatCard label="Precisão da IA" value="91%" icon="🤖" trend="em detecção de bola" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <UploadArea />
        <RecentMatches />
      </div>
    </div>
  );
}
