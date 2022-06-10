import { AccentText, BodyText, HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import { useState } from 'react'
import GetStartedButton from 'components/GetStartedButton'

const initialCardWrapper = space('space-y-4')

interface myProps {
  handleSubmit: (address: string) => void
}

export default function ({ handleSubmit }: myProps) {
  const [address, setAddress] = useState('')

  return (
    <Card shadow color="accent" onlyWrap nospace>
      <div className={initialCardWrapper}>
        <HeaderText extraLeading>Connect to see your NFTs exes</HeaderText>
        <BodyText>
          <iframe
            src="https://giphy.com/embed/sM4ALgO3D7F8k"
            frameBorder="10"
            width="100%"
            allowFullScreen
          ></iframe>
        </BodyText>
        <div class="flex items-center justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(address)
            }}
          >
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) =>
                setAddress((e.target! as HTMLInputElement).value)
              }
            />
            <input type="submit" hidden />
          </form>
        </div>
      </div>
    </Card>
  )
}
