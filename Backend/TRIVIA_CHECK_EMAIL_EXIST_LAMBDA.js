const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Extract email from the event body
    const { email } = JSON.parse(event.body);

    // Check if the email is provided
    if (!email) {
      return {
        statusCode: 400,
        headers: getHeaders(),
        body: JSON.stringify({ message: "Email is missing in the request." }),
      };
    }

    // Get the item from DynamoDB based on the email
    const params = {
      TableName: "trivia-game",
      Key: {
        email: email,
      },
    };

    const result = await dynamoDB.get(params).promise();

    // If the email is found in DynamoDB
    if (result.Item) {
      return {
        statusCode: 200,
        headers: getHeaders(),
        body: JSON.stringify({ message: "Email found in the database." }),
      };
    } else {
      return {
        statusCode: 404,
        headers: getHeaders(),
        body: JSON.stringify({ message: "Email not found in the database." }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: getHeaders(),
      body: JSON.stringify({ message: error }),
    };
  }
};

function getHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
  };
}
