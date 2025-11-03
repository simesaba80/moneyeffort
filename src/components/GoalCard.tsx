import React from "react";
import { Goal } from "@/types";

interface GoalCardProps {
  goal: Goal;
  className?: string;
  renderActions?: (goal: Goal) => React.ReactNode;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  className = "",
  renderActions,
}) => {
  const { title, description, amount, deadline, achieved } = goal;

  const deadlineLabel = deadline
    ? new Date(deadline).toLocaleDateString("ja-JP")
    : "期限未設定";

  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md bg-white ${className}`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          {renderActions && (
            <div className="shrink-0">{renderActions(goal)}</div>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <span
            className={`font-medium ${
              achieved ? "text-green-600" : "text-primary"
            }`}
          >
            {achieved ? "達成済み" : "未達成"}
          </span>
          <span>期限: {deadlineLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
