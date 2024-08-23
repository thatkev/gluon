import Client from "./Client.js";
import { INTENTS, PERMISSIONS } from "./constants.js";
import BetterRequestHandler from "./rest/betterRequestHandler.js";
import { Member, Message, Role, ScheduledEvent } from "./structures.js";
import CategoryChannel from "./structures/CategoryChannel.js";
import Guild from "./structures/Guild.js";
import TextChannel from "./structures/TextChannel.js";
import User from "./structures/User.js";
import VoiceChannel from "./structures/VoiceChannel.js";

export const TEST_DATA = {
  GUILD_ID: "619434557472505857",
  TEXT_CHANNEL: {
    id: "123456789112345678",
    type: 0,
    guild_id: "619434557472505857",
    name: "test-channel",
    position: 0,
    permission_overwrites: [],
    rate_limit_per_user: 0,
    nsfw: false,
    topic: "test topic",
    last_message_id: null,
    parent_id: "123456789021345978",
    last_pin_timestamp: null,
  },
  TEXT_CHANNEL_2: {
    id: "123456788112345679",
    type: 0,
    guild_id: "619434557472505857",
    name: "test-channel",
    position: 0,
    permission_overwrites: [
      {
        id: "123453333333345678",
        type: 0,
        allow: PERMISSIONS.ADD_REACTIONS | PERMISSIONS.VIEW_CHANNEL,
        deny: PERMISSIONS.SEND_MESSAGES,
      },
      {
        id: "619434557472505857",
        type: 0,
        allow: PERMISSIONS.ATTACH_FILES,
        deny: PERMISSIONS.SEND_MESSAGES | PERMISSIONS.VIEW_CHANNEL,
      },
    ],
    rate_limit_per_user: 0,
    nsfw: false,
    topic: "test topic",
    last_message_id: null,
    parent_id: "123456789021345978",
    last_pin_timestamp: null,
  },
  VOICE_CHANNEL: {
    id: "333456789012345678",
    type: 2,
    guild_id: "619434557472505857",
    name: "test-channel",
    position: 0,
    permission_overwrites: [],
    rate_limit_per_user: 0,
    nsfw: false,
    topic: "test topic",
    last_message_id: null,
    parent_id: "123456789021345978",
    last_pin_timestamp: null,
    bitrate: 64000,
    user_limit: 0,
  },
  CATEGORY_CHANNEL: {
    id: "123456789021345978",
    type: 4,
    guild_id: "619434557472505857",
    name: "test-category",
    position: 0,
    permission_overwrites: [
      {
        id: "123456789012345678",
        type: 0,
        allow: "2",
        deny: "1",
      },
    ],
    nsfw: false,
    parent_id: null,
  },
  GUILD: {
    id: "619434557472505857",
    name: "test-guild",
    icon: null,
    splash: null,
    discovery_splash: null,
    owner_id: "301655085954367490",
    region: "us-west",
    afk_channel_id: null,
    afk_timeout: 0,
    verification_level: 0,
    default_message_notifications: 0,
    explicit_content_filter: 0,
    roles: [],
    emojis: [],
    features: [],
    mfa_level: 0,
    application_id: null,
    system_channel_id: "123456789112345678",
    system_channel_flags: 0,
    rules_channel_id: "123456788112345679",
    joined_at: "2021-01-01T00:00:00.000Z",
    large: false,
    unavailable: false,
    member_count: 500,
    voice_states: [],
    members: [],
    channels: [],
    threads: [],
    presences: [],
    max_presences: 25000,
    max_members: 250000,
    vanity_url_code: null,
    description: null,
    banner: null,
    premium_progress_bar_enabled: true,
    premium_tier: 1,
    premium_subscription_count: 9,
    preferred_locale: "en-US",
    public_updates_channel_id: null,
    max_video_channel_users: 0,
    approximate_member_count: 1,
    approximate_presence_count: 1,
    welcome_screen: null,
    nsfw_level: 0,
    stage_instances: [],
    stickers: [],
    threads: [],
    voice_states: [],
    members: [],
    channels: [
      {
        id: "123456789012345677",
        type: 0,
        guild_id: "619434557472505857",
        name: "test-channel",
        position: 0,
        permission_overwrites: [],
        rate_limit_per_user: 0,
        nsfw: false,
        topic: null,
        last_message_id: null,
        parent_id: null,
        last_pin_timestamp: null,
      },
      {
        id: "123456789012345679",
        type: 2,
        guild_id: "619434557472505857",
        name: "test-channel",
        position: 0,
        permission_overwrites: [],
        rate_limit_per_user: 0,
        nsfw: false,
        topic: null,
        last_message_id: null,
        parent_id: null,
        last_pin_timestamp: null,
        bitrate: 64000,
        user_limit: 0,
      },
    ],
    threads: [],
  },
  THREAD: {
    id: "123456789012345678",
    type: 11,
    guild_id: "619434557472505857",
    name: "test-thread",
    position: 0,
    permission_overwrites: [],
    rate_limit_per_user: 0,
    nsfw: false,
    topic: "test nice",
    last_message_id: null,
    parent_id: null,
    last_pin_timestamp: null,
    owner_id: "123456789012345678",
    parent_id: "123456789112345678",
  },
  CHANNEL_ID: "123456789112345678",
  MESSAGE_ID: "123456339012345678",
  MESSAGE: {
    id: "123456339012345678",
    type: 0,
    content: "test message @everyone",
    channel_id: "123456789112345678",
    author: {
      id: "301655085954367490",
      username: "test",
      discriminator: "0001",
      avatar: null,
      bot: false,
      system: false,
      mfa_enabled: false,
      locale: "en-US",
      verified: false,
      email: null,
      flags: 0,
      premium_type: 0,
      public_flags: 0,
      _cached: 123456789,
    },
    edited_timestamp: "2022-01-01T00:00:00.000Z",
    mention_everyone: true,
    mentions: [
      {
        id: "333456789012345678",
        username: "test mentioned",
        discriminator: "0",
        avatar: null,
        bot: false,
        system: false,
        mfa_enabled: false,
        locale: "en-US",
        verified: false,
        flags: 0,
        premium_type: 0,
        public_flags: 0,
      },
    ],
    mention_roles: ["123452789012345678"],
    mention_channels: ["123456789012345679"],
    attachments: [
      {
        id: "123455789012345678",
        filename: "test.png",
        size: 1000,
        url: "https://cdn.discordapp.com/attachments/123456789112345678/123455789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
        proxy_url:
          "https://cdn.discordapp.com/attachments/123456789112345678/123455789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
        height: 100,
        width: 100,
      },
    ],
    embeds: [
      {
        title: "test",
        description: "test description",
        url: "https://discord.com",
        timestamp: "2021-01-01T00:00:00.000Z",
        color: 55,
        footer: {
          text: "test",
          icon_url: null,
          proxy_icon_url: null,
        },
        image: {
          url: "https://cdn.discordapp.com/attachments/123456789112345678/123456789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
          proxy_url:
            "https://cdn.discordapp.com/attachments/123456789112345678/123456789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
          height: 100,
          width: 100,
        },
        thumbnail: {
          url: "https://cdn.discordapp.com/attachments/123456789112345678/123456789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
          proxy_url:
            "https://cdn.discordapp.com/attachments/123456789112345678/123456789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
          height: 100,
          width: 100,
        },
        video: {
          url: "https://cdn.discordapp.com/attachments/123456789112345678/123456789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
        },
        fields: [
          {
            name: "test",
            value: "test",
            inline: true,
          },
        ],
      },
    ],
    reactions: [
      {
        count: 1,
        me: false,
        emoji: {
          id: "844240546246950922",
          name: "bitcoin",
        },
      },
    ],
    pinned: true,
    webhook_id: null,
    type: 0,
    message_reference: {
      message_id: "123456339013345678",
      channel_id: "123456789112345678",
      guild_id: "619434557472505857",
    },
    message_snapshots: [
      {
        id: "123456339012345699",
        type: 0,
        content: "test message @everyone",
        channel_id: "123456789012345678",
      },
    ],
    referenced_message: {
      id: "123456339013345678",
      type: 0,
      content: "test message @everyone",
      channel_id: "123456789012345678",
    },
    sticker_items: [
      {
        id: "123456789012345678",
        name: "test-sticker",
        format_type: 1,
      },
    ],
    poll: {
      id: "123456789012345678",
      channel_id: "123456789012345678",
      question: "test poll",
      options: [
        {
          id: "123456789012345678",
          option: "test option",
        },
      ],
      votes: [
        {
          user_id: "123456789012345678",
          option_id: "123456789012345678",
        },
      ],
      expiry: "2021-01-01T00:00:00.000Z",
    },
  },
  MEMBER_ID: "301655085954367490",
  MEMBER: {
    user: {
      id: "301655085954367490",
      username: "test",
      discriminator: "0001",
      avatar: null,
      bot: false,
      system: false,
      mfa_enabled: false,
      locale: "en-US",
      verified: false,
      email: null,
      flags: 0,
      premium_type: 0,
      public_flags: 0,
    },
    nick: null,
    roles: [],
    joined_at: "2021-01-01T00:00:00.000Z",
    premium_since: null,
    deaf: false,
    mute: false,
    pending: false,
    permissions: "0",
    flags: 0,
  },
  EVENT_ID: "123456789012345678",
  ROLE_ID: "123452789012345678",
  ATTACHMENT: {
    id: "123456789012345678",
    filename: "test.png",
    size: 1000,
    url: "https://cdn.discordapp.com/attachments/123456789112345678/123456789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
    proxy_url:
      "https://cdn.discordapp.com/attachments/123456789112345678/123456789012345678/test.png?ex=669ba72f&is=669a55af&hm=b65802a922d51a03762f96dbc52727cf49d1d2e8a96bb0d397b03407b50b4ac2&",
    height: 100,
    width: 100,
  },
  FILE_NAME: "test.png",
  AUDIT_LOG: {
    id: "123456789012345678",
    guild_id: "619434557472505857",
    user_id: "123456789012345678",
    target_id: "123456789012345678",
    action_type: 1,
    changes: [],
    options: {
      channel_id: "123456789012345678",
      id: "123456789012345678",
      type: 1,
    },
    reason: "test",
    context: {
      id: "123456789012345678",
      type: 1,
    },
    created_at: "2021-01-01T00:00:00.000Z",
  },
  BUTTON_CLICK: {
    id: "123456789012345678",
    type: 3,
    data: {
      custom_id: "test",
      component_type: 2,
    },
    guild_id: "619434557472505857",
    channel_id: "123456789012345677",
    member: {
      user: {
        id: "123456789012345678",
        username: "test",
        discriminator: "0001",
        avatar: null,
        bot: false,
        system: false,
        mfa_enabled: false,
        locale: "en-US",
        verified: false,
        email: null,
        flags: 0,
        premium_type: 0,
        public_flags: 0,
      },
      roles: [],
      joined_at: "2021-01-01T00:00:00.000Z",
      premium_since: null,
      deaf: false,
      mute: false,
      pending: false,
      permissions: "0",
    },
    token: "test",
    version: 1,
    message: {
      id: "123456789012345678",
      type: 0,
      content: "test message",
      channel_id: "123456789012345677",
    },
    custom_id: "test",
  },
  CLIENT_USER: {
    id: "704802632660943089",
    username: "quark",
    discriminator: "0001",
    avatar: null,
    bot: false,
    system: false,
    mfa_enabled: false,
    locale: "en-US",
    verified: false,
    email: null,
    flags: 0,
    premium_type: 0,
    public_flags: 0,
  },
  CLIENT_MEMBER: {
    user: {
      id: "704802632660943089",
      username: "quark",
      discriminator: "0001",
      avatar: null,
      bot: false,
      system: false,
      mfa_enabled: false,
      locale: "en-US",
      verified: false,
      email: null,
      flags: 0,
      premium_type: 0,
      public_flags: 0,
    },
    nick: null,
    roles: [],
    joined_at: "2021-01-01T00:00:00.000Z",
    premium_since: null,
    deaf: false,
    mute: false,
    pending: false,
  },
  ROLE_ADMIN: {
    id: "123452789012345678",
    name: "admin",
    color: 0,
    hoist: true,
    position: 0,
    permissions: "8",
    managed: true,
    mentionable: true,
    tags: {
      bot_id: "123456789012345678",
      integration_id: null,
      premium_subscriber: null,
    },
    icon: "000000000000000000000000deadbeef",
  },
  ROLE_OVERRIDES: {
    id: "123453333333345678",
    name: "overrides",
    color: 0,
    hoist: false,
    position: 0,
    permissions: "0",
    managed: false,
    mentionable: true,
    icon: "000000000000000000000000deadbeef",
  },
  EMOJI: {
    id: "844240546246950922",
    name: "bitcoin",
    guild_id: "619434557472505857",
    animated: true,
  },
  STANDARD_EMOJI: {
    id: null,
    name: "☦️",
  },
  INTERACTION: {
    id: "123451189012345678",
    type: 2,
    data: {
      name: "test",
      options: [],
    },
    guild_id: "619434557472505857",
    channel_id: "123456789112345678",
    member: {
      user: {
        id: "301655085954367490",
        username: "test",
        discriminator: "0",
        avatar: null,
        bot: false,
        system: false,
        mfa_enabled: false,
        locale: "en-US",
        verified: false,
        email: null,
        flags: 0,
        premium_type: 0,
        public_flags: 0,
      },
      roles: [],
      joined_at: "2021-01-01T00:00:00.000Z",
      premium_since: null,
      deaf: false,
      mute: false,
      pending: false,
      permissions: "0",
    },
    token: "test",
    version: 1,
  },
  INVITE: {
    code: "test",
    guild_id: "619434557472505857",
    channel: {
      id: "123456789112345678",
      name: "test-channel",
      type: 0,
      nsfw: false,
      parent_id: "123456789021345978",
      topic: "test topic",
    },
    inviter: {
      id: "123456789012335678",
      username: "test",
      discriminator: "0001",
      avatar: null,
      bot: false,
      system: false,
      mfa_enabled: false,
      locale: "en-US",
      verified: false,
      email: null,
      flags: 0,
      premium_type: 0,
      public_flags: 0,
    },
    target_user_id: null,
    target_user_type: 0,
    approximate_presence_count: 1,
    approximate_member_count: 1,
    expires_at: "2021-03-01T00:00:00.000Z",
    uses: 33,
    max_uses: 100,
    max_age: 86400,
    temporary: true,
    created_at: "2021-01-01T00:00:00.000Z",
  },
  MODAL_RESPONSE: {
    id: "123451189012345678",
    type: 5,
    data: {
      components: [
        {
          type: 1,
          components: [
            {
              custom_id: "test custom id",
              type: 4,
              value: "test value",
            },
          ],
        },
      ],
    },
    guild_id: "619434557472505857",
    channel_id: "123456789012345677",
    member: {
      avatar: null,
      flags: 0,
      user: {
        id: "123456789012345678",
        username: "test",
        discriminator: "0001",
        avatar: null,
        bot: false,
      },
      roles: undefined,
      joined_at: "2021-01-01T00:00:00.000Z",
      premium_since: null,
      deaf: false,
      mute: false,
      pending: false,
      permissions: "0",
    },
    token: "test",
    type: 5,
    version: 1,
  },
  OPTION_SELECT: {
    application_id: "123456789",
    id: "123451189012345678",
    type: 3,
    data: {
      custom_id: "test",
      component_type: 3,
      values: ["test"],
    },
    guild_id: "619434557472505857",
    channel_id: "123456789112345678",
    member: {
      user: {
        id: "123456789012345678",
        username: "test",
        discriminator: "0001",
        avatar: null,
        bot: false,
        global_name: "starman",
      },
      roles: [],
      joined_at: "2021-01-01T00:00:00.000Z",
      premium_since: null,
      deaf: false,
      mute: false,
      pending: false,
      permissions: "0",
      avatar: null,
      flags: 0,
    },
    message: {
      application_id: "123456789",
      id: "123456789012345678",
      type: 0,
      content: "test message",
      channel_id: "123456789112345678",
      author: {
        id: "301655085954367490",
        username: "test",
        discriminator: "0001",
        avatar: null,
        bot: false,
        global_name: "starman",
      },
      attachments: [],
      application_id: "123456789",
      embeds: [],
      mentions: [],
      mention_roles: [],
      mention_channels: [],
      pinned: false,
      mention_everyone: false,
      tts: false,
      timestamp: "2021-01-01T00:00:00.000Z",
      edited_timestamp: null,
      content: "test message",
      flags: 0,
    },
    token: "test",
    version: 1,
  },
  REACTION: {
    user_id: "123456789012345678",
    message_id: "123456789012345678",
    emoji: {
      id: null,
      name: "☦️",
    },
    channel_id: "123456789012345678",
    guild_id: "619434557472505857",
    member: {
      user: {
        id: "301655085954367490",
        username: "test",
        discriminator: "0001",
        avatar: null,
        bot: false,
        system: false,
        mfa_enabled: false,
        locale: "en-US",
        verified: false,
        email: null,
        flags: 0,
        premium_type: 0,
        public_flags: 0,
      },
      roles: [],
      joined_at: "2021-01-01T00:00:00.000Z",
      premium_since: null,
      deaf: false,
      mute: false,
      pending: false,
      permissions: "0",
    },
    message_author_id: "301655085954367490",
    burst: true,
    type: 1,
  },
  SLASH_COMMAND: {
    id: "123451189012345678",
    type: 1,
    data: {
      name: "test",
      description: "test description",
      options: [],
    },
    guild_id: "619434557472505857",
    channel_id: "123456789012345677",
    member: {
      user: {
        id: "123456789012345678",
        username: "test",
        discriminator: "0001",
        avatar: null,
        bot: false,
        system: false,
        mfa_enabled: false,
        locale: "en-US",
        verified: false,
        email: null,
        flags: 0,
        premium_type: 0,
        public_flags: 0,
      },
      roles: [],
      joined_at: "2021-01-01T00:00:00.000Z",
      premium_since: null,
      deaf: false,
      mute: false,
      pending: false,
      permissions: "0",
    },
    token: "test",
    version: 1,
  },
  STICKER: {
    id: "749054660769218631",
    name: "Wave",
    tags: "wumpus, hello, sup, hi, oi, heyo, heya, yo, greetings, greet, welcome, wave, :wave, :hello, :hi, :hey, hey, \ud83d\udc4b, \ud83d\udc4b\ud83c\udffb, \ud83d\udc4b\ud83c\udffc, \ud83d\udc4b\ud83c\udffd, \ud83d\udc4b\ud83c\udffe, \ud83d\udc4b\ud83c\udfff, goodbye, bye, see ya, later, laterz, cya",
    type: 1,
    format_type: 1,
    description: "Wumpus waves hello",
    asset: "",
    pack_id: "847199849233514549",
    sort_value: 12,
  },
  USER: {
    id: "301655085954367490",
    username: "test",
    discriminator: "0001",
    avatar: "a_000000000000000000000000deadbeef",
    bot: true,
    system: false,
    mfa_enabled: false,
    locale: "en-US",
    verified: false,
    email: null,
    flags: 0,
    premium_type: 0,
    public_flags: 0,
    global_name: "starman",
  },
  VOICE_STATE: {
    channel_id: "333456789012345678",
    user_id: "80351110224678912",
    session_id: "90326bd25d71d39b9ef95b299e3872ff",
    deaf: false,
    mute: false,
    self_deaf: false,
    self_mute: true,
    suppress: false,
    self_stream: true,
    self_video: true,
    request_to_speak_timestamp: "2021-03-31T18:45:31.297561+00:00",
    joined: 1722533062,
  },
  SCHEDULED_EVENT: {
    id: "123409989012345678",
    guild_id: "619434557472505857",
    channel_id: "333456789012345678",
    creator_id: "301655085954367490",
    name: "test event",
    description: "test description",
    scheduled_start_time: "2021-01-01T00:00:00.000Z",
    scheduled_end_time: "2021-01-02T01:00:00.000Z",
    privacy_level: 1,
    status: 1,
    entity_type: 2,
    entity_id: "333456789012345678",
    entity_metadata: {
      location: undefined,
    },
    creator: {
      id: "301655085954367490",
      username: "test",
      discriminator: "0001",
      avatar: null,
      bot: false,
      system: false,
      mfa_enabled: false,
      locale: "en-US",
      verified: false,
      email: null,
      flags: 0,
      premium_type: 0,
      public_flags: 0,
    },
    user_count: 10,
    image: "000000000000000000000000deadbeef",
  },
  SCHEDULED_EVENT_EXTERNAL: {
    id: "123409989012345678",
    guild_id: "619434557472505857",
    channel_id: "333456789012345678",
    creator_id: "301655085954367490",
    name: "test event",
    description: "test description",
    scheduled_start_time: "2021-01-01T00:00:00.000Z",
    scheduled_end_time: "2021-01-02T01:00:00.000Z",
    privacy_level: 1,
    status: 1,
    entity_type: 3,
    entity_id: "333456789012345678",
    entity_metadata: {
      location: "test location",
    },
    creator: {
      id: "301655085954367490",
      username: "test",
      discriminator: "0001",
      avatar: null,
      bot: false,
      system: false,
      mfa_enabled: false,
      locale: "en-US",
      verified: false,
      email: null,
      flags: 0,
      premium_type: 0,
      public_flags: 0,
    },
    user_count: 10,
    image: "000000000000000000000000deadbeef",
  },
  POLL: {
    question: "test poll",
    answers: [
      {
        answer_id: 1,
        poll_media: {
          text: "test",
          emoji: {
            id: "123456789012345678",
            name: "test",
          },
        },
      },
    ],
    expiry: "2021-01-01T00:00:00.000Z",
    allow_multiselect: false,
    layout_type: 1,
    results: {
      is_finalized: false,
      answer_counts: [
        {
          id: 1,
          count: 1,
          me_voted: true,
        },
      ],
    },
  },
  PERMISSION_OVERWRITE: {
    id: "123456789012345678",
    type: 0,
    allow: "1",
    deny: "0",
  },
  FOLLOWED_CHANNEL: {
    channel_id: "123456789112345678",
    webhook_id: "111456789012345678",
  },
  WEBHOOK: {
    id: "111456789012345678",
    type: 1,
    guild_id: "619434557472505857",
    channel_id: "123456789112345678",
    name: "test",
    avatar: null,
    application_id: null,
    user: {
      id: "301655085954367490",
      username: "test",
      discriminator: "0001",
      avatar: null,
      bot: false,
      global_name: "starman",
    },
  },
  BAN: {
    reason: "test reason",
    user: {
      id: "301655085954367490",
      username: "test",
      discriminator: "0001",
      avatar: null,
      global_name: "starman",
      bot: false,
    },
  },
};

export const TEST_CLIENTS = {
  ALL_CACHES_ENABLED: () => {
    const client = new Client({
      cacheChannels: true,
      cacheEmojis: true,
      cacheGuilds: true,
      cacheMessages: true,
      cacheRoles: true,
      cacheUsers: true,
      cacheMembers: true,
      cacheVoiceStates: true,
      cacheScheduledEvents: true,
      cacheInvites: true,
      intents: INTENTS.GUILDS | INTENTS.GUILD_MESSAGES | INTENTS.GUILD_MEMBERS,
    });
    client.user = new User(client, TEST_DATA.CLIENT_USER);
    client.request = new BetterRequestHandler(client, "TOKEN");
    return client;
  },
  NO_CACHES_ENABLED: () => {
    const client = new Client({
      cacheChannels: false,
      cacheEmojis: false,
      cacheGuilds: true,
      cacheMessages: false,
      cacheRoles: false,
      cacheUsers: false,
      cacheMembers: false,
      cacheVoiceStates: false,
      cacheScheduledEvents: false,
      cacheInvites: false,
      intents: INTENTS.GUILDS | INTENTS.GUILD_MESSAGES | INTENTS.GUILD_MEMBERS,
    });
    client.user = new User(client, TEST_DATA.CLIENT_USER);
    client.request = new BetterRequestHandler(client, "TOKEN");
    return client;
  },
};

export const TEST_GUILDS = {
  ALL_CACHES_ENABLED: (client) => {
    const guild = new Guild(client, TEST_DATA.GUILD);
    guild._cacheOptions.setChannelCaching(true);
    guild._cacheOptions.setEmojiCaching(true);
    guild._cacheOptions.setRoleCaching(true);
    guild._cacheOptions.setMessageCaching(true);
    guild._cacheOptions.setFileCaching(true);
    guild._cacheOptions.setMemberCaching(true);
    guild._cacheOptions.setVoiceStateCaching(true);
    guild._cacheOptions.setScheduledEventCaching(true);
    guild._cacheOptions.setInviteCaching(true);
    return guild;
  },
  NO_CACHES_ENABLED: (client) => {
    const guild = new Guild(client, TEST_DATA.GUILD);
    guild._cacheOptions.setChannelCaching(false);
    guild._cacheOptions.setEmojiCaching(false);
    guild._cacheOptions.setRoleCaching(false);
    guild._cacheOptions.setMessageCaching(false);
    guild._cacheOptions.setFileCaching(false);
    guild._cacheOptions.setMemberCaching(false);
    guild._cacheOptions.setVoiceStateCaching(false);
    guild._cacheOptions.setScheduledEventCaching(false);
    guild._cacheOptions.setInviteCaching(false);
    return guild;
  },
};

export const TEST_CHANNELS = {
  TEXT_CHANNEL_ALL_CACHES_ENABLED: (client) => {
    const channel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL, {
      guildId: TEST_DATA.GUILD_ID,
    });
    return channel;
  },
  TEXT_CHANNEL_2_ALL_CACHES_ENABLED: (client) => {
    const channel = new TextChannel(client, TEST_DATA.TEXT_CHANNEL_2, {
      guildId: TEST_DATA.GUILD_ID,
    });
    return channel;
  },
  VOICE_CHANNEL_ALL_CACHES_ENABLED: (client) => {
    const channel = new VoiceChannel(client, TEST_DATA.VOICE_CHANNEL, {
      guildId: TEST_DATA.GUILD_ID,
    });
    return channel;
  },
  CATEGORY_CHANNEL_ALL_CACHES_ENABLED: (client) => {
    const channel = new CategoryChannel(client, TEST_DATA.CATEGORY_CHANNEL, {
      guildId: TEST_DATA.GUILD_ID,
    });
    return channel;
  },
};

export const TEST_MEMBERS = {
  CLIENT_MEMBER: (client) => {
    const member = new Member(client, TEST_DATA.CLIENT_MEMBER, {
      userId: TEST_DATA.CLIENT_MEMBER.user.id,
      guildId: TEST_DATA.GUILD_ID,
    });
    return member;
  },
  THREAD_OWNER_MEMBER: (client) => {
    const member = new Member(client, TEST_DATA.CLIENT_MEMBER, {
      userId: TEST_DATA.THREAD.owner_id,
      guildId: TEST_DATA.GUILD_ID,
    });
    return member;
  },
  GUILD_OWNER_MEMBER: (client) => {
    const member = new Member(client, TEST_DATA.MEMBER, {
      userId: TEST_DATA.GUILD.owner_id,
      guildId: TEST_DATA.GUILD_ID,
    });
    return member;
  },
  GENERIC_MEMBER: (client) => {
    const member = new Member(client, TEST_DATA.MEMBER, {
      userId: TEST_DATA.MEMBER_ID,
      guildId: TEST_DATA.GUILD_ID,
    });
    return member;
  },
  VOICE_STATE_MEMBER: (client) => {
    const member = new Member(client, TEST_DATA.MEMBER, {
      guildId: TEST_DATA.GUILD_ID,
      userId: TEST_DATA.VOICE_STATE.user_id,
    });
    return member;
  },
};

export const TEST_MESSAGES = {
  GENERIC_MESSAGE: (client) => {
    const message = new Message(client, TEST_DATA.MESSAGE, {
      guildId: TEST_DATA.GUILD_ID,
      channelId: TEST_DATA.CHANNEL_ID,
    });
    return message;
  },
};

export const TEST_ROLES = {
  GENERIC_ADMIN_ROLE: (client) => {
    const role = new Role(client, TEST_DATA.ROLE_ADMIN, {
      guildId: TEST_DATA.GUILD_ID,
    });
    return role;
  },
};

export const TEST_SCHEDULED_EVENTS = {
  GENERIC_SCHEDULED_EVENT: (client) => {
    const scheduledEvent = new ScheduledEvent(
      client,
      TEST_DATA.SCHEDULED_EVENT,
      { guildId: TEST_DATA.GUILD_ID },
    );
    return scheduledEvent;
  },
  EXTERNAL_GENERIC_SCHEDULED_EVENT: (client) => {
    const scheduledEvent = new ScheduledEvent(
      client,
      TEST_DATA.SCHEDULED_EVENT_EXTERNAL,
      { guildId: TEST_DATA.GUILD_ID },
    );
    return scheduledEvent;
  },
};
