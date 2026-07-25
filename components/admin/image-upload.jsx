'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Cropper from 'react-easy-crop'
import { ImagePlus, X, Loader2, ZoomIn } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
const MAX_IMAGES = 5

// Aspect presets mirror what the public portfolio card supports:
// 4:3 fills the frame exactly; anything taller pans on hover.
const ASPECTS = [
  { key: 'card', label: 'Card · 16:9', value: 16 / 9, hint: 'Fills the portfolio card exactly — no scrolling.' },
  { key: 'tall', label: 'Full page · 9:16', value: 9 / 16, hint: 'Card shows the top, then auto-scrolls down on hover.' },
  { key: 'free', label: 'Free', value: undefined, hint: 'Any shape. Taller than 4:3 scrolls on hover.' },
]

async function getCroppedFile(src, area, fileName) {
  const img = await new Promise((resolve, reject) => {
    const i = new window.Image()
    i.crossOrigin = 'anonymous'
    i.onload = () => resolve(i)
    i.onerror = () => reject(new Error('Could not read image'))
    i.src = src
  })
  const MAX_W = 1600
  const scale = Math.min(1, MAX_W / area.width)
  const outW = Math.max(1, Math.round(area.width * scale))
  const outH = Math.max(1, Math.round(area.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = outW
  canvas.height = outH
  canvas.getContext('2d').drawImage(img, area.x, area.y, area.width, area.height, 0, 0, outW, outH)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.9))
  if (!blob) throw new Error('Crop failed')
  return new File([blob], fileName.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' })
}

/**
 * Multi-image Cloudinary upload with a crop/zoom step and a live
 * portfolio-card preview. value is string[], onChange receives string[].
 * First image is the cover shown in the portfolio card.
 */
export function ImageUpload({ value = [], onChange }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  // Crop step state
  const [pending, setPending] = useState(null) // { file, url }
  const [aspectKey, setAspectKey] = useState('card')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [areaPixels, setAreaPixels] = useState(null)
  const [cropBusy, setCropBusy] = useState(false)

  const aspect = ASPECTS.find((a) => a.key === aspectKey)

  const upload = (file) => {
    if (!CLOUD || !PRESET) {
      toast.error('Cloudinary not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and _UPLOAD_PRESET.')
      return
    }
    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', PRESET)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`)
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      setUploading(false)
      setProgress(0)
      if (xhr.status >= 200 && xhr.status < 300) {
        const res = JSON.parse(xhr.responseText)
        onChange([...value, res.secure_url])
        toast.success('Image uploaded')
      } else {
        let msg = 'Upload failed'
        try { msg = JSON.parse(xhr.responseText)?.error?.message || msg } catch {}
        toast.error(msg)
      }
    }
    xhr.onerror = () => {
      setUploading(false)
      setProgress(0)
      toast.error('Upload failed — check your network/preset.')
    }

    setUploading(true)
    setProgress(0)
    xhr.send(fd)
  }

  const onPick = (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image is larger than 10 MB.')
      return
    }
    setAspectKey('card')
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setAreaPixels(null)
    setPending({ file, url: URL.createObjectURL(file) })
  }

  const closeCrop = () => {
    if (pending) URL.revokeObjectURL(pending.url)
    setPending(null)
    setCropBusy(false)
  }

  const cropAndUpload = async () => {
    if (!pending || !areaPixels) return
    setCropBusy(true)
    try {
      const file = await getCroppedFile(pending.url, areaPixels, pending.file.name)
      closeCrop()
      upload(file)
    } catch (err) {
      setCropBusy(false)
      toast.error(err.message || 'Crop failed')
    }
  }

  const uploadOriginal = () => {
    if (!pending) return
    const { file } = pending
    closeCrop()
    upload(file)
  }

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-3">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPick} />

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.map((url, i) => (
            <div key={url + i} className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted">
              <Image
                src={url}
                alt={`Image ${i + 1}`}
                fill
                sizes="160px"
                className="object-cover object-top"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-md bg-black/60 text-white transition-colors hover:bg-black/80"
                aria-label="Remove image"
              >
                <X className="size-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {value.length < MAX_IMAGES && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted/30 py-4 text-sm text-muted-foreground transition-colors hover:border-ring hover:bg-muted/50',
            uploading && 'pointer-events-none',
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Uploading… {progress}%</span>
            </>
          ) : (
            <>
              <ImagePlus className="size-4" />
              <span>{value.length === 0 ? 'Click to upload image' : 'Add another image'}</span>
              {value.length === 0 && <span className="text-xs">PNG, JPG, WEBP up to 10 MB</span>}
            </>
          )}
        </button>
      )}

      {value.length >= MAX_IMAGES && (
        <p className="text-xs text-muted-foreground">Maximum {MAX_IMAGES} images reached.</p>
      )}

      {/* Live portfolio-card preview of the cover — same CSS as the public site,
          so hovering it reproduces the exact scroll-on-hover behavior. */}
      {value[0] && (
        <div>
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Portfolio preview — hover to test the scroll effect
          </p>
          <div className="group max-w-[300px]">
            <div className="shot-frame relative aspect-video overflow-hidden rounded-md border border-border bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value[0]}
                alt="Cover preview"
                className="shot-img absolute left-0 top-0 h-auto min-h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      )}

      {/* Crop step */}
      <Dialog open={pending !== null} onOpenChange={(o) => !o && closeCrop()}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Frame your image</DialogTitle>
            <DialogDescription>
              Drag to position, zoom to fit. What&apos;s inside the frame is exactly what the portfolio shows.
            </DialogDescription>
          </DialogHeader>

          {pending && (
            <div className="grid gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              {/* Cropper */}
              <div className="relative h-[320px] overflow-hidden rounded-md border border-border bg-black/60 sm:h-[380px]">
                <Cropper
                  image={pending.url}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect.value}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, px) => setAreaPixels(px)}
                />
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-4">
                <div className="space-y-1.5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Shape</p>
                  <div className="flex flex-wrap gap-2">
                    {ASPECTS.map((a) => (
                      <button
                        key={a.key}
                        type="button"
                        onClick={() => setAspectKey(a.key)}
                        className={cn(
                          'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
                          aspectKey === a.key
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border text-muted-foreground hover:border-ring hover:text-foreground',
                        )}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{aspect.hint}</p>
                </div>

                <div className="space-y-1.5">
                  <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <ZoomIn className="size-3.5" /> Zoom
                  </p>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    step={0.05}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-[#d1fa3c]"
                  />
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <Button type="button" onClick={cropAndUpload} disabled={cropBusy || !areaPixels}>
                    {cropBusy && <Loader2 className="size-4 animate-spin" />}
                    Crop &amp; upload
                  </Button>
                  <Button type="button" variant="outline" onClick={uploadOriginal} disabled={cropBusy}>
                    Upload original (no crop)
                  </Button>
                  <Button type="button" variant="ghost" onClick={closeCrop} disabled={cropBusy}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
