export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">

        <div>
          <p className="font-semibold">
            Go Business
          </p>

          <p className="text-sm text-gray-500">
            © 2024 Go Business
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="flex gap-4"
        >
          <a href="#">About</a>
          <a href="#">Privacy</a>
        </nav>

      </div>
    </footer>
  );
}