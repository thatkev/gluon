import { expect } from "chai";
import { TEST_DATA } from "../../src/constants.js";
import Role from "../../src/structures/Role.js";
import GuildManager from "../../src/managers/GuildManager.js";
import Guild from "../../src/structures/Guild.js";
import User from "../../src/structures/User.js";

describe("Role", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(Role).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role).to.have.property("id");
      expect(role).to.have.property("hoist");
      expect(role).to.have.property("name");
      expect(role).to.have.property("managed");
      expect(role).to.have.property("mentionable");
      expect(role).to.have.property("displayIconURL");
      expect(role).to.have.property("guild");
      expect(role).to.have.property("guildId");
      expect(role).to.have.property("color");
      expect(role).to.have.property("position");
      expect(role).to.have.property("permissions");
      expect(role).to.have.property("tags");
      expect(role).to.have.property("toString");
      expect(role).to.have.property("toJSON");
    });
  });

  context("check name", function () {
    it("should have the correct name", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.name).to.equal(TEST_DATA.ROLE_ADMIN.name);
    });
  });

  context("check color", function () {
    it("should have the correct color", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.color).to.equal(TEST_DATA.ROLE_ADMIN.color);
    });
  });

  context("check position", function () {
    it("should have the correct position", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.position).to.equal(TEST_DATA.ROLE_ADMIN.position);
    });
  });

  context("check permissions", function () {
    it("should have the correct permissions", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.permissions).to.equal(
        String(TEST_DATA.ROLE_ADMIN.permissions),
      );
    });
  });

  context("check guild", function () {
    it("should have the correct guild", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      const guild = new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.guild.id).to.equal(guild.id);
    });
  });

  context("check guildId", function () {
    it("should have the correct guildId", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.guildId).to.equal(TEST_DATA.GUILD_ID);
    });
  });

  context("check displayIconURL", function () {
    it("should have the correct displayIconURL", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.displayIconURL).to.equal(
        `https://cdn.discordapp.com/role-icons/${TEST_DATA.ROLE_ID}/${TEST_DATA.ROLE_ADMIN.icon}.png`,
      );
    });
  });

  context("check tags", function () {
    it("should have the correct tags", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.tags).to.deep.equal({
        bot_id: "123456789012345678",
        integration_id: null,
        premium_subscriber: null,
      });
    });
  });

  context("check toString", function () {
    it("should return a string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.toString()).to.be.a("string");
    });
    it("should return the correct string", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.toString()).to.equal(`<Role: ${TEST_DATA.ROLE_ID}>`);
    });
  });

  context("check toJSON", function () {
    it("should return a JSON object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.toJSON()).to.be.a("object");
    });
    it("should return the correct JSON object", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(role.toJSON()).to.deep.equal({
        hoist: TEST_DATA.ROLE_ADMIN.hoist,
        managed: TEST_DATA.ROLE_ADMIN.managed,
        mentionable: TEST_DATA.ROLE_ADMIN.mentionable,
        icon: TEST_DATA.ROLE_ADMIN.icon,
        id: TEST_DATA.ROLE_ID,
        name: TEST_DATA.ROLE_ADMIN.name,
        color: TEST_DATA.ROLE_ADMIN.color,
        position: TEST_DATA.ROLE_ADMIN.position,
        permissions: String(TEST_DATA.ROLE_ADMIN.permissions),
        tags: {
          bot_id: "123456789012345678",
          integration_id: null,
          premium_subscriber: null,
        },
      });
    });
  });

  context("check bundling", function () {
    it("should return the correct bundle", function () {
      const client = { cacheGuilds: true };
      client.guilds = new GuildManager(client);
      new Guild(client, TEST_DATA.GUILD);
      client.user = new User(client, TEST_DATA.CLIENT_USER);
      const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
        guild_id: TEST_DATA.GUILD_ID,
      });
      const rebundled = new Role(client, role.toJSON(), {
        guild_id: TEST_DATA.GUILD_ID,
      });
      expect(rebundled.id).to.equal(role.id);
      expect(rebundled.name).to.equal(role.name);
      expect(rebundled.color).to.equal(role.color);
      expect(rebundled.position).to.equal(role.position);
      expect(rebundled.permissions).to.equal(role.permissions);
      expect(rebundled.tags).to.deep.equal(role.tags);
      expect(rebundled.hoist).to.equal(role.hoist);
      expect(rebundled.managed).to.equal(role.managed);
      expect(rebundled.mentionable).to.equal(role.mentionable);
      expect(rebundled.displayIconURL).to.equal(role.displayIconURL);
      expect(rebundled.guild.id).to.equal(role.guild.id);
      expect(rebundled.guildId).to.equal(role.guildId);
    });
  });
});
