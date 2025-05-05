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
      <main className="flex-grow container mx-auto px-4 pt-20 pb-24">{children}</main>
      <AppFooter className="flex-shrink-0 mt-auto" />
    </div>
  );
}
