import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <span className="back" onClick={() => router.back()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-arrow-left"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 12H8" />
        <path d="m12 8-4 4 4 4" />
      </svg>
    </span>
  );
}
