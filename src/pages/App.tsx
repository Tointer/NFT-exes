import AppCard from 'components/app/AppCard'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
} from 'classnames/tailwind'

const mainBlock = classnames(
  display('flex'),
  flexDirection('flex-col', 'lg:flex-row'),
  alignItems('items-center', 'lg:items-stretch'),
  justifyContent('lg:justify-center')
)

export default function () {
  return (
    <>
      <div className={mainBlock}>
        <AppCard />
      </div>
    </>
  )
}
