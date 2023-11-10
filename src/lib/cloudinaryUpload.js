import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function CloudinaryUpload(image){
  try {
    const { secure_url } = await cloudinary.uploader.upload(image)
    console.log("se subio a cloudinary: "+secure_url);
    
    if (secure_url) {
      return secure_url
    } 
  } catch (error) {
    console.log("Hubo un error al subir a cloudinary: "+error);
    return null
  }
}

/**
 * Subir Imagenes a cloudinary
 * 
 * @param {Array} images array de strings con las imagenes en base64
 * @param {boolean} single true si subimos 1 imagen
 * @returns array o string con la/las url de cloudinary
 */

export async function UploadImages(images, single){
  try {
    if (!Array.isArray(images)) {
      images = [images];
    }

    const bucket = [];
    const stringsArray = images.filter(item => typeof item === 'string').slice(0, 5);

    for (const img of stringsArray) {
      const urlImage = await CloudinaryUpload(img);
      bucket.push(urlImage);
    }

    if (single) {
      return bucket[0]
    }

    return bucket;
  } catch (error) {
    console.log("Cloudinary Catch:" + error);
    return [];
  }
}