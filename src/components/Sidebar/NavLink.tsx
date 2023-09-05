import { Icon, Text } from '@chakra-ui/react'
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/next-js'

import { ElementType } from 'react'
import ActiveLink from './ActiveLink'

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType
  children: string
  href: string
  isDisabled?: boolean
  shouldMatchExactHref?: boolean
}

export function NavLink({
  icon,
  children,
  href,
  isDisabled = false,
  shouldMatchExactHref,
  ...rest
}: NavLinkProps) {
  return (
    <ActiveLink href={href} isDisabled={isDisabled} shouldMatchExactHref={shouldMatchExactHref}>
      <ChakraLink display="flex" href={href} alignContent="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  )
}
