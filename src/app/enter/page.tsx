"use client";
import { useState } from "react";

export default function GoalPage() {
    const [goal, setGoal] = useState("");
    const [amount, setAmount] = useState("");
    const [deadline, setDeadline] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-[#486A8A]">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">
                    目標を設定しよう!
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">目標</label>
                        <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="例: ムキムキになる!!"
                            className="w-full p-2 border border-[#486A8A] rounded-lg text-[#486A8A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#486A8A]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">金額（円）</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="例: 50000"
                            className="w-full p-2 border border-[#486A8A] rounded-lg text-[#486A8A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#486A8A]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">期限</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            className="w-full p-2 border border-[#486A8A] rounded-lg text-[#486A8A] focus:outline-none focus:ring-2 focus:ring-[#486A8A]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#486A8A] text-white font-semibold py-2 rounded-lg hover:bg-[#3a5871] transition"
                    >
                        登録
                    </button>
                </form>

                {submitted && (
                    <div className="mt-6 p-4 border-t border-[#486A8A] text-[#486A8A]">
                        <p>
                            <strong>目標:</strong> {goal}
                        </p>
                        <p>
                            <strong>金額:</strong> {amount} 円
                        </p>
                        <p>
                            <strong>期限:</strong> {deadline}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
