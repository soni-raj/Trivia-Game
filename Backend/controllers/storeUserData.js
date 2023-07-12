const { db } = require("../util/util.js");

const StoreUserData = async (req, res) => {
  const { firstname, lastname, email, ans1, ans2, key } = req.body;
  const newData = {
    firstname,
    lastname,
    email,
    ans1,
    ans2,
    key,
  };
  db.collection("Users")
    .add(newData)
    .then((_) => {
      return res.status(200).json({ message: "Data Added" });
    })
    .catch((error) => {
      console.error("Error adding document to register collection: ", error);
      return res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = { StoreUserData };
