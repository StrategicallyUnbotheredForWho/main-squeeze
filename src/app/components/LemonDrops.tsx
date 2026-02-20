import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Sparkles, Calendar, Star, Check } from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  juiceReward: number;
  emoji: string;
  difficulty: 'chill' | 'medium' | 'spicy';
}

interface ChallengeStatus {
  accepted: number[];
  completed: number[];
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Dance Break Challenge',
    description: 'Put on your fav 2000s bop and dance for one full song. No judgment zone.',
    juiceReward: 15,
    emoji: '💃',
    difficulty: 'chill'
  },
  {
    id: 2,
    title: 'Compliment a Stranger',
    description: 'Tell someone their outfit is fire. Watch them light up.',
    juiceReward: 25,
    emoji: '✨',
    difficulty: 'medium'
  },
  {
    id: 3,
    title: 'Solo Restaurant Date',
    description: 'Book a table for one. Dress up. Order dessert. Own it.',
    juiceReward: 35,
    emoji: '🍽️',
    difficulty: 'spicy'
  }
];

export function LemonDrops() {
  const navigate = useNavigate();
  const [challengeStatus, setChallengeStatus] = useState<ChallengeStatus>({ accepted: [], completed: [] });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'chill': return 'var(--tile-green)';
      case 'medium': return 'var(--lemon-yellow)';
      case 'spicy': return 'var(--tile-blue)';
      default: return 'var(--tile-blue)';
    }
  };

  const acceptChallenge = (id: number) => {
    setChallengeStatus(prev => ({ ...prev, accepted: [...prev.accepted, id] }));
  };

  const completeChallenge = (id: number) => {
    setChallengeStatus(prev => ({ ...prev, completed: [...prev.completed, id] }));
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="px-6 pt-8 pb-6" style={{ background: 'linear-gradient(180deg, var(--lemon-light) 0%, var(--background) 100%)' }}>
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-sm"
          style={{ color: 'var(--tile-blue)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: 'var(--lemon-yellow)' }}
          >
            💧
          </div>
          <div>
            <h1 className="text-2xl" style={{ color: 'var(--tile-blue)' }}>Lemon Drops</h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Daily surprise challenges</p>
          </div>
        </div>

        <div className="rounded-2xl p-4" style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" style={{ color: 'var(--tile-blue)' }} />
            <span style={{ color: 'var(--muted-foreground)' }}>New drops every day at 9 AM</span>
          </div>
        </div>
      </div>

      {/* Challenges */}
      <div className="px-6 space-y-4">
        <h3 className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>TODAY'S DROPS</h3>
        
        {challenges.map((challenge) => {
          const isAccepted = challengeStatus.accepted.includes(challenge.id);
          const isCompleted = challengeStatus.completed.includes(challenge.id);
          
          return (
            <div
              key={challenge.id}
              className="rounded-3xl p-5 transition-all duration-200"
              style={{
                backgroundColor: isCompleted ? 'var(--tile-green)' : isAccepted ? 'var(--lemon-light)' : 'white',
                border: isCompleted ? '2px solid var(--tile-green)' : isAccepted ? '2px solid var(--lemon-yellow)' : '2px solid var(--border)',
                boxShadow: isCompleted ? '0 4px 16px rgba(147, 197, 114, 0.3)' : isAccepted ? '0 4px 16px rgba(255, 217, 61, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                opacity: isCompleted ? 0.8 : 1
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{challenge.emoji}</div>
                  <div>
                    <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>{challenge.title}</h4>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: getDifficultyColor(challenge.difficulty),
                          color: challenge.difficulty === 'medium' ? 'var(--tile-blue)' : 'white',
                          opacity: 0.9
                        }}
                      >
                        {challenge.difficulty}
                      </span>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--tile-green)' }}>
                        <Star className="w-3 h-3 fill-current" />
                        <span>+{challenge.juiceReward} juice</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm mb-4" style={{ color: 'var(--foreground)' }}>
                {challenge.description}
              </p>

              <button
                onClick={() => acceptChallenge(challenge.id)}
                disabled={isAccepted}
                className="w-full py-3 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: isAccepted ? 'var(--tile-blue)' : 'var(--lemon-yellow)',
                  color: isAccepted ? 'white' : 'var(--tile-blue)'
                }}
              >
                {isAccepted ? '✓ Accepted' : 'Accept Challenge'}
              </button>

              {isAccepted && !isCompleted && (
                <button
                  onClick={() => completeChallenge(challenge.id)}
                  className="w-full py-3 mt-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--tile-blue)',
                    color: 'white'
                  }}
                >
                  <Check className="w-4 h-4" />
                  Mark as Done
                </button>
              )}

              {isCompleted && (
                <div
                  className="w-full py-3 mt-2 rounded-full flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--tile-green)',
                    color: 'white'
                  }}
                >
                  <Check className="w-5 h-5" />
                  <span>Completed! +{challenge.juiceReward} juice earned 🎉</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats Footer */}
      <div className="px-6 mt-8">
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'linear-gradient(135deg, var(--peachy-bg) 0%, var(--secondary) 100%)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs mb-1" style={{ color: 'var(--muted-foreground)' }}>This Week</div>
              <div className="text-2xl" style={{ color: 'var(--tile-blue)' }}>12 drops completed</div>
            </div>
            <Sparkles className="w-10 h-10" style={{ color: 'var(--lemon-yellow)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
