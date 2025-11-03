"use client";
import React, { useEffect, useState } from "react";
import { fetchGoals, fetchHistory } from "@/lib/api";
import GoalCard from "@/components/GoalCard";
import HistoryList from "@/components/HistoryList";
import RankBadge from "@/components/RankBadge";
import AddGoalButton from "@/components/add_goal";
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
          <section className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <div className="text-primary text-6xl mb-4">
              <i className="fas fa-user-circle" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {USER_NAME}
            </h2>
            <p className="text-gray-500 mb-6">{USER_HANDLE}</p>

            <div className="w-full space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  現在のランク
                </h3>
                <RankBadge rank={achievementsCount} />
                <p className="text-gray-600 mt-2">
                  {nextRankRemaining === 0
                    ? "最高ランクに到達しています！"
                    : `次のランクまであと ${nextRankRemaining} 回達成！`}
                </p>
              </div>

              <div className="border-t pt-4 space-y-3">
                <ProfileStat
                  icon="fas fa-check-circle"
                  label="総達成数"
                  value={`${achievementsCount} 回`}
                  iconColor="text-green-500"
                />
                <ProfileStat
                  icon="fas fa-bullseye"
                  label="進行中の目標"
                  value={`${ongoingGoals.length} 件`}
                  iconColor="text-primary"
                />
                <ProfileStat
                  icon="fas fa-flag-checkered"
                  label="完了した目標"
                  value={`${completedGoals.length} 件`}
                  iconColor="text-emerald-500"
                />
              </div>
            </div>
          </section>

          <section className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6 flex flex-col">
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
              {isLoading && <p className="text-gray-500">読み込み中です...</p>}

              {!isLoading && ongoingGoals.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-gray-500">
                  進行中の目標はまだありません。新しい目標を追加しましょう！
                </div>
              )}

              {ongoingGoals.map((goal) => (
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
                      >
                        達成する
                      </button>
                    )
                  }
                />
              ))}
            </div>
          </section>

          <section className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 border-b pb-3 mb-3">
              <span className="text-primary text-2xl">
                <i className="fas fa-history" />
              </span>
              <h2 className="text-2xl font-semibold text-gray-800">達成履歴</h2>
            </div>
            <HistoryList
              history={history}
              goals={goals}
              showHeader={false}
              className="text-sm"
            />
          </section>
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

interface ProfileStatProps {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

const ProfileStat: React.FC<ProfileStatProps> = ({
  icon,
  label,
  value,
  iconColor = "text-primary",
}) => (
  <div className="flex justify-between items-center text-left">
    <span className="text-gray-600 flex items-center gap-2">
      <i className={`${icon} ${iconColor}`} />
      {label}
    </span>
    <span className="font-bold text-xl text-gray-800">{value}</span>
  </div>
);

const RANK_THRESHOLDS = [1, 5, 10, 15];

function getNextRankRemaining(count: number) {
  for (const threshold of RANK_THRESHOLDS) {
    if (count < threshold) {
      return threshold - count;
    }
  }
  return 0;
}
