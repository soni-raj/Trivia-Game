const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const { routes } = require("./routes/routes");
const functions = require("firebase-functions");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

exports.api = functions.https.onRequest(app);
