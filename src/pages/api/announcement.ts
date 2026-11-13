import type {NextApiRequest, NextApiResponse} from 'next';
import {sanityClient} from '@/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  res.setHeader('Cache-Control', 'no-store');
  try {
    const announcement = await sanityClient.withConfig({useCdn: false}).fetch(
      '*[_type == "siteSettings" && _id == "siteSettings"][0].announcement',
    );
    return res.status(200).json(announcement || null);
  } catch {
    return res.status(503).json(null);
  }
}
