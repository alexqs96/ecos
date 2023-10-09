export async function getImageFile (file) {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result);
      };
  
      reader.onerror = () => {
        reject(new Error('Error al leer la imagen'));
      };
  
      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject(new Error('Error al cargar la imagen'));
      }
    }); 
  } catch (error) {
    return ""
  }
}