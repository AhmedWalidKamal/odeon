const assert = require("assert");
const validateLoginInput = require("../login")
const isEmpty = require("is-empty");

// Describe our tests
describe("Login Validation", () => {
  // Create tests
  it("Tests login with valid data", () => {
    const { errors, isValid } = validateLoginInput({
      email: "email@gmail.com",
      password: "123456"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests login with null data", () => {
    const { errors, isValid } = validateLoginInput(null);
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.error)).toEqual(true);
  });

  it("Tests login with empty email", () => {
    const { errors, isValid } = validateLoginInput({
      email: "",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests login with missing email", () => {
    const { errors, isValid } = validateLoginInput({
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests login with null email", () => {
    const { errors, isValid } = validateLoginInput({
      email: null,
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests login with invalid email format", () => {
    const { errors, isValid } = validateLoginInput({
      email: "email@",
      password: "123456"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(isEmpty(errors.password)).toEqual(true);
  });

  it("Tests login with empty password", () => {
    const { errors, isValid } = validateLoginInput({
      email: "email@gmail.com",
      password: ""
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });

  it("Tests login with missing password", () => {
    const { errors, isValid } = validateLoginInput({
      email: "email@gmail.com",
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });

  it("Tests login with null password", () => {
    const { errors, isValid } = validateLoginInput({
      email: "email@gmail.com",
      password: null
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.email)).toEqual(true);
    expect(!isEmpty(errors.error)).toEqual(true);
    expect(!isEmpty(errors.password)).toEqual(true);
  });
});
