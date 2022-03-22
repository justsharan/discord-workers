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

export class Interaction {
  #BASE = "https://discord.com/api/v10";
  id: string;
  applicationID: string;
  data: object;
  guildID?: string;
  channelID?: string;
  member?: APIGuildMember;
  user?: APIUser;
  #token: string;
  message?: APIMessage;
  locale: string;
  guildLocale: string;

  constructor(
    payload: Exclude<APIInteraction, APIPingInteraction>,
    private isManual = false
  ) {
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
    data: APIInteractionResponseCallbackData,
    files: File[]
  ): Promise<Response> {
    let body: string | FormData;
    if (files.length) {
      body = files.reduce((acc, curr, i) => {
        acc.set(`files[${i}]`, curr, curr.name);
        return acc;
      }, new FormData());
      body.set("payload_json", JSON.stringify(data));
    } else {
      body = JSON.stringify(data);
    }
    if (this.isManual) {
      return Promise.resolve(
        new Response(body, {
          headers: {
            "Content-Type":
              body instanceof FormData
                ? "multipart/form-data"
                : "application/json",
          },
        })
      );
    }
    return fetch(
      `${this.#BASE}/interactions/${this.id}/${this.#token}/callback`,
      {
        method: "POST",
        body: JSON.stringify({ type, data }),
      }
    );
  }

  followup(
    data: RESTPostAPIInteractionFollowupJSONBody,
    files: File[]
  ): Promise<Response> {
    let body: string | FormData;
    if (files.length) {
      body = files.reduce((acc, curr, i) => {
        acc.set(`files[${i}]`, curr, curr.name);
        return acc;
      }, new FormData());
      body.set("payload_json", JSON.stringify(data));
    } else {
      body = JSON.stringify(data);
    }
    return fetch(`${this.#BASE}/webhooks/${this.id}/${this.#token}`, {
      method: "POST",
      body,
      headers: {
        "Content-Type":
          body instanceof FormData ? "multipart/form-data" : "application/json",
      },
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
