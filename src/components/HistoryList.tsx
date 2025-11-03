import React from "react";
import { MOCK_GOALS, MOCK_HISTORY } from "@/lib/api";
import { Achievement as AchievementType, Goal } from "@/types";

interface HistoryListProps {
  history?: AchievementType[];
  goals?: Goal[];
  className?: string;
  showHeader?: boolean;
}

const HistoryList: React.FC<HistoryListProps> = ({
  history,
  goals,
  className = "",
  showHeader = true,
}) => {
  const historyData = history && history.length > 0 ? history : MOCK_HISTORY;
  const goalsData = MOCK_GOALS;

  if (!historyData || historyData.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 py-10 text-gray-500 ${className}`}
      >
        {showHeader && (
          <h2 className="text-lg font-semibold text-gray-700">達成履歴</h2>
        )}
        <p>実績はまだありません</p>
      </div>
    );
  }

  const goalMap = new Map<string, Goal>();
  if (goalsData) {
    for (const g of goalsData) goalMap.set(g.id, g);
  }

  return (
    <div className={className}>
      {showHeader && <h2 className="sr-only">達成履歴</h2>}
      <div className="max-h-[500px] overflow-y-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2 font-semibold text-gray-600">
                達成日
              </th>
              <th className="text-left px-3 py-2 font-semibold text-gray-600">
                目標
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {historyData.map((achievement) => {
              const date = achievement.dateAchieved
                ? new Date(achievement.dateAchieved).toLocaleDateString("ja-JP")
                : "日付不明";
              const goalTitle =
                goalMap.get(achievement.goalId)?.title ??
                `goal:${achievement.goalId}`;
              return (
                <tr key={achievement.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-600">{date}</td>
                  <td className="px-3 py-2 font-medium text-gray-800">
                    {goalTitle}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryList;
