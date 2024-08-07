let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const getAvatarUrl = require("../../../src/util/image/getAvatarUrl");
const { TEST_DATA } = require("../../../src/constants");

describe("GetAvatarUrl", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(getAvatarUrl).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no user id is provided", function () {
      expect(() => getAvatarUrl(undefined, "hash")).to.throw(
        TypeError,
        "GLUON: User id must be provided."
      );
    });
    it("should throw an error if the hash is not a string and not null", function () {
      expect(() => getAvatarUrl(TEST_DATA.MEMBER_ID, 123)).to.throw(
        TypeError,
        "GLUON: Avatar hash must be a string."
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      expect(getAvatarUrl(TEST_DATA.MEMBER_ID)).to.be.a("string");
    });
    it("should return the correct default avatar url", function () {
      expect(getAvatarUrl(TEST_DATA.MEMBER_ID)).to.equal(
        "https://cdn.discordapp.com/embed/avatars/0.png"
      );
    });
    it("should return the correct avatar url", function () {
      expect(getAvatarUrl(TEST_DATA.MEMBER_ID, "hash")).to.equal(
        `https://cdn.discordapp.com/avatars/${TEST_DATA.MEMBER_ID}/hash.png`
      );
    });
    it("should return the correct avatar url for a gif", function () {
      expect(getAvatarUrl(TEST_DATA.MEMBER_ID, "a_hash")).to.equal(
        `https://cdn.discordapp.com/avatars/${TEST_DATA.MEMBER_ID}/a_hash.gif`
      );
    });
  });
});
