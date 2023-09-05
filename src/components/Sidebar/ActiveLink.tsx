import React, { cloneElement } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

interface Props extends LinkProps {
  children: React.ReactElement
  href: string
  isDisabled?: boolean
  shouldMatchExactHref?: boolean
}

const ActiveLink = ({ children, isDisabled, shouldMatchExactHref = false, ...rest }: Props) => {
  const asPath = usePathname()

  let isActive = false

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true
  }

  if (
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))
  ) {
    isActive = true
  }

  return cloneElement(children, {
    color: isDisabled ? 'gray.500' : isActive ? 'green.500' : 'gray.800',
    pointerEvents: isDisabled ? 'none' : 'unset',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
  })
}

export default ActiveLink
