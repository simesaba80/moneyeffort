"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoalPage() {
    const router = useRouter();
    const [goal, setGoal] = useState("");
    const [amount, setAmount] = useState("");
    const [deadline, setDeadline] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("goal", goal);
        localStorage.setItem("amount", amount);
        localStorage.setItem("deadline", deadline);
        setSubmitted(true);
    };

    const handleNext = () => {
        router.push("/achieve");
    };

    return (
        <main className="min-h-screen bg-gray-50 text-gray-800 px-6 py-12">
            <header className="max-w-4xl mx-auto mb-12">
                <h1 className="text-4xl font-bold mb-4">目標を設定しよう！</h1>
                <p className="text-lg text-gray-600">
                    あなたの目標、金額、期限を入力してください
                </p>
            </header>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div>
                    <label className="block mb-2 font-semibold">目標</label>
                    <input
                        type="text"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="例: ムキムキになる!!"
                        className="w-full p-3 border-b-2 border-gray-300 focus:border-[#486A8A] focus:outline-none text-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">金額（円）</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="例: 50000"
                        className="w-full p-3 border-b-2 border-gray-300 focus:border-[#486A8A] focus:outline-none text-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">期限</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full p-3 border-b-2 border-gray-300 focus:border-[#486A8A] focus:outline-none text-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#486A8A] text-white py-3 text-lg font-semibold rounded-md hover:bg-[#3a5871] transition"
                >
                    登録
                </button>
            </form>

            {submitted && (
                <section className="max-w-2xl mx-auto mt-12 space-y-3 text-lg">
                    <p>
                        <strong>目標:</strong> {goal}
                    </p>
                    <p>
                        <strong>金額:</strong> {amount} 円
                    </p>
                    <p>
                        <strong>期限:</strong> {deadline}
                    </p>
                    <button
                        onClick={handleNext}
                        className="mt-4 bg-[#486A8A] text-white py-3 w-full text-lg rounded-md hover:bg-[#3a5871] transition"
                    >
                        達成確認ページへ →
                    </button>
                </section>
            )}
        </main>
    );
}
