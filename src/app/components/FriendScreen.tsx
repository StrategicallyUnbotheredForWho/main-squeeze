import { useNavigate } from 'react-router';
import { Users, Send, Heart } from 'lucide-react';

export function FriendsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 pt-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-sm flex items-center gap-2"
        style={{ color: 'var(--tile-blue)' }}
      >
        ← Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--lemon-light)' }}
          >
            <Users className="w-6 h-6" style={{ color: 'var(--tile-blue)' }} />
          </div>
          <div>
            <h1 className="text-3xl" style={{ color: 'var(--tile-blue)' }}>Lemon Circle</h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Your squeeze squad</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div
        className="rounded-3xl p-8 text-center mb-6"
        style={{
          backgroundColor: 'var(--lemon-light)',
          border: '2px solid var(--lemon-yellow)'
        }}
      >
        <div className="text-6xl mb-4">🍋</div>
        <h2 className="text-xl mb-2" style={{ color: 'var(--tile-blue)' }}>Coming Soon!</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--foreground)' }}>
          Connect with friends, send Dare Lemons, and react with 🍋 to their activities.
        </p>
      </div>

      {/* Feature Preview */}
      <div className="space-y-3">
        <h3 className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>What's Coming:</h3>
        
        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ backgroundColor: 'white', border: '2px solid var(--border)' }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--peachy-bg)' }}
          >
            <Send className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
          </div>
          <div>
            <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>Dare Lemons</h4>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Challenge friends to try activities from your Lemon Card
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ backgroundColor: 'white', border: '2px solid var(--border)' }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--lemon-light)' }}
          >
            <Heart className="w-5 h-5" style={{ color: 'var(--tile-green)' }} />
          </div>
          <div>
            <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>Activity Feed</h4>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              See what your circle is up to and cheer them on with 🍋 reactions
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ backgroundColor: 'white', border: '2px solid var(--border)' }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'var(--tile-green)', opacity: 0.2 }}
          >
            <Users className="w-5 h-5" style={{ color: 'var(--tile-green)' }} />
          </div>
          <div>
            <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>Private Circles</h4>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Share your juice journey with close friends only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
