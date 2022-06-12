import { AccentText, BodyText, HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'
import { ethers } from 'ethers'
import { ENSName, AddressDisplayEnum } from 'react-ens-name'

const initialCardWrapper = space('space-y-4')
const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/118f8087dcea46caa83d120ab84670f1'
)
interface NFTProps {
  image: string
  name: string
  exes: Map<string, string>
}

export default function (props: NFTProps) {
  return (
    <Card shadow color="accent" onlyWrap nospace>
      <div className={initialCardWrapper}>
        <img src={props.image} />
        <HeaderText extraLeading>{props.name}</HeaderText>
      </div>
      <div>
        {Array.from(props.exes).map(([key, value]) => {
          return (
            <p>
              <a href={'https://etherscan.io/address/' + key} target="_blank">
                <ENSName
                  address={key}
                  provider={provider}
                  displayType={AddressDisplayEnum.FIRST4_LAST4}
                  withEllipses
                ></ENSName>
              </a>
              : {value}
            </p>
          )
        })}
      </div>
    </Card>
  )
}
