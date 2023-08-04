
import { QUESTION_URL } from '../../../utils/apiUrls';

let apiURL = QUESTION_URL + '/questions';

export const getQuestions = (category, difficulty_level) => {
  // apiURL = apiURL + `?category=${encodeURIComponent(category)}&difficulty_level=${encodeURIComponent(difficulty_level)}`;
  return fetch(apiURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      return JSON.parse(data['body']);
    })
    .catch((error) => {
      console.error(error);
      return {};
    });
};

export const addQuestion = (questionData) => {
  console.log(JSON.stringify({ question: questionData }));
  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: questionData }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return {};
    });

};

export const deleteQuestion = (question_id) => {
  return fetch(apiURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question_id: question_id }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return {};
    });
};

export const updateQuestion = (questionData) => {
  return fetch(apiURL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: questionData }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return {};
    });
};
