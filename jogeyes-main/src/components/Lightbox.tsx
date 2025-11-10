"use client"

import * as React from 'react'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import MotionWrapper from './MotionWrapper'
import ImageWithPlaceholder from './ImageWithPlaceholder'

export default function Lightbox({ items, index = 0, onClose }: { items: { src: string; alt?: string; caption?: string }[]; index?: number; onClose: () => void }) {
  const [i, setI] = React.useState(index)

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
  if (e.key === 'ArrowLeft') setI((s: number) => (s - 1 + items.length) % items.length)
  if (e.key === 'ArrowRight') setI((s: number) => (s + 1) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [items.length, onClose])

  if (!items || items.length === 0) return null

  const current = items[i]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <MotionWrapper>
        <div className="relative max-w-5xl w-full">
          <button aria-label="Close" onClick={onClose} className="absolute right-2 top-2 p-2 rounded-md bg-white/10">
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-4">
            <button aria-label="Previous" onClick={() => setI((s: number) => (s - 1 + items.length) % items.length)} className="p-2 rounded-md bg-white/5">
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex-1 bg-black rounded-md overflow-hidden">
              <ImageWithPlaceholder src={current.src} alt={current.alt || ''} className="w-full h-[60vh] object-contain bg-black" />
              {current.caption && <div className="p-3 text-sm text-muted-foreground bg-card/80">{current.caption}</div>}
            </div>

            <button aria-label="Next" onClick={() => setI((s: number) => (s + 1) % items.length)} className="p-2 rounded-md bg-white/5">
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </MotionWrapper>
    </div>
  )
}
