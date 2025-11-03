"use client";

import { useEffect, useState, ChangeEvent, use } from "react";
import { useRouter } from "next/navigation";
import { fetchGoals } from "@/lib/api";
import type { Goal } from "@/types";

type AchievePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function AchievePage({ params }: AchievePageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const goalId = resolvedParams.id;

  const [goal, setGoal] = useState<Goal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [countdown, setCountdown] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadGoal = async () => {
      try {
        setIsLoading(true);
        const goals = await fetchGoals();
        if (!isMounted) {
          return;
        }

        const targetGoal = goals.find((item) => item.id === goalId) ?? null;
        setGoal(targetGoal);
        setErrorMessage(
          targetGoal ? null : "該当する目標が見つかりませんでした。"
        );
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setGoal(null);
        setErrorMessage("目標の読み込みに失敗しました。");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadGoal();

    return () => {
      isMounted = false;
    };
  }, [goalId]);

  useEffect(() => {
    setShowUpload(false);
    setFile(null);
    setIsExpired(false);
    setCountdown("");
  }, [goalId]);

  useEffect(() => {
    if (!goal?.deadline) {
      setCountdown("");
      setIsExpired(false);
      return;
    }

    const target = new Date(goal.deadline).getTime();

    if (Number.isNaN(target)) {
      setCountdown("");
      setIsExpired(false);
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setCountdown("期限が過ぎました！");
        setIsExpired(true);
        return false;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);
      const totalHours = days * 24 + hours;
      const pad = (n: number) => n.toString().padStart(2, "0");

      setCountdown(`${pad(totalHours)}:${pad(minutes)}:${pad(seconds)}`);
      setIsExpired(false);
      return true;
    };

    if (!updateCountdown()) {
      return;
    }

    const interval = setInterval(() => {
      if (!updateCountdown()) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [goal?.deadline]);

  const handleAchieved = () => {
    if (!goal) {
      return;
    }
    setShowUpload(true);
  };

  const handleFailed = () => {
    router.push("/mypage");
  };

  const handleBack = () => {
    setShowUpload(false);
    setFile(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFile(selectedFile);
  };

  const deadlineLabel = goal?.deadline
    ? new Date(goal.deadline).toLocaleDateString("ja-JP")
    : "期限未設定";

  const amountLabel = goal ? goal.amount.toLocaleString("ja-JP") : undefined;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-[#486A8A]/30 px-8 py-10">
          {isLoading ? (
            <p className="text-center text-gray-500">読み込み中です...</p>
          ) : goal ? (
            <>
              <header className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-[#486A8A]">
                  達成度を確認しよう
                </h1>
                <p className="text-2xl mb-1">
                  目標: <span className="font-medium">{goal.title}</span>
                </p>
                <p className="text-xl mb-2">
                  金額: <strong>{amountLabel}</strong> 円
                </p>
                <p className="text-lg mb-8 text-gray-600">
                  期限: <strong>{deadlineLabel}</strong>
                </p>
                <p
                  className={`text-9xl font-extrabold mb-10 ${
                    isExpired ? "text-red-600" : "text-[#D90429]"
                  } ${countdown ? "animate-pulse" : ""}`}
                >
                  {countdown || "計算中..."}
                </p>
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
                  <p className="mb-4 text-xl font-semibold text-[#486A8A]">
                    証拠をアップロードしてください 📁
                  </p>
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
            </>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                {errorMessage ?? "該当する目標が見つかりませんでした。"}
              </p>
              <button
                onClick={handleFailed}
                className="mx-auto inline-flex items-center justify-center rounded-md border border-[#486A8A] px-6 py-3 font-semibold text-[#486A8A] hover:bg-[#f0f4f8] transition"
              >
                マイページに戻る
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
