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

function UsersGallery({ users }: Props) {
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
  user: object[];
};

function User({ user }: UserProps) {
  return (
    <div className="">
      <div className="relative h-[400px] flex flex-col justify-center items-center bg-rose-50 rounded-xl overflow-hidden">
        <div className="relative h-[50%] grow w-full bg-rose-500">
          <Image
            src={
              "https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt="image"
            className="object-cover"
            fill
          />
        </div>

        <div className="absolute rounded-full p-1 bg-white">
          <Image
            src="https://images.unsplash.com/profile-fb-1562634662-fe94daebc5c0.jpg?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff"
            alt=""
            height={80}
            width={80}
            className="rounded-full"
          />
        </div>

        <div className="h-[50%] w-full flex flex-col justify-end p-6 gap-5 items-center bg-rose-500">
          <h2 className="text-center font-semibold text-2xl text-white"> Aman Ghanghoriya </h2>
          <button className="font-semibold text-rose-500 hover:text-black bg-white px-5 py-3 rounded leading-0">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}


