const assert = require("assert");
const validateShelfUpdate = require("../shelf");
const isEmpty = require("is-empty");

// Describe our tests
describe("Shelf Update Validation", () => {
  // Create tests
  it("Tests add with valid data", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3], 4, true);
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests add with null shelf", () => {
    const { errors, isValid } = validateShelfUpdate(null, 4, true);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(false);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests add with wrong shelf type", () => {
    const { errors, isValid } = validateShelfUpdate("", 4, true);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(false);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests add with null movie id", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3], null, true);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(true);
    expect(isEmpty(errors.movie)).toEqual(false);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests add shelf that contains duplicates", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3, 3], 4, true);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(false);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests add with duplicate movie", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3, 4], 4, true);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(true);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(false);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests remove with valid data", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3], 2, false);
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests remove with null shelf", () => {
    const { errors, isValid } = validateShelfUpdate(null, 4, false);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(false);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests remove with wrong shelf type", () => {
    const { errors, isValid } = validateShelfUpdate("", 4, false);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(false);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests remove with null movie id", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3], null, false);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(true);
    expect(isEmpty(errors.movie)).toEqual(false);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests remove shelf that contains duplicates", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3, 3], 3, false);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(false);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests remove with a movie not in shelf", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3], 4, false);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(true);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(false);
    expect(isEmpty(errors.operation)).toEqual(true);
  });

  it("Tests update shelf with null operation", () => {
    const { errors, isValid } = validateShelfUpdate([1, 2, 3], 4, null);
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.shelf)).toEqual(true);
    expect(isEmpty(errors.movie)).toEqual(true);
    expect(isEmpty(errors.add)).toEqual(true);
    expect(isEmpty(errors.remove)).toEqual(true);
    expect(isEmpty(errors.operation)).toEqual(false);
  });
});
