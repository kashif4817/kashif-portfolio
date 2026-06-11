'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ProjectDetailGallery({ images, title }) {
  const [idx, setIdx] = useState(0)

  if (!images.length) return null

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-950/60 border border-white/8">
        <Image
          src={images[idx]}
          alt={`${title} — image ${idx + 1}`}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-contain"
          priority
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs font-mono backdrop-blur-sm">
              {idx + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIdx(i)}
              className={`relative shrink-0 h-14 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                i === idx
                  ? 'border-blue-500 opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-80'
              }`}
            >
              <Image src={src} alt={`Thumbnail ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
