import React, { ReactElement, useMemo, useState, useEffect } from "react";
import UserLayout from "@/components/UserLayout";
import type { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import PhotosGallery from "@/components/PhotosGallery";
import { unsplash } from "@/config";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

type Props = {};

const Stats: NextPageWithLayout = () => {
  const router = useRouter();
  const username = useMemo(() => {
    const uname = router.query.username as string;
    if (uname.startsWith("@")) {
      return uname.substring(1);
    } else {
      return uname;
    }
  }, [router.query.username]);

  const [stats, setStats] = useState<object[]>([]);
  const [isStatsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    if (username) {
      fetchPhotos(username);
    }
  }, [username]);

  // fetching photos
  const fetchPhotos = async (newUsername?: string) => {
    if (!isStatsLoading) {
      setStatsLoading(true);
      try {
        const res = await fetch(
          `https://api.unsplash.com/users/${username}/statistics?client_id=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const result = await res.json();
        setStats(result)
        console.log(result);
        setStatsLoading(false);
      } catch (error) {
        setStatsLoading(false);
        console.log(error);
      }
    }
  };

  if(isStatsLoading) {
    return (<div> Loading... </div>)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center rounded-lg bg-gray-50 border mb-12 mt-4">
        <div className="flex flex-col items-center p-6 grow">
          <h3 className="text-xl font-medium text-gray-500 mb-3"> Views </h3>
          <div className="text-4xl font-semibold"> {parseInt(stats.views?.total).toLocaleString()} </div>
        </div>
        <div className="flex flex-col items-center px-4 py-12 grow">
          <h3 className="text-xl font-medium text-gray-500 mb-3"> Downloads </h3>
          <div className="text-4xl font-semibold"> {parseInt(stats.downloads?.total).toLocaleString()} </div>
        </div>
      </div>
      {isStatsLoading && (
        <div>
          <h1 className="text-4xl"> Loading... </h1>
        </div>
      )}
    </div>
  );
};

Stats.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Stats;
