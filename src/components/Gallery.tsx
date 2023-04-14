import React from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import Link from "next/link";
import { Bookmark, Heart, Download } from "react-feather";
import { Image as FeatherImage } from "react-feather";

type Props = {
  list: object[];
  category: string;
};

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  480: 1,
};

function Gallery({ list, category }: Props) {
  return (
    <div className="w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {list.map((item, index) => {
          if (category === "photos") {
            return <Photo photo={item} key={index} />;
          } else if (category === "collections") {
            return <Collection key={index} />;
          } else {
            return <User key={index} />;
          }
        })}
      </Masonry>
    </div>
  );
}

type PhotoProps = {
  photo: object;
};

function Photo({ photo }: PhotoProps) {
  return (
    <div className="relative rounded overflow-hidden">
      <Image
        src={photo.urls.small}
        alt={photo.alt_description}
        title={photo.alt_description}
        width={photo.width}
        height={photo.height}
        className={`w-full h-auto rounded`}
        style={{ backgroundColor: photo.color }}
        priority={true}
      />
      <Link href={""}>
        <div className="absolute inset-0 h-full w-full p-4 opacity-0 hover:opacity-100 bg-gradient-to-b from-black/20 via-transparent to-black/20">
          <div className="flex h-full flex-col justify-between">
            {/* ------ */}
            <div className="flex self-end gap-3">
              <button className="p-[10px] rounded-md bg-white">
                <Bookmark size={20} strokeWidth={1.8} />
              </button>
              <button className="p-[10px] rounded-md bg-white">
                <Heart size={20} strokeWidth={1.8} />
              </button>
            </div>
            {/* ------- */}
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-[42px] h-[42px] rounded-full bg-white"> </div>
                <div className="flex flex-col justify-between">
                  <span className="text-white font-semibold"> Braydon Coyar </span>
                  <span className="text-white text-xs">
                    {" "}
                    In collaboration with{" "}
                    <Link href={""} className="text-slate-100">
                      {" "}
                      Braydon Coyer{" "}
                    </Link>{" "}
                  </span>
                </div>
              </div>
              <button className="p-[10px] rounded-md bg-white">
                <Download size={20} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function Collection({}) {
  return (
    <div className="">
      {/* grid */}
      <div className="w-full aspect-square grid grid-cols-2 grid-rows-2 gap-2 rounded-2xl overflow-hidden">
        <div className="relative col-start-1 col-end-2 row-span-2 bg-red-500">
          <Image
            src={
              "https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YW5pbWFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            fill={true}
            alt="image"
            className="object-cover object-center bg-white"
            style={{ backgroundColor: "white" }}
          />
        </div>
        <div className="relative col-start-2 col-end-3 row-span-1 bg-red-500">
          <Image
            src={
              "https://images.unsplash.com/photo-1546182990-dffeafbe841d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YW5pbWFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            fill={true}
            alt="image"
            className="object-cover object-center"
          />
        </div>
        <div className="relative col-start-2 col-end-3 row-span-1 bg-red-500">
          <Image
            src={
              "https://images.unsplash.com/photo-1456926631375-92c8ce872def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuaW1hbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            }
            fill={true}
            alt="image"
            className="object-cover object-center"
          />
        </div>
      </div>
      {/* info */}
      <div className="flex items-start py-4">
        <div className="flex flex-col grow">
          <h3 className="font-semibold text-xl text-slate-700 leading-none"> My First collections </h3>
          <div className="text-sm mt-2 text-slate-500">
            Curated by <Link href={""} className="hover:underline"> Aman Ghanghoriya </Link>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-1">
            <FeatherImage size={20} stroke="gray" />
          </span>
          <span className="text-lg font-medium text-slate-500 leading-none"> 105 </span>
        </div>
      </div>
    </div>
  );
}

function User({}) {
  return (
    <div className="min-h-[300px] rounded-md">
      <div className="p-4"></div>
    </div>
  );
}

export default Gallery;
