import React, { useState, useEffect } from "react";
import QuestionListForm from "./QuestionListForm";
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "./QuestionService";
import Loader from "../../../loader";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const showLoader = (message) => {
    setLoading(true);
    setLoadingMessage(message);
  };

  const hideLoader = () => {
    setLoading(false);
    setLoadingMessage("");
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      showLoader("Fetching Questions...");
      const questionsData = await getQuestions();
      hideLoader();
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAddQuestion = async (questionData) => {
    try {
      console.log(questionData);
      if (questionData.question_id) {
        showLoader("Updating Question...");
        await updateQuestion(questionData);
        hideLoader();
      } else {
        showLoader("Updating Question...");
        await addQuestion(questionData);
        hideLoader();
      }
      fetchQuestions();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      console.log(questionId);
      showLoader("Deleting Question...");
      await deleteQuestion(questionId);
      hideLoader();
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div>
      {isLoading && <Loader open={isLoading} message={loadingMessage} />}
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
