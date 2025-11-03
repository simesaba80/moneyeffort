"use client";

import { useEffect, useMemo, useState } from "react";
import AddGoalButton from "@/components/add_goal";
import GoalCard from "@/components/GoalCard";
import type { Goal } from "@/types";

interface GoalsSectionProps {
  ongoingGoals: Goal[];
  isLoading: boolean;
  className?: string;
  onAchieveClick?: (goal: Goal) => void;
}

const baseClassName = "bg-white rounded-lg shadow-lg p-6 flex flex-col";

const isGoalLike = (value: unknown): value is Goal => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Goal>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.amount === "number" &&
    typeof candidate.deadline === "string"
  );
};

const GoalsSection = ({
  ongoingGoals,
  isLoading,
  className,
  onAchieveClick,
}: GoalsSectionProps) => {
  const containerClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  const [localGoals, setLocalGoals] = useState<Goal[]>([]);
  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const loadGoalsFromStorage = () => {
      try {
        const raw = window.localStorage.getItem("goal");
        if (!raw) {
          setLocalGoals([]);
          setLocalError(null);
          return;
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
          setLocalGoals([]);
          setLocalError("保存された目標データの形式が正しくありません。");
          return;
        }

        const validGoals = parsed.filter(isGoalLike) as Goal[];
        setLocalGoals(validGoals);
        setLocalError(null);
      } catch (error) {
        setLocalGoals([]);
        setLocalError("目標データの読み込み中にエラーが発生しました。");
      }
    };

    loadGoalsFromStorage();
    setIsLocalLoading(false);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "goal") {
        loadGoalsFromStorage();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const displayedGoals = useMemo(() => {
    return localGoals.length > 0 ? localGoals : ongoingGoals;
  }, [localGoals, ongoingGoals]);

  const showLoading = isLoading || isLocalLoading;

  return (
    <section className={containerClassName}>
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-4 mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          <span className="text-primary mr-2">
            <i className="fas fa-calendar-check" />
          </span>
          進行中の目標
        </h2>
        <AddGoalButton />
      </header>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {showLoading && <p className="text-gray-500">読み込み中です...</p>}

        {!showLoading && localError && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {localError}
          </p>
        )}

        {!showLoading && displayedGoals.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500">
            進行中の目標はまだありません。新しい目標を追加しましょう！
          </div>
        )}

        {displayedGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            renderActions={(currentGoal) =>
              currentGoal.achieved ? (
                <span className="text-sm font-semibold text-emerald-600">
                  達成済み
                </span>
              ) : (
                <button
                  type="button"
                  className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                  onClick={() => onAchieveClick?.(currentGoal)}
                >
                  達成する
                </button>
              )
            }
          />
        ))}
      </div>
    </section>
  );
};

export default GoalsSection;
