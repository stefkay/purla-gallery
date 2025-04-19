import { useTranslation } from '@/utils/translation';

export default function Home() {
  const t = useTranslation();
  return <div>{t.welcomeToPurla}</div>;
}
