import { useState } from 'react';
import { BookOpen, Heart, MessageCircle, Star } from 'lucide-react';

// Mock book club data
const currentBook = {
  title: "Convenience Store Woman",
  author: "Sayaka Murata",
  cover: "📕",
  progress: 65,
  totalPages: 163,
  dueDate: "Feb 28",
  description: "A brilliant, darkly comic story about finding your place in the world"
};

const discussionPrompts = [
  "What does 'normal' even mean anyway?",
  "Have you ever felt like you were performing a role?",
  "Solo time: blessing or curse? Discuss.",
];

const pastBooks = [
  { title: "The Midnight Library", author: "Matt Haig", rating: 5, emoji: "📘", month: "Jan" },
  { title: "Crying in H Mart", author: "Michelle Zauner", rating: 5, emoji: "📗", month: "Dec" },
  { title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", rating: 4, emoji: "📙", month: "Nov" },
];

const upcomingBooks = [
  { title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", emoji: "📔" },
  { title: "Remarkably Bright Creatures", author: "Shelby Van Pelt", emoji: "📕" },
  { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", emoji: "📘" },
];

export default function LemonLibrary() {
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 pt-4">
        <h1 className="text-3xl font-bold text-[var(--color-lemon-text)] mb-2">
          📚 Lemon Library
        </h1>
        <p className="text-gray-600 text-sm">
          Solo book club, main character energy
        </p>
      </div>

      {/* Current Book */}
      <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-6 mb-6 shadow-lg border-2 border-orange-300">
        <div className="flex gap-4 mb-4">
          <div className="text-6xl">{currentBook.cover}</div>
          <div className="flex-1">
            <h2 className="font-bold text-xl text-gray-800 mb-1">{currentBook.title}</h2>
            <p className="text-sm text-gray-600 mb-2">by {currentBook.author}</p>
            <p className="text-xs text-gray-700 italic">{currentBook.description}</p>
          </div>
        </div>
        
        {/* Reading Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-700 mb-1 font-medium">
            <span>Page {Math.round((currentBook.progress / 100) * currentBook.totalPages)} of {currentBook.totalPages}</span>
            <span>{currentBook.progress}%</span>
          </div>
          <div className="bg-white rounded-full h-3 overflow-hidden border-2 border-orange-400">
            <div 
              className="bg-gradient-to-r from-orange-400 to-pink-500 h-full transition-all"
              style={{ width: `${currentBook.progress}%` }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Due: {currentBook.dueDate}</span>
          <button className="bg-white text-orange-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-shadow">
            Update Progress
          </button>
        </div>
      </div>

      {/* Discussion Prompts */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <MessageCircle className="text-purple-500" size={20} />
          Discussion Prompts
        </h2>
        <div className="space-y-3">
          {discussionPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => setSelectedPrompt(selectedPrompt === index ? null : index)}
              className={`w-full text-left bg-white rounded-2xl p-4 shadow-md transition-all border-2 ${
                selectedPrompt === index ? 'border-purple-400' : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <p className="text-sm font-medium text-gray-800">{prompt}</p>
              {selectedPrompt === index && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <textarea
                    placeholder="Your thoughts here... (just for you, no pressure)"
                    className="w-full p-3 border border-gray-300 rounded-xl text-sm resize-none"
                    rows={3}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Past Reads */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Past Reads</h2>
        <div className="space-y-2">
          {pastBooks.map((book, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border-2 border-gray-200 flex items-center gap-3">
              <div className="text-3xl">{book.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-800">{book.title}</h3>
                <p className="text-xs text-gray-600">{book.author}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < book.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">{book.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Books */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">Up Next (vote!)</h2>
        <div className="space-y-2">
          {upcomingBooks.map((book, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-200 flex items-center gap-3">
              <div className="text-3xl">{book.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-gray-800">{book.title}</h3>
                <p className="text-xs text-gray-600">{book.author}</p>
              </div>
              <button className="text-gray-400 hover:text-pink-500 transition-colors">
                <Heart size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-yellow-50 rounded-3xl p-5 border-2 border-yellow-200">
        <p className="text-sm text-gray-700 text-center">
          <span className="font-bold">Reading vibe:</span> No judgment, no book reports, just vibes. 
          DNF if you want. Skip pages. Read the end first. This is YOUR club 📖✨
        </p>
      </div>
    </div>
  );
}
