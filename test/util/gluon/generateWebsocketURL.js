let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { VERSION } = require("../../../src/constants");
const generateWebsocketURL = require("../../../src/util/gluon/generateWebsocketURL");

describe("GenerateWebsocketURL", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(generateWebsocketURL).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no url is provided", function () {
      expect(() => generateWebsocketURL()).to.throw(
        TypeError,
        "GLUON: Websocket URL must be provided."
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      expect(generateWebsocketURL("wss://gateway.discord.gg")).to.be.a(
        "string"
      );
    });
    it("should return the correct websocket URL", function () {
      expect(generateWebsocketURL("wss://gateway.discord.gg")).to.equal(
        `wss://gateway.discord.gg?v=${VERSION}&encoding=etf&compress=zlib-stream`
      );
    });
  });
});
