'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
const MAX_IMAGES = 5

/**
 * Multi-image Cloudinary upload. value is string[], onChange receives string[].
 * First image is the cover shown in the portfolio card.
 */
export function ImageUpload({ value = [], onChange }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const upload = (file) => {
    if (!CLOUD || !PRESET) {
      toast.error('Cloudinary not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and _UPLOAD_PRESET.')
      return
    }
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image is larger than 10 MB.')
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
    if (file) upload(file)
    e.target.value = ''
  }

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2">
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
                className="object-cover"
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
                <span className="absolute bottom-1 left-1 rounded px-1.5 py-0.5 text-[10px] font-medium bg-black/50 text-white">
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
    </div>
  )
}
