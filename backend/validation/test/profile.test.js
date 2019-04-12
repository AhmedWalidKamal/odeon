const assert = require("assert");
const validateProfileInput = require("../profile")
const isEmpty = require("is-empty");

// Describe our tests
describe("Profile Validation", () => {
  // Create tests
  it("Tests profile with valid data", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with null data", () => {
    const { errors, isValid } = validateProfileInput(null);
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.error)).toEqual(true);
  });

  it("Tests profile with empty display name", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with empty avatar", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with empty twitter", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with empty facebook", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with empty website", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with empty location", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with empty bio", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: ""
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with missing display name", () => {
    const { errors, isValid } = validateProfileInput({
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with missing avatar", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with missing twitter", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with missing facebook", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with missing website", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with missing location", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with missing bio", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with  null display name", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: null,
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with null avatar", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: null,
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with null twitter", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: null,
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with null facebook", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: null,
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with null website", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: null,
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with null location", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: null,
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });


  it("Tests profile with null bio", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: null
    });
    expect(isValid).toEqual(true);
    expect(isEmpty(errors)).toEqual(true);
  });

  it("Tests profile with too long display name", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe".repeat(100),
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.avatar)).toEqual(true);
    expect(!isEmpty(errors.displayName)).toEqual(true);
    expect(isEmpty(errors.bio)).toEqual(true);
    expect(isEmpty(errors.facebook)).toEqual(true);
    expect(isEmpty(errors.twitter)).toEqual(true);
    expect(isEmpty(errors.website)).toEqual(true);
  });

  it("Tests profile with too long bio", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio".repeat(100)
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.avatar)).toEqual(true);
    expect(isEmpty(errors.displayName)).toEqual(true);
    expect(!isEmpty(errors.bio)).toEqual(true);
    expect(isEmpty(errors.facebook)).toEqual(true);
    expect(isEmpty(errors.twitter)).toEqual(true);
    expect(isEmpty(errors.website)).toEqual(true);
  });

  it("Tests profile with invalid avatar url", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "avatar",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(false);
    expect(!isEmpty(errors.avatar)).toEqual(true);
    expect(isEmpty(errors.displayName)).toEqual(true);
    expect(isEmpty(errors.bio)).toEqual(true);
    expect(isEmpty(errors.facebook)).toEqual(true);
    expect(isEmpty(errors.twitter)).toEqual(true);
    expect(isEmpty(errors.website)).toEqual(true);
  });
  

  it("Tests profile with invalid twitter url", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "twitter",
        website: "https://domain.com",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.avatar)).toEqual(true);
    expect(isEmpty(errors.displayName)).toEqual(true);
    expect(isEmpty(errors.bio)).toEqual(true);
    expect(isEmpty(errors.facebook)).toEqual(true);
    expect(!isEmpty(errors.twitter)).toEqual(true);
    expect(isEmpty(errors.website)).toEqual(true);
  });

  it("Tests profile with invalid facebook url", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "https://domain.com",
        facebook: "facebook",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.avatar)).toEqual(true);
    expect(isEmpty(errors.displayName)).toEqual(true);
    expect(isEmpty(errors.bio)).toEqual(true);
    expect(!isEmpty(errors.facebook)).toEqual(true);
    expect(isEmpty(errors.twitter)).toEqual(true);
    expect(isEmpty(errors.website)).toEqual(true);
  });

  it("Tests profile with invalid website url", () => {
    const { errors, isValid } = validateProfileInput({
      displayName: "John Doe",
      avatar: "https://domain.com/avatar.png",
      social: {
        twitter: "https://twitter.com/user",
        website: "domain",
        facebook: "https://facebook.com/user",
      },
      location: "Alexandria, Egypt",
      bio: "This is just a bio"
    });
    expect(isValid).toEqual(false);
    expect(isEmpty(errors.avatar)).toEqual(true);
    expect(isEmpty(errors.displayName)).toEqual(true);
    expect(isEmpty(errors.bio)).toEqual(true);
    expect(isEmpty(errors.facebook)).toEqual(true);
    expect(isEmpty(errors.twitter)).toEqual(true);
    expect(!isEmpty(errors.website)).toEqual(true);
  });
});
