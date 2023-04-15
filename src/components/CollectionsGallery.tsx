import React from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import Link from "next/link";
import { Image as FeatherImage } from "react-feather";

type Props = {
  collections: object[];
};

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  480: 1,
};

export default function CollectionGallery({ collections }: Props) {
  return (
    <div className="w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {collections.map((collection, index) => {
          return <Collection collection={collection} key={index} />;
        })}
      </Masonry>
    </div>
  );
}

type CollectionProps = {
  collection: object[];
};

function Collection({ collection }: CollectionProps) {
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
            Curated by{" "}
            <Link href={""} className="hover:underline">
              {" "}
              Aman Ghanghoriya{" "}
            </Link>
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
