import {
  APIGuildMember,
  APIInteraction,
  APIInteractionResponseCallbackData,
  APIMessage,
  APIPingInteraction,
  APIUser,
  InteractionResponseType,
  RESTPatchAPIInteractionOriginalResponseJSONBody,
  RESTPostAPIInteractionFollowupJSONBody,
} from "discord-api-types/v10";

export default class Interaction {
  #BASE = "https://discord.com/api/v10";
  id: string;
  applicationID: string;
  data: any;
  guildID?: string;
  channelID?: string;
  member?: APIGuildMember;
  user?: APIUser;
  #token: string;
  message?: APIMessage;
  locale: string;
  guildLocale: string;

  constructor(payload: Exclude<APIInteraction, APIPingInteraction>) {
    this.id = payload.id;
    this.applicationID = payload.application_id;
    this.data = payload.data;
    this.guildID = payload.guild_id;
    this.channelID = payload.channel_id;
    this.member = payload.member;
    this.user = payload.user;
    this.#token = payload.token;
    this.message = payload.message;
    this.locale = payload.locale ?? "en-US";
    this.guildLocale = payload.guild_locale ?? "en-US";
  }

  respond(
    type: InteractionResponseType,
    data: APIInteractionResponseCallbackData
  ): Promise<Response> {
    return fetch(
      `${this.#BASE}/interactions/${this.id}/${this.#token}/callback`,
      {
        method: "POST",
        body: JSON.stringify({ type, data }),
      }
    );
  }

  followup(data: RESTPostAPIInteractionFollowupJSONBody): Promise<Response> {
    return fetch(`${this.#BASE}/webhooks/${this.id}/${this.#token}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  edit(
    data: RESTPatchAPIInteractionOriginalResponseJSONBody,
    responseID = "@original"
  ): Promise<Response> {
    return fetch(
      `${this.#BASE}/webhooks/${this.id}/${this.#token}/messages/${responseID}`,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      }
    );
  }

  delete(responseID = "original"): Promise<Response> {
    return fetch(
      `${this.#BASE}/webhooks/${this.id}/${this.#token}/messages/${responseID}`,
      {
        method: "DELETE",
      }
    );
  }
}
