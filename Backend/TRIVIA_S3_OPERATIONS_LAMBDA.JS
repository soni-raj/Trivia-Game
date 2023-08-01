// Import the required AWS SDK clients
const AWS = require("aws-sdk");
// Create an instance of the S3 client
const s3 = new AWS.S3();

// This is the Lambda function handler that gets executed when the Lambda function is triggered
exports.handler = async (event, context) => {
  // Parse the JSON body of the event
  let requestBody = JSON.parse(event.body);

  // Extract the user's email and the base64 encoded data from the request body
  const { email, base64 } = requestBody;

  // Define the object key using the user's email
  const objectKey = `${email}_user_icon`;

  // If the request body contains base64 data, save it to S3
  if (base64) {
    try {
      // Convert the base64 string back to binary data
      const binaryData = new Buffer.from(base64, "base64");

      // Set up the configuration for the S3 upload operation
      const uploadConfiguration = {
        Bucket: "trivia-user-profiles", // name of the S3 bucket
        Key: objectKey, // key of the object
        Body: binaryData, // data of the object
        ACL: "public-read", // permissions for the object
        ContentEncoding: "base64", // encoding of the object data
      };

      // Upload the new file to S3
      const uploadResult = await s3.upload(uploadConfiguration).promise();

      // Return the upload result in the response
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(uploadResult),
      };
    } catch (error) {
      console.error(error);

      // Return an error message in the response if an error occurred
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Failed to process request" }),
      };
    }
  } else {
    // If the request body doesn't contain base64 data, retrieve the existing data from S3
    try {
      // Define parameters for the S3 getObject operation
      const getObjectParams = {
        Bucket: "trivia-user-profiles", // The name of your S3 bucket
        Key: objectKey, // The key of the object you want to get
      };

      // Retrieve the object from the S3 bucket
      const retrievedObject = await s3.getObject(getObjectParams).promise();

      // Convert the retrieved object data to a Base64 string
      const base64Data = Buffer.from(retrievedObject.Body).toString("base64");

      // Return a successful response containing the Base64 string
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ base64: base64Data }),
      };
    } catch (error) {
      console.error(error);

      // If the object was not found, return a 404 error
      if (error.code === "NoSuchKey") {
        return {
          statusCode: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ error: "File not found" }),
        };
      }

      // For all other errors, return a 500 error
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Request processing failed" }),
      };
    }
  }
};
