import { Inter } from "next/font/google";
import { createApi } from "unsplash-js";
import Layout from "@/components/Layout";
import Gallery from "@/components/Gallery";
import { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { ChevronDown, Filter, Search } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/context";
import { ActionType } from "@/@types/appglobal";
import Searchbar from "@/components/Searchbar";
import PhotosGallery from "@/components/PhotosGallery";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { state, dispatch } = useAppContext();
  const { feed, isFetchingPhotos, feedPage } = state;

  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_API_KEY as string,
  });

  const perPage = 15;

  useEffect(() => {
    fetchPhotos();
  }, []);

  useBottomScrollListener(() => {
    fetchPhotos();
  });

  const fetchPhotos = () => {
    if (!isFetchingPhotos) {
      dispatch({ type: ActionType.SET_FETCHING_PHOTOS, payload: true });
      unsplash.photos
        .list({
          page: feedPage + 1,
          perPage,
        })
        .then((result) => {
          console.log(result);
          if (result.status === 200 && result.type === "success") {
            const payload = feedPage === 0 ? result.response.results : [...feed, ...result.response.results];
            dispatch({ type: ActionType.SET_FEED, payload: payload });
          } else {
            console.log(result.errors);
          }
        })
        .catch((info) => {
          console.log(info);
        });
    }
  };

  useEffect(() => {
    console.log("Feeds : ", feed);
  }, [feed]);

  const topics = [
    {
      id: 1,
      text: "landscape",
    },
    {
      id: 2,
      text: "blur",
    },
    {
      id: 3,
      text: "forest",
    },
    {
      id: 4,
      text: "spring",
    },
    {
      id: 5,
      text: "grass",
    },
    {
      id: 6,
      text: "summer",
    },
    {
      id: 7,
      text: "beauty",
    },
    {
      id: 8,
      text: "grass",
    },
    {
      id: 9,
      text: "summer",
    },
    {
      id: 10,
      text: "beauty",
    },
  ];

  return (
    <div>
      <Hero />
      <PhotosGallery photos={feed} />
    </div>
  );
}

const Hero = () => {
  return (
    <section className="min-h-[300px] flex items-center justify-center mb-[50px]">
      <div className="max-w-[680px] flex flex-col">
        <h1 className="text-4xl font-bold mb-8">
          The best free stock photos, royalty free images & videos shared by creators.
        </h1>
        <div>
          <Searchbar />
        </div>
      </div>
    </section>
  );
};
