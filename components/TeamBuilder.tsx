
import React, { useState } from 'react';
import { generateTeamBuildingPost } from '../services/geminiService';
import { UsersIcon, CalendarIcon } from './IconComponents';
import Spinner from './Spinner';

const TeamBuilder: React.FC = () => {
  const [sport, setSport] = useState('Futsal');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('Looking for friendly players for a casual game.');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneratedPost('');
    try {
      const post = await generateTeamBuildingPost(sport, time, message);
      setGeneratedPost(post);
    } catch (error) {
      console.error(error);
      setGeneratedPost("There was an error generating your post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white py-16">
        <div className="container mx-auto px-6">
             <div className="text-center mb-12">
                <UsersIcon className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                <h1 className="text-4xl font-bold text-gray-800">Build Your Team</h1>
                <p className="text-lg text-gray-500 mt-2">Find teammates for your next game in Tabriz.</p>
            </div>
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Enter Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="sport" className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                            <select id="sport" value={sport} onChange={e => setSport(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                <option>Futsal</option>
                                <option>Volleyball</option>
                                <option>Basketball</option>
                                <option>Tennis</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                            <input type="text" id="time" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g., Tomorrow at 5 PM" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                            <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="e.g., Skill level, type of game..." required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors disabled:bg-emerald-300">
                           {isLoading ? 'Generating...' : 'Generate Announcement'}
                        </button>
                    </form>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl min-h-[300px]">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your Announcement Post</h2>
                    {isLoading && <Spinner />}
                    {generatedPost && (
                         <div className="bg-white p-6 rounded-lg shadow-inner relative">
                            <p className="text-gray-700 whitespace-pre-wrap">{generatedPost}</p>
                            <button onClick={handleCopy} className="absolute top-4 right-4 bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300">
                               {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    )}
                    {!isLoading && !generatedPost && (
                        <div className="text-center py-10 text-gray-400">
                            <CalendarIcon className="w-12 h-12 mx-auto mb-2" />
                            <p>Your generated post will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default TeamBuilder;
