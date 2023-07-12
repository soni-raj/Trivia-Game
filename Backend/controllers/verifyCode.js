const awsCognitoCredentials = require("../util/cognitoCredentials");
const { CognitoUserPool, CognitoUser } = require("amazon-cognito-identity-js");

// API endpoint for email verification
const verifyCode = async (req, res) => {
  const { email, verificationCode } = req.body;
  const awsCognitoCredentials = {
    UserPoolId: "us-east-1_yGMXimytv",
    ClientId: "cs0e5bgvudaumkevakdf1tp3r",
  };

  const userPool = new CognitoUserPool(awsCognitoCredentials);
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Email verification failed" });
    } else {
      return res.status(200).json({ message: "Email verified successfully" });
    }
  });
};

module.exports = { verifyCode };
