const request = require("supertest");
const http = require("http");
const { app } = require("../index");
const {
  getReviews,
  getReviewById,
  addReview,
  getUserById,
  addUser,
} = require("../controllers");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getReviews: jest.fn(),
  getReviewById: jest.fn(),
  addReview: jest.fn(),
  getUserById: jest.fn(),
  addUser: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should retrive all reviews", async () => {
    const mockReviews = [
      { id: 3, content: "Absolutely love it!", userId: 3 },
      { id: 4, content: "Terrible experience, won't buy again.", userId: 4 },
    ];

    getReviews.mockResolvedValue(mockReviews);
    const response = await request(server).get("/reviews");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockReviews);
    expect(getReviews).toHaveBeenCalled();
  });

  it("should retrive a review by a particular id", async () => {
    const mockReview = { id: 5, content: "Good value for money.", userId: 5 };
    getReviewById.mockResolvedValue(mockReview);

    const response = await request(server).get("/reviews/details/5");
    expect(response.body).toEqual(mockReview);
    expect(response.statusCode).toBe(200);
    expect(getReviewById).toHaveBeenCalledWith(5);
  });

  it("should return undefined for non-existent review id", async () => {
    getReviewById.mockResolvedValue(null);

    const response = await request(server).get("/reviews/details/12");
    console.log(response);
    // expect(response.body).toBeNull();
    expect(response.statusCode).toBe(404);
    expect(getReviewById).toHaveBeenCalledWith(12);
  });
});
