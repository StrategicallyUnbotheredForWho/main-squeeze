import { useState } from 'react';
import { ChevronRight, Bell, Palette, Info, X, Check, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

type ModalView = 'notifications' | 'customize' | 'about' | 'appIcon' | null;

export function YouScreen() {
  const [modalView, setModalView] = useState<ModalView>(null);
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    lemonDrops: true,
    dailyReminders: true,
    cardCompletion: true,
    friendActivity: false,
    gentleSqueezesReminder: true,
    weeklyRecap: true
  });

  // Customize card settings
  const [cardSettings, setCardSettings] = useState({
    theme: 'classic' as 'classic' | 'soft-peachy' | 'citrus-burst' | 'cozy-neutral',
    cardSize: 4,
    enableAnimations: true,
    showCategories: true
  });

  // App icon state
  const [selectedIcon, setSelectedIcon] = useState<string>('classic');

  const toggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen px-6 pt-8 pb-24">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div
          className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl"
          style={{
            backgroundColor: 'var(--lemon-yellow)',
            border: '3px solid var(--tile-blue)'
          }}
        >
          🍋
        </div>
        <h2 className="text-2xl mb-1" style={{ color: 'var(--tile-blue)' }}>Main Squeeze</h2>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Level 3 • Getting Juicy</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}>
          <div className="text-2xl mb-1" style={{ color: 'var(--tile-blue)' }}>0</div>
          <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Activities</div>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}>
          <div className="text-2xl mb-1" style={{ color: 'var(--tile-blue)' }}>0</div>
          <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Challenges</div>
        </div>
        <div className="rounded-2xl p-4 text-center" style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}>
          <div className="text-2xl mb-1" style={{ color: 'var(--tile-blue)' }}>0</div>
          <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Habits</div>
        </div>
      </div>

      {/* Settings/Options */}
      <div className="space-y-2">
        <button
          onClick={() => setModalView('notifications')}
          className="w-full py-4 px-5 rounded-2xl text-left flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--lemon-light)' }}
            >
              <Bell className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
            </div>
            <span style={{ color: 'var(--tile-blue)' }}>Notification Settings</span>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
        </button>
        
        <button
          onClick={() => setModalView('customize')}
          className="w-full py-4 px-5 rounded-2xl text-left flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--peachy-bg)' }}
            >
              <Palette className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
            </div>
            <span style={{ color: 'var(--tile-blue)' }}>Customize Cards</span>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
        </button>
        
        <button
          onClick={() => setModalView('appIcon')}
          className="w-full py-4 px-5 rounded-2xl text-left flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--lemon-yellow)' }}
            >
              <Smartphone className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
            </div>
            <span style={{ color: 'var(--tile-blue)' }}>App Icon</span>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
        </button>
        
        <button
          onClick={() => setModalView('about')}
          className="w-full py-4 px-5 rounded-2xl text-left flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--lemon-yellow)' }}
            >
              <Info className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
            </div>
            <span style={{ color: 'var(--tile-blue)' }}>About Main Squeeze</span>
          </div>
          <ChevronRight className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
        </button>
      </div>

      {/* Modals */}
      {modalView && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          onClick={() => setModalView(null)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl p-6 pb-8 max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl" style={{ color: 'var(--tile-blue)' }}>
                {modalView === 'notifications' && 'Notification Settings'}
                {modalView === 'customize' && 'Customize Your Cards'}
                {modalView === 'appIcon' && 'Choose Your Icon'}
                {modalView === 'about' && 'About Main Squeeze'}
              </h3>
              <button
                onClick={() => setModalView(null)}
                className="p-2 rounded-full"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <X className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
              </button>
            </div>

            {/* Notification Settings Content */}
            {modalView === 'notifications' && (
              <div className="space-y-4">
                <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  Choose what reminders keep you juiced without the stress.
                </p>

                <ToggleOption
                  label="Lemon Drops"
                  description="Get notified when new challenges arrive"
                  enabled={notificationSettings.lemonDrops}
                  onToggle={() => toggleNotification('lemonDrops')}
                />

                <ToggleOption
                  label="Daily Reminders"
                  description="A gentle nudge to check your card"
                  enabled={notificationSettings.dailyReminders}
                  onToggle={() => toggleNotification('dailyReminders')}
                />

                <ToggleOption
                  label="Card Completion"
                  description="Celebrate when you complete your card"
                  enabled={notificationSettings.cardCompletion}
                  onToggle={() => toggleNotification('cardCompletion')}
                />

                <ToggleOption
                  label="Friend Activity"
                  description="See when friends complete activities"
                  enabled={notificationSettings.friendActivity}
                  onToggle={() => toggleNotification('friendActivity')}
                />

                <ToggleOption
                  label="Gentle Squeezes Reminder"
                  description="Daily reminder for your habits"
                  enabled={notificationSettings.gentleSqueezesReminder}
                  onToggle={() => toggleNotification('gentleSqueezesReminder')}
                />

                <ToggleOption
                  label="Weekly Recap"
                  description="Your week's achievements wrapped up"
                  enabled={notificationSettings.weeklyRecap}
                  onToggle={() => toggleNotification('weeklyRecap')}
                />

                <div
                  className="rounded-2xl p-4 mt-6"
                  style={{ backgroundColor: 'var(--lemon-light)' }}
                >
                  <p className="text-xs" style={{ color: 'var(--tile-blue)' }}>
                    💛 No pressure! These are just gentle reminders. You do you.
                  </p>
                </div>
              </div>
            )}

            {/* Customize Cards Content */}
            {modalView === 'customize' && (
              <div className="space-y-6">
                <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  Make your Lemon Card feel like home.
                </p>

                {/* Theme Selection */}
                <div>
                  <label className="text-sm mb-3 block" style={{ color: 'var(--tile-blue)' }}>
                    Card Theme
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <ThemeOption
                      name="Classic Lemon"
                      emoji="🍋"
                      colors={['#FFD93D', '#2B4C7E']}
                      selected={cardSettings.theme === 'classic'}
                      onClick={() => setCardSettings(prev => ({ ...prev, theme: 'classic' }))}
                    />
                    <ThemeOption
                      name="Soft Peachy"
                      emoji="🍑"
                      colors={['#FFE5D4', '#FF9999']}
                      selected={cardSettings.theme === 'soft-peachy'}
                      onClick={() => setCardSettings(prev => ({ ...prev, theme: 'soft-peachy' }))}
                    />
                    <ThemeOption
                      name="Citrus Burst"
                      emoji="🍊"
                      colors={['#FFD700', '#FF6B35']}
                      selected={cardSettings.theme === 'citrus-burst'}
                      onClick={() => setCardSettings(prev => ({ ...prev, theme: 'citrus-burst' }))}
                    />
                    <ThemeOption
                      name="Cozy Neutral"
                      emoji="☕"
                      colors={['#F5E6D3', '#8B7355']}
                      selected={cardSettings.theme === 'cozy-neutral'}
                      onClick={() => setCardSettings(prev => ({ ...prev, theme: 'cozy-neutral' }))}
                    />
                  </div>
                </div>

                {/* Card Size */}
                <div>
                  <label className="text-sm mb-3 block" style={{ color: 'var(--tile-blue)' }}>
                    Grid Size: {cardSettings.cardSize}x{cardSettings.cardSize}
                  </label>
                  <div className="flex gap-2">
                    {[3, 4, 5].map(size => (
                      <button
                        key={size}
                        onClick={() => setCardSettings(prev => ({ ...prev, cardSize: size }))}
                        className="flex-1 py-3 rounded-xl transition-all hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: cardSettings.cardSize === size ? 'var(--lemon-yellow)' : 'white',
                          border: `2px solid ${cardSettings.cardSize === size ? 'var(--tile-blue)' : 'var(--border)'}`,
                          color: 'var(--tile-blue)'
                        }}
                      >
                        {size}x{size}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                    Current card will reset when you change size
                  </p>
                </div>

                {/* Other Options */}
                <ToggleOption
                  label="Enable Animations"
                  description="Bouncy, juicy interactions"
                  enabled={cardSettings.enableAnimations}
                  onToggle={() => setCardSettings(prev => ({ ...prev, enableAnimations: !prev.enableAnimations }))}
                />

                <ToggleOption
                  label="Show Category Colors"
                  description="Color-code activities by vibe"
                  enabled={cardSettings.showCategories}
                  onToggle={() => setCardSettings(prev => ({ ...prev, showCategories: !prev.showCategories }))}
                />

                <button
                  className="w-full py-4 rounded-full transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: 'var(--tile-blue)',
                    color: 'white'
                  }}
                  onClick={() => {
                    // In production, this would save the settings
                    toast.success('Settings saved! 🍋✨');
                    setModalView(null);
                  }}
                >
                  Save Changes
                </button>
              </div>
            )}

            {/* App Icon Content */}
            {modalView === 'appIcon' && (
              <div className="space-y-6">
                <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
                  Pick a vibe for your home screen. Very important decision.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <AppIconOption
                    id="classic"
                    name="Classic"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #FFD93D 0%, #FFA500 100%)"
                    selected={selectedIcon === 'classic'}
                    onClick={() => setSelectedIcon('classic')}
                  />
                  <AppIconOption
                    id="retro"
                    name="Retro Wave"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #FF6B9D 0%, #FFC371 50%, #C2FFD8 100%)"
                    selected={selectedIcon === 'retro'}
                    onClick={() => setSelectedIcon('retro')}
                  />
                  <AppIconOption
                    id="soft"
                    name="Soft Girl"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #FFE5D4 0%, #FFCCCB 100%)"
                    selected={selectedIcon === 'soft'}
                    onClick={() => setSelectedIcon('soft')}
                  />
                  <AppIconOption
                    id="juicy"
                    name="Juicy"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #FFEB3B 0%, #00E676 100%)"
                    selected={selectedIcon === 'juicy'}
                    onClick={() => setSelectedIcon('juicy')}
                  />
                  <AppIconOption
                    id="cozy"
                    name="Cozy"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #F5E6D3 0%, #D4A574 100%)"
                    selected={selectedIcon === 'cozy'}
                    onClick={() => setSelectedIcon('cozy')}
                  />
                  <AppIconOption
                    id="vintage"
                    name="Vintage"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #E0C097 0%, #8B7355 100%)"
                    selected={selectedIcon === 'vintage'}
                    onClick={() => setSelectedIcon('vintage')}
                  />
                  <AppIconOption
                    id="y2k"
                    name="Y2K"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #E0BBE4 0%, #957DAD 50%, #D291BC 100%)"
                    selected={selectedIcon === 'y2k'}
                    onClick={() => setSelectedIcon('y2k')}
                  />
                  <AppIconOption
                    id="summer"
                    name="Summer"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    selected={selectedIcon === 'summer'}
                    onClick={() => setSelectedIcon('summer')}
                  />
                  <AppIconOption
                    id="mint"
                    name="Fresh Mint"
                    emoji="🍋"
                    gradient="linear-gradient(135deg, #B2FEFA 0%, #0ED2F7 100%)"
                    selected={selectedIcon === 'mint'}
                    onClick={() => setSelectedIcon('mint')}
                  />
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: 'var(--lemon-light)' }}
                >
                  <p className="text-xs mb-2" style={{ color: 'var(--tile-blue)' }}>
                    📱 <strong>Add to Home Screen</strong>
                  </p>
                  <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                    iPhone: Tap Share → Add to Home Screen<br />
                    Android: Tap Menu → Add to Home Screen
                  </p>
                </div>

                <button
                  className="w-full py-4 rounded-full transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: 'var(--tile-blue)',
                    color: 'white'
                  }}
                  onClick={() => {
                    toast.success('Icon saved! 🍋 Add Main Squeeze to your home screen to see it.');
                    setModalView(null);
                  }}
                >
                  Save Icon
                </button>
              </div>
            )}

            {/* About Content */}
            {modalView === 'about' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🍋</div>
                  <h3 className="text-2xl mb-2" style={{ color: 'var(--tile-blue)' }}>
                    Main Squeeze
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Version 1.0.0
                  </p>
                </div>

                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: 'var(--lemon-light)' }}
                >
                  <h4 className="text-sm mb-2" style={{ color: 'var(--tile-blue)' }}>
                    What is Main Squeeze?
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    Main Squeeze is your summer companion for solo living — a playful, pressure-free way to turn everyday moments into main character energy. Complete activities, embrace challenges, track gentle habits, and discover your next favorite read. No competition, no judgment, just you getting juiced. 🍋
                  </p>
                </div>

                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: 'var(--peachy-bg)' }}
                >
                  <h4 className="text-sm mb-2" style={{ color: 'var(--tile-blue)' }}>
                    The Vibe
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    Early 2000s nostalgia meets Capri Lemon aesthetics. Think soft yellows, rounded corners, and that specific summer boredom where anything feels possible. It's self-improvement without the pressure, sincere but never preachy, and just unhinged enough to keep it real.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-5"
                  style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
                >
                  <h4 className="text-sm mb-3" style={{ color: 'var(--tile-blue)' }}>
                    Features
                  </h4>
                  <ul className="space-y-2 text-sm" style={{ color: 'var(--foreground)' }}>
                    <li className="flex items-start gap-2">
                      <span>🎲</span>
                      <span><strong>Lemon Card:</strong> Your bingo board of solo activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>💧</span>
                      <span><strong>Lemon Drops:</strong> Daily surprise challenges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🤏</span>
                      <span><strong>Gentle Squeezes:</strong> 1-10 low-pressure habits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>📚</span>
                      <span><strong>Lemon Library:</strong> Mood-based book club vibes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚡</span>
                      <span><strong>Juice Levels:</strong> Progress without pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✨</span>
                      <span><strong>Your Wrapped:</strong> Celebrate completed cards</span>
                    </li>
                  </ul>
                </div>

                <div
                  className="rounded-2xl p-5 text-center"
                  style={{ backgroundColor: 'var(--lemon-yellow)' }}
                >
                  <p className="text-sm" style={{ color: 'var(--tile-blue)' }}>
                    Made with 🍋 for solo summer living
                  </p>
                  <p className="text-xs mt-2" style={{ color: 'var(--tile-blue)', opacity: 0.7 }}>
                    © 2026 Main Squeeze App
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Toggle Option Component
function ToggleOption({
  label,
  description,
  enabled,
  onToggle
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-2xl p-4 flex items-start justify-between gap-3"
      style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
    >
      <div className="flex-1">
        <p className="text-sm mb-1" style={{ color: 'var(--tile-blue)' }}>
          {label}
        </p>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
          {description}
        </p>
      </div>
      <button
        onClick={onToggle}
        className="relative w-12 h-6 rounded-full transition-all"
        style={{
          backgroundColor: enabled ? 'var(--tile-blue)' : 'var(--border)'
        }}
      >
        <div
          className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
          style={{
            left: enabled ? '26px' : '4px'
          }}
        />
      </button>
    </div>
  );
}

// Theme Option Component
function ThemeOption({
  name,
  emoji,
  colors,
  selected,
  onClick
}: {
  name: string;
  emoji: string;
  colors: [string, string];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-2xl p-4 text-left transition-all hover:scale-105 active:scale-95"
      style={{
        backgroundColor: 'white',
        border: `2px solid ${selected ? 'var(--tile-blue)' : 'var(--border)'}`,
        boxShadow: selected ? '0 4px 12px rgba(43, 76, 126, 0.15)' : 'none'
      }}
    >
      {selected && (
        <div
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--tile-blue)' }}
        >
          <Check className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="text-2xl mb-2">{emoji}</div>
      <p className="text-xs mb-2" style={{ color: 'var(--tile-blue)' }}>
        {name}
      </p>
      <div className="flex gap-1">
        {colors.map((color, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </button>
  );
}

// App Icon Option Component
function AppIconOption({
  id,
  name,
  emoji,
  gradient,
  selected,
  onClick
}: {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95"
    >
      <div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
        style={{
          background: gradient,
          border: selected ? '3px solid var(--tile-blue)' : '2px solid rgba(43, 76, 126, 0.1)',
          boxShadow: selected 
            ? '0 8px 20px rgba(43, 76, 126, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.5)' 
            : '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.5)'
        }}
      >
        {selected && (
          <div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--tile-blue)' }}
          >
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        {emoji}
      </div>
      <p
        className="text-xs text-center leading-tight"
        style={{ 
          color: selected ? 'var(--tile-blue)' : 'var(--muted-foreground)',
          fontWeight: selected ? 600 : 400
        }}
      >
        {name}
      </p>
    </button>
  );
}
