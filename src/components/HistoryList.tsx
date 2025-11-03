import React from 'react'
import { Achievement as AchievementType, Goal } from '@/types'

interface HistoryListProps {
    history: AchievementType[]
    goals?: Goal[]
}

const HistoryList: React.FC<HistoryListProps> = ({ history, goals }) => {
    if (!history || history.length === 0) {
        return (
            <div>
                <h2>達成履歴</h2>
                <div>実績はありません</div>
            </div>
        )
    }

    // goals が渡されていれば goalId -> title のマップを作る
    const goalMap = new Map<string, Goal>()
    if (goals) {
        for (const g of goals) goalMap.set(g.id, g)
    }

    return (
        <div>
            <h2>達成履歴</h2>
            <ul>
                {history.map((achievement) => {
                    const date = achievement.dateAchieved
                        ? new Date(achievement.dateAchieved).toLocaleDateString()
                        : '日付不明'
                    const goalTitle = goalMap.get(achievement.goalId)?.title ?? `goal:${achievement.goalId}`
                    return (
                        <li key={achievement.id} style={{ marginBottom: 8 }}>
                            <strong>{date}</strong> — {goalTitle}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default HistoryList