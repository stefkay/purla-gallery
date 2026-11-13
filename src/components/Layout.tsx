import { ReactNode } from 'react';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader className="flex-shrink-0" />
      <main id="main-content" tabIndex={-1} className="flex-grow">{children}</main>
      <AppFooter className="flex-shrink-0 mt-auto" />
    </div>
  );
}
