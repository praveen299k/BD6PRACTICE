const express = require("express");
const cors = require("cors");
const {
  getReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
} = require("./controllers");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/reviews", async (req, res) => {
  const reviews = await getReviews();
  res.json(reviews);
});

app.get("/reviews/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const review = await getReviewById(id);
  if (!review) return res.status(404).json({ message: "Review not found" });
  res.json(review);
});

app.post("/reviews/new", async (req, res) => {
  const { content, userId } = req.body;
  const addedReview = await addReview({ content, userId });
  res.status(201).json(addedReview);
});

app.get("/users/details/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.post("/users/new", async (req, res) => {
  const { name, email } = req.body;
  const addedUser = await addUser({ name, email });
  res.status(201).json(addedUser);
});

module.exports = { app };
