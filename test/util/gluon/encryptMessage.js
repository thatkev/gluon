import { expect } from "chai";
import { TEST_DATA } from "../../../src/constants.js";
import GuildManager from "../../../src/managers/GuildManager.js";
import Message from "../../../src/structures/Message.js";
import encryptMessage from "../../../src/util/gluon/encryptMessage.js";

describe("EncryptMessage", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(encryptMessage).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no message is provided", function () {
      expect(() => encryptMessage()).to.throw(
        TypeError,
        "GLUON: Message must be provided.",
      );
    });
    it("should throw an error if message has no id", function () {
      expect(() =>
        encryptMessage({
          _channel_id: BigInt(TEST_DATA.CHANNEL_ID),
          _guild_id: BigInt(TEST_DATA.GUILD_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
      );
    });
    it("should throw an error if message has no channel id", function () {
      expect(() =>
        encryptMessage({
          id: TEST_DATA.MESSAGE_ID,
          _guild_id: BigInt(TEST_DATA.GUILD_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
      );
    });
    it("should throw an error if message has no guild id", function () {
      expect(() =>
        encryptMessage({
          id: BigInt(TEST_DATA.MESSAGE_ID),
          _channel_id: BigInt(TEST_DATA.CHANNEL_ID),
        }),
      ).to.throw(
        TypeError,
        "GLUON: Message must have an id, channel id and guild id.",
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channel_id: TEST_DATA.CHANNEL_ID,
        guild_id: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(encryptMessage(message)).to.be.a("string");
    });
    it("should return an encrypted string", function () {
      const client = {};
      client.guilds = new GuildManager(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channel_id: TEST_DATA.CHANNEL_ID,
        guild_id: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(encryptMessage(message)).to.equal(
        "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",
      );
    });
  });
});
