import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => {
    // Create a random session ID
    return Math.random().toString(36).substring(2);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post('https://serverless.on-demand.io/apps/chatai', {
        prompt,
        sessionId,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
      setResponse('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Ask chatAi</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Ask something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Send
        </button>
      </form>

      <div className="response-box">
        {loading ? <p className="loading">Answering...</p> : <p>{response}</p>}
      </div>
    </div>
  );
}

export default App;
