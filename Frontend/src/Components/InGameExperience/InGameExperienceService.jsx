import { GET_TEAM_BY_TEAM_ID, INVITE_TEAM_MEMBER, TRIVIA_GET_USER_DETAIL } from '../../utils/apiUrls';

const apiURL = GET_TEAM_BY_TEAM_ID;

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

export const getTeamsByTeamID = (team_id) => {
    return fetchData(apiURL, 'POST', { teamID: team_id }).then((data) => data['team']);
};

export const inviteTeamMember = (email, team_name, team_id, game_name, cloud_run_url = "https://www.funtrivia.com/") => {
    const url = INVITE_TEAM_MEMBER;
    const body = {
        teamID: team_id,
        game_name: game_name,
        email: email,
        cloud_run_url: cloud_run_url,
        team_name: team_name
    }
    return fetchData(url, 'POST', body).then((data) => data['team']);
};

export const addUserToGame = (user_email, game_id) => {
    const params = "?game_id=" + game_id + "&user_email=" + user_email;
    const url = "https://us-central1-big-depth-391317.cloudfunctions.net/addUserToGame" + params;
    return fetchData(url, 'GET');
};

export const afterGame = (game_id, user_email, team_id) => {
    const params = "?game_id=" + game_id + "&user_email=" + user_email + "&team_id=" + team_id;
    const url = "https://us-central1-big-depth-391317.cloudfunctions.net/afterGame" + params;
    return fetchData(url, 'GET');
};