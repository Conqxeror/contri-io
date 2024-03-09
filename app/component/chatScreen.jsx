'use client'

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [githubRepoURL, setGithubRepoURL] = useState('');
  const [customChanges, setCustomChanges] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const responseRef = useRef('');

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
        setIsLoading(true);
        responseRef.current = '';
        const response = await axios.post(
          'https://contri-api.vercel.app/fix-issue/',
          {
            githubRepoURL,
            customChanges,
            issueNumber,
          },
          {
            responseType: 'stream',
          }
        );

        response.data.on('data', (chunk) => {
          responseRef.current += chunk.toString();
          setChatMessages([
            ...chatMessages,
            { sender: 'server', text: responseRef.current },
          ]);
        });

        response.data.on('end', () => {
          setIsLoading(false);
        });

        response.data.on('error', (error) => {
          console.error('Error fetching response:', error);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error fetching response:', error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg mt-5">
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
        {isLoading && (
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
      <div className="flex items-center p-4 bg-gray-100 rounded-b-lg">
        <input
          type="text"
          value={githubRepoURL}
          onChange={handleGithubRepoURLChange}
          placeholder="Github URL"
          className="flex-grow border rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={customChanges}
          onChange={handleCustomChangesChange}
          placeholder="Custom Changes"
          className="flex-grow border rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={issueNumber}
          onChange={handleIssueNumberChange}
          placeholder="Issue N."
          className="w-20 border rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}