import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { type SiteImage } from '../config/siteImages';
import { useLanguage } from '../i18n/LanguageContext';

export function Photo({
  image,
  className = '',
  priority = false,
  sizes = '(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw',
}: {
  image?: SiteImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { language, t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`photo ${loaded ? 'is-loaded' : ''} ${!image || failed ? 'photo-fallback' : ''} ${className}`}
    >
      {image && !failed ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={image.alt[language]}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{ objectPosition: image.position }}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo-placeholder">
          <UtensilsCrossed size={28} strokeWidth={1} />
          <span>{failed ? t.imageUnavailable : t.photoSoon}</span>
        </div>
      )}
    </div>
  );
}
