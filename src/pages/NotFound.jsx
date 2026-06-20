import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-6xl font-bold mb-4">
        404
      </h1>

      <p className="text-xl mb-6">
        Page not found
      </p>

      <Link
        to="/"
        className="bg-black text-white px-5 py-3 rounded"
      >
        Back to dashboard
      </Link>

    </div>
  );
}