import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Book, Bookmark, X, Share2, Download } from 'lucide-react';

interface BookItem {
  id: number;
  title: string;
  author: string;
  mood: string;
  saved: boolean;
  emoji: string;
  description?: string;
}

interface ReadingList {
  name: string;
  mood: string;
  emoji: string;
  color: string;
  books: BookItem[];
}

export function LemonLibrary() {
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState<string>('juicy');
  const [books, setBooks] = useState<BookItem[]>([
    { 
      id: 1, 
      title: 'Tomorrow, and Tomorrow, and Tomorrow', 
      author: 'Gabrielle Zevin', 
      mood: 'juicy', 
      saved: false, 
      emoji: '🎮',
      description: 'A nostalgic story about friendship, video games, and growing up. Perfect summer read energy.'
    },
    { 
      id: 2, 
      title: 'The Seven Husbands of Evelyn Hugo', 
      author: 'Taylor Jenkins Reid', 
      mood: 'juicy', 
      saved: true, 
      emoji: '✨',
      description: 'Old Hollywood glamour meets modern storytelling. Main character energy at its finest.'
    },
    { 
      id: 3, 
      title: 'Crying in H Mart', 
      author: 'Michelle Zauner', 
      mood: 'sour', 
      saved: false, 
      emoji: '🍜',
      description: 'A beautiful memoir about grief, identity, and Korean food. Bring tissues.'
    },
    { 
      id: 4, 
      title: 'How to Do Nothing', 
      author: 'Jenny Odell', 
      mood: 'cozy', 
      saved: false, 
      emoji: '🌿',
      description: 'Gentle resistance against hustle culture. Perfect for slow Sunday mornings.'
    },
    { 
      id: 5, 
      title: 'Beach Read', 
      author: 'Emily Henry', 
      mood: 'juicy', 
      saved: false, 
      emoji: '🏖️',
      description: 'Romance, banter, and writers with creative block. Peak feel-good vibes.'
    },
    { 
      id: 6, 
      title: 'My Year of Rest and Relaxation', 
      author: 'Ottessa Moshfegh', 
      mood: 'sour', 
      saved: true, 
      emoji: '💤',
      description: 'Dark humor about checking out from life. Weirdly relatable and deeply unhinged.'
    },
    { 
      id: 7, 
      title: 'Comfort Me With Apples', 
      author: 'Ruth Reichl', 
      mood: 'cozy', 
      saved: false, 
      emoji: '🍎',
      description: 'A food memoir that feels like a warm hug. Makes you want to cook everything.'
    },
  ]);

  const [showAddBook, setShowAddBook] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    mood: 'juicy',
    emoji: '📖'
  });

  const shareCardRef = useRef<HTMLDivElement>(null);

  const emojiOptions = ['📖', '✨', '🌟', '💛', '🌸', '🌿', '☕', '🍋', '🎨', '🎭', '🏖️', '🌙', '💫', '🎮', '🍜', '🍎'];

  const lists: ReadingList[] = [
    {
      name: 'Juicy Reads',
      mood: 'juicy',
      emoji: '✨',
      color: 'var(--lemon-yellow)',
      books: books.filter(b => b.mood === 'juicy')
    },
    {
      name: 'Cozy Corner',
      mood: 'cozy',
      emoji: '☕',
      color: 'var(--peachy-bg)',
      books: books.filter(b => b.mood === 'cozy')
    },
    {
      name: 'Sour Hours',
      mood: 'sour',
      emoji: '🌧️',
      color: 'var(--tile-green)',
      books: books.filter(b => b.mood === 'sour')
    }
  ];

  const toggleSave = (bookId: number) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === bookId ? { ...book, saved: !book.saved } : book
      )
    );
  };

  const addBook = () => {
    if (newBook.title.trim() === '' || newBook.author.trim() === '') return;
    
    const bookToAdd: BookItem = {
      id: Date.now(),
      title: newBook.title.trim(),
      author: newBook.author.trim(),
      description: newBook.description.trim(),
      mood: newBook.mood,
      emoji: newBook.emoji,
      saved: true
    };
    
    setBooks(prev => [...prev, bookToAdd]);
    setNewBook({ title: '', author: '', description: '', mood: 'juicy', emoji: '📖' });
    setShowAddBook(false);
  };

  const shareBook = (book: BookItem) => {
    setSelectedBook(book);
    setShowShareModal(true);
  };

  const copyShareLink = () => {
    const shareText = `📚 Book Rec from Main Squeeze\n\n${selectedBook?.emoji} ${selectedBook?.title}\nBy ${selectedBook?.author}\n\n${selectedBook?.description}\n\n✨ Mood: ${selectedBook?.mood}`;
    navigator.clipboard.writeText(shareText);
    alert('Copied to clipboard! 🍋');
  };

  const downloadShareCard = async () => {
    if (!shareCardRef.current) return;
    
    // In a real app, you'd use html2canvas or similar
    alert('Share card downloaded! 🎨 (In production, this would save the card as an image)');
  };

  const currentList = lists.find(list => list.mood === activeList);
  const savedCount = books.filter(b => b.saved).length;

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

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--lemon-yellow)' }}
          >
            <Book className="w-6 h-6" style={{ color: 'var(--tile-blue)' }} />
          </div>
          <div>
            <h1 className="text-2xl" style={{ color: 'var(--tile-blue)' }}>Lemon Library</h1>
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Mood-based reading lists</p>
          </div>
        </div>

        {/* Saved Books Count */}
        <div
          className="rounded-2xl p-4 flex items-center justify-between"
          style={{ backgroundColor: 'white', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
            <span className="text-sm" style={{ color: 'var(--tile-blue)' }}>Your Saved Books</span>
          </div>
          <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{savedCount} books</span>
        </div>
      </div>

      {/* Mood Tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {lists.map((list) => (
            <button
              key={list.mood}
              onClick={() => setActiveList(list.mood)}
              className="px-5 py-3 rounded-full whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: activeList === list.mood ? list.color : 'white',
                border: activeList === list.mood ? '2px solid var(--tile-blue)' : '2px solid var(--border)',
                color: 'var(--tile-blue)'
              }}
            >
              <span className="mr-2">{list.emoji}</span>
              {list.name}
            </button>
          ))}
        </div>
      </div>

      {/* Book List */}
      <div className="px-6 space-y-3">
        {currentList?.books.map((book) => (
          <div
            key={book.id}
            className="rounded-2xl p-5 transition-all duration-200"
            style={{
              backgroundColor: book.saved ? 'var(--lemon-light)' : 'white',
              border: book.saved ? '2px solid var(--lemon-yellow)' : '2px solid var(--border)'
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{book.emoji}</span>
                  <div>
                    <h4 className="mb-1" style={{ color: 'var(--tile-blue)' }}>{book.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{book.author}</p>
                  </div>
                </div>
                {book.description && (
                  <p className="text-sm ml-10" style={{ color: 'var(--foreground)' }}>
                    {book.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleSave(book.id)}
                  className="p-2 rounded-full transition-all hover:scale-110 active:scale-95"
                  style={{
                    backgroundColor: book.saved ? 'var(--tile-blue)' : 'var(--secondary)'
                  }}
                >
                  <Bookmark
                    className="w-5 h-5"
                    style={{
                      color: book.saved ? 'white' : 'var(--muted-foreground)',
                      fill: book.saved ? 'white' : 'none'
                    }}
                  />
                </button>
                <button
                  onClick={() => shareBook(book)}
                  className="p-2 rounded-full transition-all hover:scale-110 active:scale-95"
                  style={{
                    backgroundColor: 'var(--secondary)'
                  }}
                >
                  <Share2 className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Your Own */}
      <div className="px-6 mt-8">
        <button
          onClick={() => setShowAddBook(true)}
          className="w-full py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: 'var(--tile-blue)',
            color: 'white',
            border: '2px solid var(--tile-blue)'
          }}
        >
          + Add Your Own Book
        </button>
      </div>

      {/* Mood Guide */}
      <div className="px-6 mt-6">
        <div
          className="rounded-3xl p-5"
          style={{ backgroundColor: 'var(--peachy-bg)' }}
        >
          <h4 className="mb-3" style={{ color: 'var(--tile-blue)' }}>📚 The vibe guide</h4>
          <div className="space-y-2 text-sm" style={{ color: 'var(--foreground)' }}>
            <div><span style={{ color: 'var(--tile-blue)' }}>✨ Juicy:</span> Feel-good, page-turners, summer energy</div>
            <div><span style={{ color: 'var(--tile-blue)' }}>☕ Cozy:</span> Slow, gentle, warm blanket vibes</div>
            <div><span style={{ color: 'var(--tile-blue)' }}>🌧️ Sour:</span> Dark, real, cathartic cry-reads</div>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddBook && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          onClick={() => setShowAddBook(false)}
        >
          <div
            className="w-full max-w-md rounded-t-3xl p-6 pb-8 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl" style={{ color: 'var(--tile-blue)' }}>Add a Book</h3>
              <button
                onClick={() => setShowAddBook(false)}
                className="p-2 rounded-full"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <X className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
              </button>
            </div>

            {/* Book Title */}
            <div className="mb-4">
              <label className="text-sm mb-2 block" style={{ color: 'var(--tile-blue)' }}>
                Book Title *
              </label>
              <input
                type="text"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                placeholder="e.g., Beach Read"
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid var(--border)',
                  color: 'var(--tile-blue)'
                }}
                maxLength={100}
              />
            </div>

            {/* Author */}
            <div className="mb-4">
              <label className="text-sm mb-2 block" style={{ color: 'var(--tile-blue)' }}>
                Author *
              </label>
              <input
                type="text"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                placeholder="e.g., Emily Henry"
                className="w-full px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: 'white',
                  border: '2px solid var(--border)',
                  color: 'var(--tile-blue)'
                }}
                maxLength={100}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="text-sm mb-2 block" style={{ color: 'var(--tile-blue)' }}>
                Your Take (Optional)
              </label>
              <textarea
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                placeholder="What's the vibe? Why do you love it?"
                className="w-full px-4 py-3 rounded-xl resize-none"
                rows={3}
                style={{
                  backgroundColor: 'white',
                  border: '2px solid var(--border)',
                  color: 'var(--tile-blue)'
                }}
                maxLength={200}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                {newBook.description.length}/200 characters
              </p>
            </div>

            {/* Mood Selection */}
            <div className="mb-4">
              <label className="text-sm mb-2 block" style={{ color: 'var(--tile-blue)' }}>
                What's the mood?
              </label>
              <div className="flex gap-2">
                {['juicy', 'cozy', 'sour'].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setNewBook({ ...newBook, mood })}
                    className="flex-1 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 capitalize"
                    style={{
                      backgroundColor: newBook.mood === mood ? 
                        (mood === 'juicy' ? 'var(--lemon-yellow)' : 
                         mood === 'cozy' ? 'var(--peachy-bg)' : 
                         'var(--tile-green)') : 
                        'white',
                      border: newBook.mood === mood ? '2px solid var(--tile-blue)' : '2px solid var(--border)',
                      color: 'var(--tile-blue)'
                    }}
                  >
                    {mood}
                  </button>
                ))}
              </div>
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
                    onClick={() => setNewBook({ ...newBook, emoji })}
                    className="aspect-square rounded-xl flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
                    style={{
                      backgroundColor: newBook.emoji === emoji ? 'var(--lemon-yellow)' : 'white',
                      border: newBook.emoji === emoji ? '2px solid var(--tile-blue)' : '2px solid var(--border)'
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
                onClick={() => setShowAddBook(false)}
                className="flex-1 py-3 rounded-full transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--tile-blue)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={addBook}
                disabled={newBook.title.trim() === '' || newBook.author.trim() === ''}
                className="flex-1 py-3 rounded-full transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--tile-blue)',
                  color: 'white'
                }}
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedBook && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl p-6"
            style={{ backgroundColor: 'var(--background)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl" style={{ color: 'var(--tile-blue)' }}>Share Book</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 rounded-full"
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                <X className="w-5 h-5" style={{ color: 'var(--tile-blue)' }} />
              </button>
            </div>

            {/* Share Card Preview */}
            <div
              ref={shareCardRef}
              className="rounded-3xl p-6 mb-6"
              style={{
                background: 'linear-gradient(135deg, var(--lemon-yellow) 0%, var(--peachy-bg) 100%)',
                border: '3px solid var(--tile-blue)'
              }}
            >
              <div className="text-center mb-4">
                <div className="text-xs mb-2" style={{ color: 'var(--tile-blue)' }}>📚 FROM MAIN SQUEEZE</div>
                <div className="text-5xl mb-3">{selectedBook.emoji}</div>
                <h3 className="text-xl mb-1" style={{ color: 'var(--tile-blue)' }}>{selectedBook.title}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>by {selectedBook.author}</p>
                {selectedBook.description && (
                  <p className="text-sm mb-3" style={{ color: 'var(--foreground)' }}>
                    {selectedBook.description}
                  </p>
                )}
                <div
                  className="inline-block px-4 py-2 rounded-full text-sm capitalize"
                  style={{
                    backgroundColor: 'var(--tile-blue)',
                    color: 'white'
                  }}
                >
                  ✨ {selectedBook.mood} vibes
                </div>
              </div>
              <div className="text-center text-xs mt-4" style={{ color: 'var(--tile-blue)', opacity: 0.7 }}>
                🍋 mainsqueeze.app
              </div>
            </div>

            {/* Share Actions */}
            <div className="space-y-3">
              <button
                onClick={copyShareLink}
                className="w-full py-3 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--tile-blue)',
                  color: 'white'
                }}
              >
                <Share2 className="w-5 h-5" />
                Copy Share Text
              </button>
              <button
                onClick={downloadShareCard}
                className="w-full py-3 rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: 'var(--lemon-yellow)',
                  color: 'var(--tile-blue)'
                }}
              >
                <Download className="w-5 h-5" />
                Download Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
