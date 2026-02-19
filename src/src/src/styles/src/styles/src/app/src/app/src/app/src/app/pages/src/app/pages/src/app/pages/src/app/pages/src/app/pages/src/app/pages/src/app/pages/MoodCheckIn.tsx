import { useState } from 'react';
import { Smile, Calendar, TrendingUp } from 'lucide-react';

const moodOptions = [
  { emoji: "🌟", label: "Thriving", color: "from-yellow-200 to-yellow-400" },
  { emoji: "😊", label: "Good", color: "from-green-200 to-green-400" },
  { emoji: "😐", label: "Meh", color: "from-gray-200 to-gray-400" },
  { emoji: "😔", label: "Low", color: "from-blue-200 to-blue-400" },
  { emoji: "😫", label: "Struggling", color: "from-purple-200 to-purple-400" },
];

const recentMoods = [
  { date: "Feb 19", mood: "😊", note: "Got coffee alone, it was nice" },
  { date: "Feb 18", mood: "🌟", note: "Crushed my lemon card!" },
  { date: "Feb 17", mood: "😐", note: "Lazy Sunday vibes" },
  { date: "Feb 16", mood: "😊", note: "Good book day" },
  { date: "Feb 15", mood: "😔", note: "Missing people energy" },
];

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [checkedInToday, setCheckedInToday] = useState(false);
  
  const handleCheckIn = () => {
    if (selectedMood !== null) {
      setCheckedInToday(true);
      // In real app, would save to database
    }
  };
  
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pt-4">
        <h1 className="text-3xl font-bold text-[var(--color-lemon-text)] mb-2">
          😊 Mood Check-In
        </h1>
        <p className="text-gray-600 text-sm">
          How's your solo energy today?
        </p>
      </div>

      {/* Today's Check-In */}
      {!checkedInToday ? (
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg border-2 border-pink-300">
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
            How are you feeling right now?
          </h2>
          
          {/* Mood Selector */}
          <div className="flex justify-around mb-6">
            {moodOptions.map((mood, index) => (
              <button
                key={index}
                onClick={() => setSelectedMood(index)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                  selectedMood === index 
                    ? 'bg-gradient-to-br ' + mood.color + ' scale-110 shadow-md' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs font-medium text-gray-700">{mood.label}</span>
              </button>
            ))}
          </div>
          
          {/* Optional Note */}
          {selectedMood !== null && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Want to add a note? (optional, just for you)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 border-2 border-gray-200 rounded-2xl text-sm resize-none focus:border-pink-300 focus:outline-none"
                rows={3}
              />
            </div>
          )}
          
          {/* Submit Button */}
          {selectedMood !== null && (
            <button
              onClick={handleCheckIn}
              className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full py-3 px-6 font-bold shadow-md hover:shadow-lg transition-all"
            >
              Save Check-In
            </button>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 mb-6 shadow-lg border-2 border-green-400 text-center">
          <div className="text-5xl mb-3">✓</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Checked in for today!</h2>
          <p className="text-sm text-gray-600">
            Thanks for tuning in with yourself 💚
          </p>
        </div>
      )}

      {/* Mood Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-5 mb-6 border-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">This Week's Vibe</p>
            <p className="text-2xl font-bold text-gray-800">Mostly Good 😊</p>
          </div>
          <TrendingUp className="text-green-500" size={40} />
        </div>
      </div>

      {/* Recent History */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Calendar className="text-purple-500" size={20} />
          Recent Check-Ins
        </h2>
        <div className="space-y-2">
          {recentMoods.map((entry, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-4 shadow-sm border-2 border-gray-200"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{entry.mood}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-gray-500">{entry.date}</span>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-gray-700 italic">"{entry.note}"</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supportive Message */}
      <div className="bg-yellow-50 rounded-3xl p-5 border-2 border-yellow-200">
        <p className="text-sm text-gray-700 text-center">
          <span className="font-bold">Gentle reminder:</span> All feelings are valid. 
          You don't have to be okay all the time. This is just a low-pressure way to check in with yourself 💛
        </p>
      </div>
    </div>
  );
}
