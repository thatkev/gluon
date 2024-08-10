import { expect } from "chai";
import { CDN_BASE_URL } from "../../src/constants.js";
import { TEST_CLIENTS, TEST_DATA, TEST_GUILDS } from "../../src/testData.js";
import Sticker from "../../src/structures/Sticker.js";

describe("Sticker", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Sticker).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const sticker = new Sticker(client, TEST_DATA.STICKER);
      expect(sticker).to.have.property("id");
      expect(sticker).to.have.property("name");
      expect(sticker).to.have.property("format");
      expect(sticker).to.have.property("formatType");
      expect(sticker).to.have.property("previewImageURL");
      expect(sticker).to.have.property("toString");
      expect(sticker).to.have.property("toJSON");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const sticker = new Sticker(client, TEST_DATA.STICKER);
      expect(sticker.id).to.equal(TEST_DATA.STICKER.id);
    });
  });

  context("check name", function () {
    it("should have the correct name", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const sticker = new Sticker(client, TEST_DATA.STICKER);
      expect(sticker.name).to.equal(TEST_DATA.STICKER.name);
    });
  });

  context("check formatType", function () {
    it("should have the correct format_type", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const sticker = new Sticker(client, TEST_DATA.STICKER);
      expect(sticker.formatType).to.equal(TEST_DATA.STICKER.format_type);
    });
  });

  context("check previewImageURL", function () {
    it("should have the correct previewImageURL", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      const sticker = new Sticker(client, TEST_DATA.STICKER);
      expect(sticker.previewImageURL).to.equal(
        `${CDN_BASE_URL}/stickers/${TEST_DATA.STICKER.id}.png`,
      );
    });
  });
});
