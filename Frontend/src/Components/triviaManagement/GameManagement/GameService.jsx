
import { TRIVIA_CONTENT_MANAGEMENT } from '../../../utils/apiUrls';

let apiURL = TRIVIA_CONTENT_MANAGEMENT + '/game';

export const getGames = (category, difficulty_level, num_questions) => {
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
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return {};
    });
};

export const addGame = (gameData) => {
  console.log(JSON.stringify({ game: gameData }));
  return fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game: gameData }),
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

export const deleteGame = (game_id) => {
  return fetch(apiURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game_id: game_id }),
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

export const updateGame = (gameData) => {
  return fetch(apiURL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ game: gameData }),
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
