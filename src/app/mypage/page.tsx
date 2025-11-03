"use client";
import React, { useEffect, useState } from "react";
import { fetchGoals, fetchHistory } from "@/lib/api";
import GoalsSection from "@/components/GoalsSection";
import HistorySection from "@/components/HistorySection";
import ProfileOverview from "@/components/ProfileOverview";
import type { Achievement, Goal } from "@/types";

const USER_NAME = "田中 太郎";
const USER_HANDLE = "@taro_tanaka";

export default function MyPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [history, setHistory] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [goalsData, historyData] = await Promise.all([
          fetchGoals(),
          fetchHistory(),
        ]);
        setGoals(goalsData ?? []);
        setHistory(historyData ?? []);
      } catch (error) {
        setGoals([]);
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const achievementsCount = history.length;
  const ongoingGoals = goals.filter((goal) => !goal.achieved);
  const completedGoals = goals.filter((goal) => goal.achieved);
  const nextRankRemaining = getNextRankRemaining(achievementsCount);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-primary text-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🎯</span>
            <span>達成リワード</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">
              ようこそ、{USER_NAME.split(" ")[0]}さん
            </span>
            <img
              src="https://placehold.co/40x40/E2E8F0/3A7DAB?text=U"
              alt="ユーザーアイコン"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </nav>
      </header>

      <section className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">マイページ</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileOverview
            className="lg:col-span-1"
            userName={USER_NAME}
            userHandle={USER_HANDLE}
            achievementsCount={achievementsCount}
            ongoingGoalsCount={ongoingGoals.length}
            completedGoalsCount={completedGoals.length}
            nextRankRemaining={nextRankRemaining}
          />

          <GoalsSection
            className="lg:col-span-2"
            ongoingGoals={ongoingGoals}
            isLoading={isLoading}
          />

          <HistorySection
            className="lg:col-span-3"
            history={history}
            goals={goals}
          />
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-400 mt-12 py-6">
        <div className="container mx-auto px-6 text-center">
          <p>© 2025 達成リワード. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const RANK_THRESHOLDS = [1, 5, 10, 15];

function getNextRankRemaining(count: number) {
  for (const threshold of RANK_THRESHOLDS) {
    if (count < threshold) {
      return threshold - count;
    }
  }
  return 0;
}
