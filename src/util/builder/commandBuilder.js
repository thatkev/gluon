import {
  APPLICATION_COMMAND_TYPES,
  LIMITS,
  TO_JSON_TYPES_ENUM,
} from "../../constants.js";
import CommandOption from "./commandOptionBuilder.js";

/**
 * Structure for a command.
 * @see {@link https://discord.com/developers/docs/interactions/application-commands#create-global-application-command}
 */
class Command {
  /**
   * Creates the structure for a command.
   */
  constructor() {
    this.type = APPLICATION_COMMAND_TYPES.CHAT_INPUT;

    this.contexts = [0];

    this.options = [];

    this.defaultLocale = "en-US";
  }

  /**
   * Sets the name of the command.
   * @param {String | Object} name The name of the command or an object of names for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setName(name) {
    if (!name) throw new TypeError("GLUON: Command name must be provided.");

    if (typeof name == "object") {
      this.name = name[this.defaultLocale];

      delete name[this.defaultLocale];

      this.name_localizations = name;
    } else this.name = name;

    return this;
  }

  /**
   * Sets the command type.
   * @param {Number} type The command type.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
   */
  setType(type) {
    if (typeof type != "number")
      throw new TypeError("GLUON: Command type must be a number.");

    this.type = type;

    return this;
  }

  /**
   * Sets the description of the command.
   * @param {String | Object} description The description of the command, or an object of descriptions for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/interactions/application-commands#localization}
   */
  setDescription(description) {
    if (!description)
      throw new TypeError("GLUON: Command description must be provided.");

    if (typeof description == "object") {
      this.description = description[this.defaultLocale];

      delete description[this.defaultLocale];

      this.description_localizations = description;
    } else this.description = description;

    return this;
  }

  /**
   * Sets the permission needed to use the command.
   * @param {String} permissions The permissions required to be able to use this command.
   * @returns {Command}
   */
  setDefaultMemberPermissions(permissions) {
    if (typeof permissions !== "string")
      throw new TypeError(
        "GLUON: Command default permission must be a string.",
      );

    this.default_member_permissions = String(permissions);

    return this;
  }

  /**
   * Sets whether this command is NSFW.
   * @param {Boolean} nsfw Whether this command is NSFW.
   * @returns {Command}
   */
  setNsfw(nsfw) {
    if (typeof nsfw !== "boolean")
      throw new TypeError("GLUON: Command nsfw must be a boolean.");

    this.nsfw = nsfw;

    return this;
  }

  /**
   * Adds an option to the command.
   * @param {CommandOption} option Adds an option to the command.
   * @returns {Command}
   */
  addOption(option) {
    if (!option) throw new TypeError("GLUON: Command option must be provided.");

    if (!(option instanceof CommandOption))
      throw new TypeError(
        "GLUON: Command option must be an instance of CommandOption.",
      );

    this.options.push(option);

    return this;
  }

  /**
   * Sets the default locale for localisation.
   * @param {String?} locale Sets the default locale for localisation.
   * @returns {Command}
   * @see {@link https://discord.com/developers/docs/reference#locales}
   */
  setDefaultLocale(locale) {
    if (!locale) throw new TypeError("GLUON: Default locale must be provided.");

    if (typeof locale !== "string")
      throw new TypeError("GLUON: Default locale must be a string.");

    this.defaultLocale = locale;

    return this;
  }

  /**
   * Returns the correct Discord format for a command.
   * @returns {Object}
   */
  toJSON(
    format,
    { suppressValidation = false } = { suppressValidation: false },
  ) {
    if (suppressValidation !== true) {
      if (!this.name)
        throw new TypeError("GLUON: Command name must be provided.");
      if (typeof this.name !== "string")
        throw new TypeError("GLUON: Command name must be a string.");
      if (
        this.name.length < LIMITS.MIN_COMMAND_NAME ||
        this.name.length > LIMITS.MAX_COMMAND_NAME
      )
        throw new RangeError(
          `GLUON: Command name must be between ${LIMITS.MIN_COMMAND_NAME} and ${LIMITS.MAX_COMMAND_NAME} characters.`,
        );
      if (!this.description)
        throw new TypeError("GLUON: Command description must be provided.");
      if (typeof this.description !== "string")
        throw new TypeError("GLUON: Command description must be a string.");
      if (
        this.description.length < LIMITS.MIN_COMMAND_DESCRIPTION ||
        this.description.length > LIMITS.MAX_COMMAND_DESCRIPTION
      )
        throw new RangeError(
          `GLUON: Command description must be between ${LIMITS.MIN_COMMAND_DESCRIPTION} and ${LIMITS.MAX_COMMAND_DESCRIPTION} characters.`,
        );
      if (typeof this.type !== "undefined" && typeof this.type !== "number")
        throw new TypeError("GLUON: Command type must be a number.");
      if (
        this.name_localizations &&
        typeof this.name_localizations !== "object"
      )
        throw new TypeError(
          "GLUON: Command name localizations must be an object.",
        );
      if (
        this.name_localizations &&
        !Object.values(this.name_localizations).every(
          (v) =>
            typeof v === "string" &&
            v.length >= LIMITS.MIN_COMMAND_NAME &&
            v.length <= LIMITS.MAX_COMMAND_NAME,
        )
      )
        throw new RangeError(
          `GLUON: Command name localizations must be a string between ${LIMITS.MIN_COMMAND_NAME} and ${LIMITS.MAX_COMMAND_NAME} characters.`,
        );
      if (
        this.description_localizations &&
        typeof this.description_localizations !== "object"
      )
        throw new TypeError(
          "GLUON: Command description localizations must be an object.",
        );
      if (
        this.description_localizations &&
        !Object.values(this.description_localizations).every(
          (v) =>
            typeof v === "string" &&
            v.length >= LIMITS.MIN_COMMAND_DESCRIPTION &&
            v.length <= LIMITS.MAX_COMMAND_DESCRIPTION,
        )
      )
        throw new RangeError(
          `GLUON: Command description localizations must be a string between ${LIMITS.MIN_COMMAND_DESCRIPTION} and ${LIMITS.MAX_COMMAND_DESCRIPTION} characters.`,
        );
      if (
        typeof this.default_member_permissions !== "undefined" &&
        typeof this.default_member_permissions !== "string"
      )
        throw new TypeError(
          "GLUON: Command default member permissions must be provided as a string.",
        );
      if (typeof this.nsfw !== "undefined" && typeof this.nsfw !== "boolean")
        throw new TypeError("GLUON: Command nsfw must be a boolean.");
      if (this.options && !Array.isArray(this.options))
        throw new TypeError("GLUON: Command options must be an array.");
      if (
        this.options &&
        !this.options.every((o) => o instanceof CommandOption)
      )
        throw new TypeError(
          "GLUON: Command options must be an array of CommandOption instances.",
        );
      if (this.options && this.options.length > LIMITS.MAX_COMMAND_OPTIONS)
        throw new RangeError(
          `GLUON: Command options must be less than ${LIMITS.MAX_COMMAND_OPTIONS}.`,
        );
    }
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      default: {
        return {
          name: this.name,
          name_localizations: this.name_localizations,
          type: this.type,
          description: this.description,
          description_localizations: this.description_localizations,
          default_member_permissions: this.default_member_permissions,
          nsfw: this.nsfw,
          options: this.options,
        };
      }
    }
  }
}

export default Command;
