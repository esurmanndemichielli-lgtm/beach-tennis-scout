"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/matches", label: "Partidas", icon: "🎾" },
  { href: "/players", label: "Jogadores", icon: "👤" },
  { href: "/upload", label: "Nova análise", icon: "＋" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 220,
      background: "var(--court)",
      minHeight: "100vh",
      padding: "24px 0",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      <div style={{ padding: "0 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "var(--brand)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🎾</div>
          <div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>Beach Tennis</p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Scout AI</p>
          </div>
        </div>
      </div>

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {NAV.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, marginBottom: 2,
                background: active ? "rgba(14,165,233,0.18)" : "transparent",
                color: active ? "#38bdf8" : "rgba(255,255,255,0.55)",
                fontSize: 14, fontWeight: active ? 600 : 400,
                transition: "all 0.15s",
                cursor: "pointer",
              }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>v0.1.0 · MVP</p>
      </div>
    </aside>
  );
}
