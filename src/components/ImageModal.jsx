import Image from "next/image";

export default function ImageModal({ image, close }) {
  if (!image) {
    return null;
  }

  return (
    <section className="fixed grid place-content-center h-full w-full z-50 bg-black/30 dark:bg-black/80 inset-0">
      <section className="w-full max-w-[80%] max-h-[90dvh] my-auto aspect-square relative mx-auto">
        <button
          type="button"
          onClick={() => close("")}
          className="block danger py-1 px-2.5 rounded-md ml-auto absolute -right-5 -top-10"
          aria-label="Cerrar Modal"
        >
          Cerrar
        </button>
        <Image
          src={image}
          className="mx-auto mt-2 w-full h-full object-contain"
          width={256.1}
          height={256.1}
          alt="Preview Image"
          unoptimized
          priority
        />
      </section>
    </section>
  );
}