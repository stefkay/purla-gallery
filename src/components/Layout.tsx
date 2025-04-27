import { ReactNode } from 'react';
import AppHeader from '@/components/AppHeader';
type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>

      <footer>
        <p>© {new Date().getFullYear()} Purla Gallery</p>
      </footer>
    </>
  );
}
