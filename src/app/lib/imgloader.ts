'use client';

export default function wsrnImgLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: string;
  quality: string;
}) {
  if (src.includes('svg')) {
    return `https://wsrnfm.com${src}`;
  }

  // IIIF spec--swap all but leading slash
  // NOTE: Apple doesn't understand specifications so the standard %2F gets default interpreted as / again
  //       before it hits the service, so we specify $ as the separator in the config. To be fair, this is
  //       a stupid API.
  src = src.replaceAll(/(?!^)\//g, '$');

  return `https://wsrnfm.com/iiif/3${src}/square/^${width},/0/default.jpg`;
}
