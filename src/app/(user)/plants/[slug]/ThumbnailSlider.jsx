import { useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";

const ThumbnailSlider = ({images, name}) => {
  const mainRef = useRef(null);

  const handleThumbs = (id) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };

  if(!images){
    return <p>No hay imagenes</p>
  }

  return (
    <div className="flex flex-col gap-5">
      <Splide options={{
          type: "loop",
          perPage: 1,
          perMove: 1,
          gap: "1rem",
          pagination: false,
          height: "27.8125rem",
         }}
        ref={mainRef}
      >
        {images?.map((img, i) => (
          <SplideSlide key={i}>
            <Image
              width={1024}
              height={400}
              className="w-full h-[400px] object-cover"
              src={img}
              alt={"Foto "+(i+1)+" de "+name || "imagen"}
              unoptimized
            />
          </SplideSlide>
        ))}
      </Splide>

      <ul className="flex justify-center items-center list-none gap-3">
        {images?.map((thumbnail, index) => (
          <li key={thumbnail}>
            <button onClick={() => handleThumbs(index)}>
              <Image
                width={256}
                height={256}
                src={thumbnail}
                alt="product thumbnail"
                className="w-[70px] h-[70px] object-cover overflow-hidden list-none cursor-pointer rounded-2xl"
                unoptimized
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThumbnailSlider