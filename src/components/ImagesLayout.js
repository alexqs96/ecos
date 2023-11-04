import { useState } from "react";
import ImageModal from "./ImageModal";
import Image from "next/image";

export default function ImagesLayout({ images, creator }) {
  const [previewImagePost, setPreviewImagePost] = useState(null);
  const amount = images?.length || 0;

  if (!images || !creator) {
    return null;
  }

  return (
    <>
      <ImageModal image={previewImagePost} close={setPreviewImagePost} />
      {amount === 2 ? (
        <div className="flex h-[356px] overflow-hidden rounded-xl">
          <Image
            onClick={() => setPreviewImagePost(images[0])}
            className="h-full w-[50%] object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
            src={images[0]}
            width={128.1}
            height={128.1}
            alt={"Imagen 1 del post de @" + creator}
            unoptimized
          />
          <Image
            onClick={() => setPreviewImagePost(images[1])}
            className="h-full w-[50%] object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
            src={images[1]}
            width={128.1}
            height={128.1}
            alt={"Imagen 2 del post de @" + creator}
            unoptimized
          />
        </div>
      ) : amount === 3 ? (
        <div className="overflow-hidden rounded-xl">
          <Image
            onClick={() => setPreviewImagePost(images[0])}
            className="w-full h-[228px] object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
            src={images[0]}
            width={128.1}
            height={128.1}
            alt={"Imagen 1 del post de @" + creator}
            unoptimized
          />
          <div className="flex h-[128px]">
            <Image
              onClick={() => setPreviewImagePost(images[1])}
              className="w-[50%] h-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[1]}
              width={128.1}
              height={128.1}
              alt={"Imagen 2 del post de @" + creator}
              unoptimized
            />
            <Image
              onClick={() => setPreviewImagePost(images[2])}
              className="w-[50%] h-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[2]}
              width={128.1}
              height={128.1}
              alt={"Imagen 3 del post de @" + creator}
              unoptimized
            />
          </div>
        </div>
      ) : amount === 4 ? (
        <div className="flex h-[356px] overflow-hidden rounded-xl">
          <Image
            onClick={() => setPreviewImagePost(images[0])}
            className="w-full h-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
            src={images[0]}
            width={128.1}
            height={128.1}
            alt={"Imagen 1 del post de @" + creator}
            unoptimized
          />
          <div className="h-full w-[70%] overflow-hidden">
            <Image
              onClick={() => setPreviewImagePost(images[1])}
              className="h-[33.4%] w-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[1]}
              width={128.1}
              height={128.1}
              alt={"Imagen 2 del post de @" + creator}
              unoptimized
            />
            <Image
              onClick={() => setPreviewImagePost(images[2])}
              className="h-[33.4%] w-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[2]}
              width={128.1}
              height={128.1}
              alt={"Imagen 3 del post de @" + creator}
              unoptimized
            />
            <Image
              onClick={() => setPreviewImagePost(images[3])}
              className="h-[33.4%] w-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[3]}
              width={128.1}
              height={128.1}
              alt={"Imagen 4 del post de @" + creator}
              unoptimized
            />
          </div>
        </div>
      ) : amount === 5 ? (
        <div className="overflow-hidden rounded-xl">
          <div className="flex h-[228px]">
            <Image
              onClick={() => setPreviewImagePost(images[0])}
              className="h-full w-[50%] object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[0]}
              width={128.1}
              height={128.1}
              alt={"Imagen 1 del post de @" + creator}
              unoptimized
            />
            <Image
              onClick={() => setPreviewImagePost(images[1])}
              className="h-full w-[50%] object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[1]}
              width={128.1}
              height={128.1}
              alt={"Imagen 2 del post de @" + creator}
              unoptimized
            />
          </div>
          <div className="flex h-[128px]">
            <Image
              onClick={() => setPreviewImagePost(images[2])}
              className="w-[33.4%] h-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[2]}
              width={128.1}
              height={128.1}
              alt={"Imagen 3 del post de @" + creator}
              unoptimized
            />
            <Image
              onClick={() => setPreviewImagePost(images[3])}
              className="w-[33.4%] h-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[3]}
              width={128.1}
              height={128.1}
              alt={"Imagen 4 del post de @" + creator}
              unoptimized
            />
            <Image
              onClick={() => setPreviewImagePost(images[4])}
              className="w-[33.4%] h-full object-cover cursor-pointer transition-[filter] duration-200 brightness-90 hover:brightness-100"
              src={images[4]}
              width={128.1}
              height={128.1}
              alt={"Imagen 5 del post de @" + creator}
              unoptimized
            />
          </div>
        </div>
      ) : (
        <Image
          onClick={() => setPreviewImagePost(images[0])}
          className="w-full h-[356px] object-cover cursor-pointer rounded-xl transition-[filter] duration-200 brightness-90 hover:brightness-100"
          src={images[0]}
          width={128.1}
          height={128.1}
          alt={"Imagen del post de @" + creator}
          unoptimized
        />
      )}
    </>
  );
}
