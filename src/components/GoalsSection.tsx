import AddGoalButton from "@/components/add_goal";
import GoalCard from "@/components/GoalCard";
import type { Goal } from "@/types";
import type { FC } from "react";

interface GoalsSectionProps {
  ongoingGoals: Goal[];
  isLoading: boolean;
  className?: string;
  onAchieveClick?: (goal: Goal) => void;
}

const baseClassName = "bg-white rounded-lg shadow-lg p-6 flex flex-col";

const GoalsSection: FC<GoalsSectionProps> = ({
  ongoingGoals,
  isLoading,
  className,
  onAchieveClick,
}) => {
  const containerClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

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

