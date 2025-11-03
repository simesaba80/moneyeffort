import React from 'react'

interface Achievement {
    id: number
    date: string
    description: string
}

interface HistoryListProps {
    achievements: Achievement[]
}

const HistoryList: React.FC<HistoryListProps> = ({ achievements }) => {
    return (
        <div>
            <h2>達成履歴</h2>
            <ul>
                {achievements.map((achievement) => (
                    <li key={achievement.id}>
                        <strong>{achievement.date}</strong>: {achievement.description}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HistoryList