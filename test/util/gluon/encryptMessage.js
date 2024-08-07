let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { TEST_DATA } = require("../../../src/constants");
const GuildManager = require("../../../src/managers/GuildManager");
const { Message } = require("../../../src/structures");
const encryptMessage = require("../../../src/util/gluon/encryptMessage");

describe("EncryptMessage", function () {

    context("check import", function () {
        it("should be a function", function () {
            expect(encryptMessage).to.be.a("function");
        });
    });

    context("check invalid input", function () {
        it("should throw an error if no message is provided", function () {
            expect(() => encryptMessage()).to.throw(TypeError, "GLUON: Message must be provided.");
        });
        it("should throw an error if message has no id", function () {
            expect(() => encryptMessage({ _channel_id: BigInt(TEST_DATA.CHANNEL_ID), _guild_id: BigInt(TEST_DATA.GUILD_ID) })).to.throw(TypeError, "GLUON: Message must have an id, channel id and guild id.");
        });
        it("should throw an error if message has no channel id", function () {
            expect(() => encryptMessage({ id: TEST_DATA.MESSAGE_ID, _guild_id: BigInt(TEST_DATA.GUILD_ID) })).to.throw(TypeError, "GLUON: Message must have an id, channel id and guild id.");
        });
        it("should throw an error if message has no guild id", function () {
            expect(() => encryptMessage({ id: BigInt(TEST_DATA.MESSAGE_ID), _channel_id: BigInt(TEST_DATA.CHANNEL_ID) })).to.throw(TypeError, "GLUON: Message must have an id, channel id and guild id.");
        });
    });

    context("check valid output", function () {
        it("should return a string", function () {
            const client = {};
            client.guilds = new GuildManager(client);
            const message = new Message(client, TEST_DATA.MESSAGE, TEST_DATA.MESSAGE.channel_id, TEST_DATA.GUILD_ID, true, true);
            expect(encryptMessage(message)).to.be.a("string");
        });
        it("should return an encrypted string", function () {
            const client = {};
            client.guilds = new GuildManager(client);
            const message = new Message(client, TEST_DATA.MESSAGE, TEST_DATA.MESSAGE.channel_id, TEST_DATA.GUILD_ID, true, true);
            expect(encryptMessage(message)).to.equal("DWpQEUQcZNjJ/6gpRJCqN1vDvgDN10ySmHCO7rtZTik9rcYRQCu4/DxiWqbyLyORhBbk/KvQOZ5jAck5y4LTt8GH5BZmErqAzj6k0EWTkmZ4TuipCZGCB6tv8XMaQs49aKfZQJ1qHE5lx5dK8gRQwV8njOx9xneZ16FUX/8t1CAl54xbOna1dph5jA9JT/Cf1MJ1GX676LqOzA+cQyp7Zw==");
        });
    });

});