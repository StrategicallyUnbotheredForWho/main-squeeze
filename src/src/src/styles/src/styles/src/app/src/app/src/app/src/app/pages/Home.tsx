import { Link } from 'react-router';
import { Sparkles, Zap, Target } from 'lucide-react';

export default function Home() {
  // Mock user data - will be replaced with real state management later
  const userName = "Lemon Lover";
  const juiceLevel = 3;
  const currentStreak = 5;
  const completedToday = 2;
  
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 pt-4">
        <h1 className="text-4xl mb-2">🍋</h1>
        <h2 className="text-3xl font-bold text-[var(--color-lemon-text)] mb-1">
          Main Squeeze
        </h2>
        <p className="text-gray-600 text-sm">
          solo szn, best szn
        </p>
      </div>

      {/* Welcome Card */}
      <div className="bg-white rounded-3xl p-6 shadow-md mb-6 border-2 border-[var(--color-lemon)]">
        <h3 className="text-xl font-bold text-[var(--color-lemon-text)] mb-2">
          Hey {userName}! ✨
        </h3>
        <p className="text-gray-600 mb-4">
          Ready to get juiced today?
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Zap className="text-yellow-500" />} label="Juice Level" value={juiceLevel} />
          <StatCard icon={<Target className="text-orange-400" />} label="Streak" value={`${currentStreak}d`} />
          <StatCard icon={<Sparkles className="text-pink-400" />} label="Today" value={completedToday} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <QuickActionCard
          to="/cards"
          emoji="🎯"
          title="My Lemon Card"
          description="Complete activities & get juiced"
          color="bg-yellow-100"
        />
        
        <QuickActionCard
          to="/drops"
          emoji="💧"
          title="Today's Lemon Drop"
          description="Fresh daily & weekly challenges"
          color="bg-blue-100"
        />
        
        <QuickActionCard
          to="/squeezes"
          emoji="🔄"
          title="Gentle Squeezes"
          description="Track your soft habits"
          color="bg-green-100"
        />
        
        <QuickActionCard
          to="/library"
          emoji="📚"
          title="Lemon Library"
          description="Solo reading club vibes"
          color="bg-purple-100"
        />
      </div>

      {/* Encouragement Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 italic">
          "Being alone is not the same as being lonely" 🍋✨
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-[var(--color-lemon-light)] rounded-2xl p-3 text-center">
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-xs text-gray-600 mb-0.5">{label}</p>
      <p className="text-lg font-bold text-[var(--color-lemon-text)]">{value}</p>
    </div>
  );
}

function QuickActionCard({ 
  to, 
  emoji, 
  title, 
  description, 
  color 
}: { 
  to: string; 
  emoji: string; 
  title: string; 
  description: string; 
  color: string;
}) {
  return (
    <Link to={to} className="block">
      <div className={`${color} rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-[var(--color-lemon)]`}>
        <div className="flex items-center gap-4">
          <div className="text-3xl">{emoji}</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-0.5">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="text-gray-400">→</div>
        </div>
      </div>
    </Link>
  );
}
