import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Plus, Check, Trash2, X } from 'lucide-react';

interface Habit {
  id: number;
  name: string;
  streak: number;
  lastDone: Date | null;
  completedToday: boolean;
}

export function GentleSqueezesScreen() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState<Habit[]>([]);

  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🍋');

  const emojiOptions = ['🍋', '☀️', '🌅', '💧', '✨', '☕', '🌿', '💪', '📖', '🎨', '🧘', '🎵', '🌸', '🌙', '⭐', '💛'];

  const toggleHabit = (id: number) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === id ? { ...habit, completedToday: !habit.completedToday } : habit
      )
    );
  };

  const addHabit = () => {
    if (newHabitName.trim() === '' || habits.length >= 10) return;
    
    const newHabit: Habit = {
      id: Date.now(),
      name: newHabitName.trim(),
      streak: 0,
      lastDone: null,
      completedToday: false
    };
    
    setHabits(prev => [...prev, newHabit]);
    setNewHabitName('');
    setSelectedEmoji('🍋');
    setShowAddHabit(false);
  };

  const deleteHabit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const checkedCount = habits.filter(h => h.completedToday).length;

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(180deg, var(--peachy-bg) 0%, var(--background) 100%)' }}>
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-sm"
          style={{ color: 'var(--tile-blue)' }}
        >
          ← Back
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--lemon-light)' }}
          >
            <Heart className="w-6 h-6" style={{ color: 'var(--tile-green)' }} />
          </div>
          <div>
            <h1 className="text-2xl" style={{ color: 'var(--tile-blue)' }}>Gentle Squeezes</h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Low-pressure, high-vibes</p>
          </div>
        </div>

        {/* Progress Summary */}
        <div
          className="rounded-2xl p-4"
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--border)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl mb-1" style={{ color: 'var(--tile-blue)' }}>
                {checkedCount} / {habits.length}
              </div>
              <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {checkedCount === habits.length && habits.length > 0 ? 'All done for today! 🎉' : 'habits today'}
              </div>
            </div>
            <div className="text-4xl">
              {checkedCount === habits.length && habits.length > 0 ? '🌟' : '🍋'}
            </div>
          </div>
        </div>
      </div>

      {/* Habits List */}
      <div className="px-6 space-y-3 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm" style={{ color: 'var(--muted-foreground)' }}>YOUR SQUEEZES (MAX 10)</h3>
          {habits.length < 10 && (
            <button
              onClick={() => setShowAddHabit(true)}
              className="text-sm flex items-center gap-1"
              style={{ color: 'var(--tile-blue)' }}
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        {habits.map((habit) => (
          <div
            key={habit.id}
            className="w-full rounded-2xl p-5 transition-all duration-200 relative"
            style={{
              backgroundColor: habit.completedToday ? 'var(--tile-green)' : 'white',
              border: habit.completedToday ? '2px solid var(--tile-blue)' : '2px solid var(--border)',
              boxShadow: habit.completedToday ? '0 4px 12px rgba(74, 124, 89, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <button
              onClick={() => toggleHabit(habit.id)}
              className="w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{habit.emoji}</span>
                  <span
                    className="text-base"
                    style={{
                      color: habit.completedToday ? 'white' : 'var(--tile-blue)',
                      textDecoration: habit.completedToday ? 'line-through' : 'none'
                    }}
                  >
                    {habit.name}
                  </span>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: habit.completedToday ? 'white' : 'var(--secondary)',
                    border: habit.completedToday ? 'none' : '2px solid var(--border)'
                  }}
                >
                  {habit.completedToday && <Check className="w-5 h-5" style={{ color: 'var(--tile-green)' }} />}
                </div>
              </div>
            </button>
            
            {/* Delete button */}
            <button
              onClick={(e) => deleteHabit(habit.id, e)}
              className="absolute top-2 right-2 p-1.5 rounded-full transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: habit.completedToday ? 'rgba(255,255,255,0.2)' : 'var(--secondary)',
                opacity: 0.7
              }}
            >
              <Trash2 className="w-3.5 h-3.5" style={{ color: habit.completedToday ? 'white' : 'var(--muted-foreground)' }} />
            </button>
          </div>
        ))}

        {habits.length === 0 && (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'white', border: '2px dashed var(--border)' }}
          >
            <div className="text-4xl mb-2">🍋</div>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Add your first gentle squeeze to get started
            </p>
          </div>
        )}
      </div>

      {/* Add Habit Modal */}
      {showAddHabit && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          onClick={() => setShowAddHabit(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl p-6 pb-8"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl" style={{ color: 'var(--tile-blue)' }}>Add a Gentle Squeeze</h3>
              <button
                onClick={() => setShowAddHabit(false)}
                className="p-2 rounded-full"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <X className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
              </button>
            </div>

            {/* Habit Name Input */}
            <div className="mb-6">
              <label className="text-sm mb-2 block" style={{ color: 'var(--tile-blue)' }}>
                What's your habit?
              </label>
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="e.g., Morning stretch, Journal, Drink water"
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid var(--border)',
                  color: 'var(--tile-blue)'
                }}
                maxLength={40}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                Keep it simple and gentle!
              </p>
            </div>

            {/* Emoji Picker */}
            <div className="mb-6">
              <label className="text-sm mb-2 block" style={{ color: 'var(--tile-blue)' }}>
                Pick an emoji
              </label>
              <div className="grid grid-cols-8 gap-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className="aspect-square rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
                    style={{
                      backgroundColor: selectedEmoji === emoji ? 'var(--lemon-yellow)' : 'white',
                      border: selectedEmoji === emoji ? '2px solid var(--tile-blue)' : '2px solid var(--border)'
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddHabit(false)}
                className="flex-1 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--tile-blue)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={addHabit}
                disabled={newHabitName.trim() === ''}
                className="flex-1 py-3 rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--tile-blue)',
                  color: 'white'
                }}
              >
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gentle Reminder */}
      <div className="px-6">
        <div
          className="rounded-3xl p-5"
          style={{
            backgroundColor: 'var(--lemon-light)',
            border: '1px solid var(--lemon-yellow)'
          }}
        >
          <h4 className="mb-2" style={{ color: 'var(--tile-blue)' }}>✨ No pressure zone</h4>
          <p className="text-sm" style={{ color: 'var(--foreground)' }}>
            These aren't strict habits. Miss a day? No biggie. The goal is consistency without stress.
            You're doing great just by showing up.
          </p>
        </div>
      </div>

      {/* Weekly View */}
      <div className="px-6 mt-6">
        <h3 className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>THIS WEEK</h3>
        <div className="grid grid-cols-7 gap-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
            const isChecked = index < 3; // Mock data
            const isToday = index === 2;
            
            return (
              <div
                key={day}
                className="aspect-square rounded-xl flex flex-col items-center justify-center"
                style={{
                  backgroundColor: isChecked ? 'var(--tile-green)' : isToday ? 'var(--lemon-light)' : 'white',
                  border: isToday ? '2px solid var(--lemon-yellow)' : '1px solid var(--border)'
                }}
              >
                <div className="text-xs mb-1" style={{ color: isChecked ? 'white' : 'var(--muted-foreground)' }}>
                  {day}
                </div>
                {isChecked && (
                  <div className="text-lg">✓</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
