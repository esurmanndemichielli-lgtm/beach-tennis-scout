const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getMatches() {
  const res = await fetch(API_URL + "/api/matches/");
  if (!res.ok) throw new Error("Erro ao buscar partidas");
  return res.json();
}

export async function getMatch(id: number) {
  const res = await fetch(API_URL + "/api/matches/" + id);
  if (!res.ok) throw new Error("Partida nao encontrada");
  return res.json();
}

export async function getPlayers() {
  const res = await fetch(API_URL + "/api/players/");
  if (!res.ok) throw new Error("Erro ao buscar jogadores");
  return res.json();
}

export async function getPlayer(id: number) {
  const res = await fetch(API_URL + "/api/players/" + id);
  if (!res.ok) throw new Error("Jogador nao encontrado");
  return res.json();
}

export async function uploadVideo(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(API_URL + "/api/videos/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Erro ao enviar video");
  return res.json();
}

export async function getJobStatus(jobId: string) {
  const res = await fetch(API_URL + "/api/videos/status/" + jobId);
  if (!res.ok) throw new Error("Job nao encontrado");
  return res.json();
}
