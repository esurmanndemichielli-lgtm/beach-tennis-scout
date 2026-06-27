"use client";

import { useState, useEffect } from "react";
import { getPlayers } from "@/lib/api";

type Player = {
  id: number;
  name: string;
  partner: string;
  matches: number;
  wins: number;
  aces: number;
  winners: number;
  errors: number;
  serve_accuracy: number;
  avg_rally_seconds: number;
};

const COLORS = ["#0ea5e9", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981", "#f43f5e"];

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayers()
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const player = players.find((p) => p.id === selected) || players[0];
  const playerColor = player ? COLORS[(player.id - 1) % COLORS.length] : "#0ea5e9";
  const avatar = player ? player.name.split(" ").map((n) => n[0]).join("").slice(0, 2) : "";

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <p style={{ color: "var(--muted)", fontSize: 16 }}>⏳ Carregando jogadores...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Jogadores</h1>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          Perfil e estatísticas individuais de cada atleta analisado.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="Buscar jogador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 8,
              border: "1px solid var(--border)", fontSize: 14,
              outline: "none", fontFamily: "inherit",
              background: "var(--card)",
            }}
          />

          {filtered.map((p, i) => {
            const color = COLORS[i % COLORS.length];
            const av = p.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
            const isSelected = selected === p.id || (!selected && p.id === players[0]?.id);
            return (
              <div
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  background: "var(--card)",
                  border: "1px solid " + (isSelected ? color : "var(--border)"),
                  borderRadius: 12, padding: "14px 16px",
                  cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 12,
                }}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: color + "22",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color, flexShrink: 0,
                }}>
                  {av}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>Dupla com {p.partner}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color, margin: 0 }}>{p.wins}/{p.matches}</p>
                  <p style={{ fontSize: 11, color: "var(--muted)", margin: 0 }}>vitórias</p>
                </div>
              </div>
            );
          })}
        </div>

        {player && (
          <div style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 12, padding: 28,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 16, marginBottom: 28,
              paddingBottom: 24, borderBottom: "1px solid var(--border)",
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: playerColor + "22",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 800, color: playerColor,
              }}>
                {avatar}
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{player.name}</h2>
                <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
                  Dupla com <strong>{player.partner}</strong>
                </p>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right" }}>
                <p style={{ fontSize: 28, fontWeight: 800, color: playerColor, margin: 0 }}>
                  {player.wins}/{player.matches}
                </p>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>vitórias / partidas</p>
              </div>
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12, marginBottom: 24,
            }}>
              {[
                { label: "Aces", value: player.aces, icon: "🎯" },
                { label: "Winners", value: player.winners, icon: "🏆" },
                { label: "Erros", value: player.errors, icon: "❌" },
                { label: "Aproveito. saque", value: player.serve_accuracy + "%", icon: "📊" },
                { label: "Média rally", value: player.avg_rally_seconds + "s", icon: "⏱" },
                { label: "Partidas", value: player.matches, icon: "🎾" },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: "#f8fafc", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "14px 16px",
                }}>
                  <p style={{ fontSize: 20, margin: "0 0 6px" }}>{stat.icon}</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", margin: "0 0 2px" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Taxa de vitórias</p>
              <div style={{
                height: 10, background: "#e2e8f0",
                borderRadius: 99, overflow: "hidden", marginBottom: 6,
              }}>
                <div style={{
                  width: ((player.wins / player.matches) * 100) + "%",
                  height: "100%", background: playerColor,
                  borderRadius: 99, transition: "width 0.4s ease",
                }} />
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)" }}>
                {Math.round((player.wins / player.matches) * 100)}% de aproveitamento em {player.matches} partidas
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
