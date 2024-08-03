import { TO_JSON_TYPES_ENUM } from "../constants.js";

/**
 * Manages a poll for a message.
 */
class MessagePollManager {
  #cache;
  /**
   * Creates a message poll manager.
   * @param {Object} existingResponses Existing responses for a poll.
   */
  constructor(existingResponses = {}) {
    /**
     * The cache of responses.
     * @type {Map<String, Array<BigInt>>}
     * @private
     */
    this.#cache = new Map();

    for (const [answer, answerValue] of Object.entries(existingResponses))
      this.#cache.set(
        answer,
        answerValue.map((v) => BigInt(v)),
      );
  }

  /**
   * Adds a response to a poll.
   * @param {String} user_id The id of the user who voted.
   * @param {String} answer_id The id of the answer that was voted for.
   * @throws {TypeError}
   * @public
   * @method
   */
  _addVote(user_id, answer_id) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof answer_id !== "string")
      throw new TypeError("GLUON: Answer ID must be a string.");

    const currentUserList = this.#cache.get(answer_id);

    if (currentUserList)
      this.#cache.set(answer_id, [...currentUserList, BigInt(user_id)]);
    else this.#cache.set(answer_id, [BigInt(user_id)]);
  }

  /**
   * Removes a response from a poll.
   * @param {String} user_id The id of the user whose vote was removed.
   * @param {String} answer_id The id of the answer for which the vote was removed.
   * @throws {TypeError}
   * @public
   * @method
   */
  _removeVote(user_id, answer_id) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    if (typeof answer_id !== "string")
      throw new TypeError("GLUON: Answer ID must be a string.");

    const currentUserList = this.#cache.get(answer_id);

    if (currentUserList)
      this.#cache.set(
        answer_id,
        currentUserList.filter((x) => x != BigInt(user_id)),
      );
  }

  /**
   * Returns the JSON representation of this structure.
   * @param {Number} format The format to return the data in.
   * @returns {Object}
   * @public
   * @method
   */
  toJSON(format) {
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT: {
        const pollResponses = {};
        for (const [key, values] of this.#cache)
          pollResponses[key] = values.map((v) => String(v));
        return pollResponses;
      }
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      default: {
        const pollResponses = {};
        for (const [key, values] of this.#cache)
          pollResponses[key] = values.map((v) => String(v));
        return {
          answer_counts: Object.keys(this.#cache).map((k) => {
            return {
              answer_id: k,
              count: this.#cache.get(k).length,
            };
          }),
        };
      }
    }
  }
}

export default MessagePollManager;
