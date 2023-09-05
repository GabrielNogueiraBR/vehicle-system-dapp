import LayoutClientElement from './LayoutClientElement'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return <LayoutClientElement>{children}</LayoutClientElement>
}
