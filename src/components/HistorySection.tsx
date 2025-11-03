import HistoryList from "@/components/HistoryList";
import { MOCK_GOALS, MOCK_HISTORY } from "@/lib/api";
import type { Achievement, Goal } from "@/types";
import type { FC } from "react";

interface HistorySectionProps {
  history?: Achievement[];
  goals?: Goal[];
  className?: string;
}

const baseClassName = "bg-white rounded-lg shadow-lg p-6";

const HistorySection: FC<HistorySectionProps> = ({
  history,
  goals,
  className,
}) => {
  const containerClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  const historyData = history && history.length > 0 ? history : MOCK_HISTORY;
  const goalsData = MOCK_GOALS;

  return (
    <section className={containerClassName}>
      <div className="flex items-center gap-3 border-b pb-3 mb-3">
        <span className="text-primary text-2xl">
          <i className="fas fa-history" />
        </span>
        <h2 className="text-2xl font-semibold text-gray-800">達成履歴</h2>
      </div>
      <HistoryList
        history={historyData}
        goals={goalsData}
        showHeader={false}
        className="text-sm"
      />
    </section>
  );
};

export default HistorySection;
