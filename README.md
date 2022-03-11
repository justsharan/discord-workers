# discord-workers [WIP]

This is a helpful library with utility classes to make dealing with Discord interactions a little easier. While it is runtime agnostic, I intended to use this with my Discord bot running on Cloudflare Workers. However, it should still work with similar environments like Deno, Vercel, etc.

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
    .placeholder("Pick a favorite fruits")
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
