import { useTranslation } from '@/utils/translation';

export default function Home() {
  const t = useTranslation();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading mb-8">{t.welcomeToPurla}</h1>
    </div>
  );
}
