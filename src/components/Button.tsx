import {
  alignItems,
  backgroundClip,
  backgroundColor,
  backgroundImage,
  borderRadius,
  boxShadow,
  boxShadowColor,
  brightness,
  classnames,
  cursor,
  display,
  flexDirection,
  fontFamily,
  fontSize,
  fontWeight,
  gradientColorStops,
  opacity,
  outlineStyle,
  padding,
  space,
  textColor,
  transitionDuration,
  transitionProperty,
  transitionTimingFunction,
  width,
} from 'classnames/tailwind'
import Loading from 'icons/Loading'
import React from 'react'

const commonClasses = (loading?: boolean, disabled?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    alignItems('items-center'),
    fontWeight('font-bold'),
    fontFamily('font-primary'),
    transitionProperty('transition-all'),
    transitionTimingFunction('ease-in-out'),
    transitionDuration('duration-100'),
    cursor(loading || disabled ? 'cursor-not-allowed' : undefined),
    outlineStyle('focus:outline-none'),
    opacity(loading || disabled ? 'opacity-50' : undefined),
    boxShadow('shadow-2xl', 'hover:shadow-lg', 'active:shadow-md'),
    width('w-fit'),
    space('space-x-2')
  )

const button = ({
  primary,
  loading,
  disabled,
  small,
  fontSmall,
}: ButtonProps) =>
  classnames(
    commonClasses(loading, disabled),
    colorClasses({ primary, loading, disabled, small, fontSmall })
  )

const colorClasses = ({
  primary,
  loading,
  disabled,
  small,
  fontSmall,
}: ButtonProps) =>
  classnames(
    primary
      ? classnames(
          textColor('text-primary-dark'),
          fontSize(small ? 'text-sm' : 'text-lg'),
          padding(small ? 'py-2' : 'py-4', small ? 'px-4' : 'px-6'),
          borderRadius('rounded-full'),
          backgroundColor('bg-tertiary'),
          boxShadowColor(
            'shadow-tertiary',
            'hover:shadow-tertiary',
            'active:shadow-tertiary'
          ),
          boxShadow('shadow-button'),
          brightness(
            loading || disabled ? undefined : 'hover:brightness-75',
            loading || disabled ? undefined : 'active:brightness-50'
          )
        )
      : classnames(
          textColor(
            'text-transparent',
            loading || disabled ? undefined : 'active:text-accent'
          ),
          backgroundClip('bg-clip-text'),
          gradientColorStops('from-secondary', 'to-accent'),
          fontSize(fontSmall ? 'text-sm' : undefined)
        )
  )

interface ButtonProps {
  primary?: boolean
  disabled?: boolean
  loading?: boolean
  small?: boolean
  fontSmall?: boolean
}

export default function ({
  small,
  primary,
  loading,
  disabled,
  children,
  fontSmall,
  ...rest
}: Omit<React.HTMLAttributes<HTMLButtonElement>, 'loading'> & ButtonProps) {
  return (
    <button
      className={button({ primary, loading, disabled, small, fontSmall })}
      disabled={loading || disabled}
      {...rest}
    >
      {loading && <Loading small={small} />}
      {typeof children === 'string' ? <span>{children}</span> : children}
    </button>
  )
}
