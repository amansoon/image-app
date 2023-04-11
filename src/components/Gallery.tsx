import React from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

type Props = {
  photos: object[];
};

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  560: 1,
};

function Gallery({ photos }: Props) {
  return (
    <div className="w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo, index) => (
          <Photo photo={photo} key={index} />
        ))}
      </Masonry>
    </div>
  );
}

type PhotoProps = {
  photo: object;
};

function Photo({ photo }: PhotoProps) {

    console.log(photo)
  return (
    <div className="rounded overflow-hidden">
      <Image
        src={photo.urls.regular}
        alt={photo.alt_description}
        title={photo.alt_description}
        width={photo.width}
        height={photo.height}
        className={`w-full h-auto rounded bg-[${photo.color}]`}
        loading="lazy"
      />
    </div>
  );
}

export default Gallery;
