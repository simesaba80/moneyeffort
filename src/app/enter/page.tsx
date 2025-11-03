"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Goal } from "@/types";

export default function GoalPage() {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("goal") ?? "[]");

    const nextIdRaw = localStorage.getItem("nextId") ?? "1";
    const nextId = nextIdRaw ? parseInt(nextIdRaw, 10) : 1;
    const goalData: Goal = {
      id: nextId.toString(),
      title: goal,
      description: description,
      amount: Number(amount),
      deadline: deadline,
      achieved: false,
    };
    // 🔹 localStorage に保存
    localStorage.setItem("goal", JSON.stringify([...stored, goalData]));
    localStorage.setItem("nextId", (nextId + 1).toString());

    setSubmitted(true);
  };

  const handleNext = () => {
    router.push("/achieve"); // 次のページへ遷移
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
            <label className="block mb-1">目標の詳細</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="例: 毎日10分の筋トレをする"
              className="w-full p-2 border border-[#486A8A] rounded-lg text-[#486A8A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#486A8A]"
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
          <div className="mt-6 p-4 border-t border-[#486A8A] text-[#486A8A] space-y-1">
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
              className="mt-4 w-full bg-[#486A8A] text-white py-2 rounded-lg font-semibold hover:bg-[#3a5871] transition"
            >
              達成確認ページへ →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
