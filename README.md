<img src="./public/favicons/favicon.svg" width="150" align="right" alt="" />

# 🚀 Web3 Frontend Starter Template

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder
- `yarn lint` — checks if the code is linted and formatted
- `yarn generate-css-types` — generates the CSS types for `tailwind-css`

## Features

- State management + persistence with `valtio` and `PersistableStore`
- `preact` under the hood with `preact/compat` makes it compatible with virtually any `react` library but still makes it faster
- Full TypeScript support — no dangling types
- `vite` packager and devtools make building and development lightning fast
- `tailwind-css` built-in with type-safe class names
- `prettier` and `eslint` configured, enabled and formatting your code on save
- List of recommended extensions for VSCode
- It is important to keep the bundle small, so a `stats.html` file is generated on `yarn build` to visually show you the bundle size

## Environment variables

| Name               | Description                                 |
| ------------------ | ------------------------------------------- |
| `VITE_ENCRYPT_KEY` | Secret key to encrypt local storage         |
| `VITE_APP_NAME`    | App name which is displayed in some wallets |
| `VITE_ETH_NETWORK` | Eth network for your providers and contract |
| `VITE_ETH_RPC`     | Ethereum node RPC URI                       |

Also, please, consider looking at `.env.sample`.

## CD

- `npx vercel` — to deploy with Vercel

Reference - https://vitejs.dev/guide/static-deploy.html#vercel-cli

## Big thanks:

Inspired by [this starter](https://github.com/Borodutch/frontend-starter) & [this project](https://github.com/BigWhaleLabs/seal-cred-frontend)
