const admin = require("firebase-admin");
const serviceAccount = require("../serverless.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  projectId: "serverless-391002",
});

const db = admin.firestore();

module.exports = { db };
