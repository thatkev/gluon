import User from "../structures/User.js";

/**
 * Manages all the users belonging to a client.
 */
class UserManager {
  #_client;
  #cache;

  /**
   * Creates a user manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    /**
     * The client instance.
     * @type {Client}
     * @private
     */
    this.#_client = client;

    /**
     * The cache of users.
     * @type {Map<String, User>}
     * @private
     */
    this.#cache = new Map();
  }

  /**
   * Fetches a particular user.
   * @param {String} user_id The id of the user to fetch.
   * @returns {Promise<User>} The fetched user.
   * @public
   * @async
   * @method
   * @throws {TypeError | Error}
   */
  async fetch(user_id) {
    if (typeof user_id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");

    const cached = this.#cache.get(user_id);
    if (cached) return cached;

    const data = await this.#_client.request.makeRequest("getUser", [user_id]);

    return new User(this.#_client, data);
  }

  /**
   * Sweeps all users flagged for deletion.
   * @param {Number} currentTime The current UNIX time.
   * @returns {Number} The number of remaining cached users.
   * @public
   * @method
   * @throws {TypeError}
   */
  sweepUsers(currentTime) {
    if (typeof currentTime !== "number")
      throw new TypeError("GLUON: Current time must be a number.");

    if (this.#cache.size == 0) return;

    const currentCacheSize = this.#cache.size;
    const currentCacheKeys = this.#cache.keys();
    const currentCacheValues = this.#cache.values();

    for (let i = 0; i < currentCacheSize; i++)
      if (
        (currentCacheValues.next().value._cached || 0) +
          this.#_client.defaultUserExpiry <
        currentTime
      )
        this.#cache.delete(currentCacheKeys.next().value);

    return this.#cache.size;
  }

  /**
   * Gets a user from the cache.
   * @param {String} id The ID of the user to retrieve.
   * @returns {User}
   * @public
   * @method
   * @throws {TypeError}
   */
  get(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.get(id);
  }

  /**
   * Adds a user to the cache.
   * @param {String} id The ID of the user to cache.
   * @param {User} user The user to cache.
   * @returns {User}
   * @public
   * @method
   * @throws {TypeError}
   */
  set(id, user) {
    if (!(user instanceof User))
      throw new TypeError("GLUON: User must be an instance of User.");
    if (typeof id !== "string")
      throw new TypeError("GLUON: User ID must be a string.");
    return this.#cache.set(id, user);
  }

  /**
   * Deletes a user from the cache.
   * @param {String} id The ID of the user to delete.
   * @returns {Boolean}
   * @public
   * @method
   * @throws {TypeError}
   */
  delete(id) {
    if (typeof id !== "string")
      throw new TypeError("GLUON: ID must be a string.");
    return this.#cache.delete(id);
  }

  /**
   * The number of users in the cache.
   * @type {Number}
   * @readonly
   * @public
   */
  get size() {
    return this.#cache.size;
  }

  /**
   * @method
   * @public
   */
  toJSON() {
    return [...this.#cache.values()];
  }
}

export default UserManager;
