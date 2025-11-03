"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { fetchGoals } from "@/lib/api";
import type { Goal } from "@/types";

type AchievePageProps = {
  params: {
    id: string;
  };
};

export default function AchievePage({ params }: AchievePageProps) {
  const router = useRouter();
  const goalId = params.id;

  const [goal, setGoal] = useState<Goal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [countdown, setCountdown] = useState("");

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
  }, [goalId]);

  useEffect(() => {
    if (!goal?.deadline) {
      setCountdown("");
      return;
    }

    const target = new Date(goal.deadline).getTime();

    if (Number.isNaN(target)) {
      setCountdown("");
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setCountdown("期限が過ぎました！");
        return false;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setCountdown(`${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`);
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

  const amountLabel = goal
    ? goal.amount.toLocaleString("ja-JP")
    : undefined;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-[#486A8A] p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-[#486A8A] p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">達成度を確認しよう</h1>

        {isLoading ? (
          <p className="text-gray-500">読み込み中です...</p>
        ) : goal ? (
          <>
            <p className="text-lg font-semibold mb-1">
              目標: <span className="font-normal">{goal.title}</span>
            </p>
            <p className="text-md mb-1">
              金額: <strong>{amountLabel}</strong> 円
            </p>
            <p className="text-md mb-1">
              期限: <strong>{deadlineLabel}</strong>
            </p>
            <p className="text-md mb-4">
              残り時間: <strong>{countdown || "計算中..."}</strong>
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
                <p className="mb-4 text-lg font-semibold">
                  証拠をアップロードしてください 📁
                </p>
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
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">
              {errorMessage ?? "該当する目標が見つかりませんでした。"}
            </p>
            <button
              onClick={handleFailed}
              className="mx-auto inline-flex items-center justify-center rounded-lg border border-[#486A8A] px-4 py-2 font-semibold text-[#486A8A] hover:bg-[#f0f4f8] transition"
            >
              マイページに戻る
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

