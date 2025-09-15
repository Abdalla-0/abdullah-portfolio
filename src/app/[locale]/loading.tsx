import { PacmanLoader } from "react-spinners";
export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex flex-col gap-5 items-center justify-center bg-primaryTint90 z-50">
      <PacmanLoader size={100} color="var(--color-primary)" />
        <h1 className="text-4xl text-primary">Loading...</h1>
    </div>
  );
}
