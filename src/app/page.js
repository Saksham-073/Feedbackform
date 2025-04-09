"use client"
import { useState } from 'react';
import Head from 'next/head';
import FeedbackForm from '@/components/FeedbackForm';
import AdminView from '@/components/AdminView';


export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>Feedback Collector</title>
        <meta name="description" content="A simple feedback collection application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Feedback Collector</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowAdmin(!showAdmin)} 
              className={`px-4 py-2 rounded-md ${
                theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
            >
              {showAdmin ? 'Submit Feedback' : 'View Submitted Feedback'}
            </button>
            <button 
              onClick={toggleTheme} 
              className={`px-4 py-2 rounded-md ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              } transition-colors`}
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </header>

        <div className="animate-fadeIn">
          {showAdmin ? <AdminView theme={theme} /> : <FeedbackForm theme={theme} />}
        </div>

        <footer className={`mt-16 py-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© 2025 Feedback Collector - Developed by Saksham Jamwal</p>
        </footer>
      </main>
    </div>
  );
}