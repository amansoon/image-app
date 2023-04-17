import React, { useEffect, useState, useMemo } from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import PageNotFound from "./PageNotFound";
import Tabs from "./Tabs";
import Image from "next/image";
import { unsplash } from "@/config";
import Link from "next/link";
import { Award, Globe, Instagram, MapPin, Twitter } from "react-feather";
import TabList from "./TabList";
import Tab from "./Tab";
import { Full as UserFull } from "unsplash-js/dist/methods/users/types";

type Props = {
  children: React.ReactNode;
};

const tabs = [
  {
    id: 1,
    text: "photos",
    url: "",
    count: 0,
  },
  {
    id: 2,
    text: "likes",
    url: "/likes",
    count: 0,
  },
  {
    id: 3,
    text: "collections",
    url: "/collections",
    count: 0,
  },
  {
    id: 4,
    text: "statistics",
    url: "/stats",
    count: null,
  },
];

function UserLayout({ children }: Props) {
  const [user, setUser] = useState<UserFull>();
  const [isUserLoading, setUserLoading] = useState(true);
  const router = useRouter();
  const username = useMemo(() => {
    const uname = router.query.username as string;
    if (uname?.startsWith("@")) {
      return uname.substring(1);
    }
    return uname;
  }, [router.query.username]);

  useEffect(() => {
    console.log("Username changed");
    if (username) {
      fetchUser();
    }
  }, [username]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const fetchUser = async () => {
    try {
      setUserLoading(true);
      const result = await unsplash.users.get({ username });
      if (result.type === "success") {
        setUser(result.response);
        setUserLoading(false);
      } else {
        setUserLoading(false);
        setUser(undefined);
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  if (isUserLoading) {
    return <div> User Loading....</div>
  } 
  else if(user === undefined) {
    return <PageNotFound />
  }
  else {
    return (
      <>
        <UserDetail user={user} />
        {children}
      </>
    );
  }
}


type UserDetailProps = {
  user: UserFull;
}

const UserDetail = ({ user }: UserDetailProps) => {
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

  const tabs = [
    {
      id: 1,
      text: "photos",
      url: `/@${username}`,
      count: total_photos,
    },
    {
      id: 2,
      text: "likes",
      url: `/@${username}/likes`,
      count: total_likes,
    },
    {
      id: 3,
      text: "collections",
      url: `/@${username}/collections`,
      count: total_likes,
    },
    {
      id: 4,
      text: "statistics",
      url: `/@${username}/stats`,
      count: null,
    },
  ];

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

        {bio && (
          <div className="max-w-[700px] w-full mt-6">
            <p className="whitespace-pre-line text-slate-500 leading-normal">{bio}</p>
          </div>
        )}

        {location && (
          <div className="flex items-center gap-2 mt-4 text-slate-500">
            <MapPin size={16} strokeWidth={1.5} /> {location}
          </div>
        )}

        <div className="flex items-center gap-7 mt-2 text-slate-500 py-3 leading-none">
          {social.instagram_username && (
            <a href={`https://instagram.com/${social.instagram_username}`} target="_blank" className="flex gap-2">
              <Instagram size={16} strokeWidth={1.5} /> <span> Instagram </span>
            </a>
          )}

          {social.twitter_username && (
            <a href={`https://twitter.com/${social.twitter_username}`} target="_blank" className="flex gap-2">
              <Twitter size={16} strokeWidth={1.5} /> <span> Twitter </span>
            </a>
          )}

          {social.portfolio_url && (
            <a href={`${social.portfolio_url}`} target="_blank" className="flex gap-2">
              <Globe size={16} strokeWidth={1.5} /> <span> Portfolio </span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-7 mt-2 text-slate-500 py-3 leading-none"></div>
      </div>
      <Tabs query="" tabs={tabs} />
    </div>
  );
};

export default UserLayout;
