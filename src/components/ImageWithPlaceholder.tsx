"use client"

import Image from "next/image";
import * as React from "react";

// simple client-side cache for the LQIP map fetched from /lqip.json
let _lqipCache: Record<string, string> | null = null;

async function loadLqip() {
  if (_lqipCache) return _lqipCache;
  try {
    const res = await fetch('/lqip.json');
    if (!res.ok) return (_lqipCache = {});
    const json = await res.json();
    _lqipCache = json;
    return json;
  } catch (e) {
    _lqipCache = {};
    return _lqipCache;
  }
}

function lowRes(src: string) {
  try {
    // If Unsplash-like URL, append small size params
    if (src.includes("images.unsplash.com")) {
      return src.replace(/(\?[^#]*)?$/, "&w=60&h=40&fit=crop");
    }
    return src;
  } catch (e) {
    return src;
  }
}

export default function ImageWithPlaceholder({ src, alt, className, sizes }: { src: string; alt?: string; className?: string; sizes?: string }) {
  const [loaded, setLoaded] = React.useState(false);
  const [lqip, setLqip] = React.useState<string | null>(null);
  const low = lowRes(src);

  React.useEffect(() => {
    let mounted = true;
    loadLqip().then((map) => {
      if (!mounted) return;
      if (map && map[src]) setLqip(map[src]);
    });
    return () => {
      mounted = false;
    };
  }, [src]);

  const placeholderProps = lqip ? { placeholder: 'blur' as const, blurDataURL: lqip } : {};

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <Image
        src={low}
        alt={alt || ""}
        fill
        style={{ objectFit: 'cover', filter: loaded ? 'blur(0px)' : 'blur(6px)', transition: 'filter 300ms ease' }}
        sizes={sizes}
        onLoadingComplete={() => setLoaded(true)}
        {...placeholderProps}
      />
      <Image
        src={src}
        alt={alt || ""}
        fill
        style={{ objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 250ms ease' }}
        sizes={sizes}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
