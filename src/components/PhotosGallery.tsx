import React from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Heart, Download } from "react-feather";
import { Image as FeatherImage } from "react-feather";
import { downloadImage } from "@/utils/download";

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  480: 1,
};

type Props = {
  photos: object[];
};

export default function PhotosGallery({ photos }: Props) {
  return (
    <div className="w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo, index) => {
          return <Photo photo={photo} key={index} />;
        })}
      </Masonry>
    </div>
  );
}

type PhotoProps = {
  photo: object;
};

function Photo({ photo }: PhotoProps) {
  console.log(photo);
  const { id, urls, alt_description, description, width, height, color, liked_by_user, links, user } = photo;

  const handleDownload = (e : Event) => {
    downloadImage(id, urls.full, user.name);
    e.preventDefault();
  };

  return (
    <div className="relative rounded overflow-hidden">
      <Image
        src={urls.small}
        alt={alt_description}
        title={alt_description}
        width={width}
        height={height}
        className={`w-full h-auto rounded`}
        style={{ backgroundColor: color }}
        priority={true}
      />
      <Link href={`/@${user.username}`} title={alt_description}>
        <div className="absolute inset-0 h-full w-full p-4 opacity-0 hover:opacity-100 bg-gradient-to-b from-black/20 via-transparent to-black/20">
          <div className="flex h-full flex-col justify-between">
            {/* ------ */}
            <div className="flex self-end gap-3">
              <button className="p-[10px] rounded-md bg-white/90 hover:bg-white">
                <Bookmark size={20} strokeWidth={1.8} />
              </button>
              <button className="p-[10px] rounded-md bg-white/90 hover:bg-white">
                <Heart size={20} strokeWidth={1.8} />
              </button>
            </div>
            {/* ------- */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-[42px] h-[42px] rounded-full bg-white">
                  <Link href={`/@${user.username}`}>
                    <Image
                      src={user.profile_image.medium}
                      alt={""}
                      height={42}
                      width={42}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </Link>
                </div>
                <div className="flex flex-col justify-between">
                  <Link href={`/@${user.username}`} className="max-w-[200px] text-white font-semibold truncate">
                    {user.name}
                  </Link>
                  {/* <span className="text-white text-xs">
                    {" "}
                    In collaboration with{" "}
                    <Link href={`/@${user.username}`} className="text-slate-100">
                      Braydon Coyer
                    </Link>
                  </span> */}
                </div>
              </div>
              <button className="p-[10px] rounded-md bg-white/90 hover:bg-white" onClick={handleDownload}>
                <Download size={20} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
