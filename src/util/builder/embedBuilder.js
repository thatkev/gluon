import { LIMITS, TO_JSON_TYPES_ENUM } from "../../constants.js";
import hexToInt from "../general/hexToInt.js";
import isValidUrl from "../general/isValidUrl.js";

/**
 * Helps to create an embed for a message.
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object-embed-structure}
 */
class Embed {
  /**
   * Creates an embed structure.
   */
  constructor(data) {
    this.fields = [];
    if (data) {
      if (data.title) this.title = data.title;
      if (data.description) this.description = data.description;
      if (data.url) this.url = data.url;
      if (data.timestamp) this.timestamp = data.timestamp;
      if (data.color) this.color = data.color;
      if (data.footer) this.footer = data.footer;
      if (data.author) this.author = data.author;
      if (data.fields && Array.isArray(data.fields)) this.fields = data.fields;
      if (data.image) this.image = data.image;
      if (data.thumbnail) this.thumbnail = data.thumbnail;
      if (data.video) this.video = data.video;
    }
  }

  /**
   * Sets the title of the embed.
   * @param {String} title The title of the embed.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setTitle(title) {
    if (!title) throw new TypeError("GLUON: Embed title must be provided.");

    this.title =
      title && title.length > LIMITS.MAX_EMBED_TITLE
        ? `${title.substring(0, LIMITS.MAX_EMBED_TITLE - 3)}...`
        : title;

    return this;
  }

  /**
   * Sets the embed description.
   * @param {String} text The description.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setDescription(text) {
    if (!text)
      throw new TypeError("GLUON: Embed description must be provided.");

    this.description =
      text && text.length > LIMITS.MAX_EMBED_DESCRIPTION
        ? `${text.substring(0, LIMITS.MAX_EMBED_DESCRIPTION - 3)}...`
        : text;

    return this;
  }

  /**
   * Sets the url of the embed.
   * @param {String} url The url.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setURL(url) {
    if (!url) throw new TypeError("GLUON: Embed url must be provided.");

    this.url = url;

    return this;
  }

  /**
   * Sets the timestamp displayed on the embed.
   * @param {Number?} timestamp The UNIX timestamp.
   * @returns {Embed}
   * @method
   * @public
   */
  setTimestamp(timestamp) {
    if (timestamp) this.timestamp = new Date(timestamp * 1000).toISOString();
    else this.timestamp = new Date().toISOString();

    return this;
  }

  /**
   * Sets the color of the embed.
   * @param {String | Number} color The color.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setColor(color) {
    if (!color) throw new TypeError("GLUON: Embed color must be provided.");

    if (typeof color == "string") {
      if (color[0] == "#") color = color.substring(1);

      this.color = hexToInt(color);
    } else if (typeof color == "number") this.color = color;

    return this;
  }

  /**
   * Sets the embed thumbnail image.
   * @param {String} url The url of the thumbnail.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setThumbnail(url) {
    if (!url)
      throw new TypeError("GLUON: Embed thumbnail url must be provided.");

    this.thumbnail = {
      url,
    };

    return this;
  }

  /**
   * Sets the embed footer.
   * @param {String} text The footer text.
   * @param {String?} icon The url of the footer icon.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setFooter(text, icon) {
    if (!text)
      throw new TypeError("GLUON: Embed footer text must be provided.");

    this.footer = {
      text:
        text && text.length > LIMITS.MAX_EMBED_FOOTER_TEXT
          ? `${text.substring(0, LIMITS.MAX_EMBED_FOOTER_TEXT - 3)}...`
          : text,
    };
    if (icon) this.footer.icon_url = icon;

    return this;
  }

  /**
   * Sets the embed author info.
   * @param {String?} name The embed author.
   * @param {String?} url The url.
   * @param {String?} icon_url The embed author image url.
   * @returns {Embed}
   * @throws {TypeError}
   * @method
   * @public
   */
  setAuthor(name, url, icon_url) {
    if (!name)
      throw new TypeError("GLUON: Embed author name must be provided.");

    this.author = {};

    if (name)
      this.author.name =
        name && name.length > LIMITS.MAX_EMBED_AUTHOR_NAME
          ? `${name.substring(0, LIMITS.MAX_EMBED_AUTHOR_NAME - 3)}...`
          : name;
    if (url) this.author.url = url;
    if (icon_url) this.author.icon_url = icon_url;

    return this;
  }

  /**
   * Adds a field to the embed.
   * @param {String} name Sets the embed field name.
   * @param {String} value Sets the embed field value.
   * @param {Boolean?} inline Whether this field should be displayed inline.
   * @returns {Embed}
   * @throws {RangeError | TypeError}
   * @method
   * @public
   */
  addField(name, value, inline = false) {
    if (this.fields.length >= LIMITS.MAX_EMBED_FIELDS)
      throw new RangeError(
        `GLUON: Embed fields cannot exceed ${LIMITS.MAX_EMBED_FIELDS} fields.`,
      );

    if (!name || !value)
      throw new TypeError(
        "GLUON: Embed field name and value must be provided.",
      );

    this.fields.push({
      name:
        name && name.length > LIMITS.MAX_EMBED_FIELD_NAME
          ? `${name.substring(0, LIMITS.MAX_EMBED_FIELD_NAME - 3)}...`
          : name,
      value:
        value && value.length > LIMITS.MAX_EMBED_FIELD_VALUE
          ? `${value.substring(0, LIMITS.MAX_EMBED_FIELD_VALUE - 3)}...`
          : value,
      inline,
    });

    return this;
  }

  /**
   * Sets the embed image url.
   * @param {String} url The image url.
   * @returns {Embed}
   * @method
   * @public
   */
  setImage(url) {
    if (typeof url !== "string")
      throw new TypeError("GLUON: Embed image url must be a string.");

    this.image = {
      url,
    };

    return this;
  }

  /**
   * Sets the embed video url.
   * @param {String} url The video url.
   * @returns {Embed}
   * @method
   * @public
   */
  setVideo(url) {
    if (typeof url !== "string")
      throw new TypeError("GLUON: Embed video url must be a string.");

    this.video = {
      url,
    };

    return this;
  }

  /**
   * Returns the character count of the embed.
   * @returns {Number}
   * @readonly
   * @public
   */
  get characterCount() {
    let count = 0;

    count += this.title ? this.title.length : 0;
    count += this.description ? this.description.length : 0;
    count += this.footer?.text ? this.footer.text.length : 0;
    count += this.author?.name ? this.author.name.length : 0;

    for (let i = 0; i < this.fields.length; i++)
      count +=
        (this.fields[i].name?.length || 0) +
        (this.fields[i].value?.length || 0);

    return count;
  }

  /**
   * Converts the embed into string form.
   * @returns {String}
   * @method
   * @public
   */
  toString() {
    let string = "";

    string += this.title ? `## ${this.title}\n\n` : "";

    string += this.description ? `${this.description}\n\n` : "";

    for (let i = 0; i < this.fields.length; i++)
      string +=
        this.fields[i].name != "\u200b"
          ? `**${this.fields[i].name}**:\n${this.fields[i].value}\n`
          : `${this.fields[i].value}\n`;

    string += this.footer ? this.footer.text : "";

    return string;
  }

  /**
   * Returns the correct Discord format for an embed.
   * @returns {Object}
   * @method
   * @public
   */
  toJSON(
    format,
    { suppressValidation = false } = { suppressValidation: false },
  ) {
    if (suppressValidation !== true) {
      if (this.title && typeof this.title !== "string")
        throw new TypeError("GLUON: Embed title must be a string.");
      if (this.title && this.title.length > LIMITS.MAX_EMBED_TITLE)
        throw new RangeError(
          `GLUON: Embed title must be less than ${LIMITS.MAX_EMBED_TITLE} characters.`,
        );
      if (this.description && typeof this.description !== "string")
        throw new TypeError("GLUON: Embed description must be a string.");
      if (
        this.description &&
        this.description.length > LIMITS.MAX_EMBED_DESCRIPTION
      )
        throw new RangeError(
          `GLUON: Embed description must be less than ${LIMITS.MAX_EMBED_DESCRIPTION} characters.`,
        );
      if (this.url && typeof this.url !== "string")
        throw new TypeError("GLUON: Embed url must be a string.");
      if (this.url && isValidUrl(this.url) === false)
        throw new TypeError("GLUON: Embed url must be a valid url.");
      if (this.timestamp && typeof this.timestamp !== "string")
        throw new TypeError("GLUON: Embed timestamp must be a string.");
      if (this.color && typeof this.color !== "number")
        throw new TypeError("GLUON: Embed color must be a number.");
      if (this.footer && typeof this.footer !== "object")
        throw new TypeError("GLUON: Embed footer must be an object.");
      if (this.footer && typeof this.footer.text !== "string")
        throw new TypeError("GLUON: Embed footer text must be a string.");
      if (
        this.footer &&
        this.footer.text &&
        this.footer.text.length > LIMITS.MAX_EMBED_FOOTER_TEXT
      )
        throw new RangeError(
          `GLUON: Embed footer text must be less than ${LIMITS.MAX_EMBED_FOOTER_TEXT} characters.`,
        );
      if (
        this.footer &&
        this.footer.icon_url &&
        typeof this.footer.icon_url !== "string"
      )
        throw new TypeError("GLUON: Embed footer icon url must be a string.");
      if (
        this.footer &&
        this.footer.icon_url &&
        isValidUrl(this.footer.icon_url) === false
      )
        throw new TypeError(
          "GLUON: Embed footer icon url must be a valid url.",
        );
      if (this.author && typeof this.author !== "object")
        throw new TypeError("GLUON: Embed author must be an object.");
      if (this.author && typeof this.author.name !== "string")
        throw new TypeError("GLUON: Embed author name must be a string.");
      if (
        this.author &&
        this.author.name &&
        this.author.name.length > LIMITS.MAX_EMBED_AUTHOR_NAME
      )
        throw new RangeError(
          `GLUON: Embed author name must be less than ${LIMITS.MAX_EMBED_AUTHOR_NAME} characters.`,
        );
      if (this.author && this.author.url && typeof this.author.url !== "string")
        throw new TypeError("GLUON: Embed author url must be a string.");
      if (
        this.author &&
        this.author.url &&
        isValidUrl(this.author.url) === false
      )
        throw new TypeError("GLUON: Embed author url must be a valid url.");
      if (
        this.author &&
        this.author.icon_url &&
        typeof this.author.icon_url !== "string"
      )
        throw new TypeError("GLUON: Embed author icon url must be a string.");
      if (
        this.author &&
        this.author.icon_url &&
        isValidUrl(this.author.icon_url) === false
      )
        throw new TypeError(
          "GLUON: Embed author icon url must be a valid url.",
        );
      if (this.fields && !Array.isArray(this.fields))
        throw new TypeError("GLUON: Embed fields must be an array.");
      if (this.fields && this.fields.length > LIMITS.MAX_EMBED_FIELDS)
        throw new RangeError(
          `GLUON: Embed fields cannot exceed ${LIMITS.MAX_EMBED_FIELDS} fields.`,
        );
      if (this.image && typeof this.image !== "object")
        throw new TypeError("GLUON: Embed image must be an object.");
      if (this.image && typeof this.image.url !== "string")
        throw new TypeError("GLUON: Embed image url must be a string.");
      if (this.image && this.image.url && isValidUrl(this.image.url) === false)
        throw new TypeError("GLUON: Embed image url must be a valid url.");
      if (this.thumbnail && typeof this.thumbnail !== "object")
        throw new TypeError("GLUON: Embed thumbnail must be an object.");
      if (this.thumbnail && typeof this.thumbnail.url !== "string")
        throw new TypeError("GLUON: Embed thumbnail url must be a string.");
      if (
        this.thumbnail &&
        this.thumbnail.url &&
        isValidUrl(this.thumbnail.url) === false
      )
        throw new TypeError("GLUON: Embed thumbnail url must be a valid url.");
      if (this.video && typeof this.video !== "object")
        throw new TypeError("GLUON: Embed video must be an object.");
      if (this.video && typeof this.video.url !== "string")
        throw new TypeError("GLUON: Embed video url must be a string.");
      if (this.video && this.video.url && isValidUrl(this.video.url) === false)
        throw new TypeError("GLUON: Embed video url must be a valid url.");
    }
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      default: {
        return {
          title: this.title,
          description: this.description,
          url: this.url,
          timestamp: this.timestamp,
          color: this.color,
          footer: this.footer,
          author: this.author,
          fields: this.fields,
          image: this.image,
          thumbnail: this.thumbnail,
          video: this.video,
        };
      }
    }
  }
}

export default Embed;
