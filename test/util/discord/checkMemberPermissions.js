let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { PERMISSIONS, TEST_DATA } = require("../../../src/constants");
const checkMemberPermissions = require("../../../src/util/discord/checkMemberPermissions");
const Role = require("../../../src/structures/Role");
const combinePermissions = require("../../../src/util/discord/combinePermissions");

describe("CheckMemberPermissions", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(checkMemberPermissions).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no member roles are provided", function () {
      expect(() => checkMemberPermissions()).to.throw(
        TypeError,
        "GLUON: Member roles must be provided."
      );
    });
    it("should throw an error if an array is not provided", function () {
      expect(() => checkMemberPermissions("test")).to.throw(
        TypeError,
        "GLUON: Member roles must be an array."
      );
    });
    it("should throw an error if an array of roles is not provided", function () {
      expect(() => checkMemberPermissions(["test"])).to.throw(
        TypeError,
        "GLUON: Member roles must be an array of Role instances."
      );
    });
  });

  context("check calculated permissions", function () {
    it("should return the correct calculated permissions", function () {
      const client = {};
      const roles = [
        new Role(
          client,
          {
            id: TEST_DATA.ROLE_ID,
            permissions: combinePermissions(
              PERMISSIONS.ADD_REACTIONS,
              PERMISSIONS.BAN_MEMBERS
            ),
          },
          { guild_id: TEST_DATA.GUILD_ID }
        ),
        new Role(
          client,
          {
            id: TEST_DATA.ROLE_ID,
            permissions: combinePermissions(
              PERMISSIONS.ATTACH_FILES,
              PERMISSIONS.CHANGE_NICKNAME,
              PERMISSIONS.ADD_REACTIONS
            ),
          },
          { guild_id: TEST_DATA.GUILD_ID }
        ),
        new Role(
          client,
          {
            id: TEST_DATA.ROLE_ID,
            permissions: combinePermissions(PERMISSIONS.BAN_MEMBERS),
          },
          { guild_id: TEST_DATA.GUILD_ID }
        ),
      ];
      const calculatedPermissions = checkMemberPermissions(roles);
      expect(calculatedPermissions).to.equal(
        combinePermissions(
          PERMISSIONS.ADD_REACTIONS,
          PERMISSIONS.BAN_MEMBERS,
          PERMISSIONS.ATTACH_FILES,
          PERMISSIONS.CHANGE_NICKNAME
        )
      );
    });
  });
});
