import {
  APITextInputComponent,
  ComponentType,
  TextInputStyle,
} from "discord-api-types/v10";

export class TextInput {
  #base: Partial<APITextInputComponent> = {
    type: ComponentType.TextInput,
  };

  customID(id: string): TextInput {
    this.#base.custom_id = id;
    return this;
  }

  style(style: TextInputStyle): TextInput {
    this.#base.style = style;
    return this;
  }

  label(value: string): TextInput {
    this.#base.label = value;
    return this;
  }

  limits(min: number, max: number): TextInput {
    [this.#base.min_length, this.#base.max_length] = [min, max];
    return this;
  }

  optional(isOptional = true): TextInput {
    this.#base.required = !isOptional;
    return this;
  }

  value(value: string): TextInput {
    this.#base.value = value;
    return this;
  }

  placeholder(value: string): TextInput {
    this.#base.placeholder = value;
    return this;
  }

  toJSON(): APITextInputComponent {
    return this.#base as APITextInputComponent;
  }
}
