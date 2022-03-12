import {
  APIApplicationCommandInteractionDataOption,
  APIChatInputApplicationCommandInteractionDataResolved,
  APIApplicationCommandInteraction,
  APIInteractionResponseCallbackData,
  InteractionResponseType,
  ApplicationCommandType,
} from "discord-api-types/v10";
import { Interaction } from "./Interaction";

export class CommandInteraction extends Interaction {
  commandID: string;
  name: string;
  options?: APIApplicationCommandInteractionDataOption[] = [];
  resolved?: APIChatInputApplicationCommandInteractionDataResolved = {};
  targetID?: string;
  #responded = false;
  #deferred = false;
  #deferEdited = true;

  constructor(payload: APIApplicationCommandInteraction) {
    super(payload);
    this.commandID = payload.data.id;
    this.name = payload.data.name;
    if (payload.data.type === ApplicationCommandType.ChatInput) {
      this.options = payload.data.options ?? [];
      this.resolved = payload.data.resolved ?? {};
    } else {
      this.targetID = payload.data.target_id;
    }
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
