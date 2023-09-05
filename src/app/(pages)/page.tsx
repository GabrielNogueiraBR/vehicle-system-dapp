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
import { ChangeEvent, FormEvent, useState } from 'react'
import { useWeb3 } from '@/contexts/Web3Context'
import { TransactionState } from '@usedapp/core'

export default function Home() {
  const { userRegistration, defineDriverLicenseCode } = useWeb3()

  const [userRegistrationInput, setUserRegistrationInput] = useState('')
  const [cnhDefinitionInput, setCnhDefinitionInput] = useState('')

  const loadingStates: TransactionState[] = ['Mining', 'PendingSignature']

  return (
    <Flex
      w="100%"
      h="100%"
      minH="100vh"
      direction="column"
      justify="flex-start"
      align="center"
      gap="4"
      paddingTop="4"
    >
      <ConnectButton />
      <Divider />
      <Flex direction="column" gap="4" minW="120px">
        <FormControl>
          <FormLabel>User Registration</FormLabel>
          <Input
            type="text"
            value={userRegistrationInput}
            onChange={(e) => setUserRegistrationInput(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="green"
          onClick={() => userRegistration.send({ driverLicenseCode: userRegistrationInput })}
          isLoading={loadingStates.includes(userRegistration.state.status)}
        >
          Send
        </Button>
        <Text>Status: {userRegistration.state.status}</Text>
      </Flex>
      <Divider />
      <Flex direction="column" gap="4" minW="120px">
        <FormControl>
          <FormLabel>CNH User Definition</FormLabel>
          <Input
            type="text"
            value={cnhDefinitionInput}
            onChange={(e) => setCnhDefinitionInput(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="green"
          onClick={() => defineDriverLicenseCode.send({ driverLicenseCode: cnhDefinitionInput })}
          isLoading={loadingStates.includes(defineDriverLicenseCode.state.status)}
        >
          Send
        </Button>
        <Text>Status: {defineDriverLicenseCode.state.status}</Text>
      </Flex>
    </Flex>
  )
}
