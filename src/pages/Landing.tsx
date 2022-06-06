import InitialCard from 'components/landing/InitialCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
} from 'classnames/tailwind'

const pageBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

export default function () {
  return (
    <div className={pageBox}>
      <InitialCard />
    </div>
  )
}
