"use client"
import { CourseContext } from '@/Context/CourceDetails';
import React, { useContext, useState } from 'react';
import { Pagination } from '@mui/material';

console.log('CourseContext:', CourseContext);

interface ResponseData {
  weekly_plan: WeeklyPlan[];
}

interface WeeklyPlan {
  topics: Topic[];
  week: number;
}

interface Topic {
  difficulty: string;
  questions: {
    answer: string;
    options: string[];
    question: string;
  }[];
  summary: string;
  topic_name: string;
}

interface Question {
  type: string;
  question: string;
  options: string[];
  selected: number[];
  week: number;
}

function AiContent() {
  const { response, summary, questions: qs } = useContext(CourseContext);
  console.log(summary, qs);
  const data: ResponseData = response as ResponseData;
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number[]}>({});
  const [editMode, setEditMode] = useState(false);
  const [cards, setCards] = useState(
    data?.weekly_plan?.flatMap(week => 
      week?.topics?.map(topic => ({
        title: topic?.topic_name,
        content: topic?.summary
      }))
    ) ?? []
  );

  const questions = data?.weekly_plan?.flatMap(week =>
    week?.topics?.flatMap(topic =>
      topic?.questions?.map(q => ({
        type: topic?.difficulty,
        question: q?.question,
        options: q?.options,
        selected: [q?.options?.indexOf(q?.answer)],
        week: week.week
      }))
    )
  ) ?? [];

  const totalWeeks = Math.max(1, ...questions.map(q => q.week));
  const filteredQuestions = questions.filter(q => q.week === currentWeek);
  
  const questionsPerPage = 5;
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    const questionKey = `${currentWeek}-${questionIndex}`;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionKey]: prev[questionKey]?.includes(optionIndex) 
        ? prev[questionKey].filter(i => i !== optionIndex)
        : [...(prev[questionKey] || []), optionIndex]
    }));
  };

  const handleCardEdit = (index: number, field: 'title' | 'content', value: string) => {
    const newCards = [...cards];
    newCards[index] = {
      ...newCards[index],
      [field]: value
    };
    setCards(newCards);
  };

  const handleDiscard = () => {
    setSelectedAnswers({});
    setCards(data?.weekly_plan?.flatMap(week => 
      week?.topics?.map(topic => ({
        title: topic?.topic_name,
        content: topic?.summary
      }))
    ) ?? []);
    setEditMode(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-8 bg-gray-50 font-sans">
      <div className="mb-5">
        <h2 className="text-xl text-gray-800 mb-5">AI-Generated Learning Content</h2>
      </div>

      <div className="flex gap-8 justify-between">
        {/* Left Column - Cards */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-base">ℹ️ Learning Cards</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{cards?.length} cards</span>
          </div>
          {cards?.map((card, idx: number) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              {editMode ? (
                <>
                  <input
                    className="w-full mb-2 p-1 border rounded"
                    value={card.title}
                    onChange={(e) => handleCardEdit(idx, 'title', e.target.value)}
                  />
                  <textarea
                    className="w-full p-1 border rounded"
                    value={card.content}
                    onChange={(e) => handleCardEdit(idx, 'content', e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h4 className="m-0 mb-2 text-sm text-gray-800 font-medium">{card?.title}</h4>
                  <p className="text-sm text-gray-600">{card?.content}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Right Column - Questions */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-base">📝 Assessment Questions - Week {currentWeek}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{filteredQuestions?.length} questions</span>
          </div>

          <div className="flex justify-between gap-3 mb-4">
            <div className="flex gap-2">
              {[...Array(totalWeeks)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setCurrentWeek(i + 1);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-2 text-sm border rounded-lg ${
                    currentWeek === i + 1 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Week {i + 1}
                </button>
              ))}
            </div>
          </div>

          {paginatedQuestions?.map((q: Question, i: number) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 mb-5 shadow-sm">
              <div className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block mb-2">{q?.type}</div>
              <div className="text-sm mb-2">{q?.question}</div>
              <ul className="list-none p-0">
                {q?.options?.map((option: string, j: number) => (
                  <li key={j} className="flex items-center gap-3 my-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedAnswers[`${currentWeek}-${i + (currentPage - 1) * questionsPerPage}`]?.includes(j) || false}
                      onChange={() => handleAnswerSelect(i + (currentPage - 1) * questionsPerPage, j)}
                      className="w-4 h-4 cursor-pointer scale-110"
                    />
                    <label className="flex-1 cursor-pointer" onClick={() => handleAnswerSelect(i + (currentPage - 1) * questionsPerPage, j)}>
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
              {selectedAnswers[`${currentWeek}-${i + (currentPage - 1) * questionsPerPage}`]?.length > 0 && (
                <div className={`mt-2 text-sm ${
                  JSON.stringify(selectedAnswers[`${currentWeek}-${i + (currentPage - 1) * questionsPerPage}`]) === JSON.stringify(q.selected)
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {JSON.stringify(selectedAnswers[`${currentWeek}-${i + (currentPage - 1) * questionsPerPage}`]) === JSON.stringify(q.selected)
                    ? '✅ Correct!'
                    : '❌ Try again'}
                </div>
              )}
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <Pagination 
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button 
          onClick={handleDiscard}
          className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          🗑️ Discard Changes
        </button>
        <div>
          <button className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 ml-3">👁️ Preview Course</button>
          <button className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 ml-3">💾 Save as Draft</button>
          <button className="px-4 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-3">🚀 Publish Course</button>
        </div>
      </div>
    </div>
  );
}

export default AiContent;
