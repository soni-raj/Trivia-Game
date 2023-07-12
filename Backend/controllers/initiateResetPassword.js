const { CognitoUserPool, CognitoUser } = require("amazon-cognito-identity-js");

// API endpoint for initiating password reset
const initiateResetPassword = async (req, res) => {
  const { username } = req.body;
  const awsCognitoCredentials = {
    UserPoolId: "us-east-1_yGMXimytv",
    ClientId: "cs0e5bgvudaumkevakdf1tp3r",
  };
  // Initialize the Cognito User Pool
  const userPool = new CognitoUserPool(awsCognitoCredentials);

  // Create a new Cognito User with the provided username
  const cognitoUser = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  // Call the forgotPassword method on the Cognito User
  cognitoUser.forgotPassword({
    onSuccess: function (result) {
      console.log("call result: " + result);
      return res
        .status(200)
        .json({ message: "Password reset initiated successfully" });
    },
    onFailure: function (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to initiate password reset" });
    },
  });
};
module.exports = { initiateResetPassword };
