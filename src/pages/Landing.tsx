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
  async function handleSubmit(targetAddress: string) {
    targetAddress = '0x580D9eB64bE56f7F1d75e5EaA68a2a506a834Fd8' //for test purposes
    const zdk = new ZDK()

    const args = {
      where: {
        ownerAddresses: [targetAddress],
        collectionAddresses: ['0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e'],
      },
      includeFullDetails: true,
      includeSalesHistory: true,
    }
    const response = await zdk.tokens(args)

    const nftData: { image: string; name: string }[] = []
    // response.tokens.nodes[0].sales[0].transactionInfo.
    console.log(response)
    response.tokens.nodes.forEach((node) => {
      console.log(node.sales)
      console.log(node.events)
      if (node.token.image === null || node.token.image === undefined) {
        return
      }
      let image = node.token.image.url ?? ''
      const name = node.token.name ?? '...'

      if (node.token.image.url?.startsWith('ipfs://')) {
        image = 'https://ipfs.io/ipfs/' + image.substring(7)
      }

      nftData.push({ image, name })
    })

    setTokens(nftData)
  }

  const [tokens, setTokens] = useState<{ image: string; name: string }[]>([])

  return (
    <div className={pageBox}>
      <InitialCard handleSubmit={handleSubmit} />
      <NFTCard
        image={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='200' height='200' /></svg>`}
        name={'test'}
      />
      <div>
        {tokens.map((t) => {
          return <NFTCard image={t.image} name={t.name} />
        })}
      </div>
    </div>
  )
}
