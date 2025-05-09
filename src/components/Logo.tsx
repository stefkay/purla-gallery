import Image from 'next/image';
import useTheme from '@/hooks/useTheme';

export default function Logo() {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === 'light' ? '/purla_logo.svg' : '/purla_logo_white.svg'}
      alt="Purla"
      width={60}
      height={60}
    />
  );
}
