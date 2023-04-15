import React, { useEffect, useState, useMemo } from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import PageNotFound from "./PageNotFound";
import Tabs from "./Tabs";
import Image from "next/image";
import { unsplash } from "@/config";
import { Award, Globe, Instagram, MapPin, Twitter } from "react-feather";

type Props = {
  children: React.ReactNode;
};

const users = ["@aman", "@meena", "@guru", "@radha"];

const tabs = [
  {
    id: 1,
    text: "photos",
    url: "/@aman",
  },
  {
    id: 2,
    text: "likes",
    url: "/@aman/likes",
  },
  {
    id: 3,
    text: "collections",
    url: "/@aman/collections",
  },
  {
    id: 4,
    text: "statistics",
    url: "/@aman/stats",
  },
];

function UserLayout({ children }: Props) {
  const [user, setUser] = useState<object | null>(null);
  const router = useRouter();
  const username = router.query.username as string;

  useEffect(() => {
    if (username) {
      fetchUser();
    }
  }, [username]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const fetchUser = async () => {
    try {
      const result = await unsplash.users.get({ username });
      console.log(result);
      if (result.type === "success") {
        setUser(result.response);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <PageNotFound />;
  } else {
    return (
      <div>
        <UserDetail user={user} />
        <Tabs query="" tabs={tabs} />
        {children}
      </div>
    );
  }
}

const UserDetail = ({ user }: { user: object }) => {
  const {
    name,
    bio,
    username,
    profile_image,
    followed_by_user,
    allow_messages,
    badge,
    for_hire,
    followers_count,
    location,
    social,
    tags,
    total_photos,
    total_likes,
    total_collections,
  } = user;

  return (
    <div className="mt-12">
      <div className="flex flex-col items-start">
        <div className="relative">
          <div>
            <Image
              src={profile_image.large}
              alt="Profile-photo"
              height={150}
              width={150}
              className="w-[150px] h-[150px] object-cover rounded-full"
            />
          </div>
          {badge && (
            <div className="absolute bottom-[5%] right-[5%] h-[40px] w-[40px] rounded-full bg-orange-400 border-2 border-white">
              <div className="text-white w-full h-full flex items-center justify-center">
                <Award size={18} />
              </div>
            </div>
          )}
        </div>
        <h1 className="text-6xl text-slate-800 font-medium mt-7"> {name} </h1>
        <div className="flex gap-4 mt-6">
          <button className="font-medium px-4 py-3 rounded text-white bg-[#00cf86]">
            {followed_by_user ? "Following" : "Follow"}
          </button>
          {allow_messages && <button className="font-medium px-4 py-3 rounded text-black border"> Message </button>}
          {for_hire && <button className="font-medium px-4 py-3 rounded text-black border"> Hire </button>}
        </div>
        <div className="max-w-[700px] w-full mt-6">
          <p>{bio}</p>
        </div>
        <div className="flex items-center gap-2 mt-4 text-slate-500">
          <MapPin size={16} strokeWidth={1.5} /> India
        </div>
        <div className="flex gap-6 mt-2 text-slate-500 py-3 leading-none">
          <div className="flex items-center gap-2">
            <Instagram size={16} strokeWidth={1.5} /> <span> Instagram </span> ・
          </div>
          <div className="flex items-center gap-2">
            <Twitter size={16} strokeWidth={1.5} /> <span> Twitter </span> ・
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} strokeWidth={1.5} /> <span> Portfolio </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
