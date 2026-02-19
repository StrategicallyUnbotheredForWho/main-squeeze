import { useState } from 'react';
import { Droplet, Calendar, Zap, Trophy } from 'lucide-react';

// Mock challenges - will be replaced with real data later
const dailyChallenge = {
  id: 1,
  title: "Text someone just to check in",
  description: "No agenda, just vibes",
  points: 10,
  emoji: "💬"
};

const weeklyChallenge = {
  id: 2,
  title: "Try 3 new solo activities",
  description: "Bonus points for leaving your comfort zone",
  points: 50,
  progress: 1,
  total: 3,
  emoji: "🌟"
};

const pastChallenges = [
  { title: "Cook a fancy meal for one", completed: true, date: "Feb 18" },
  { title: "Visit a museum alone", completed: true, date: "Feb 17" },
  { title: "Dance in public (even just a little)", completed: false, date: "Feb 16" },
  { title: "Send a handwritten note", completed: true, date: "Feb 15" },
];

export default function LemonDrops() {
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [totalPoints] = useState(340);
  
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pt-4">
        <h1 className="text-3xl font-bold text-[var(--color-lemon-text)] mb-2">
          💧 Lemon Drops
        </h1>
        <p className="text-gray-600 text-sm">
          Fresh challenges, daily & weekly
        </p>
      </div>

      {/* Points Card */}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-3xl p-5 mb-6 border-2 border-blue-300 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Juice Points</p>
            <p className="text-3xl font-bold text-blue-900">{totalPoints}</p>
          </div>
          <Trophy className="text-yellow-500" size={48} />
        </div>
      </div>

      {/* Daily Challenge */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Droplet className="text-blue-500" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Daily Drop</h2>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            Resets in 8h
          </span>
        </div>
        
        <ChallengeCard
          emoji={dailyChallenge.emoji}
          title={dailyChallenge.title}
          description={dailyChallenge.description}
          points={dailyChallenge.points}
          completed={dailyCompleted}
          onToggle={() => setDailyCompleted(!dailyCompleted)}
        />
      </div>

      {/* Weekly Challenge */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="text-purple-500" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Weekly Quest</h2>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            4 days left
          </span>
        </div>
        
        <div className="bg-white rounded-3xl p-5 shadow-md border-2 border-purple-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">{weeklyChallenge.emoji}</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1">{weeklyChallenge.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{weeklyChallenge.description}</p>
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{weeklyChallenge.progress} / {weeklyChallenge.total}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-full transition-all"
                    style={{ width: `${(weeklyChallenge.progress / weeklyChallenge.total) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Zap className="text-yellow-500" size={16} />
                <span className="font-bold text-purple-700">+{weeklyChallenge.points} points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Challenges */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Recent History</h2>
        <div className="space-y-2">
          {pastChallenges.map((challenge, index) => (
            <div 
              key={index}
              className={`rounded-2xl p-4 flex items-center justify-between ${
                challenge.completed ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="flex-1">
                <p className={`text-sm font-medium ${challenge.completed ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                  {challenge.title}
                </p>
                <p className="text-xs text-gray-500">{challenge.date}</p>
              </div>
              <div className="text-xl">
                {challenge.completed ? '✓' : '○'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({ 
  emoji, 
  title, 
  description, 
  points, 
  completed, 
  onToggle 
}: { 
  emoji: string; 
  title: string; 
  description: string; 
  points: number;
  completed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`rounded-3xl p-5 shadow-md transition-all ${
      completed 
        ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-400' 
        : 'bg-white border-2 border-blue-300'
    }`}>
      <div className="flex items-start gap-4">
        <div className="text-3xl">{emoji}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Zap className="text-yellow-500" size={16} />
              <span className="font-bold text-blue-700">+{points} points</span>
            </div>
            <button
              onClick={onToggle}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                completed
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {completed ? '✓ Done!' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
