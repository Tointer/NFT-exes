import InitialCard from 'components/landing/InitialCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
} from 'classnames/tailwind'
import NFTCard from 'components/landing/NFTCard'
import { ZDK, EventsQueryArgs, TokensQueryArgs } from '@zoralabs/zdk'
import {
  EventType,
  EventsQuery,
  TokenSortKey,
  SortDirection,
  MarketCategory,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
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

    const tokenArgs: TokensQueryArgs = {
      where: {
        ownerAddresses: [targetAddress],
        //collectionAddresses: ['0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e'],
      },
      sort: {
        sortKey: TokenSortKey.NativePrice,
        sortDirection: SortDirection.Desc,
        sortAxis: MarketCategory.Offer,
      },
      includeFullDetails: false,
      includeSalesHistory: false,
    }
    const tokenResponse = await zdk.tokens(tokenArgs)

    const eventsArgs: EventsQueryArgs = {
      where: {
        tokens: tokenResponse.tokens.nodes.map((x) => ({
          address: x.token.collectionAddress,
          tokenId: x.token.tokenId,
        })),
      },
      filter: {
        eventTypes: [EventType.TransferEvent],
      },
    }

    const eventsResponse = await zdk.events(eventsArgs)
    const transferEvents: Map<string, any[]> = new Map()
    const events = eventsResponse.events.nodes
    for (let i = 0; i < events.length; i++) {
      const el = events[i]
      if (el.tokenId) {
        const properties = el.properties as any

        if (!transferEvents.has(el.tokenId)) {
          transferEvents.set(el.tokenId, [])
        }
        transferEvents.get(el.tokenId)?.push({
          from: properties.fromAddress,
          to: properties.toAddress,
          time: el.transactionInfo.blockTimestamp,
        })
      }
    }

    let nftData: {
      image: string
      name: string
      exes: Map<string, string>
    }[] = []

    tokenResponse.tokens.nodes.forEach((node) => {
      if (!node.token.image) {
        return
      }
      let image = node.token.image.url ?? ''
      const name = node.token.name ?? '...'

      if (node.token.image.url?.startsWith('ipfs://')) {
        image = 'https://ipfs.io/ipfs/' + image.substring(7)
      }

      const exes: Map<string, string> = new Map()
      const arrayOfTransfers = transferEvents.get(node.token.tokenId)
      if (arrayOfTransfers === undefined) return

      let shouldInclude: boolean = false
      for (let i = 1; i < arrayOfTransfers.length; i++) {
        const days =
          (Date.parse(arrayOfTransfers[i - 1].time) -
            Date.parse(arrayOfTransfers[i].time)) /
          (1000 * 60 * 60 * 24)

        if (days < 1) continue
        const holder = arrayOfTransfers[i].to
        exes.set(holder, Math.floor(days) + 'd')
        shouldInclude = true
      }
      if (shouldInclude) nftData.push({ image, name, exes })
    })

    console.log(nftData)
    setTokens(nftData)
  }

  const [tokens, setTokens] = useState<
    { image: string; name: string; exes: Map<string, string> }[]
  >([])

  return (
    <div className={pageBox}>
      <InitialCard handleSubmit={handleSubmit} />
      <NFTCard
        image={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect width='200' height='200' /></svg>`}
        name={'test'}
        exes={
          new Map([
            ['0xb23C6962c431524c154b3eA088fC3Ca0Dc4b0B94', '2d'],
            ['0x7F08eEF0c62553b6B2ac3124a70AABaf467e6c8c', '100d'],
          ])
        }
      />
      <div>
        {tokens.map((t) => {
          return <NFTCard image={t.image} name={t.name} exes={t.exes} />
        })}
      </div>
    </div>
  )
}
