import React from 'react'
import { Goal } from '@/types'

interface GoalCardProps {
    goal: Goal
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
    const { title, description, dueDate, achieved } = goal
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