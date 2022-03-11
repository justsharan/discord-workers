import { APIActionRowComponent, ComponentType } from "discord-api-types/v10";
import { Button, SelectMenu, TextInput } from ".";

type Component = Button | SelectMenu | TextInput;

export class ActionRow {
  components: Component[] = [];

  component(component: Component): ActionRow {
    this.components.push(component);
    return this;
  }

  toString(): string {
    return "[ActionRow]";
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON(): APIActionRowComponent<any> {
    return {
      type: ComponentType.ActionRow,
      components: this.components.map((e) => e.toJSON()),
    };
  }
}
