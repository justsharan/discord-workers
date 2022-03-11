import {
  APIButtonComponentWithCustomId,
  ButtonStyle,
  ComponentType,
} from "discord-api-types/v10";

export class Button {
  #base: Partial<APIButtonComponentWithCustomId> = {
    type: ComponentType.Button,
  };

  style(style: Exclude<ButtonStyle, ButtonStyle.Link>): Button {
    this.#base.style = style;
    return this;
  }

  label(label: string): Button {
    this.#base.label = label;
    return this;
  }

  emoji(name: string): Button;
  emoji(name: string, id?: string, animated?: boolean): Button {
    this.#base.emoji =
      name && !id ? { name } : { name, id, animated: animated ?? false };
    return this;
  }

  customID(id: string): Button {
    this.#base.custom_id = id;
    return this;
  }

  disabled(isDisabled = true): Button {
    this.#base.disabled = isDisabled;
    return this;
  }

  toJSON(): APIButtonComponentWithCustomId {
    return this.#base as APIButtonComponentWithCustomId;
  }
}
