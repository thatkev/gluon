const User = require("../structures/User");

/**
 * Manages all the users belonging to a client.
 */
class UserManager {
  /**
   * Creates a user manager.
   * @param {Client} client The client instance.
   */
  constructor(client) {
    this._client = client;

    this.cache = new Map();
  }

  async retrieve(user_id) {
    // const fetchedUserRaw = await this._client.dataStorage.query(`
    //     SELECT *
    //     FROM Users
    //     WHERE id = :id;
    //     `, { id: user_id });
    // const fetchedUser = fetchedUserRaw[0][0];
    // if (!fetchedUser)
    //     return null;
    // fetchedUser._attributes = fetchedUser.attributes;
    // return new User(this._client, fetchedUser, { noDbStore: true });
  }

  store(user) {
    // this._client.dataStorage.query("INSERT INTO Users (id, avatar, username, global_name, discriminator, attributes) VALUES (:id, :avatar, :username, :global_name, :discriminator, :attributes) ON DUPLICATE KEY UPDATE avatar = VALUES(avatar), username = VALUES(username), global_name = VALUES(global_name), discriminator = VALUES(discriminator), attributes = VALUES(attributes);",
    //     { id: user.id, avatar: user.formattedAvatarHash, username: user.username, global_name: user.global_name, discriminator: user.discriminator, attributes: user._attributes })
    //     .then(() => this._client.emit("debug", `ADDED ${user.id} TO USER STORAGE`));
  }

  cleanup() {
    // this._client.dataStorage.query(`
    //     DELETE FROM Users
    //     WHERE id NOT IN (
    //         SELECT id FROM Members
    //     );
    //     `)
    //     .then(() => this._client.emit("debug", `CLEANUP USERS`));
  }

  async localFetch(user_id) {
    const cached = this.cache.get(user_id.toString());
    if (cached) return cached;

    const stored = await this.retrieve(user_id);
    if (stored) return stored;
  }

  /**
   * Fetches a particular user.
   * @param {BigInt | String} user_id The id of the user to fetch.
   * @returns {Promise<User>} The fetched user.
   */
  async fetch(user_id) {
    const localFetch = await this.localFetch(user_id);
    if (localFetch) return localFetch;

    const data = await this._client.request.makeRequest("getUser", [user_id]);

    return new User(this._client, data);
  }

  /**
   * Sweeps all users flagged for deletion.
   * @param {Number} currentTime The current UNIX time.
   * @returns {Number} The number of remaining cached users.
   */
  sweepUsers(currentTime) {
    if (this.cache.size == 0) return;

    const currentCacheSize = this.cache.size;
    const currentCacheKeys = this.cache.keys();
    const currentCacheValues = this.cache.values();

    for (let i = 0; i < currentCacheSize; i++)
      if (
        (currentCacheValues.next().value._cached || 0) +
          this._client.defaultUserExpiry <
        currentTime
      )
        this.cache.delete(currentCacheKeys.next().value);

    this.cleanup();

    return this.cache.size;
  }

  toJSON() {
    return [...this.cache.values()];
  }
}

module.exports = UserManager;
