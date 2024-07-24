const Channel = require("./Channel");

/**
 * Represents a thread within Discord.
 * @extends {Channel}
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
 */
class Thread extends Channel {
  #_owner_id;
  #_parent_id;
  /**
   * Creates the structure for a thread.
   * @param {Client} client The client instance.
   * @param {Object} data Raw channel data.
   * @param {String} guild_id The ID of the guild that this thread belongs to.
   * @param {Boolean?} nocache Whether this thread should be cached or not.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-example-thread-channel}
   */
  constructor(client, data, guild_id, nocache = false) {
    super(client, data, { guild_id });

    /**
     * The ID of the user who created this thread.
     * @type {BigInt}
     */
    this.#_owner_id = BigInt(data.owner_id);

    /**
     * The ID of the text channel that this thread belongs to.
     * @type {BigInt}
     */
    this.#_parent_id = BigInt(data.parent_id);

    if (nocache == false && data.archived != true)
      this.guild?.channels.set(data.id, this);
  }

  /**
   * The ID of the member who created this thread.
   * @type {String}
   * @readonly
   */
  get ownerId() {
    return String(this.#_owner_id);
  }

  /**
   * The member who created this thread.
   * @type {Member?}
   * @readonly
   */
  get owner() {
    return this.guild?.members.get(this.ownerId) || null;
  }

  /**
   * The ID of the text channel that this thread belongs to.
   * @type {String}
   * @readonly
   */
  get parentId() {
    return String(this.#_parent_id);
  }

  /**
   * The text channel that this thread belongs to.
   * @type {TextChannel?}
   * @readonly
   */
  get parent() {
    return this.guild?.channels.get(this.parentId) || null;
  }

  toString() {
    return `<Thread: ${this.id}>`;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      owner_id: this.ownerId,
      parent_id: this.parentId,
    };
  }
}

module.exports = Thread;
