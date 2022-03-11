# discord-workers [WIP]

This is a helpful library with utility classes to make dealing with Discord interactions a little easier. While it is runtime agnostic, I intended to use this with my Discord bot running on Cloudflare Workers. However, it should still work with similar environments like Deno, Vercel, etc.

## Builders

Builders are classes to help you construct commonly used objects like message components, modals, embeds, etc, using a familiar, chainable function syntax, rather than putting objects together.
