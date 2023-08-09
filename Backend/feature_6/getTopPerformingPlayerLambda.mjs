import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB();

export const handler = async (event, context) => {
  try {
    const params = {
      TableName: 'Leaderboard',
    };

    const data = await dynamoDB.scan(params).promise();
    const items = data.Items;

    const playerData = {};

    items.forEach(item => {
      item.teams_score.L.forEach(team => {
        team.M.users_score.L.forEach(user => {
          const userName = user.M.user_name.S;
          const userEmail = user.M.user_email.S;
          const userScore = parseInt(user.M.user_score.N);

          if (!playerData[userName] || playerData[userName].user_score < userScore) {
            playerData[userName] = {
              user_name: userName,
              user_email: userEmail,
              user_score: userScore,
              team_name: team.M.team_name.S,
              game_category: item.game_category.S,
            };
          }
        });
      });
    });

    const sortedPlayerData = Object.values(playerData).sort((a, b) => b.user_score - a.user_score);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: JSON.stringify(sortedPlayerData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' }),
    };
  }
};
