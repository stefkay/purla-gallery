/** Sanity image fields retained by the frontend projections. */
export type SanityImage = {
  _key?: string;
  alt?: string;
  asset: {
    _type?: 'reference';
    _ref: string;
    url?: string;
    metadata?: {
      dimensions?: {width: number; height: number; aspectRatio: number};
    };
  };
  crop?: {top: number; bottom: number; left: number; right: number};
  hotspot?: {x: number; y: number; width: number; height: number};
};
