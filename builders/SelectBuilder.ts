import {
  APISelectMenuComponent,
  APISelectMenuOption,
  ComponentType,
} from "discord-api-types/v10";

export class SelectMenu {
  #base: Partial<APISelectMenuComponent> = {
    type: ComponentType.SelectMenu,
    options: [],
  };

  customID(id: string): SelectMenu {
    this.#base.custom_id = id;
    return this;
  }

  placeholder(value: string): SelectMenu {
    this.#base.placeholder = value;
    return this;
  }

  option(value: SelectMenuOption): SelectMenu {
    this.#base.options!.push(value.toJSON());
    return this;
  }

  limits(min = 1, max = 1): SelectMenu {
    if (min < 0 || min > 25) {
      throw new Error("Your minimum is out of bounds!");
    } else if (max > 25 || max < min) {
      throw new Error("Your maximum is out of bounds!");
    }
    [this.#base.min_values, this.#base.max_values] = [min, max];
    return this;
  }

  disabled(isDisabled = true): SelectMenu {
    this.#base.disabled = isDisabled;
    return this;
  }

  toJSON(): APISelectMenuComponent {
    return this.#base as APISelectMenuComponent;
  }
}

export class SelectMenuOption {
  #base: Partial<APISelectMenuOption> = {};

  label(value: string): SelectMenuOption {
    this.#base.label = value;
    return this;
  }

  value(value: string): SelectMenuOption {
    this.#base.value = value;
    return this;
  }

  description(value: string): SelectMenuOption {
    this.#base.description = value;
    return this;
  }

  emoji(name: string): SelectMenuOption;
  emoji(name: string, id?: string, animated?: boolean): SelectMenuOption {
    this.#base.emoji =
      name && !id ? { name } : { name, id, animated: animated ?? false };
    return this;
  }

  default(isDefault = true): SelectMenuOption {
    this.#base.default = isDefault;
    return this;
  }

  toJSON(): APISelectMenuOption {
    return this.#base as APISelectMenuOption;
  }
}
