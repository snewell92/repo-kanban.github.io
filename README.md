## [Repo Kanban](https://repo-kanban.sean.thenewells.us)

An excercise to build a wee app that translates branches into kanban items. Deployed via GH Pages
to a custom domain [repo-kanban.sean.thenewells.us](https://repo-kanban.sean.thenewells.us).

## Development

Easy mode is just use this [codesandbox]() preconfigured with everything you need. _TODO_

For local dev you will need:

- A terminal
- NodeJS (v18+)
- pnpm
- An adequate editor (Neovim / VSCode / Codesandbox etc)

Then, open your terminal and do:

1. `git clone` to get the code and `cd` into the folder
2. `pnpm install` to get all dependencies installed
3. `pnpm dev` to start vite, the app should be served on something like [localhost:5173](http://localhost:5173)

Profit!

## Tools

This repo uses:

- React (v18)
  - A UI Library.. or langauge? Philosophy? That leverages a virtual dom and provides state primitives
  - Makes making UI as simple as function!
- Typescript (V4.9)
  - Types! For your Javascripts!
- TailwindCSS (v3.4.2)
  - This is a utility class library to quickly prototype and sketch out styles in the markup directly
- DaisyUI (v2.42)
  - This is a component library built on top of tailwind css
- Vite (v3.2.3)
  - This is the bundler and dev server (`dev` runs the vite server and `pnpm run build` uses vite to orchestrate building a static site.)
