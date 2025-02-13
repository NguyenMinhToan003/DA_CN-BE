import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import 'dotenv/config'
export const configCloundinary = () => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })
}
export const uploadMulter = () => {
  const storage = new CloudinaryStorage(
    {
      cloudinary: cloudinary,
      params: { folder: 'DA_CN' }
    }
  )
  const upload = multer({
    storage: storage
  })
  return upload
}
