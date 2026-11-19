import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LocalizedString } from '@/types/locale';

type Announcement = {
  enabled?: boolean;
  message?: Partial<LocalizedString>;
  linkText?: Partial<LocalizedString>;
  linkUrl?: string;
  startDate?: string;
  endDate?: string;
};

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [now, setNow] = useState(0);
  const { locale } = useRouter();
  useEffect(() => {
    const controller = new AbortController();
    const refresh = async () => {
      try {
        const response = await fetch('/api/announcement', {
          signal: controller.signal,
          cache: 'no-store',
        });
        if (response.ok) setAnnouncement(await response.json());
      } catch {
        /* Keep the optional banner hidden on initial network failure. */
      }
    };
    void refresh();
    const polling = window.setInterval(() => void refresh(), 60000);
    const clock = window.setInterval(() => setNow(Date.now()), 1000);
    setNow(Date.now());
    return () => {
      controller.abort();
      clearInterval(polling);
      clearInterval(clock);
    };
  }, []);
  const language = locale === 'bg' ? 'bg' : 'en';
  const message = announcement?.message?.[language]?.trim();
  if (!announcement?.enabled || !message || !now) return null;
  const start = announcement.startDate ? Date.parse(announcement.startDate) : -Infinity;
  const end = announcement.endDate ? Date.parse(announcement.endDate) : Infinity;
  if (Number.isNaN(start) || Number.isNaN(end) || now < start || now >= end) return null;
  const url = announcement.linkUrl?.trim();
  const safeUrl =
    url && (/^https?:\/\//i.test(url) || /^\/(?!\/|\\)/.test(url)) && !/[\\\u0000-\u0020]/.test(url)
      ? url
      : null;
  return (
    <aside className="announcement-bar">
      {message}
      {safeUrl && announcement.linkText?.[language]?.trim() && (
        <a href={safeUrl} className="announcement-link">
          {announcement.linkText[language]}
        </a>
      )}
    </aside>
  );
}
