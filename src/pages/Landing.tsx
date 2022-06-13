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
  TokensQuery,
} from '@zoralabs/zdk/dist/queries/queries-sdk'
import { useState, useEffect } from 'react'
import apesNFTs from './boredApe.json'
import punksNFTs from './punks.json'
import famousAddresses from './addresses.json'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

export default function () {
  async function handleSubmit(targetAddress: string) {
    //targetAddress = '0x580D9eB64bE56f7F1d75e5EaA68a2a506a834Fd8' //for test purposes
    const zdk = new ZDK()

    const tokenArgs: TokensQueryArgs = {
      where: {
        ownerAddresses: [targetAddress],
        //collectionAddresses: ['0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e'],
      },
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

  const [specialAddresses, setSpecialAddresses] = useState<{
    famous: Set<string>
    nftHolders: Set<string>
  }>()

  useEffect(() => {
    const nftHolders: Set<string> = new Set()
    for (let i = 0; i < apesNFTs.length; i++) {
      nftHolders.add(apesNFTs[i].HolderAddress)
    }
    for (let i = 0; i < punksNFTs.length; i++) {
      nftHolders.add(punksNFTs[i].HolderAddress)
    }

    const famous: Set<string> = new Set()
    for (let i = 0; i < famousAddresses.populars.length; i++) {
      famous.add(famousAddresses.populars[i].address)
    }

    setSpecialAddresses({ famous, nftHolders })
  }, [])

  function getAddressColor(address: string) {
    if (specialAddresses?.famous.has(address)) {
      return 'text-lime-500'
    }
    if (specialAddresses?.nftHolders.has(address)) {
      return 'text-amber-500'
    }
    return ''
  }

  function createTestCard() {
    return (
      <NFTCard
        image={`https://www.protocol.com/media-library/zora-logo-on-a-planet.png?id=29764762&width=1245&quality=85&coordinates=0%2C0%2C0%2C0&height=700`}
        name={'Example item'}
        exes={
          new Map([
            ['0xb23C6962c431524c154b3eA088fC3Ca0Dc4b0B94', 'this is me!'],
            ['0xf896527c49b44aab3cf22ae356fa3af8e331f280', 'punk/BAYC holder'],
            ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'famous persona'],
          ])
        }
        colorFunction={getAddressColor}
      />
    )
  }

  return (
    <div className={pageBox}>
      <InitialCard handleSubmit={handleSubmit} />
      <div className="grid grid-cols-4 items-start justify-items-center w-full gap-y-10 mt-10">
        <div className="flex-col space-y-10">
          {tokens.map((t, i) => {
            if (i % 4 == 0)
              return (
                <NFTCard
                  image={t.image}
                  name={t.name}
                  exes={t.exes}
                  colorFunction={getAddressColor}
                />
              )
          })}
          {createTestCard()}
        </div>
        <div className="flex-col space-y-10">
          {tokens.map((t, i) => {
            if (i % 4 == 1)
              return (
                <NFTCard
                  image={t.image}
                  name={t.name}
                  exes={t.exes}
                  colorFunction={getAddressColor}
                />
              )
          })}
        </div>
        <div className="flex-col space-y-10">
          {tokens.map((t, i) => {
            if (i % 4 == 2)
              return (
                <NFTCard
                  image={t.image}
                  name={t.name}
                  exes={t.exes}
                  colorFunction={getAddressColor}
                />
              )
          })}
        </div>
        <div className="flex-col space-y-10">
          {tokens.map((t, i) => {
            if (i % 4 == 3)
              return (
                <NFTCard
                  image={t.image}
                  name={t.name}
                  exes={t.exes}
                  colorFunction={getAddressColor}
                />
              )
          })}
        </div>
      </div>
    </div>
  )
}
