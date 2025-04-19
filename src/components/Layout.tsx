import { ReactNode } from 'react'
import AppHeader from '@/components/AppHeader'
import LanguageSwitcher from '@/components/LanguageSwitcher'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppHeader />
      <LanguageSwitcher />

      <main>{children}</main>

      <footer>
        <p>© {new Date().getFullYear()} Purla Gallery</p>
      </footer>
    </>
  )
}
