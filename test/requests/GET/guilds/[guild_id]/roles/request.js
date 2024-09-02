import { expect } from "chai";
import { TEST_CLIENTS } from "../../../../../../src/testData.js";

describe("GET /guilds/${guild_id}/roles", function () {
  context("make request", function () {
    it("should make the request", async function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      await expect(client.request.makeRequest("getRoles")).to.be.fulfilled;
    });
  });
});
