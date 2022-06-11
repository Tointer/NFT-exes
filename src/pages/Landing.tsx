import InitialCard from 'components/landing/InitialCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
} from 'classnames/tailwind'
import NFTCard from 'components/landing/NFTCard'
import { ZDK } from '@zoralabs/zdk'
import { useState } from 'react'
import { TokenQuery, TokensQuery } from '@zoralabs/zdk/dist/queries/queries-sdk'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

export default function () {
  async function handleSubmit(e: string) {
    const testAddress = '0xb23C6962c431524c154b3eA088fC3Ca0Dc4b0B94'
    const zdk = new ZDK()

    const args = {
      where: {
        ownerAddresses: [testAddress],
      },
    }
    const response = await zdk.tokens(args)
    response.tokens.nodes[0].token.image
    console.log(response)
    setTokens(response)
  }

  const [tokens, setTokens] = useState<TokensQuery | null>(null)

  return (
    <div className={pageBox}>
      <InitialCard handleSubmit={handleSubmit} />
      <div>
        {tokens?.tokens.nodes.map((t) => {
          return (
            <NFTCard
              image={t.token.image?.url ?? ''}
              name={t.token.name ?? '...'}
            />
          )
        })}
      </div>
    </div>
  )
}
