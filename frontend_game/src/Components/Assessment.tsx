"use client"

import React from 'react';

interface Question {
  type: string;
  question: string;
  options: string[];
  selected: number[];
  points: number;
}

function Assessment() {
  const questions: Question[] = new Array(2).fill({
    type: 'Multiple Choice',
    question: 'What is the primary purpose of GRC in an organization?',
    options: [
      'To increase profits',
      'To ensure ethical behavior and regulatory compliance', 
      'To reduce the workforce',
      'To increase market share',
    ],
    selected: [1],
    points: 10,
  });

  return (
    <div className="p-8 bg-[#f9fbfc] font-sans w-[100%]">
      <h2 className="text-[22px] mb-5 text-gray-800">Assessment Builder</h2>

      <div className="flex flex-wrap items-end bg-white p-5 rounded-lg gap-5 mb-5">
        <div className="flex flex-col min-w-[180px]">
          <label className="text-sm mb-1">Passing Score (%)</label>
          <input type="number" defaultValue={70} className="p-2 text-sm rounded-md border border-gray-300" />
        </div>
        <div className="flex flex-col min-w-[180px]">
          <label className="text-sm mb-1">Time Limit (minutes)</label>
          <input type="number" defaultValue={30} className="p-2 text-sm rounded-md border border-gray-300" />
        </div>
        <div className="flex flex-col min-w-[180px]">
          <label className="text-sm mb-1">Max Attempts</label>
          <input type="number" defaultValue={2} className="p-2 text-sm rounded-md border border-gray-300" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" id="instant" />
            <label htmlFor="instant">Show results instantly</label>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" id="random" />
            <label htmlFor="random">Randomize questions</label>
          </div>
        </div>
        <button className="ml-auto bg-blue-600 text-white border-none py-2.5 px-4 rounded-md cursor-pointer text-sm">
          ➕ Add Question
        </button>
      </div>

      <div className="flex justify-end gap-5 text-sm text-gray-600 mb-2.5">
        <span>📋 8 Questions</span>
        <span>🏆 100 Points</span>
      </div>

      <div className="flex flex-col gap-5">
        {questions.map((q: Question, i: number) => (
          <div key={i} className="bg-white p-5 rounded-lg border border-gray-300">
            <div className="flex justify-between items-center">
              <span className="text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                {q.type}
              </span>
              <div className="flex items-center gap-1.5">
                <label>Points:</label>
                <input 
                  type="number" 
                  value={q.points} 
                  readOnly 
                  className="w-[60px] p-1.5 rounded-md border border-gray-300"
                />
              </div>
            </div>
            <p className="text-sm my-3 text-gray-800">{q.question}</p>
            <ul className="list-none p-0 m-0">
              {q.options.map((opt: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 my-2">
                  <input
                    type="checkbox"
                    checked={q.selected.includes(idx)}
                    readOnly
                    className="mt-[3px] w-4 h-4"
                  />
                  <label className="flex-1 text-sm text-gray-700">{opt}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assessment;
