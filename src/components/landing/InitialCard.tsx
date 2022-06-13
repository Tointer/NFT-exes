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
    <div className="bg-scott bg-cover w-full h-96 flex-col items-center justify-center">
      <HeaderText extraLeading>
        Enter any address to see it's NFTs exes
      </HeaderText>
      <div>
        <div class="flex items-center justify-center">
          <form
            className="w-full flex items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(address)
            }}
          >
            <input
              className="text-center text-xl placeholder:text-xl bg-gray-50 border border-gray-300 text-white-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0x..."
              required
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
    </div>
  )
}
