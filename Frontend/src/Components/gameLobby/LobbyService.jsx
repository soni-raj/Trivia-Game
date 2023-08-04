import { TRIVIA_GET_TEAMS_PER_USER } from '../../utils/apiUrls';

const apiURL = TRIVIA_GET_TEAMS_PER_USER;

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
        .then((data) => data['teams'])
        .catch((error) => {
            console.error(error);
            return {};
        });
};

export const getTeamsPerUser = (user_email) => {
    return fetchData(apiURL, 'POST', { email: user_email });
};
