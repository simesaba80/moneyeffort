// Lightweight mock API for development
// Exports: fetchGoals, fetchHistory

import type { Goal, Achievement } from "@/types";

// Mock data matching src/types
export const MOCK_GOALS: Goal[] = [
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

export const MOCK_HISTORY: Achievement[] = [
  { id: "h1", goalId: "1", dateAchieved: new Date("2025-10-01") },
  { id: "h2", goalId: "2", dateAchieved: new Date("2025-10-02") },
  { id: "h3", goalId: "1", dateAchieved: new Date("2025-10-03") },
];

const parseGoal = (value: unknown): Goal | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<Goal>;

  if (
    typeof candidate.id !== "string" ||
    typeof candidate.title !== "string" ||
    typeof candidate.deadline !== "string"
  ) {
    return null;
  }

  const parsedAmount = (() => {
    if (typeof candidate.amount === "number") {
      return candidate.amount;
    }
    if (typeof candidate.amount === "string") {
      const num = Number(candidate.amount);
      return Number.isFinite(num) ? num : null;
    }
    return null;
  })();

  if (parsedAmount === null) {
    return null;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    description:
      typeof candidate.description === "string" ? candidate.description : "",
    deadline: candidate.deadline,
    amount: parsedAmount,
    achieved: Boolean(candidate.achieved),
  };
};

const loadGoalsFromLocalStorage = (): Goal[] | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem("goal");
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    const goals = parsed
      .map((item) => parseGoal(item))
      .filter((goal): goal is Goal => goal !== null);

    return goals;
  } catch (error) {
    return [];
  }
};

export async function fetchGoals(): Promise<Goal[]> {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 100));

  const localGoals = loadGoalsFromLocalStorage();

  if (localGoals && localGoals.length > 0) {
    return localGoals;
  }

  return MOCK_GOALS;
}

export async function fetchHistory(): Promise<Achievement[]> {
  await new Promise((r) => setTimeout(r, 120));
  return MOCK_HISTORY;
}
