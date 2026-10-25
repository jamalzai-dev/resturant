import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from 'lucide-react';
import { SITE_IMAGES } from '../config/siteImages';
import { interpolate, useLanguage } from '../i18n/LanguageContext';
import { Dialog } from './Dialog';
import { Photo } from './Photo';

type Filter = 'all' | 'interiors' | 'dishes' | 'juices';
export function Gallery() {
  const { t, language, number } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const photos = SITE_IMAGES.gallery.filter((photo) => filter === 'all' || filter === photo.category);
  const index = photos.findIndex((photo) => photo.id === selected);
  const current = index >= 0 ? photos[index] : null;
  const hasPreviews = SITE_IMAGES.gallery.some((photo) => photo.image.preview);
  const hasRealPhotos = SITE_IMAGES.gallery.some((photo) => !photo.image.preview);
  const move = (offset: number) => setSelected(photos[(index + offset + photos.length) % photos.length].id);
  return (
    <section id="gallery" className="gallery-section section-space container">
      <div className="section-heading heading-split">
        <div>
          <span className="eyebrow">{t.galleryEyebrow}</span>
          <h2>{t.galleryTitle}</h2>
        </div>
        <span className="outlined-label">
          {hasRealPhotos ? t.galleryReal : t.galleryPreview}
          <ArrowUpRight size={14} />
        </span>
      </div>
      {hasPreviews && <p className="gallery-note">{hasRealPhotos ? t.galleryMixedNote : t.galleryNote}</p>}
      <div className="filter-list gallery-filters" role="group" aria-label={t.nav.gallery}>
        {(['all', 'interiors', 'dishes', 'juices'] as Filter[]).map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={filter === value ? 'active' : ''}
          >
            {t.galleryCategories[value]}
          </button>
        ))}
      </div>
      <div className={`gallery-grid ${filter !== 'all' ? 'filtered' : ''}`} key={filter}>
        {photos.map((photo) => (
          <button
            key={photo.id}
            className={`gallery-tile gallery-${photo.id}`}
            onClick={() => setSelected(photo.id)}
            aria-label={`${t.viewImage}: ${photo.image.alt[language]}`}
          >
            <Photo
              image={photo.image}
              sizes={
                photo.id === 'dining' ? '(max-width: 950px) 100vw, 50vw' : '(max-width: 950px) 50vw, 25vw'
              }
            />
            <span className={`gallery-provenance ${photo.image.preview ? '' : 'is-real'}`}>
              {photo.image.preview ? t.galleryPreview : t.galleryReal}
            </span>
            <span className="gallery-tile-label">
              {t.galleryCategories[photo.category as Exclude<Filter, 'all'>]}
              <Expand size={19} />
            </span>
          </button>
        ))}
      </div>
      {current && (
        <Dialog
          titleId="gallery-dialog-title"
          className="lightbox"
          onClose={() => setSelected(null)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              move(language === 'ps' ? -1 : 1);
            }
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              move(language === 'ps' ? 1 : -1);
            }
          }}
        >
          <div className="lightbox-top">
            <span id="gallery-dialog-title">{current.image.preview ? t.galleryPreview : t.galleryReal}</span>
            <span aria-live="polite">
              {interpolate(t.imageCount, { current: number(index + 1), total: number(photos.length) })}
            </span>
          </div>
          <Photo image={current.image} key={current.id} priority sizes="90vw" />
          <div className="lightbox-bottom">
            <button className="icon-button" onClick={() => move(-1)} aria-label={t.previous}>
              <ArrowLeft className="directional" />
            </button>
            <p>{current.image.alt[language]}</p>
            <button className="icon-button" onClick={() => move(1)} aria-label={t.next}>
              <ArrowRight className="directional" />
            </button>
          </div>
        </Dialog>
      )}
    </section>
  );
}
