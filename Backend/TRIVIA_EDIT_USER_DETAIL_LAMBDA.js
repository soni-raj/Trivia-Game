const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, ...updateData } = body;

    let updateExpression = "set ";
    let expressionAttributeNames = {};
    let expressionAttributeValues = {};

    for (const property in updateData) {
      updateExpression += `#${property} = :${property}, `;
      expressionAttributeNames[`#${property}`] = property;
      expressionAttributeValues[`:${property}`] = updateData[property];
    }

    updateExpression = updateExpression.slice(0, -2); // Remove trailing ', '

    const params = {
      TableName: "trivia-game",
      Key: { email: email },
      ConditionExpression: "attribute_exists(email)",
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    };

    const result = await dynamoDB.update(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update successful",
        updatedAttributes: result.Attributes,
      }),
    };
  } catch (error) {
    console.error("Error updating document in DynamoDB table: ", error);
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
