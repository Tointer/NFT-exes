import { Suspense } from 'react'
import EnsStore from 'stores/EnsStore'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
import useEnsNameOrAddress from 'hooks/useEnsNameOrAddress'

interface EnsAddressProps {
  address: string
}

function EnsAddressSuspender({
  address,
  truncate,
}: EnsAddressProps & { truncate?: boolean }) {
  const ensNameOrAddress = useEnsNameOrAddress(address)

  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(ensNameOrAddress, 12)
        : ensNameOrAddress}
    </>
  )
}

export default function ({ address }: EnsAddressProps) {
  EnsStore.fetchEnsName(address)

  return (
    <Suspense fallback={<>{truncateMiddleIfNeeded(address, 12)}</>}>
      <EnsAddressSuspender address={address} truncate />
    </Suspense>
  )
}
