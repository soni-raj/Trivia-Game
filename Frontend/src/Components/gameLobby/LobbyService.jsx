import { GET_USER_TEAMS_BY_EMAIL } from '../../utils/apiUrls';

const apiURL = GET_USER_TEAMS_BY_EMAIL;

const fetchData = (url, method, body = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    return fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    }).then((response) => response.json())
        .catch((error) => {
            console.error(error);
            return {};
        });
};

export const getTeamsPerUser = (user_email) => {
    return fetchData(apiURL, 'POST', { email: user_email }).then((data) => data['teams']);
};

export const storeGame = (game_id, user_email, team_id) => {
    const params = "?game_id=" + game_id + "&user_email=" + user_email + "&team_id=" + team_id;
    const url = "https://us-central1-big-depth-391317.cloudfunctions.net/generateGame" + params;
    console.log(game_id);
    return fetchData(url, 'GET');
}