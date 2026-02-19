import { useState } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

// Mock activities - will be replaced with real data later
const mockActivities = [
  "Take a solo sunset walk",
  "Try a new recipe just for you",
  "Dance in your kitchen",
  "Call someone you miss",
  "Buy yourself flowers",
  "Journal for 10 mins",
  "Watch a comfort movie",
  "Take a bubble bath",
  "Read 30 pages",
  "Declutter one drawer",
  "Try a new coffee shop",
  "Write a love letter to yourself",
  "Do a face mask",
  "Learn a new word",
  "Compliment a stranger",
  "Make your bed fancy"
];

export default function LemonCards() {
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [currentCard] = useState(mockActivities.slice(0, 16));
  
  const toggleActivity = (index: number) => {
    const newCompleted = new Set(completedActivities);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedActivities(newCompleted);
  };
  
  const completedCount = completedActivities.size;
  const progressPercent = (completedCount / 16) * 100;
  
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pt-4">
        <h1 className="text-3xl font-bold text-[var(--color-lemon-text)] mb-2">
          🍋 My Lemon Card
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          Complete activities to get juiced!
        </p>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-full h-3 overflow-hidden border-2 border-[var(--color-lemon)]">
          <div 
            className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {completedCount} / 16 completed {completedCount === 16 && '🎉'}
        </p>
      </div>

      {/* Bingo Card Grid */}
      <div className="bg-white rounded-3xl p-4 shadow-lg border-2 border-[var(--color-lemon)] mb-6">
        <div className="grid grid-cols-4 gap-2">
          {currentCard.map((activity, index) => (
            <ActivitySquare
              key={index}
              activity={activity}
              completed={completedActivities.has(index)}
              onClick={() => toggleActivity(index)}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-[var(--color-lemon)] text-[var(--color-lemon-text)] rounded-full py-3 px-6 font-bold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
          <Sparkles size={18} />
          New Card
        </button>
        
        <button 
          onClick={() => setCompletedActivities(new Set())}
          className="bg-gray-200 text-gray-700 rounded-full py-3 px-6 font-bold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          Reset
        </button>
      </div>

      {/* Motivational Message */}
      {completedCount === 16 && (
        <div className="mt-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-6 text-center border-2 border-yellow-400">
          <p className="text-2xl mb-2">🎉 FULLY JUICED! 🎉</p>
          <p className="text-gray-700 font-medium">
            You're absolutely crushing solo szn!
          </p>
        </div>
      )}
      
      {completedCount > 0 && completedCount < 16 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 italic">
            Keep squeezing! You're doing amazing ✨
          </p>
        </div>
      )}
    </div>
  );
}

function ActivitySquare({ 
  activity, 
  completed, 
  onClick 
}: { 
  activity: string; 
  completed: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        aspect-square rounded-2xl p-2 text-[10px] font-medium leading-tight
        transition-all duration-300 shadow-sm hover:shadow-md
        ${completed 
          ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 scale-95' 
          : 'bg-[var(--color-lemon-light)] text-gray-700 hover:bg-yellow-100'
        }
      `}
    >
      <div className="h-full flex items-center justify-center text-center relative">
        {completed && (
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            ✓
          </div>
        )}
        <span className={completed ? 'opacity-0' : 'opacity-100'}>
          {activity}
        </span>
      </div>
    </button>
  );
}
3) Commit it!

Tell me when done! 🍋

done
🍋 AWESOME!

📂 STEP 15: Create src/app/pages/LemonDrops.tsx
Click "Add file" → "Create new file"
1) Filename:

src/app/pages/LemonDrops.tsx
2) Paste this:

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
3) Commit it!

Tell me when done! 🍋

done
🍋 CRUSHING IT!

📂 STEP 16: Create src/app/pages/JuiceLevels.tsx
Click "Add file" → "Create new file"
1) Filename:

src/app/pages/JuiceLevels.tsx
2) Paste this:

import { TrendingUp, Award, Zap, Target } from 'lucide-react';

// Mock user progress data
const currentLevel = 3;
const currentXP = 450;
const xpForNextLevel = 600;
const totalPoints = 340;

const levels = [
  { level: 1, title: "Fresh Squeeze", xp: 0, unlocked: true },
  { level: 2, title: "Pulp Fiction", xp: 200, unlocked: true },
  { level: 3, title: "Zest Friend", xp: 400, unlocked: true },
  { level: 4, title: "Lemon Legend", xp: 600, unlocked: false },
  { level: 5, title: "Citrus Supreme", xp: 1000, unlocked: false },
  { level: 6, title: "Meyer Lemon Mogul", xp: 1500, unlocked: false },
  { level: 7, title: "Juice Boss", xp: 2200, unlocked: false },
  { level: 8, title: "Lemonade Tycoon", xp: 3000, unlocked: false },
];

const recentAchievements = [
  { title: "First Squeeze", description: "Completed your first activity", emoji: "🎯", date: "Feb 15" },
  { title: "Streak Master", description: "5 day streak!", emoji: "🔥", date: "Feb 18" },
  { title: "Solo Superstar", description: "Completed 10 activities", emoji: "⭐", date: "Feb 19" },
];

const stats = [
  { label: "Activities Done", value: 23, icon: Target },
  { label: "Current Streak", value: "5d", icon: TrendingUp },
  { label: "Total Points", value: totalPoints, icon: Zap },
  { label: "Level", value: currentLevel, icon: Award },
];

export default function JuiceLevels() {
  const progressPercent = (currentXP / xpForNextLevel) * 100;
  const xpNeeded = xpForNextLevel - currentXP;
  
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pt-4">
        <h1 className="text-3xl font-bold text-[var(--color-lemon-text)] mb-2">
          📈 Juice Levels
        </h1>
        <p className="text-gray-600 text-sm">
          Track your glow-up journey
        </p>
      </div>

      {/* Current Level Card */}
      <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 rounded-3xl p-6 mb-6 shadow-lg border-2 border-yellow-400">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 mb-1">Current Level</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="text-5xl">🍋</div>
            <div>
              <p className="text-4xl font-bold text-yellow-900">{currentLevel}</p>
              <p className="text-sm font-bold text-yellow-700">{levels[currentLevel - 1].title}</p>
            </div>
          </div>
        </div>
        
        {/* XP Progress */}
        <div className="mb-2">
          <div className="flex justify-between text-xs text-gray-700 mb-1 font-medium">
            <span>{currentXP} XP</span>
            <span>{xpNeeded} XP to next level</span>
          </div>
          <div className="bg-white rounded-full h-4 overflow-hidden border-2 border-yellow-500">
            <div 
              className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        
        <p className="text-center text-xs text-gray-600 mt-3">
          Keep squeezing! You're {Math.round(progressPercent)}% to Level {currentLevel + 1} ✨
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-md border-2 border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon size={16} className="text-[var(--color-lemon-text)]" />
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Award className="text-yellow-500" size={20} />
          Recent Achievements
        </h2>
        <div className="space-y-3">
          {recentAchievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-md border-2 border-yellow-200 flex items-center gap-4">
              <div className="text-3xl">{achievement.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-sm">{achievement.title}</h3>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
              <p className="text-xs text-gray-400">{achievement.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* All Levels */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">All Levels</h2>
        <div className="space-y-2">
          {levels.map((level) => (
            <div 
              key={level.level}
              className={`rounded-2xl p-4 flex items-center justify-between transition-all ${
                level.unlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-sm' 
                  : 'bg-gray-50 border-2 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  level.unlocked ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-300 text-gray-500'
                }`}>
                  {level.level}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{level.title}</p>
                  <p className="text-xs text-gray-600">{level.xp} XP required</p>
                </div>
              </div>
              {level.unlocked && (
                <div className="text-xl">✓</div>
              )}
              {!level.unlocked && level.level === currentLevel + 1 && (
                <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Next
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
