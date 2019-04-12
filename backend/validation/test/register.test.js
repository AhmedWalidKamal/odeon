const assert = require("assert");
const validateRegisterInput = require("../register")
const isEmpty = require("is-empty");

// Describe our tests
describe("Registration Validation", () => {
  // Create tests
  it("Tests registration with valid data", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "email@gmail.com",
      password: "123456"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests registration with null data", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput(null);
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.error)).toEqual(true);
  });

  it("Tests registration with empty email", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with missing email", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with null email", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: null,
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with invalid email format", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "email@",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with empty password", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "email@gmail.com",
      password: ""
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with missing password", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "email@gmail.com",
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with null password", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "email@gmail.com",
      password: null
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with too short password", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "email@gmail.com",
      password: "123"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with too long password", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "email@gmail.com",
      password: "123456789101112131415161718192021222324252627282930"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with same password as username", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "username",
      email: "email@gmail.com",
      password: "username"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.username)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with empty username", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "",
      email: "email@gmail.com",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with null username", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: null,
      email: "email@gmail.com",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with missing username", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      email: "email@gmail.com",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with too short username", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "ab",
      email: "email@gmail.com",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests registration with too long username", () => {
    const {
      errors,
      isValid
    } = validateRegisterInput({
      username: "abcdefghijklmnopqrstuvwxyz",
      email: "email@gmail.com",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.username)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });
});