'use client'

import {
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import ConnectButton from '@/components/ConnectButton'
import { ChangeEvent, useCallback, useState } from 'react'
import { useWeb3 } from '@/contexts/Web3Context'
import { TransactionState } from '@usedapp/core'

export default function Home() {
  const { userRegistration } = useWeb3()
  const {
    send,
    state: { status },
  } = userRegistration

  const [input, setInput] = useState('')

  const loadingStates: TransactionState[] = ['Mining', 'PendingSignature']
  const isLoadingTransaction = loadingStates.includes(status)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)
  const handleUserRegister = () => send({ driverLicenseCode: input })

  return (
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      direction="column"
      justify="flex-start"
      align="center"
      gap="4"
    >
      <ConnectButton />
      <Divider />
      <Flex direction="column" gap="4" minW="120px">
        <FormControl>
          <FormLabel>User Registration</FormLabel>
          <Input type="text" value={input} onChange={handleInputChange} />
        </FormControl>
        <Button colorScheme="green" onClick={handleUserRegister} isLoading={isLoadingTransaction}>
          Send
        </Button>
        <Text>{status}</Text>
      </Flex>
    </Flex>
  )
}
