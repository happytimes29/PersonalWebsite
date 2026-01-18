import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-black text-sm">
            © {new Date().getFullYear()} 版權所有
          </p>

          <div className="flex gap-6">
            <Link
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-sm hover:opacity-70 transition-opacity duration-200"
            >
              X
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-sm hover:opacity-70 transition-opacity duration-200"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
