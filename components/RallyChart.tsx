"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

const RALLY_DATA = [
  { set: "G1", joao: 3.2 },
  { set: "G2", joao: 5.1 },
  { set: "G3", joao: 2.8 },
  { set: "G4", joao: 6.4 },
  { set: "G5", joao: 4.1 },
  { set: "G6", joao: 3.9 },
  { set: "G7", joao: 7.2 },
  { set: "G8", joao: 5.5 },
  { set: "G9", joao: 4.8 },
];

const WINNERS_DATA = [
  { name: "Joao e Pedro", winners: 18, erros: 9 },
  { name: "Lucas e Rafael", winners: 11, erros: 16 },
];

export default function RallyChart() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Duracao dos rallies por game</h3>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Tempo medio em segundos</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={RALLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="set" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} unit="s" />
            <Tooltip />
            <Line type="monotone" dataKey="joao" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Duracao" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Winners vs Erros nao forcados</h3>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>Comparativo entre as duplas</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={WINNERS_DATA} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} />
            <Tooltip />
            <Legend />
            <Bar dataKey="winners" fill="#0ea5e9" name="Winners" radius={[0, 4, 4, 0]} />
            <Bar dataKey="erros" fill="#f87171" name="Erros" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
