"use clients";
import React from 'react';

interface Game {
  icon: string;
  title: string;
  description: string;
}

function MicroGames() {
  const games: Game[] = [
    { icon: '🐍', title: 'Snake Word Match', description: 'Match words by controlling a snake' },
    { icon: '🎯', title: 'Funshot Shooter', description: 'Answer questions by shooting targets' },
    { icon: '🛠️', title: 'Drag & Drop Builder', description: 'Build concepts by dragging elements' },
    { icon: '📍', title: 'Hotspot Image Selector', description: 'Identify areas on images' },
    { icon: '🧩', title: 'Puzzle Builder', description: 'Solve puzzles to reveal concepts' },
    { icon: '🧠', title: 'Memory Flip Cards', description: 'Match pairs of related concepts' },
    { icon: '🔊', title: 'Audio Scenario Match', description: 'Listen and match scenarios' },
    { icon: '⏱️', title: 'Timed Decision Game', description: 'Make quick decisions under time pressure' },
  ];

  return (
    <div className="p-8 w-[90vw] bg-[#f9fbfc] font-sans min-h-screen">
      <h2 className="text-[22px] mb-2.5 text-gray-800">Gamify Your Learning</h2>
      <p className="text-sm text-gray-600 mb-5">Select micro-games to make your course more engaging and interactive</p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 mb-8">
        {games.map((game: Game, idx: number) => (
          <div key={idx} className="flex items-start justify-between border border-gray-200 rounded-lg p-5 bg-white hover:shadow-md transition-shadow duration-200">
            <div className="text-[28px] mr-4">{game.icon}</div>
            <div className="flex-1">
              <h4 className="m-0 mb-1.5 text-[15px] text-gray-800">{game.title}</h4>
              <p className="text-[13px] text-gray-600 m-0">{game.description}</p>
            </div>
            <div className="ml-auto mt-1.5">
              <label className="relative inline-block w-[38px] h-[22px]">
                <input type="checkbox" className="opacity-0 w-0 h-0" />
                <span className="absolute cursor-pointer inset-0 bg-gray-300 rounded-full before:absolute before:content-[''] before:h-4 before:w-4 before:left-[3px] before:bottom-[3px] before:bg-white before:rounded-full before:transition-transform duration-400 peer-checked:bg-blue-600 peer-checked:before:translate-x-4"></span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#eaf3ff] rounded-lg p-5">
        <h4 className="m-0 mb-1.5 text-base">⚙️ Game Settings</h4>
        <p className="text-[13px] text-gray-700 mb-4">Configure global settings for all enabled games</p>

        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[180px] flex flex-col">
            <label className="text-[13px] mb-1.5">Difficulty Level</label>
            <select className="p-2 text-sm rounded-md border border-gray-300">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="flex-1 min-w-[180px] flex flex-col">
            <label className="text-[13px] mb-1.5">Time Limit (seconds)</label>
            <input type="number" value={60} className="p-2 text-sm rounded-md border border-gray-300" />
          </div>

          <div className="flex-1 min-w-[180px] flex flex-col">
            <label className="text-[13px] mb-1.5">Max Attempts</label>
            <input type="number" value={3} className="p-2 text-sm rounded-md border border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MicroGames;
