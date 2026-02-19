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
