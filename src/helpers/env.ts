import { cleanEnv, str } from 'envalid'

const FORTMATIC_KEY = ''
const ETH_NETWORK = 'rinkeby'
const ETH_RPC = 'https://rinkeby.infura.io/v3/4dfd5c5dc5b548b192499e1b97d466a4'

export default cleanEnv(import.meta.env, {
  VITE_ENCRYPT_KEY: str(),
  VITE_FORTMATIC_KEY: str({ default: FORTMATIC_KEY }),
  VITE_APP_NAME: str(),
  VITE_ETH_NETWORK: str({ default: ETH_NETWORK }),
  VITE_ETH_RPC: str({ default: ETH_RPC }),
})
