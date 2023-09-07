import contract from '@/lib/contract'
import { useSigner } from '@usedapp/core'
import { useState, useEffect } from 'react'

type ContractFunctionName = keyof (typeof contract)['functions']

type T<fn extends ContractFunctionName> = Awaited<ReturnType<(typeof contract)['functions'][fn]>>

interface Params<fn extends ContractFunctionName> {
  functionName: fn
  args: Parameters<(typeof contract)['functions'][fn]>
}

function useReadContract<fn extends ContractFunctionName>({ functionName, args }: Params<fn>) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<T<fn>>(undefined as T<fn>)

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
