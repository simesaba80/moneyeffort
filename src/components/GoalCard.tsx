import React from 'react'

interface GoalCardProps {
    title: string
    description: string
    dueDate: string
    achieved: boolean
}

const GoalCard: React.FC<GoalCardProps> = ({ title, description, dueDate, achieved }) => {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: '16px', marginBottom: '16px' }}>
            <h2 style={{ margin: 0 }}>{title}</h2>
            <p>{description}</p>
            <p>期日: {dueDate}</p>
            <p style={{ color: achieved ? 'green' : 'red' }}>
                {achieved ? '達成済み' : '未達成'}
            </p>
        </div>
    )
}

export default GoalCard