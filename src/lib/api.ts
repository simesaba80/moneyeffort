// Lightweight mock API for development
// Exports: fetchGoals, fetchHistory

import type { Goal, Achievement } from "@/types";

// Mock data matching src/types
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "毎日運動",
    description: "早起きして運動する",
    deadline: "2025-11-30",
    amount: 100,
    achieved: false,
  },
  {
    id: "2",
    title: "英語学習30分",
    description: "毎日30分英語を勉強する",
    deadline: "2025-12-15",
    amount: 3000,
    achieved: false,
  },
];

const mockHistory: Achievement[] = [
  { id: "h1", goalId: "1", dateAchieved: new Date("2025-10-01") },
  { id: "h2", goalId: "2", dateAchieved: new Date("2025-10-02") },
  { id: "h3", goalId: "1", dateAchieved: new Date("2025-10-03") },
];

export async function fetchGoals(): Promise<Goal[]> {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 100));
  return mockGoals;
}

export async function fetchHistory(): Promise<Achievement[]> {
  await new Promise((r) => setTimeout(r, 120));
  return mockHistory;
}
