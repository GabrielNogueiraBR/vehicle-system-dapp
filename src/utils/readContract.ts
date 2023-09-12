import contract from '@/lib/contract'
import { useSigner } from '@usedapp/core'

type ContractFunctionName = keyof (typeof contract)['functions']
type T<fn extends ContractFunctionName> = Awaited<ReturnType<(typeof contract)[fn]>>

interface Params<fn extends ContractFunctionName> {
  signer: ReturnType<typeof useSigner>
  functionName: fn
  args: Parameters<(typeof contract)['functions'][fn]>
}

async function readContract<fn extends ContractFunctionName>({
  signer,
  functionName,
  args,
}: Params<fn>) {
  try {
    if (!signer || !contract) throw new Error('Signer and Contract error')

    const tx = (contract.connect(signer)[functionName] as any)(...args) as Promise<T<fn>>
    const value = await tx

    return value
  } catch (e) {
    console.error(e)
    return null
  }
}

export default readContract
