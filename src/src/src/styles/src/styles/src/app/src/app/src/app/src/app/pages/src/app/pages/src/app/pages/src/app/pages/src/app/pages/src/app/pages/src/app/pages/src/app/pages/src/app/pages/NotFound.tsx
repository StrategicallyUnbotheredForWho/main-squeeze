import { Link } from 'react-router';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🍋❓</div>
        <h1 className="text-4xl font-bold text-[var(--color-lemon-text)] mb-3">
          404
        </h1>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Lost in the lemon grove?
        </h2>
        <p className="text-gray-600 mb-6">
          This page doesn't exist, but your solo journey does!
        </p>
        <Link 
          to="/"
          className="inline-flex items-center gap-2 bg-[var(--color-lemon)] text-[var(--color-lemon-text)] rounded-full py-3 px-6 font-bold shadow-md hover:shadow-lg transition-all"
        >
          <Home size={20} />
          Go Home
        </Link>
      </div>
    </div>
  );
}
