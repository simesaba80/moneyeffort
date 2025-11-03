import { useEffect, useState } from 'react'
import { fetchGoals, fetchGoalHistory } from '../lib/api'
import { Goal, GoalHistory } from '../types'

export const useGoals = () => {
    const [goals, setGoals] = useState<Goal[]>([])
    const [goalHistory, setGoalHistory] = useState<GoalHistory[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadGoals = async () => {
            try {
                const fetchedGoals = await fetchGoals()
                setGoals(fetchedGoals)
            } catch (err) {
                setError('目標の取得に失敗しました。')
            }
        }

        const loadGoalHistory = async () => {
            try {
                const fetchedHistory = await fetchGoalHistory()
                setGoalHistory(fetchedHistory)
            } catch (err) {
                setError('達成履歴の取得に失敗しました。')
            }
        }

        const fetchData = async () => {
            setLoading(true)
            await Promise.all([loadGoals(), loadGoalHistory()])
            setLoading(false)
        }

        fetchData()
    }, [])

    return { goals, goalHistory, loading, error }
}