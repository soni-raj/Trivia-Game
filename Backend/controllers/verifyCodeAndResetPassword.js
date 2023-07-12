const { CognitoUserPool, CognitoUser } = require("amazon-cognito-identity-js");
const verifyCodeAndResetPassword = async (req, res) => {
  const { username, verificationCode, newPassword } = req.body;
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

  // Call the confirmPassword method on the Cognito User
  cognitoUser.confirmPassword(verificationCode, newPassword, {
    onSuccess: function (result) {
      console.log("Password reset successfully");
      return res.status(200).json({ message: "Password reset successfully" });
    },
    onFailure: function (err) {
      console.log(err);
      return res.status(400).json({ message: "Failed to reset password" });
    },
  });
};

module.exports = { verifyCodeAndResetPassword };
