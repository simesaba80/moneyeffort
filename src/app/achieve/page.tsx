"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AchievePage() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [showUpload, setShowUpload] = useState(false);
    const [countdown, setCountdown] = useState("");

    // 固定の値
    const goal = "ムキムキになる！";
    const deadline = "2025-12-31T23:59:59";

    // カウントダウン処理
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(deadline).getTime();
            const distance = target - now;

            if (distance <= 0) {
                setCountdown("期限が過ぎました！");
                clearInterval(interval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            setCountdown(`${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleAchieved = () => {
        setShowUpload(true);
    };

    const handleFailed = () => {
        router.push("/mypage");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleBack = () => {
        setShowUpload(false);
        setFile(null);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-white text-[#486A8A] p-6">
            <div className="bg-white rounded-2xl shadow-lg border border-[#486A8A] p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">達成度を確認しよう</h1>

                <p className="text-lg font-semibold mb-2">
                    目標: <span className="font-normal">{goal}</span>
                </p>

                <p className="text-md mb-4">
                    残り時間: <strong>{countdown}</strong>
                </p>

                {!showUpload ? (
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleAchieved}
                            className="w-full bg-[#486A8A] text-white py-2 rounded-lg font-semibold hover:bg-[#3a5871] transition"
                        >
                            達成できた！
                        </button>
                        <button
                            onClick={handleFailed}
                            className="w-full border border-[#486A8A] text-[#486A8A] py-2 rounded-lg font-semibold hover:bg-[#f0f4f8] transition"
                        >
                            無理だった…
                        </button>
                    </div>
                ) : (
                    <div className="mt-6">
                        <p className="mb-4 text-lg font-semibold">証拠をアップロードしてください 📁</p>
                        <input
                            type="file"
                            accept="image/*,video/*,.pdf"
                            onChange={handleFileChange}
                            className="w-full border border-[#486A8A] p-2 rounded-lg text-[#486A8A] bg-white cursor-pointer"
                        />
                        {file && (
                            <p className="mt-3 text-sm text-gray-600">
                                選択されたファイル: <strong>{file.name}</strong>
                            </p>
                        )}

                        <button
                            onClick={handleBack}
                            className="mt-6 w-full border border-[#486A8A] text-[#486A8A] py-2 rounded-lg font-semibold hover:bg-[#f0f4f8] transition"
                        >
                            ← 戻る
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
