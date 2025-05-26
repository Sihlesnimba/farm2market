const API_BASE = "http://localhost:5000/api";

export async function fetchMarkets() {
  const response = await fetch(`${API_BASE}/markets`);
  const data = await response.json();
  return data;
}
