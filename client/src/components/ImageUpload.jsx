import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { ImagePlus, Trash2 } from 'lucide-react'
import api, { errorMessage } from '../api/client'
import { Spinner } from './ui'

export default function ImageUpload({ value, onChange }) {
  const input = useRef(null)
  const [busy, setBusy] = useState(false)

  const upload = async (file) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return toast.error('Image must be smaller than 5 MB')
    const fd = new FormData()
    fd.append('image', file)
    setBusy(true)
    try {
      const { data } = await api.post('/uploads/image', fd)
      onChange(data.url)
      toast.success('Photo uploaded')
    } catch (e) {
      toast.error(errorMessage(e))
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-36 overflow-hidden rounded-xl border border-dashed border-mist-300 bg-mist-50">
        {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <ImagePlus className="absolute inset-0 m-auto h-7 w-7 text-ink-mute" />}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-white/70">
            <Spinner />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input ref={input} type="file" accept="image/*" className="hidden" onChange={(e) => upload(e.target.files?.[0])} />
        <button type="button" className="btn-outline btn-sm" onClick={() => input.current?.click()} disabled={busy}>
          {value ? 'Replace photo' : 'Upload photo'}
        </button>
        {value && (
          <button type="button" className="btn-ghost btn-sm text-chili-600" onClick={() => onChange('')}>
            <Trash2 className="h-3.5 w-3.5" /> Remove
          </button>
        )}
        <span className="text-xs text-ink-mute">JPG, PNG or WEBP, up to 5 MB</span>
      </div>
    </div>
  )
}
