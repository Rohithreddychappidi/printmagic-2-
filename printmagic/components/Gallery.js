"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const TILES = [
  {
    src: "/gallery/customization.jpg",
    alt: "Custom printing and engraving in progress at PrintMagic",
    caption: "Made to order, every time",
    big: true,
  },
  {
    src: "/gallery/rakhis.jpg",
    alt: "Customized rakhi designs",
    caption: "Rakhis",
  },
  {
    src: "/gallery/phone-covers.jpg",
    alt: "Customized phone cover designs",
    caption: "Phone covers",
  },
  {
    src: "/gallery/keychains.jpg",
    alt: "Customized keychain designs",
    caption: "Keychains",
  },
  {
    src: "/gallery/laser-items.jpg",
    alt: "Laser-engraved gift designs",
    caption: "Laser items",
  },
];

export default function Gallery() {
  const containerRef = useRef(null);

  useEffect(() => {
    const tiles = containerRef.current?.querySelectorAll(".gallery-tile");
    if (!tiles || tiles.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    tiles.forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto mt-16 max-w-6xl px-3 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            A peek inside
          </h2>
          <p className="mt-1 font-body text-sm text-ink/50">
            A few moods from the workshop floor.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 sm:auto-rows-[180px] lg:auto-rows-[220px]"
      >
        {TILES.map((tile, i) => (
          <div
            key={tile.src}
            style={{ transitionDelay: `${i * 90}ms` }}
            className={`gallery-tile group relative overflow-hidden rounded-2xl shadow-glass ${
              tile.big
                ? "col-span-2 aspect-[16/10] sm:row-span-2 sm:aspect-auto"
                : "aspect-square sm:aspect-auto"
            }`}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="gallery-tile-img object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent" />
            <span className="gallery-tile-caption absolute bottom-3 left-3 font-body text-sm font-semibold text-white sm:text-base">
              {tile.caption}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
