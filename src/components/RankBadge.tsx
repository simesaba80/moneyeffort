import React from "react";

interface RankBadgeProps {
  rank: number;
  className?: string;
}

const RankBadge: React.FC<RankBadgeProps> = ({ rank, className = "" }) => {
  const { label, badgeClass } = getRankInfo(rank);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${badgeClass} ${className}`}
    >
      <span className="text-lg">🏅</span>
      <span>{label}</span>
    </div>
  );
};

const getRankInfo = (rank: number) => {
  if (rank >= 15) {
    return { label: "プラチナ", badgeClass: "bg-purple-100 text-purple-700" };
  }
  if (rank >= 10) {
    return { label: "ゴールド", badgeClass: "bg-yellow-100 text-yellow-700" };
  }
  if (rank >= 5) {
    return { label: "シルバー", badgeClass: "bg-gray-100 text-gray-700" };
  }
  if (rank >= 1) {
    return { label: "ブロンズ", badgeClass: "bg-orange-100 text-orange-700" };
  }
  return { label: "ノーランク", badgeClass: "bg-slate-100 text-slate-500" };
};

export default RankBadge;
