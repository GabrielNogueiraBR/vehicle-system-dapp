interface Params {
  params: {
    tokenId: string
  }
}
const Page = ({ params: { tokenId } }: Params) => {
  return <div>Página do TokenId: {tokenId}</div>
}

export default Page
