const assert = require("assert");
const validateUserUpdate = require("../user");
const isEmpty = require("is-empty");

// Describe our tests
describe("User Update Validation", () => {
  // Create tests
  it("Tests user update with valid data", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [],
      shelves: []
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests user update with valid ratings", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [{ movieId: 1, rating: 7, movieId: 2, rating: 6 }],
      shelves: []
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests user update with valid shelves", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [],
      shelves: ["1", "2"]
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests user update with zero ratings", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [{ movieId: 1, rating: 0, movieId: 2, rating: 0 }],
      shelves: []
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests user update with null data", () => {
    const { errors, isValid } = validateUserUpdate(null);
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.error)).toEqual(true);
  });

  it("Tests user update with empty email", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "",
      ratings: [],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with missing email", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      ratings: [],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with null email", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: null,
      ratings: [],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with empty username", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "",
      email: "email@gmail.com",
      ratings: [],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with missing username", () => {
    const { errors, isValid } = validateUserUpdate({
      email: "email@gmail.com",
      ratings: [],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with null email", () => {
    const { errors, isValid } = validateUserUpdate({
      username: null,
      email: "email@gmail.com",
      ratings: [],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with null ratings", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: null,
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with missing ratings", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with duplicate ratings", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [{ movieId: "1", rating: 7 }, { movieId: "1", rating: 6 }],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with negative ratings", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [{ movieId: 1, rating: 7, movieId: 2, rating: -6 }],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with ratings > 10", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [{ movieId: 1, rating: 17, movieId: 2, rating: -6 }],
      shelves: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.ratings)).toEqual(true);
    expect(isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with null shelves", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [],
      shelves: null
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(!isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with missing shelves", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: []
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(!isEmpty(errors.shelves)).toEqual(true);
  });

  it("Tests user update with duplicate shelves", () => {
    const { errors, isValid } = validateUserUpdate({
      username: "username",
      email: "email@gmail.com",
      ratings: [],
      shelves: ["1", "1"]
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.ratings)).toEqual(true);
    expect(!isEmpty(errors.shelves)).toEqual(true);
  });
});
