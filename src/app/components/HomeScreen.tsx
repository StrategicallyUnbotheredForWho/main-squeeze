import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Droplet, Book, Calendar, Heart, Sparkles } from 'lucide-react';

interface JuiceLevelProps {
  currentLevel: number;
  currentJuice: number;
  maxJuice: number;
}

export function HomeScreen() {
  const navigate = useNavigate();
  const [juiceLevel, setJuiceLevel] = useState<JuiceLevelProps>({
    currentLevel: 3,
    currentJuice: 47,
    maxJuice: 100
  });
  
  const [moodToday, setMoodToday] = useState<'sour' | 'neutral' | 'juicy' | null>(null);

  const levelTitles = [
    'Fresh Lemon',
    'Lemon Wedge',
    'Half Squeezed',
    'Getting Juicy',
    'Fully Squeezed',
    'Lemonade Legend',
    'Citrus Supreme',
    'Main Squeeze'
  ];

  const moodOptions = [
    { value: 'sour' as const, emoji: '😤', label: 'Sour', color: 'var(--tile-green)' },
    { value: 'neutral' as const, emoji: '😐', label: 'Neutral', color: 'var(--peachy-bg)' },
    { value: 'juicy' as const, emoji: '✨', label: 'Juicy', color: 'var(--lemon-yellow)' }
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(180deg, var(--peachy-bg) 0%, var(--background) 100%)' }}>
        <div className="mb-8">
          <h1 className="text-3xl mb-1" style={{ color: 'var(--tile-blue)' }}>Main Squeeze</h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Your solo summer era</p>
        </div>

        {/* Juice Level Display */}
        <div
          className="rounded-3xl p-6 mb-4"
          style={{
            backgroundColor: 'white',
            border: '2px solid var(--tile-blue)',
            boxShadow: '0 8px 24px rgba(43, 76, 126, 0.12)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm mb-1" style={{ color: 'var(--muted-foreground)' }}>Level {juiceLevel.currentLevel}</div>
              <h3 className="text-xl" style={{ color: 'var(--tile-blue)' }}>{levelTitles[juiceLevel.currentLevel - 1]}</h3>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{
                backgroundColor: 'var(--lemon-light)',
                border: '3px solid var(--lemon-yellow)'
              }}
            >
              🍋
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--muted-foreground)' }}>
              <span>{juiceLevel.currentJuice} juice</span>
              <span>{juiceLevel.maxJuice} to level up</span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${(juiceLevel.currentJuice / juiceLevel.maxJuice) * 100}%`,
                  background: 'linear-gradient(90deg, var(--lemon-yellow) 0%, var(--tile-green) 100%)'
                }}
              />
            </div>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Complete activities to earn more juice ✨
          </p>
        </div>

        {/* Quick Mood Check */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: 'white' }}>
          <p className="text-sm mb-3" style={{ color: 'var(--tile-blue)' }}>How's your vibe today?</p>
          <div className="flex gap-2">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setMoodToday(mood.value)}
                className="flex-1 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: moodToday === mood.value ? mood.color : 'var(--secondary)',
                  border: moodToday === mood.value ? '2px solid var(--tile-blue)' : '2px solid transparent'
                }}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs" style={{ color: 'var(--tile-blue)' }}>{mood.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-6">
        <h3 className="text-lg mb-4" style={{ color: 'var(--tile-blue)' }}>Your Activities</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/lemon-card')}
            className="rounded-2xl p-5 text-left transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--lemon-yellow)',
              border: '2px solid var(--tile-blue)',
              boxShadow: '0 4px 16px rgba(255, 217, 61, 0.3)'
            }}
          >
            <Sparkles className="w-8 h-8 mb-2" style={{ color: 'var(--tile-blue)' }} />
            <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>Lemon Card</h4>
            <p className="text-xs" style={{ color: 'var(--tile-blue)', opacity: 0.7 }}>Your bingo board</p>
          </button>

          <button
            onClick={() => navigate('/lemon-drops')}
            className="rounded-2xl p-5 text-left transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'white',
              border: '2px solid var(--border)'
            }}
          >
            <Droplet className="w-8 h-8 mb-2" style={{ color: 'var(--tile-blue)' }} />
            <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>Lemon Drops</h4>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Daily surprises</p>
          </button>

          <button
            onClick={() => navigate('/gentle-squeezes')}
            className="rounded-2xl p-5 text-left transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'white',
              border: '2px solid var(--border)'
            }}
          >
            <Heart className="w-8 h-8 mb-2" style={{ color: 'var(--tile-green)' }} />
            <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>Gentle Squeezes</h4>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Your soft habits</p>
          </button>

          <button
            onClick={() => navigate('/lemon-library')}
            className="rounded-2xl p-5 text-left transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'white',
              border: '2px solid var(--border)'
            }}
          >
            <Book className="w-8 h-8 mb-2" style={{ color: 'var(--peachy-bg)', stroke: 'var(--tile-blue)' }} />
            <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>Lemon Library</h4>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Books & lists</p>
          </button>
        </div>
      </div>

      {/* Today's Lemon Drop Teaser */}
      <div className="px-6">
        <div
          className="rounded-3xl p-5"
          style={{
            background: 'linear-gradient(135deg, var(--tile-blue) 0%, var(--tile-green) 100%)',
            color: 'white'
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-xs mb-1 opacity-80">Today's Lemon Drop</div>
              <h4 className="text-lg mb-2">Dance Break Challenge</h4>
              <p className="text-sm opacity-90">Put on your fav 2000s bop and dance for one full song. No judgment zone.</p>
            </div>
            <Calendar className="w-6 h-6 opacity-80" />
          </div>
          <button
            className="mt-4 px-5 py-2 rounded-full text-sm transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--lemon-yellow)',
              color: 'var(--tile-blue)'
            }}
          >
            Accept Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
