const { db } = require("../util/util.js");

const CheckUserData = async (req, res) => {
  const { email, userAns1, userAns2 } = req.body;

  try {
    const querySnapshot = await db
      .collection("Users")
      .where("email", "==", email)
      .get();

    if (querySnapshot.empty) {
      // User not found
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the user's data
    const userData = querySnapshot.docs[0].data();
    console.log(querySnapshot.docs);
    const { ans1, ans2 } = userData;

    // You can perform further checks or actions based on the answers
    // For example:

    if (userAns1 === ans1 && userAns2 === ans2) {
      // Answers are correct
      return res.status(200).json({ message: "Answers are correct" });
    } else {
      // Answers are incorrect
      return res.status(400).json({ error: "Answers are incorrect" });
    }
  } catch (error) {
    console.error("Error retrieving user data: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { CheckUserData };
