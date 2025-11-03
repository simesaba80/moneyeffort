import RankBadge from "@/components/RankBadge";
import type { FC } from "react";

interface ProfileOverviewProps {
  userName: string;
  userHandle: string;
  achievementsCount: number;
  ongoingGoalsCount: number;
  completedGoalsCount: number;
  nextRankRemaining: number;
  className?: string;
}

const baseClassName =
  "bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center";

const ProfileOverview: FC<ProfileOverviewProps> = ({
  userName,
  userHandle,
  achievementsCount,
  ongoingGoalsCount,
  completedGoalsCount,
  nextRankRemaining,
  className,
}) => {
  const containerClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <section className={containerClassName}>
      <div className="text-primary text-6xl mb-4">
        <i className="fas fa-user-circle" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{userName}</h2>
      <p className="text-gray-500 mb-6">{userHandle}</p>

      <div className="w-full space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">現在のランク</h3>
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
            value={`${ongoingGoalsCount} 件`}
            iconColor="text-primary"
          />
          <ProfileStat
            icon="fas fa-flag-checkered"
            label="完了した目標"
            value={`${completedGoalsCount} 件`}
            iconColor="text-emerald-500"
          />
        </div>
      </div>
    </section>
  );
};

interface ProfileStatProps {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

const ProfileStat: FC<ProfileStatProps> = ({
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

export default ProfileOverview;

