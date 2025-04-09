
import { useState, useEffect } from 'react';

export default function AdminView({ theme }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/.netlify/functions/get-feedbacks');
      
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks');
      }
      
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 rounded-md ${theme === 'dark' ? 'bg-red-900' : 'bg-red-100'} text-red-700`}>
        <p>Error: {error}</p>
        <button 
          onClick={fetchFeedbacks}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Submitted Feedback</h2>
        <button 
          onClick={fetchFeedbacks}
          className={`px-3 py-1 rounded-md ${
            theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Refresh
        </button>
      </div>

      {feedbacks.length === 0 ? (
        <div className={`p-8 text-center rounded-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p>No feedback submissions yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {feedbacks.map((feedback, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg shadow-md transition-all ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } hover:shadow-lg`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{feedback.name}</h3>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {feedback.timestamp ? formatDate(feedback.timestamp) : 'No date'}
                </span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {feedback.email}
              </p>
              <div className={`mt-3 pt-3 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <p>{feedback.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}