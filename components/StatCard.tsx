type StatCardProps = {
  label: string;
  value: string;
  icon: string;
  trend?: string;
};

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: "20px 22px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <p style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{label}</p>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <p style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>{value}</p>
      {trend && (
        <p style={{ fontSize: 12, color: "var(--brand)", fontWeight: 500 }}>{trend}</p>
      )}
    </div>
  );
}
