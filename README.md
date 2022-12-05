## [Repo Kanban](https://repo-kanban.sean.thenewells.us)

An excercise to build a wee app that translates branches into kanban items. Deployed via GH Pages
to a custom domain [repo-kanban.sean.thenewells.us](https://repo-kanban.sean.thenewells.us).

## Development

Easy mode is just use this [codesandbox](https://codesandbox.io/p/github/snewell92/repo-kanban.github.io/draft/festive-shirley?file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522clb9ooh6o000f7nfz6g1o71w4%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522clb9ooir3000u2e691omwtnke%2522%253A%257B%2522key%2522%253A%2522clb9ooir3000u2e691omwtnke%2522%252C%2522name%2522%253A%2522Default%2520Space%2522%252C%2522devtools%2522%253A%255B%257B%2522key%2522%253A%2522clb9ooir3000v2e69yp8wln65%2522%252C%2522type%2522%253A%2522PROJECT_SETUP%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522key%2522%253A%2522clb9oonr200cc2e69p2vpud12%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522key%2522%253A%2522clb9oomc9006i2e69thyj5kz0%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522clb9ooir3000u2e691omwtnke%2522%257D) preconfigured with everything you need.

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
