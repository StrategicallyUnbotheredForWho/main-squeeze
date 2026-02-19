import { useState } from 'react';
import { RefreshCw, Plus, TrendingUp, Check } from 'lucide-react';

// Mock habits data
const initialHabits = [
  { id: 1, title: "Drink water", emoji: "💧", streak: 5, completedToday: true, color: "blue" },
  { id: 2, title: "10 min stretch", emoji: "🧘", streak: 3, completedToday: false, color: "purple" },
  { id: 3, title: "Journal", emoji: "📔", streak: 2, completedToday: true, color: "pink" },
  { id: 4, title: "No doom scrolling before bed", emoji: "📵", streak: 1, completedToday: false, color: "green" },
];

export default function GentleSqueezes() {
  const [habits, setHabits] = useState(initialHabits);
  
  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completedToday: !habit.completedToday, streak: !habit.completedToday ? habit.streak + 1 : habit.streak }
        : habit
    ));
  };
  
  const completedCount = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;
  
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pt-4">
        <h1 className="text-3xl font-bold text-[var(--color-lemon-text)] mb-2">
          🔄 Gentle Squeezes
        </h1>
        <p className="text-gray-600 text-sm">
          Soft habits, no pressure
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-3xl p-5 shadow-md mb-6 border-2 border-green-300">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Today's Progress</p>
            <p className="text-2xl font-bold text-gray-800">
              {completedCount} / {totalHabits}
            </p>
          </div>
          <div className="text-4xl">
            {completedCount === totalHabits ? '🎉' : '🍋'}
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-full transition-all duration-500"
            style={{ width: `${(completedCount / totalHabits) * 100}%` }}
          />
        </div>
        
        {completedCount === totalHabits && (
          <p className="text-center text-sm text-green-700 font-medium mt-3">
            All done for today! You're crushing it ✨
          </p>
        )}
      </div>

      {/* Habits List */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Your Squeezes</h2>
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={() => toggleHabit(habit.id)}
            />
          ))}
        </div>
      </div>

      {/* Add Habit Button */}
      <button className="w-full bg-[var(--color-lemon)] text-[var(--color-lemon-text)] rounded-full py-4 px-6 font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
        <Plus size={20} />
        Add New Habit
      </button>

      {/* Motivational Note */}
      <div className="mt-6 bg-yellow-50 rounded-3xl p-5 border-2 border-yellow-200">
        <p className="text-sm text-gray-700 text-center">
          <span className="font-bold">Remember:</span> These are gentle squeezes, not death grips. 
          Missing a day doesn't mean you failed — it means you're human 💛
        </p>
      </div>
    </div>
  );
}

function HabitCard({ 
  habit, 
  onToggle 
}: { 
  habit: typeof initialHabits[0]; 
  onToggle: () => void;
}) {
  const colorMap = {
    blue: { bg: 'from-blue-100 to-cyan-100', border: 'border-blue-300', text: 'text-blue-700' },
    purple: { bg: 'from-purple-100 to-pink-100', border: 'border-purple-300', text: 'text-purple-700' },
    pink: { bg: 'from-pink-100 to-rose-100', border: 'border-pink-300', text: 'text-pink-700' },
    green: { bg: 'from-green-100 to-emerald-100', border: 'border-green-300', text: 'text-green-700' },
  };
  
  const colors = colorMap[habit.color as keyof typeof colorMap];
  
  return (
    <div className={`bg-gradient-to-r ${colors.bg} rounded-3xl p-5 shadow-md border-2 ${colors.border} transition-all ${
      habit.completedToday ? 'opacity-75' : ''
    }`}>
      <div className="flex items-center gap-4">
        <div className="text-3xl">{habit.emoji}</div>
        
        <div className="flex-1">
          <h3 className={`font-bold text-gray-800 mb-1 ${habit.completedToday ? 'line-through' : ''}`}>
            {habit.title}
          </h3>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <TrendingUp size={14} className={colors.text} />
              <span className={`font-medium ${colors.text}`}>
                {habit.streak} day streak
              </span>
            </div>
            {habit.streak >= 3 && <span>🔥</span>}
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
            habit.completedToday
              ? 'bg-green-500 text-white'
              : 'bg-white text-gray-400 hover:bg-gray-50'
          }`}
        >
          {habit.completedToday ? <Check size={24} /> : <RefreshCw size={20} />}
        </button>
      </div>
    </div>
  );
}
