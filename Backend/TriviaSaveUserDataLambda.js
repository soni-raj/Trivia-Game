const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { firstname, lastname, email, ans1, ans2 } = JSON.parse(event.body);

    const newData = {
      firstname,
      lastname,
      email,
      ans1,
      ans2,
      games_played: 0,
      win_loss: -1,
      total_points: 0,
    };

    const params = {
      TableName: "trivia-game", // Specify your DynamoDB table name here
      Item: newData,
    };

    await dynamoDB.put(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Data Added" }),
    };
  } catch (error) {
    console.error("Error adding document to DynamoDB table: ", error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
