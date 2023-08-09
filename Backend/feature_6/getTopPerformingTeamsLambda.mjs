import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB();

export const handler = async (event, context) => {
  try {
    const params = {
      TableName: 'Leaderboard',
    };

    const data = await dynamoDB.scan(params).promise();
    const items = data.Items;

    const result = {};

    items.forEach(item => {
      const gameId = item.game_id.S;
      const gameCategory = item.game_category.S;

      item.teams_score.L.forEach(team => {
        const teamScore = parseInt(team.M.team_score.N);

        if (!result[gameCategory] || teamScore > parseInt(result[gameCategory].team_score)) {
          const teamInfo = {
            team_name: team.M.team_name.S,
            team_score: teamScore,
            players: team.M.users_score.L.map(player => ({
              user_name: player.M.user_name.S,
              user_score: parseInt(player.M.user_score.N),
            })),
          };

          result[gameCategory] = teamInfo;
        }
      });
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching data' }),
    };
  }
};
