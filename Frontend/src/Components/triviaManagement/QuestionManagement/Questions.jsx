import React, { useState, useEffect } from 'react';
import QuestionListForm from './QuestionListForm';
import { getQuestions, addQuestion, deleteQuestion, updateQuestion } from './QuestionService';

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const questionsData = await getQuestions();
      setQuestions(questionsData);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAddQuestion = async (questionData) => {
    try {
      console.log(questionData);
      if(questionData.question_id){
        await updateQuestion(questionData);
      } else {
        await addQuestion(questionData);
      }
      fetchQuestions();
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      console.log(questionId);
      await deleteQuestion(questionId);
      fetchQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div>
      <h1>Trivia Questions</h1>
      <QuestionListForm
        questions={questions}
        onSave={handleAddQuestion}
        onDelete={handleDeleteQuestion}
      />
    </div>
  );
};

export default Questions;
