import React from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, Heart, Download } from "react-feather";
import { Image as FeatherImage } from "react-feather";

const breakpointColumnsObj = {
  default: 3,
  860: 2,
  480: 1,
};

type Props = {
  users: object[];
};

export default function UsersGallery({ users }: Props) {
  return (
    <div className="w-full">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {users.map((user, index) => {
          return <User user={user} key={index} />;
        })}
      </Masonry>
    </div>
  );
}

type UserProps = {
  user: object;
};

function User({ user }: UserProps) {
  const {name, profile_image, username, followed_by_user, photos} = user;
  console.log("user =", user)

  return (
    <div className="">
      <div className="relative h-[400px] flex flex-col justify-center items-center bg-rose-50 rounded-xl overflow-hidden">
        <div className="relative h-[50%] grow w-full bg-rose-500">
          <Image
            src={photos[0]?.urls.small}
            alt="image"
            className="object-cover"
            fill
          />
        </div>

        <div className="absolute rounded-full p-1 bg-white">
          <Image
            src={profile_image.medium}
            alt=""
            height={80}
            width={80}
            className="rounded-full"
          />
        </div>

        <div className="h-[50%] w-full flex flex-col justify-end p-6 gap-5 items-center bg-rose-500">
          <h2 className="text-center font-semibold text-2xl text-white"> {name} </h2>
          <button className="font-semibold text-rose-500 hover:text-black bg-white px-5 py-3 rounded leading-0">
            {followed_by_user ? 'Following' : 'Follow' }
          </button>
        </div>
      </div>
    </div>
  );
}


