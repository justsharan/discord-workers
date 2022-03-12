# discord-workers [WIP]

This is a helpful library with utility classes to make dealing with Discord interactions a little easier. While it is runtime agnostic, I intended to use this with my Discord bot running on Cloudflare Workers. However, it should still work with similar environments like Deno, Vercel, etc.

## Interaction

This is the main part of the library, and it's still a WIP. You can pass in the raw interaction payload to these utility classes, and they will provide useful methods to respond, follow up, defer, edit, etc.

It's a barebones alternative to a more feature-packed library like [`slash-create`](https://github.com/Snazzah/slash-create) that works on practically any environment. It doesn't care how you structure your project, etc, and just provides a simple API to work with interactions.

```ts
import { CommandInteraction } from "discord-workers";

addEventListener("fetch", (event) => handle(event.request));

async function handle(req: Request): Promise<Response> {
  // Handle verification and stuff
  const int = new CommandInteraction(body);
  if (int.name === "ping") {
    int.send("Pong!");
  }
}
```

## Builders

Builders are classes to help you construct commonly used objects like message components, modals, embeds, etc, using a familiar, chainable function syntax, rather than putting objects together.

```ts
import {
  ActionRow,
  SelectMenu,
  SelectMenuOption,
} from "discord-workers/builders";

const row = new ActionRow();
row.component(
  new SelectMenu()
    .customID("fruit")
    .placeholder("Pick your favorite fruit(s)")
    .limits(1, 3)
    .option(new SelectMenuOption().label("Apple"))
    .option(new SelectMenuOption().label("Orange"))
    .option(new SelectMenuOption().label("Pears"))
    .option(new SelectMenuOption().label("Kiwi"))
    .option(new SelectMenuOption().label("Banana"))
    .option(new SelectMenuOption().label("Strawberry"))
);

row.toJSON();
```
