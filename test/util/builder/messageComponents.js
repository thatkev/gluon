let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { LIMITS } = require("../../../src/constants");
const ActionRow = require("../../../src/util/builder/actionRowBuilder");
const MessageComponents = require("../../../src/util/builder/messageComponents");
const Button = require("../../../src/util/builder/buttonBuilder");

describe("MessageComponents", function () {
  context("check import", function () {
    it("should be an object", function () {
      const messageComponents = new MessageComponents();
      expect(messageComponents).to.be.an("object");
    });
  });

  context("check addActionRow", function () {
    it("should have method addActionRow", function () {
      const messageComponents = new MessageComponents();
      expect(messageComponents).to.respondTo("addActionRow");
    });

    it("should add an action row to the message components", function () {
      const messageComponents = new MessageComponents();
      const button = new Button()
        .setCustomID("test")
        .setLabel("testLabel")
        .setStyle(1);
      const actionRow = new ActionRow().addComponent(button);
      messageComponents.addActionRow(actionRow);
      expect(messageComponents.actionRows).to.have.lengthOf(1);
    });

    it("should throw an error if no action row is provided", function () {
      const messageComponents = new MessageComponents();
      expect(() => messageComponents.addActionRow()).to.throw(
        TypeError,
        "GLUON: Action row must be provided."
      );
    });

    it("should throw an error if the number of action rows is greater than the limit", function () {
      const messageComponents = new MessageComponents();
      for (let i = 0; i < LIMITS.MAX_ACTION_ROWS; i++) {
        const button = new Button()
          .setCustomID("test")
          .setLabel("testLabel")
          .setStyle(1);
        const actionRow = new ActionRow().addComponent(button);
        messageComponents.addActionRow(actionRow);
      }
      const button = new Button()
        .setCustomID("test")
        .setLabel("testLabel")
        .setStyle(1);
      const actionRow = new ActionRow().addComponent(button);
      expect(() => messageComponents.addActionRow(actionRow)).to.throw(
        RangeError,
        `GLUON: Action rows must be less than ${LIMITS.MAX_ACTION_ROWS}.`
      );
    });
  });

  context("check toJSON", function () {
    it("should have method toJSON", function () {
      const messageComponents = new MessageComponents();
      expect(messageComponents).to.respondTo("toJSON");
    });

    it("should return the correct Discord format for message components", function () {
      const messageComponents = new MessageComponents();
      const button = new Button()
        .setCustomID("test")
        .setLabel("testLabel")
        .setStyle(1);
      const actionRow = new ActionRow().addComponent(button);
      messageComponents.addActionRow(actionRow);
      expect(messageComponents.toJSON()).to.deep.equal([actionRow]);
    });
  });
});
