import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="font-bold text-xl"
          aria-label="Go to dashboard home"
        >
          Go Business
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-6"
        >
          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <button
            onClick={handleLogout}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Log out
          </button>
        </nav>

      </div>
    </header>
  );
}