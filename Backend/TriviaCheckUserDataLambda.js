const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    // Extract email, userAns1, and userAns2 from the event body
    const { email, userAns1, userAns2 } = JSON.parse(event.body);

    // Check if the email is provided
    if (!email) {
      return {
        statusCode: 400, headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                  'Access-Control-Allow-Credentials': true,
                  'Content-Type': 'application/json'
                },
        body: JSON.stringify({ message: 'Email is missing in the request.' }),
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
      // Compare the answers
      const dbAns1 = result.Item.ans1;
      const dbAns2 = result.Item.ans2;

      if (userAns1 === dbAns1 && userAns2 === dbAns2) {
        // Answers match, you can perform any desired actions here
        // For example, return a success response or perform additional logic
        return {
          statusCode: 200, headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                  'Access-Control-Allow-Credentials': true,
                  'Content-Type': 'application/json'
                },
          body: JSON.stringify({ message: 'Answers match.' }),
        };
      } else {
        // Answers do not match
        return {
          statusCode: 400, headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                  'Access-Control-Allow-Credentials': true,
                  'Content-Type': 'application/json'
                },
          body: JSON.stringify({ message: 'Incorrect answers provided.' }),
        };
      }
    } else {
      return {
        statusCode: 404, headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                  'Access-Control-Allow-Credentials': true,
                  'Content-Type': 'application/json'
                },
        body: JSON.stringify({ message: 'Email not found in the database.' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500, headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                  'Access-Control-Allow-Credentials': true,
                  'Content-Type': 'application/json'
                },
      body: JSON.stringify({ message: error }),
    };
  }
};
