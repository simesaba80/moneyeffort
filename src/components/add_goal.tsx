import Link from "next/link";

export default function AddGoalButton() {
  return (
    <Link
      href="/enter"
      aria-label="コンテンツを追加"
      className="flex h-14 w-14 items-center justify-center rounded-full border border-white bg-[#3A7DAB] text-3xl font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#336b92] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      +
    </Link>
  );
}
