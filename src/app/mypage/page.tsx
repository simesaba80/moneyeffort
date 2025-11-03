'use client'
import React, { useEffect, useState } from 'react'
import GoalCard from '@/components/GoalCard'
import HistoryList from '@/components/HistoryList'
import RankBadge from '@/components/RankBadge'
import { fetchGoals, fetchHistory } from '@/lib/api'
import { Goal, Achievement } from '@/types'

export default function MyPage() {
    const [goals, setGoals] = useState<Goal[]>([])
    const [history, setHistory] = useState<Achievement[]>([])
    const [rank, setRank] = useState(0)

    useEffect(() => {
        const loadData = async () => {
            const goalsData = await fetchGoals()
            const historyData = await fetchHistory()
            setGoals(goalsData)
            setHistory(historyData)
            // ランクの計算ロジックを追加
            const achievedCount = historyData.length
            setRank(achievedCount)
        }
        loadData()
    }, [])

    return (
        <main style={{ maxWidth: 640, margin: '2rem auto', padding: '1rem' }}>
            <h1>マイページ</h1>
            <RankBadge rank={rank} />
            <h2>目標</h2>
            {goals.map(goal => (
                <GoalCard key={goal.id} goal={goal} />
            ))}
            <h2>達成履歴</h2>
            <HistoryList history={history} />
        </main>
    )
}