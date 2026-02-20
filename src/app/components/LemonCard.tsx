import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, X, Camera, Upload, ChevronRight, Share2, Download, ArrowLeft } from 'lucide-react';

interface BingoSquare {
  id: number;
  activity: string;
  completed: boolean;
  category: 'self-date' | 'cozy' | 'dare' | 'main-character';
  photo?: string;
  description?: string;
}

const initialActivities: BingoSquare[] = [
  { id: 1, activity: 'Solo picnic in the park', completed: false, category: 'self-date' },
  { id: 2, activity: 'Morning pages w/ coffee', completed: false, category: 'cozy' },
  { id: 3, activity: 'Wear sunglasses indoors', completed: false, category: 'main-character' },
  { id: 4, activity: 'Order your fav takeout', completed: false, category: 'self-date' },
  { id: 5, activity: 'Dance to 2000s pop', completed: false, category: 'dare' },
  { id: 6, activity: 'Buy yourself flowers', completed: false, category: 'self-date' },
  { id: 7, activity: 'Golden hour photo walk', completed: false, category: 'main-character' },
  { id: 8, activity: 'Bake something messy', completed: false, category: 'cozy' },
  { id: 9, activity: '🍋 FREE SPACE', completed: true, category: 'main-character' },
  { id: 10, activity: 'Thrift something weird', completed: false, category: 'dare' },
  { id: 11, activity: 'Candles + bubble bath', completed: false, category: 'cozy' },
  { id: 12, activity: 'Text your group chat chaos', completed: false, category: 'main-character' },
  { id: 13, activity: 'Make a silly playlist', completed: false, category: 'self-date' },
  { id: 14, activity: 'Try a new coffee order', completed: false, category: 'dare' },
  { id: 15, activity: 'Rewear your fav outfit', completed: false, category: 'main-character' },
  { id: 16, activity: 'Journal about nothing', completed: false, category: 'cozy' },
];

export function LemonCard() {
  const navigate = useNavigate();
  const [squares, setSquares] = useState<BingoSquare[]>(initialActivities);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<BingoSquare | null>(null);
  const [tempPhoto, setTempPhoto] = useState<string>('');
  const [tempDescription, setTempDescription] = useState<string>('');
  const [showWrapped, setShowWrapped] = useState(false);
  const [wrappedSlide, setWrappedSlide] = useState(0);

  const toggleSquare = (id: number) => {
    if (id === 9) return; // Free space always completed
    
    const square = squares.find(s => s.id === id);
    if (!square) return;

    if (square.completed) {
      // Uncomplete the square
      setSquares(prev =>
        prev.map(s =>
          s.id === id ? { ...s, completed: false, photo: undefined, description: undefined } : s
        )
      );
    } else {
      // Open completion modal
      setSelectedSquare(square);
      setTempPhoto('');
      setTempDescription('');
      setShowCompletionModal(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCompletion = () => {
    if (!selectedSquare) return;

    setSquares(prev =>
      prev.map(s =>
        s.id === selectedSquare.id
          ? { ...s, completed: true, photo: tempPhoto, description: tempDescription }
          : s
      )
    );

    setShowCompletionModal(false);
    setSelectedSquare(null);
    setTempPhoto('');
    setTempDescription('');

    // Check if all squares are now completed
    const updatedSquares = squares.map(s =>
      s.id === selectedSquare.id
        ? { ...s, completed: true, photo: tempPhoto, description: tempDescription }
        : s
    );
    
    const allCompleted = updatedSquares.every(s => s.completed);
    if (allCompleted) {
      setTimeout(() => setShowWrapped(true), 500);
    }
  };

  const completedCount = squares.filter(s => s.completed).length;
  const progress = (completedCount / squares.length) * 100;
  const completedSquares = squares.filter(s => s.completed && s.photo);

  const shuffleCard = () => {
    // Shuffle the activities to new positions while keeping categories
    const shuffledActivities = [...initialActivities]
      .filter(a => a.id !== 9) // Remove free space
      .sort(() => Math.random() - 0.5); // Shuffle
    
    // Create new card with shuffled activities, keeping free space in center
    const newSquares = initialActivities.map(square => {
      if (square.id === 9) {
        // Keep free space as is
        return { ...square, completed: true, photo: undefined, description: undefined };
      }
      // Get next shuffled activity
      const shuffledActivity = shuffledActivities.shift();
      return {
        ...square,
        activity: shuffledActivity?.activity || square.activity,
        category: shuffledActivity?.category || square.category,
        completed: false,
        photo: undefined,
        description: undefined
      };
    });
    
    setSquares(newSquares);
  };

  const getCategoryStats = () => {
    const stats = {
      'self-date': 0,
      'cozy': 0,
      'dare': 0,
      'main-character': 0
    };
    
    squares.forEach(s => {
      if (s.completed) {
        stats[s.category]++;
      }
    });
    
    return stats;
  };

  const stats = getCategoryStats();
  const topCategory = Object.entries(stats).sort((a, b) => b[1] - a[1])[0];

  const categoryEmojis = {
    'self-date': '💛',
    'cozy': '☕',
    'dare': '✨',
    'main-character': '🌟'
  };

  const categoryNames = {
    'self-date': 'Self-Date',
    'cozy': 'Cozy Vibes',
    'dare': 'Dare Energy',
    'main-character': 'Main Character'
  };

  // Wrapped Slides
  const renderWrappedSlide = () => {
    switch (wrappedSlide) {
      case 0:
        // Intro
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="text-6xl mb-6 animate-bounce">🍋</div>
            <h1 className="text-4xl mb-4" style={{ color: 'var(--tile-blue)' }}>
              Your Lemon Card
            </h1>
            <h2 className="text-3xl mb-6" style={{ color: 'var(--lemon-yellow)' }}>
              WRAPPED
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--foreground)' }}>
              You completed your card! Let's celebrate your solo summer journey 🎉
            </p>
            <button
              onClick={() => setWrappedSlide(1)}
              className="px-8 py-4 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'var(--tile-blue)',
                color: 'white'
              }}
            >
              Let's go
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 1:
        // Stats
        return (
          <div className="flex flex-col items-center justify-center h-full px-8">
            <h2 className="text-3xl mb-8 text-center" style={{ color: 'var(--tile-blue)' }}>
              Your Summer Stats
            </h2>
            <div className="w-full max-w-sm space-y-4 mb-8">
              <div
                className="rounded-3xl p-6 text-center"
                style={{ backgroundColor: 'var(--lemon-light)' }}
              >
                <div className="text-5xl mb-2" style={{ color: 'var(--tile-blue)' }}>
                  {completedCount}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Activities Completed
                </div>
              </div>

              <div
                className="rounded-3xl p-6 text-center"
                style={{ backgroundColor: 'var(--peachy-bg)' }}
              >
                <div className="text-4xl mb-2">
                  {categoryEmojis[topCategory[0] as keyof typeof categoryEmojis]}
                </div>
                <div className="text-xl mb-1" style={{ color: 'var(--tile-blue)' }}>
                  {categoryNames[topCategory[0] as keyof typeof categoryNames]}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Your top vibe ({topCategory[1]} activities)
                </div>
              </div>
            </div>
            <button
              onClick={() => setWrappedSlide(2)}
              className="px-8 py-4 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'var(--tile-blue)',
                color: 'white'
              }}
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 2:
        // Photo Collage with creative randomized layout
        const shuffledSquares = [...completedSquares].sort(() => Math.random() - 0.5);
        const layoutPattern = Math.floor(Math.random() * 3); // 3 different layout styles
        
        return (
          <div className="flex flex-col h-full py-6">
            <h2 className="text-2xl mb-4 text-center px-6" style={{ color: 'var(--tile-blue)' }}>
              Your Summer Story
            </h2>
            
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {layoutPattern === 0 && (
                // Masonry-style layout
                <div className="space-y-3">
                  {shuffledSquares.map((square, index) => (
                    <div
                      key={square.id}
                      className="rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: 'white',
                        border: '2px solid var(--border)',
                        animation: `fadeIn 0.5s ease-out ${index * 0.08}s both`,
                        marginLeft: index % 3 === 0 ? '0' : index % 3 === 1 ? '20%' : '10%',
                        width: index % 3 === 0 ? '80%' : index % 3 === 1 ? '75%' : '85%'
                      }}
                    >
                      {square.photo && (
                        <div style={{ aspectRatio: index % 2 === 0 ? '1' : '4/3' }}>
                          <img
                            src={square.photo}
                            alt={square.activity}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-3">
                        <p className="text-xs mb-1" style={{ color: 'var(--tile-blue)' }}>
                          {square.activity}
                        </p>
                        {square.description && (
                          <p className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                            {square.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {layoutPattern === 1 && (
                // Polaroid scrapbook style
                <div className="relative" style={{ minHeight: '600px' }}>
                  {shuffledSquares.map((square, index) => {
                    const rotation = (Math.random() - 0.5) * 15; // -7.5 to 7.5 degrees
                    const topOffset = index * 80;
                    const leftOffset = (index % 2) * 30 - 15;
                    
                    return (
                      <div
                        key={square.id}
                        className="absolute rounded-2xl overflow-hidden shadow-lg"
                        style={{
                          backgroundColor: 'white',
                          border: '2px solid var(--border)',
                          animation: `fadeIn 0.5s ease-out ${index * 0.08}s both`,
                          transform: `rotate(${rotation}deg)`,
                          top: `${topOffset}px`,
                          left: `${leftOffset}px`,
                          right: `${-leftOffset}px`,
                          zIndex: shuffledSquares.length - index
                        }}
                      >
                        {square.photo && (
                          <div className="aspect-square">
                            <img
                              src={square.photo}
                              alt={square.activity}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-3 bg-white">
                          <p className="text-xs mb-1 text-center" style={{ color: 'var(--tile-blue)' }}>
                            {square.activity}
                          </p>
                          {square.description && (
                            <p className="text-[10px] text-center" style={{ color: 'var(--muted-foreground)' }}>
                              {square.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {layoutPattern === 2 && (
                // Mixed grid with varied sizes
                <div className="grid grid-cols-6 gap-2 auto-rows-min">
                  {shuffledSquares.map((square, index) => {
                    const sizes = [
                      'col-span-4 row-span-4', // large
                      'col-span-2 row-span-2', // small
                      'col-span-3 row-span-3', // medium
                      'col-span-3 row-span-2', // wide
                      'col-span-2 row-span-3', // tall
                    ];
                    const sizeClass = sizes[index % sizes.length];
                    
                    return (
                      <div
                        key={square.id}
                        className={`rounded-xl overflow-hidden ${sizeClass}`}
                        style={{
                          backgroundColor: 'white',
                          border: '2px solid var(--border)',
                          animation: `fadeIn 0.5s ease-out ${index * 0.08}s both`
                        }}
                      >
                        {square.photo && (
                          <div className="h-full relative">
                            <img
                              src={square.photo}
                              alt={square.activity}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                              <p className="text-[10px] text-white font-medium">
                                {square.activity}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-6">
              <button
                onClick={() => setWrappedSlide(3)}
                className="w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--tile-blue)',
                  color: 'white'
                }}
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 3:
        // Share Options
        return (
          <div className="flex flex-col items-center justify-center h-full px-8">
            <div className="text-5xl mb-6">✨</div>
            <h2 className="text-3xl mb-4 text-center" style={{ color: 'var(--tile-blue)' }}>
              You did it!
            </h2>
            <p className="text-lg mb-8 text-center" style={{ color: 'var(--foreground)' }}>
              Main character energy unlocked 🍋
            </p>

            <div className="w-full max-w-sm space-y-3 mb-8">
              <button
                onClick={() => {
                  // In production, this would generate and share the collage
                  alert('Share your summer wrapped! 🎉');
                }}
                className="w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--lemon-yellow)',
                  color: 'var(--tile-blue)'
                }}
              >
                <Share2 className="w-5 h-5" />
                Share Your Wrapped
              </button>

              <button
                onClick={() => {
                  // In production, this would download the collage
                  alert('Download your wrapped! 📥');
                }}
                className="w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--tile-blue)',
                  color: 'white'
                }}
              >
                <Download className="w-5 h-5" />
                Download Collage
              </button>

              <button
                onClick={() => setShowWrapped(false)}
                className="w-full py-4 rounded-full transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--tile-blue)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-8">
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-sm"
        style={{ color: 'var(--tile-blue)' }}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Card Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl" style={{ color: 'var(--tile-blue)' }}>Your Lemon Card</h2>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--lemon-yellow)' }} />
            <span className="text-sm" style={{ color: 'var(--tile-blue)' }}>
              {completedCount}/{squares.length}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--lemon-yellow) 0%, var(--tile-green) 100%)'
            }}
          />
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
          {completedCount < 5 ? 'Just getting started!' : completedCount < 10 ? 'Getting juicy!' : completedCount < 15 ? 'Main character energy!' : 'Fully squeezed! 🍋'}
        </p>
      </div>

      {/* Bingo Grid */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {squares.map((square) => (
          <button
            key={square.id}
            onClick={() => toggleSquare(square.id)}
            disabled={square.id === 9}
            className="relative aspect-square rounded-2xl p-2 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            style={{
              backgroundColor: square.completed ? 'var(--lemon-yellow)' : 'white',
              border: square.completed ? '2px solid var(--tile-blue)' : '2px solid var(--border)',
              boxShadow: square.completed ? '0 4px 12px rgba(255, 217, 61, 0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            {/* Photo background if exists */}
            {square.photo && (
              <div className="absolute inset-0">
                <img
                  src={square.photo}
                  alt={square.activity}
                  className="w-full h-full object-cover opacity-30"
                />
              </div>
            )}

            {/* Decorative corner pattern */}
            <div
              className="absolute top-1 left-1 w-2 h-2 rounded-full opacity-40"
              style={{
                backgroundColor: square.id === 9 ? 'var(--lemon-yellow)' : 
                  square.category === 'self-date' ? 'var(--tile-blue)' :
                  square.category === 'cozy' ? 'var(--tile-green)' :
                  square.category === 'dare' ? 'var(--lemon-yellow)' :
                  'var(--peachy-bg)'
              }}
            />
            
            <div className="relative flex flex-col items-center justify-center h-full text-center">
              <span
                className="text-[10px] leading-tight"
                style={{
                  color: square.completed ? 'var(--tile-blue)' : 'var(--foreground)',
                  fontWeight: square.completed ? 600 : 500
                }}
              >
                {square.activity}
              </span>
            </div>

            {/* Completion checkmark */}
            {square.completed && square.id !== 9 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--tile-blue)' }}
                >
                  <span className="text-white text-sm">✓</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {completedCount === squares.length && (
          <button
            onClick={() => {
              setWrappedSlide(0);
              setShowWrapped(true);
            }}
            className="w-full py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--lemon-yellow)',
              color: 'var(--tile-blue)',
              boxShadow: '0 4px 16px rgba(255, 217, 61, 0.3)'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              ✨ View Your Wrapped
            </span>
          </button>
        )}
        
        <button
          onClick={shuffleCard}
          className="w-full py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: 'var(--tile-blue)',
            color: 'var(--cream)',
            boxShadow: '0 4px 16px rgba(43, 76, 126, 0.2)'
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Shuffle New Card
          </span>
        </button>
      </div>

      {/* Completion Modal */}
      {showCompletionModal && selectedSquare && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          onClick={() => setShowCompletionModal(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl p-6 pb-8 max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl" style={{ color: 'var(--tile-blue)' }}>
                {selectedSquare.activity}
              </h3>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="p-2 rounded-full"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <X className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
              </button>
            </div>

            {/* Photo Upload */}
            <div className="mb-6">
              <label className="text-sm mb-2 block" style={{ color: 'var(--tile-blue)' }}>
                Add a photo (optional)
              </label>
              
              {!tempPhoto ? (
                <label
                  className="w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--secondary)' }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Camera className="w-12 h-12 mb-2" style={{ color: 'var(--tile-blue)' }} />
                  <span className="text-sm" style={{ color: 'var(--tile-blue)' }}>
                    Tap to add photo
                  </span>
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={tempPhoto}
                    alt="Preview"
                    className="w-full aspect-square rounded-2xl object-cover"
                  />
                  <button
                    onClick={() => setTempPhoto('')}
                    className="absolute top-2 right-2 p-2 rounded-full"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="text-sm mb-2 block" style={{ color: 'var(--tile-blue)' }}>
                How'd it go? (optional)
              </label>
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                placeholder="Share your experience..."
                className="w-full px-4 py-3 rounded-xl resize-none"
                rows={3}
                style={{
                  backgroundColor: 'white',
                  border: '2px solid var(--border)',
                  color: 'var(--tile-blue)'
                }}
                maxLength={150}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                {tempDescription.length}/150 characters
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCompletionModal(false)}
                className="flex-1 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--tile-blue)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveCompletion}
                className="flex-1 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--tile-blue)',
                  color: 'white'
                }}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wrapped Modal */}
      {showWrapped && (
        <div className="fixed inset-0 bg-gradient-to-br from-[var(--lemon-yellow)] via-[var(--peachy-bg)] to-[var(--tile-blue)] z-50 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setShowWrapped(false)}
              className="absolute top-6 right-6 p-3 rounded-full z-10"
              style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            >
              <X className="w-6 h-6" style={{ color: 'var(--tile-blue)' }} />
            </button>

            {/* Slide content */}
            <div className="flex-1">
              {renderWrappedSlide()}
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center gap-2 pb-8">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setWrappedSlide(index)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: wrappedSlide === index ? 'var(--tile-blue)' : 'rgba(255,255,255,0.5)',
                    width: wrappedSlide === index ? '24px' : '8px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
