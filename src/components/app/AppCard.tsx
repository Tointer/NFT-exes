import { HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'

const initialCardWrapper = space('space-y-4')

export default function () {
  return (
    <Card shadow color="accent" onlyWrap nospace>
      <div className={initialCardWrapper}>
        <HeaderText extraLeading>
          “First, solve the problem. Then, write the code.” – John Johnson
        </HeaderText>
      </div>
    </Card>
  )
}
