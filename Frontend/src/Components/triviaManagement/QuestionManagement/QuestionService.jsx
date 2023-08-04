import { TRIVIA_CONTENT_MANAGEMENT } from '../../../utils/apiUrls';

const apiURL = TRIVIA_CONTENT_MANAGEMENT + '/questions';

const fetchData = (url, method, body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return {};
    });
};

export const getQuestions = (category, difficulty_level, num_questions) => {
  let queryParams = '';

  if (category) {
    queryParams += `category=${encodeURIComponent(category)}&`;
  }

  if (difficulty_level) {
    queryParams += `difficulty_level=${encodeURIComponent(difficulty_level)}&`;
  }

  if (num_questions) {
    queryParams += `num_questions=${encodeURIComponent(num_questions)}`;
  }

  const url = apiURL + (queryParams ? `?${queryParams}` : '');

  return fetchData(url, 'GET');
};

export const addQuestion = (questionData) => {
  return fetchData(apiURL, 'POST', { question: questionData });
};

export const deleteQuestion = (question_id) => {
  return fetchData(apiURL, 'DELETE', { question_id });
};

export const updateQuestion = (questionData) => {
  return fetchData(apiURL, 'PATCH', { question: questionData });
};
