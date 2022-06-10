import { AccentText, BodyText, HeaderText } from 'components/Text'
import { space } from 'classnames/tailwind'
import Card from 'components/Card'
import GetStartedButton from 'components/GetStartedButton'

const initialCardWrapper = space('space-y-4')

interface NFTProps {
  image: string
  name: string
}

export default function (props: NFTProps) {
  return (
    <Card shadow color="accent" onlyWrap nospace>
      <div className={initialCardWrapper}>
        <img src={props.image} />
        <HeaderText extraLeading>{props.name}</HeaderText>
      </div>
    </Card>
  )
}
