import React from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import Link from "next/link";
import { Image as FeatherImage } from "react-feather";
import { Basic as CollectionBasic } from "unsplash-js/dist/methods/collections/types";

type Props = {
  collections: CollectionBasic[];
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
  collection: CollectionBasic;
};

function Collection({ collection }: CollectionProps) {
  const { id, title, total_photos, preview_photos, user } = collection;

  return (
    <div className="group">
      {/* grid */}
      <Link href={`/collections/${id}`}>
        <div className="w-full aspect-square grid grid-cols-2 grid-rows-2 gap-2 rounded-2xl overflow-hidden transition-all hover:brightness-75">
          <div className="relative col-start-1 col-end-2 row-span-2 bg-red-500">
            <Image
              src={preview_photos ? preview_photos[0].urls.regular : ""}
              fill={true}
              alt="image"
              className="object-cover object-center bg-white"
              style={{ backgroundColor: "white" }}
            />
          </div>
          <div className="relative col-start-2 col-end-3 row-span-1 bg-red-500">
            <Image
              src={preview_photos ? preview_photos[1].urls.regular : ""}
              fill={true}
              alt="image"
              className="object-cover object-center"
            />
          </div>
          <div className="relative col-start-2 col-end-3 row-span-1 bg-red-500">
            <Image
              src={preview_photos ? preview_photos[2].urls.regular : ""}
              fill={true}
              alt="image"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Link>
      {/* info */}
      <div className="flex items-start py-4">
        <div className="flex flex-col grow">
          <h3 className="truncate max-w-[300px] font-semibold text-xl text-slate-700">
            <Link href={`/collections/${id}`}> {title} </Link>
          </h3>
          <div className="text-sm mt-2 text-slate-500">
            Curated by{" "}
            <Link href={`/@${user.username}`} className="hover:underline">
              {user.name}
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-1">
            <FeatherImage size={20} stroke="gray" />
          </span>
          <span className="text-lg font-medium text-slate-500 leading-none"> {total_photos} </span>
        </div>
      </div>
    </div>
  );
}
