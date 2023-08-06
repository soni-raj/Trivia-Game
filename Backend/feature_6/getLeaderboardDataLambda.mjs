import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB();

export const handler = async (event, context) => {
  try {
    const params = {
      TableName: 'Leaderboard',
    };

    const data = await dynamoDB.scan(params).promise();
    const items = data.Items;

    const result = items.map(item => {
      const gameId = item.game_id.S;
      const gameCategory = item.game_category.S;
      const gameDate = item.game_date.S;
      const teamScores = item.teams_score.L.map(team => {
        const teamId = team.M.team_id.S;
        const teamName = team.M.team_name.S;
        const teamScore = parseInt(team.M.team_score.N);
        const usersScore = team.M.users_score.L.map(user => {
          const userName = user.M.user_name.S;
          const userEmail = user.M.user_email.S;
          const userScore = parseInt(user.M.user_score.N);
          return {
            user_name: userName,
            user_email: userEmail,
            user_score: userScore,
          };
        });
        return {
          team_id: teamId,
          team_name: teamName,
          team_score: teamScore,
          users_score: usersScore,
        };
      });

      return {
        game_id: gameId,
        game_category: gameCategory,
        game_date: gameDate,
        teams_score: teamScores,
      };
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
