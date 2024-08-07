const ActionRow = require("../util/builder/actionRowBuilder");
const Member = require("./Member");

/**
 * Represents an interaction received over the gateway.
 * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-structure}
 */
class Interaction {
  /**
   * Creates the structure for an interaction.
   * @param {Client} client The client instance.
   * @param {Object} data The interaction data from Discord.
   */
  constructor(client, data) {
    /**
     * The client instance.
     * @type {Client}
     */
    this._client = client;

    /**
     * The id of the message.
     * @type {BigInt}
     */
    this.id = BigInt(data.id);

    /**
     * The type of interaction.
     * @type {Number}
     * @see {@link https://discord.com/developers/docs/interactions/slash-commands#interaction-object-interaction-type}
     */
    this.type = data.type;

    /**
     * The guild that this interaction belongs to.
     * @type {Guild?}
     */
    this.guild = this._client.guilds.cache.get(data.guild_id) || null;

    if (!this.guild)
      /**
       * The id of the guild that this interaction belongs to.
       * @type {BigInt?}
       */
      this.guild_id = BigInt(data.guild_id);

    /**
     * The channel that this interaction belongs to.
     * @type {TextChannel?}
     */
    this.channel = this.guild?.channels.cache.get(data.channel_id) || null;

    if (!this.channel)
      /**
       * The id of the channel that this interaction belongs to.
       * @type {BigInt}
       */
      this.channel_id = BigInt(data.channel_id);

    if (data.member)
      /**
       * The member that triggered the interaction, if it was run in a guild.
       * @type {Member?}
       */
      this.member = new Member(
        this._client,
        data.member,
        data.member.user.id,
        data.guild_id,
      );

    /**
     * The interaction token, needed to respond to it.
     * @type {String}
     */
    this.token = data.token;
  }

  /**
   * Prompts a user to enter text using a modal.
   * @param {Object} options Modal options.
   * @returns {Promise<Interaction>}
   */
  async textPrompt({ title, customId, textInputModal }) {
    const body = {};

    body.type = 9;
    body.data = {};

    body.data.title = title;

    body.data.custom_id = customId;

    const components = new ActionRow().addComponent(textInputModal);

    body.data.components =
      Array.isArray(components) != true ? [components] : [];

    await this._client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.token],
      body,
    );
  }

  /**
   * Responds to autocomplete interactions.
   * @param {Object} options Autocompletion options.
   * @returns {Promise<Interaction>}
   */
  async autocompleteResponse({ choices }) {
    const body = {};

    body.type = 8;
    body.data = {};

    body.data.choices = choices;

    await this._client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.token],
      body,
    );
  }

  /**
   * Replies to an interaction.
   * @param {String?} content The message content to send in the response to the interaction.
   * @param {Object?} options An embed, components, and whether the response should be as an ephemeral message.
   * @returns {Promise<Interaction>}
   */
  async reply(
    content,
    { files, embed, embeds, _embed, _embeds, components, quiet } = {},
  ) {
    const body = {};

    body.type = 4;
    body.data = {};

    if (content) body.data.content = content;
    if (files) body.files = files;
    if (embed) body.data.embeds = [embed];
    else if (embeds && embeds.length != 0)
      body.embeds = embeds;
    else if (_embed) body.data.embeds = [_embed];
    else if (_embeds) body.data.embeds = _embeds;
    if (components)
      body.data.components =
        Array.isArray(components) != true ? components : [];
    if (quiet == true) body.data.flags = 64;

    await this._client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.token],
      body,
    );

    return this;
  }

  /**
   * Edits a response to an interaction. Works up to 15 minutes after the response was sent.
   * @param {String?} content The new interaction response content.
   * @param {Object?} options The new interaction response options.
   * @returns {Promise<Interaction>}
   */
  async edit(content, { files, embed, _embed, _embeds, components } = {}) {
    const body = {};

    if (content) body.content = content;
    if (files) body.files = files;
    if (embed) body.embeds = [embed];
    else if (_embed) body.embeds = [_embed];
    else if (_embeds) body.embeds = _embeds;
    if (components)
      body.components =
        Array.isArray(components) != true ? components : [];

    await this._client.request.makeRequest(
      "patchOriginalInteractionResponse",
      [this._client.user.id, this.token],
      body,
    );

    return this;
  }

  /**
   * Silently acknowledges an interaction.
   * @returns {Promise<Interaction>}
   */
  async acknowledge() {
    const body = {};

    body.type = 6;

    await this._client.request.makeRequest(
      "postInteractionResponse",
      [this.id, this.token],
      body,
    );

    return this;
  }
}

module.exports = Interaction;
