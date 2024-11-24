import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
export const configCloundinary = () => {

  // Configuration
  cloudinary.config({
    cloud_name: 'dyn3tnqqt',
    api_key: '939624815372626',
    api_secret: 'Y9qzPbpPuSwar17NxZeo33iloVM'
  })
}
export const uploadMulter = () => {
  const storage = new CloudinaryStorage(
    {
      cloudinary: cloudinary,
      folder: 'DA_CN',
      allowfomat: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
  )
  const upload = multer({
    storage: storage
  })
  return upload
}