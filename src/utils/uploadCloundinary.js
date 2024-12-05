import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'


export const uploadImage = async (filePath) => {
  try {
    return await cloudinary.uploader.upload(filePath, {
      folder: 'your_folder', // Lưu trong thư mục cụ thể
      transformation: [{ width: 500, height: 500, crop: 'fill' }] // Thay đổi kích thước hình ảnh
    })
  } catch (error) {
    throw new Error('Cloudinary upload failed: ' + error.message)
  }
}


const storage = multer.memoryStorage()
export const tempUpload = multer({ storage })
