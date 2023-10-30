import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function CloudinaryUpload(images){
  try {
    const bucket = []

    if (images.length > 0 && images[0]) {
      console.log("Uploading to Cloudinary...");
      
      for (const img of images) {
        const { secure_url } = await cloudinary.uploader.upload(img)
        console.log("cloudinary: "+secure_url);
        
        if (secure_url) {
          bucket.push(secure_url) 
        }
      } 
    }
  
    return bucket 
  } catch (error) {
    console.log("Cloudinary Catch:"+error);
    return []
  }
}