import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types/user';
import { Letter } from '../types/letter';
import LetterEditor from '../components/LetterEditor';
import LetterList from '../components/LetterList';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  useEffect(() => {
    axios.get('https://letterappbackend.vercel.app/auth/user', { withCredentials: true })
      .then(response => setUser(response.data))
      .catch(() => window.location.href = '/');

    axios.get('https://letterappbackend.vercel.app/letters/list', { withCredentials: true })
      .then(response => setLetters(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    axios.get('https://letterappbackend.vercel.app/auth/logout', { withCredentials: true })
      .then(() => window.location.href = '/')
      .catch(err => console.error(err));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="bg-white shadow-lg rounded-b-xl px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          {user.photo && (
            <img
              src={user.photo}
              alt={user.displayName}
              className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-md"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome, {user.displayName}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-700 text-white px-5 py-2 rounded-full hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-md"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Letter List Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl p-6 h-full transform hover:scale-105 transition-transform duration-300">
              <LetterList
                letters={letters}
                setLetters={setLetters}
                setSelectedLetter={setSelectedLetter}
              />
            </div>
          </aside>

          {/* Letter Editor */}
          <section className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-[1.02] transition-transform duration-300">
              <LetterEditor
                selectedLetter={selectedLetter}
                setLetters={setLetters}
                setSelectedLetter={setSelectedLetter}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-8 py-4 text-center text-gray-500 text-sm">
        <p>Built with ❤️ using MERN & Google Drive</p>
        <p>Prathmesh Mulhar</p>
      </footer>
    </div>
  );
};

export default Dashboard;