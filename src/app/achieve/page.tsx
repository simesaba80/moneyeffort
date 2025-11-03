"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AchievePage() {
    const router = useRouter();
    const [goal, setGoal] = useState("");
    const [amount, setAmount] = useState("");
    const [deadline, setDeadline] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [showUpload, setShowUpload] = useState(false);
    const [countdown, setCountdown] = useState("");
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const savedGoal = localStorage.getItem("goal");
        const savedAmount = localStorage.getItem("amount");
        const savedDeadline = localStorage.getItem("deadline");
        if (savedGoal) setGoal(savedGoal);
        if (savedAmount) setAmount(savedAmount);
        if (savedDeadline) setDeadline(savedDeadline);
    }, []);

    useEffect(() => {
        if (!deadline) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(deadline).getTime();
            const distance = target - now;

            if (distance <= 0) {
                setCountdown("期限が過ぎました！");
                setIsExpired(true);
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));

            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            const totalhour = days * 24 + hours;

            // 2桁にする関数
            const pad = (n: number) => n.toString().padStart(2, "0");

            // カウントダウン文字列
            setCountdown(`${pad(totalhour)}:${pad(minutes)}:${pad(seconds)}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [deadline]);

    const handleAchieved = () => setShowUpload(true);
    const handleFailed = () => router.push("/mypage");
    const handleBack = () => {
        setShowUpload(false);
        setFile(null);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
            <header className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">達成度を確認しよう</h1>
                {goal && (
                    <>
                        <p className="text-2xl mb-1">
                            目標: <span className="font-medium">{goal}</span>
                        </p>
                        <p className="text-xl mb-4">
                            金額: <strong>{amount}</strong> 円
                        </p>
                        <p
                            className={`text-9xl font-extrabold mb-10 ${isExpired ? "text-red-600" : "text-[#D90429]"
                                } animate-pulse`}
                        >
                            {countdown}
                        </p>
                    </>
                )}
            </header>

            {!showUpload ? (
                <div className="max-w-md mx-auto flex flex-col gap-4">
                    {!isExpired && (
                        <button
                            onClick={handleAchieved}
                            className="w-full bg-[#486A8A] text-white py-3 rounded-md font-semibold hover:bg-[#3a5871] transition text-lg"
                        >
                            達成できた！
                        </button>
                    )}
                    <button
                        onClick={handleFailed}
                        className="w-full border border-[#486A8A] text-[#486A8A] py-3 rounded-md font-semibold hover:bg-[#f0f4f8] transition text-lg"
                    >
                        無理だった…
                    </button>
                </div>
            ) : (
                <div className="max-w-md mx-auto mt-6">
                    <p className="mb-4 text-xl font-semibold">証拠をアップロードしてください 📁</p>
                    <input
                        type="file"
                        accept="image/*,video/*,.pdf"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 p-3 rounded-md text-gray-700 bg-white cursor-pointer"
                    />
                    {file && (
                        <p className="mt-3 text-sm text-gray-600">
                            選択されたファイル: <strong>{file.name}</strong>
                        </p>
                    )}
                    <button
                        onClick={handleBack}
                        className="mt-6 w-full border border-[#486A8A] text-[#486A8A] py-3 rounded-md font-semibold hover:bg-[#f0f4f8] transition text-lg"
                    >
                        ← 戻る
                    </button>
                </div>
            )}
        </main>
    );
}
