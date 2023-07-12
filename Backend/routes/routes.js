const express = require("express");
const storeUserData = require("../controllers/storeUserData");
const checkUserData = require("../controllers/checkUserData");
const verifyCode = require("../controllers/verifyCode");
const initiateResetPassword = require("../controllers/initiateResetPassword");
const verifyCodeAndResetPassword = require("../controllers/verifyCodeAndResetPassword");
const router = express.Router();

router.post("/storeUserData", storeUserData.StoreUserData);
router.post("/checkUserData", checkUserData.CheckUserData);
router.post("/verifyCode", verifyCode.verifyCode);
router.post(
  "/initiateResetPassword",
  initiateResetPassword.initiateResetPassword
);
router.post(
  "/verifyCodeAndResetPassword",
  verifyCodeAndResetPassword.verifyCodeAndResetPassword
);
module.exports = {
  routes: router,
};
