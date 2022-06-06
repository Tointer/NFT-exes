<img src="./public/favicons/favicon.svg" width="150" align="right" alt="" />

# 🚀 dApp Frontend Starter Template

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder

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
