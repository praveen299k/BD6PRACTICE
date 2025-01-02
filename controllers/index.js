const reviews = [
  { id: 1, content: "Great product!", userId: 1 },
  { id: 2, content: "Not bad, could be better.", userId: 2 },
];

const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
];

async function getReviews() {
  return reviews;
}

async function getReviewById(id) {
  return reviews.find((review) => review.id === id);
}

async function addReview(review) {
  const newReview = { id: reviews.length + 1, ...review };
  reviews.push(newReview);
  return newReview;
}

async function getUserById(id) {
  return users.find((user) => user.id === id);
}

async function addUser(user) {
  const newUser = { id: users.length + 1, ...user };
  users.push(newUser);
  return newUser;
}

module.exports = { getReviews, getReviewById, addReview, getUserById, addUser };
