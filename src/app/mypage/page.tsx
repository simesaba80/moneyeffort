'use client'
import React, { useEffect, useState } from 'react'
import { fetchGoals, fetchHistory } from '@/lib/api'

export default function MyPage() {
    // データは読み込むが、このページは見た目（UI）を優先するため
    // 表示は静的デザインにフォールバックしています。
    const [goals, setGoals] = useState<any[]>([])
    const [history, setHistory] = useState<any[]>([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const goalsData = await fetchGoals()
                const historyData = await fetchHistory()
                setGoals(goalsData ?? [])
                setHistory(historyData ?? [])
            } catch (e) {
                // 読み込みエラーは無視して見た目を表示
                setGoals([])
                setHistory([])
            }
        }
        loadData()
    }, [])

    return (
        <main className="bg-gray-100 min-h-screen">
            <header className="text-white shadow-md" style={{ backgroundColor: 'var(--accent)' }}>
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <i className="fas fa-bullseye mr-2" />
                        達成リワード
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="hidden md:inline">ようこそ、田中さん</span>
                        <img src="https://placehold.co/40x40/E2E8F0/3A7DAB?text=U" alt="ユーザーアイコン" className="w-10 h-10 rounded-full border-2 border-white" />
                    </div>
                </nav>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">マイページ</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                        <i className="fas fa-user-circle text-primary text-6xl mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">田中 太郎</h2>
                        <p className="text-gray-500 mb-6">@taro_tanaka</p>

                        <div className="w-full text-center">
                            <h3 className="text-lg font-semibold text-primary mb-2">現在のランク</h3>
                            <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-yellow-500">
                                <i className="fas fa-trophy" />
                                <span>ゴールド</span>
                            </div>
                            <p className="text-gray-600 mt-2">次のランクまであと <span className="font-bold text-primary">5</span> 回達成！</p>
                        </div>

                        <div className="border-t w-full my-6" />

                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600"><i className="fas fa-check-circle w-5 mr-2 text-green-500" />総達成数</span>
                                <span className="font-bold text-xl text-gray-800">25 回</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600"><i className="fas fa-coins w-5 mr-2 text-yellow-600" />総獲得金額</span>
                                <span className="font-bold text-xl text-gray-800">¥12,500</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                            <i className="fas fa-calendar-check mr-2 text-primary" />
                            進行中の目標（期日確認）
                        </h2>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {/* サンプルの目標カード（見た目重視） */}
                            <div className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-700">新しいWebデザインのスキル習得</h3>
                                    <span className="text-lg font-bold text-primary">¥5,000</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-red-500 font-medium"><i className="fas fa-stopwatch mr-1" />期限：あと 3 日</span>
                                    <button className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80">達成する</button>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-700">毎朝10分間の読書</h3>
                                    <span className="text-lg font-bold text-primary">¥1,000</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-yellow-600 font-medium"><i className="fas fa-stopwatch mr-1" />期限：あと 10 日</span>
                                    <button className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80">達成する</button>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-700">週3回のジムトレーニング</h3>
                                    <span className="text-lg font-bold text-primary">¥2,000</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-green-600 font-medium"><i className="fas fa-stopwatch mr-1" />期限：あと 25 日</span>
                                    <button className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80">達成する</button>
                                </div>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-700">資格試験の勉強（1日1時間）</h3>
                                    <span className="text-lg font-bold text-primary">¥3,000</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-green-600 font-medium"><i className="fas fa-stopwatch mr-1" />期限：あと 30 日</span>
                                    <button className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80">達成する</button>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-gray-200 text-gray-700 font-bold py-2 rounded-lg transition-colors hover:bg-gray-300">
                            <i className="fas fa-plus mr-2" />
                            新しい目標を追加する
                        </button>
                    </div>

                    <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                            <i className="fas fa-history mr-2 text-primary" />
                            達成履歴
                        </h2>
                        <div className="max-h-[500px] overflow-y-auto">
                            <table className="w-full min-w-[600px]">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left p-3 font-semibold text-gray-600">達成日</th>
                                        <th className="text-left p-3 font-semibold text-gray-600">目標</th>
                                        <th className="text-right p-3 font-semibold text-gray-600">獲得金額</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">2025年10月28日</td>
                                        <td className="p-3 font-medium text-gray-800">プロジェクトAの完了</td>
                                        <td className="p-3 text-right font-bold text-green-600">+ ¥5,000</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">2025年10月25日</td>
                                        <td className="p-3 font-medium text-gray-800">プレゼンテーション資料の作成</td>
                                        <td className="p-3 text-right font-bold text-green-600">+ ¥1,500</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">2025年10月20日</td>
                                        <td className="p-3 font-medium text-gray-800">ランニング 5km 達成</td>
                                        <td className="p-3 text-right font-bold text-green-600">+ ¥500</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">2025年10月15日</td>
                                        <td className="p-3 font-medium text-gray-800">クライアントへの提案書提出</td>
                                        <td className="p-3 text-right font-bold text-green-600">+ ¥2,000</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">2025年10月10日</td>
                                        <td className="p-3 font-medium text-gray-800">部屋の掃除</td>
                                        <td className="p-3 text-right font-bold text-green-600">+ ¥500</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">2025年10月5日</td>
                                        <td className="p-3 font-medium text-gray-800">英語の単語学習 100語</td>
                                        <td className="p-3 text-right font-bold text-green-600">+ ¥1,000</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">2025年10月1日</td>
                                        <td className="p-3 font-medium text-gray-800">自炊で夕食を作る</td>
                                        <td className="p-3 text-right font-bold text-green-600">+ ¥500</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">2025年9月28日</td>
                                        <td className="p-3 font-medium text-gray-800">クライアントへの提案書提出</td>
                                        <td className="p-3 text-right font-bold text-green-600">+ ¥2,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-gray-400 mt-12 py-6">
                <div className="container mx-auto px-6 text-center">
                    <p>© 2025 達成リワード. All rights reserved.</p>
                </div>
            </footer>
        </main>
    )
}