import {
  APIApplicationCommandInteractionDataOption,
  APIChatInputApplicationCommandInteraction,
  APIChatInputApplicationCommandInteractionDataResolved,
  APIInteractionResponseCallbackData,
  InteractionResponseType,
} from "discord-api-types/v10";
import Interaction from "./Interaction";

export default class SlashInteraction extends Interaction {
  options: APIApplicationCommandInteractionDataOption[];
  resolved: APIChatInputApplicationCommandInteractionDataResolved;
  #responded = false;
  #deferred = false;
  #deferEdited = true;

  constructor(payload: APIChatInputApplicationCommandInteraction) {
    super(payload);
    this.options = payload.data.options ?? [];
    this.resolved = payload.data.resolved ?? {};
  }

  /**
   * Create a deferred message
   * @param ephemeral Whether the deferred message is ephemeral
   * @returns The response from Discord
   */
  defer(ephemeral: false): Promise<Response> {
    if (this.#responded) throw new Error("A response has already been sent!");
    this.#deferred = true;
    this.#deferEdited = false;
    return this.respond(
      InteractionResponseType.DeferredChannelMessageWithSource,
      ephemeral ? { flags: 64 } : {}
    );
  }

  /**
   * Create a new message. If a response has already been sent, then it will be sent as a follow-up. If `SlashInteraction.defer()` has been called, then it will be sent as an edit.
   * @param data The message data
   * @returns The response from Discord
   */
  send(data: APIInteractionResponseCallbackData): Promise<Response> {
    if (this.#responded) {
      return this.followup(data);
    } else if (this.#deferred && !this.#deferEdited) {
      return this.edit(data);
    } else {
      return this.respond(
        InteractionResponseType.ChannelMessageWithSource,
        data
      );
    }
  }
}
