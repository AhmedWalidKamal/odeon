const assert = require("assert");
const user = require("../models/user");

// Describe our tests
describe("Saving records", function() {
  // Create tests
  it("Saves a user record to the database", function(done) {
    const user = new user({
      username: "admin",
      passward: "admin",
      phone: "123456",
      type: 0
    });

    user.save().then(function() {
      assert(!char.isNew);
      done();
    });
  });
});
