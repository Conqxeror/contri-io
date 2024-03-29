'use client'

import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [githubRepoURL, setGithubRepoURL] = useState('');
  const [customChanges, setCustomChanges] = useState('');
  const [issueNumber, setIssueNumber] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleGithubRepoURLChange = (e) => {
    setGithubRepoURL(e.target.value);
  };

  const handleCustomChangesChange = (e) => {
    setCustomChanges(e.target.value);
  };

  const handleIssueNumberChange = (e) => {
    setIssueNumber(e.target.value);
  };

  const sendMessage = async () => {
    if (githubRepoURL) {
      const requestSentMessage = { sender: 'user', text: 'Request sent' };
      setChatMessages([...chatMessages, requestSentMessage]);

      try {
        setIsTyping(true);
        const response = await axios.post('/api/genai', {
          githubRepoURL,
          customChanges,
          issueNumber,
        });

        setTimeout(() => {
          setChatMessages([
            ...chatMessages,
            { sender: 'server', text: response.data.response },
          ]);
          setIsTyping(false);
        }, 2000); // Simulating a 2-second delay for typing indicator
      } catch (error) {
        console.error('Error fetching response:', error);
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg mt-5 overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-6xl ${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
              }`}
            >
              {msg.sender === 'server' ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="rounded-lg px-4 py-2 max-w-lg bg-gray-300 text-black">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-gray-500 animate-pulse delay-75"></div>
                <div className="w-3 h-3 rounded-full bg-gray-500 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-100 rounded-b-lg">
        <div className="flex flex-wrap justify-center items-center gap-2">
          <input
            type="text"
            value={githubRepoURL}
            onChange={handleGithubRepoURLChange}
            placeholder="Github URL"
            className="border rounded-lg px-4 py-2 mb-2 sm:mb-0 w-full sm:w-auto"
          />
          <input
            type="text"
            value={customChanges}
            onChange={handleCustomChangesChange}
            placeholder="Custom Changes"
            className="border rounded-lg px-4 py-2 mb-2 sm:mb-0 w-full sm:w-auto"
          />
          <input
            type="text"
            value={issueNumber}
            onChange={handleIssueNumberChange}
            placeholder="Issue #"
            className="border rounded-lg px-4 py-2 mb-2 sm:mb-0 w-full sm:w-auto"
          />
          <button
            onClick={sendMessage}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300 w-full md:w-auto"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
