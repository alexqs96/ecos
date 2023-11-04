import toast from "react-hot-toast";

/**
 * Convierte una imagen a base64
 * @param {File} file imagen a ser convertida
 * @returns {string} imagen en base64
 */

async function getImageFile(file) {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Error al leer la imagen"));
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        reject(new Error("Error al cargar la imagen"));
      }
    });
  } catch (error) {
    return "";
  }
}

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function loadTheme() {
  if (
    localStorage.theme === "dark" ||
    (!localStorage.theme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

/**
 * Convierte las imagenes a base64
 * aviso: esta funcion usa react hot toaster
 * @param {File} images Archivos del input
 * @param {number} amountLimit Cantidad de imagenes a subir
 * @returns {array} array de imagenes
 */

export async function imagesToBase64(images, amountLimit) {
  const allowedExtensions = ["jpg", "jpeg", "gif", "png", "webp"];

  const imagePromises = Array.from(images)
    .slice(0, amountLimit || 1)
    .map(async (file) => {
      try {
        const extension = file.name.split(".").pop().toLowerCase();
        if (allowedExtensions.includes(extension)) {
          return await getImageFile(file);
        } else {
          console.warn(
            `La imagen no tiene una extensión permitida: ${file.name}`,
          );
          return null;
        }
      } catch (error) {
        console.warn(`Error al cargar la imagen: ${error.message}`);
        return null;
      }
    });

  if (Array.from(images).length > amountLimit) {
    toast.error("Solo se subiran las 5 primeras imagenes.");
  }

  const imageResults = await Promise.allSettled(imagePromises);

  const previewImages = imageResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .filter((image) => image !== null);

  if (!amountLimit) {
    return previewImages[0]
  }

  return previewImages;
}

/**
 * Cambia el tamaño del input a medida que se incrementa el contenido del input, tipo X
 * @param {HTMLInputElement} e
 * @param {number} wordLengthStarter 
 * @param {number} maxHeight
 */

export function handleResizeInput(e, wordLengthStarter, maxHeight) {
  if (e.target.value.length < 30) {
    e.target.style.height = "auto";
  } else if (
    e.target.scrollHeight > wordLengthStarter &&
    e.target.scrollHeight <= maxHeight
  ) {
    e.target.style.height = e.target.scrollHeight + "px";
  }

  return null;
}

export function formatDate(value) {
  const dateValue = new Date(value);
  const currentDate = new Date();

  const difference = currentDate - dateValue;

  if (difference < 1000) {
      return "Hace menos de un segundo";
  } else if (difference < 60000) {
      const seconds = Math.floor(difference / 1000);
      return `Hace ${seconds} segundo(s)`;
  } else if (difference < 3600000) {
      const minutes = Math.floor(difference / 60000);
      return `Hace ${minutes} minuto(s)`;
  } else if (dateValue.toDateString() === currentDate.toDateString()) {
      const hours = dateValue.getHours();
      const minutes = dateValue.getMinutes();
      const seconds = dateValue.getSeconds();
      return `Hoy a las ${hours}:${minutes}:${seconds}`;
  } else {
      return dateValue.toDateString();
  }
}