'use client'

import contract from '@/lib/contract'
import { useSigner } from '@usedapp/core'
import { useState, useEffect } from 'react'

type ContractFunctionName = keyof (typeof contract)['functions']

type T<fn extends ContractFunctionName> = Awaited<ReturnType<(typeof contract)[fn]>>

interface Params<fn extends ContractFunctionName> {
  functionName: fn
  args: Parameters<(typeof contract)[fn]>
}

function useReadContract<fn extends ContractFunctionName>({ functionName, args }: Params<fn>) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<T<fn> | undefined>(undefined)

  const signer = useSigner()

  const load = async () => {
    if (!signer || !contract) return

    try {
      setIsLoading(true)

      const tx = (contract.connect(signer)[functionName] as any)(...args) as Promise<T<fn>>
      const value = await tx

      setData(value as T<fn>)
    } catch (e) {
      console.error(e)
      setData(undefined)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [signer, contract])

  return { data, isLoading, load }
}

export default useReadContract
