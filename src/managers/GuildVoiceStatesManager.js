// perhaps voice states should be attached to members instead?

/**
 * Manages all voice states belonging to a guild.
 */
class GuildVoiceStatesManager {
  /**
   * Creates a voice state manager.
   */
  constructor() {
    this.cache = new Map();
  }
}

module.exports = GuildVoiceStatesManager;
