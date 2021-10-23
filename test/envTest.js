var expect = require("chai").expect;
require("dotenv").config();
describe(".env consts", function () {
  describe("production variable", function () {
    it("NODE_ENV var should be production", function () {
      expect(process.env.NODE_ENV).to.equal("production");
    });
  }),
    describe("LAN", function () {
      it("should be false on prod. for using Home LAN (phone..). TRAVIS & Heroku has their own ENV!", function () {
        expect(process.env.LAN).to.equal("false");
      });
    }),
    describe("USING_INTERNET", function () {
      it("using internet for contacting mongodb should be true on prod TRAVIS & Heroku has their own ENV!", function () {
        expect(process.env.USING_INTERNET).to.equal("true");
      });
    });
});
