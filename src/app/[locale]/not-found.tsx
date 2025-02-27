import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p className="text-gray-600">Could not find the requested resource.</p>
      <Link href="/" className="text-blue-500 hover:underline mt-4">
        Return Home
      </Link>
    </div>
  );
}
