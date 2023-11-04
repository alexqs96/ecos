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
    return previewImages[0];
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
  const currentDate = new Date();
  const inputDate = new Date(value);

  const currentYear = currentDate.getFullYear();
  const inputYear = inputDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const inputMonth = inputDate.getMonth();
  const currentDay = currentDate.getDate();
  const inputDay = inputDate.getDate();
  const currentHour = currentDate.getHours();
  const inputHour = inputDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const inputMinute = inputDate.getMinutes();

  let longDate = inputDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }) + "hs";

  if (currentYear === inputYear && currentMonth === inputMonth) {
    const dayDifference = currentDay - inputDay;
    if (dayDifference === 1) {
      return {
        short: "hace 1 día",
        long: longDate
      };
    } else if (dayDifference > 1) {
      return {
        short: `hace ${dayDifference} días`,
        long: longDate
      };
    } else if (dayDifference === 0) {
      const hourDifference = currentHour - inputHour;
      if (hourDifference === 1) {
        return {
          short: "hace 1 hora",
          long: longDate
        };
      } else if (hourDifference > 1) {
        return {
          short: `hace ${hourDifference} horas`,
          long: longDate
        };
      } else if (hourDifference === 0) {
        const minuteDifference = currentMinute - inputMinute;
        if (minuteDifference === 1) {
          return {
            short: "hace 1 minuto",
            long: longDate
          };
        } else if (minuteDifference > 1) {
          return {
            short: `hace ${minuteDifference} minutos`,
            long: longDate
          };
        } else {
          return {
            short: "ahora",
            long: longDate
          };
        }
      }
    }
  } else if (currentYear === inputYear) {
    const monthDifference = currentMonth - inputMonth;
    if (monthDifference === 1) {
      if (currentDay <= inputDay) {
        const daysInCurrentMonth = new Date(currentYear, currentMonth, 0).getDate();
        const remainingDays = daysInCurrentMonth - inputDay + currentDay;
        return {
          short: `hace ${remainingDays} días`,
          long: longDate
        };
      } else {
        return {
          short: "hace 1 mes",
          long: longDate
        };
      }
    } else if (monthDifference > 1) {
      return {
        short: `hace ${monthDifference} meses`,
        long: longDate
      };
    }
  }

  return {
    short: currentYear - inputYear === 1 ? "hace 1 año" : `hace ${currentYear - inputYear} años`,
    long: longDate
  };
}
