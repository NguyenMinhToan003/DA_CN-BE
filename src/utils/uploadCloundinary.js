import { v2 as cloudinary } from 'cloudinary'
export const uploadImage = async (filePath) => {
  try {
    return await cloudinary.uploader.upload(filePath)
  }
  catch (error) {
    throw error
  }
}