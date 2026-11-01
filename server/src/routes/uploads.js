import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/auth.js'
import { imageUpload } from '../middleware/upload.js'
import { HttpError } from '../utils/http.js'

const router = Router()

router.post('/image', requireAuth, requireRole('hotel', 'taxi'), imageUpload.single('image'), (req, res) => {
  if (!req.file) throw new HttpError(400, 'Please choose an image')
  res.status(201).json({ url: `/uploads/${req.file.filename}` })
})

export default router
