import { AccentText, BodyText, HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'

const initialCardWrapper = space('space-y-4')

export default function () {
  return (
    <Card shadow color="accent" onlyWrap nospace>
      <div className={initialCardWrapper}>
        <HeaderText extraLeading>Start your next web3 project</HeaderText>
        <BodyText>
          <AccentText color="text-accent">DappTemplate:</AccentText>
          <ul class="space-y-1 mt-4">
            <li> - State management with valtio</li>
            <li> - Preact under the hood</li>
            <li> - Vite - lightning fast</li>
            <li> - Full TypeScript support</li>
            <li> - prettier & eslint configured</li>
            <li> - and more...</li>
          </ul>
        </BodyText>
        <GetStartedButton />
      </div>
    </Card>
  )
}
