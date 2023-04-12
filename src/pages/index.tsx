import { Inter } from "next/font/google";
import { createApi } from "unsplash-js";
import Layout from "@/components/Layout";
import Gallery from "@/components/Gallery";
import {  useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { Filter } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/context";
import { ActionType } from "@/@types/appglobal";

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
  }, [])

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
    <Layout>
      <div className="px-[20px] lg:px-[30px]">
        <div className="w-full max-w-[1280px] mx-auto">
          {/* ------- keywords -------- */}
          <div className="w-full overflow-auto">
            <div className="flex gap-2 py-2 mt-4 bg-white">
              {topics.map(({ id, text }) => (
                <Link
                  href={""}
                  className="h-[42px] flex items-center px-4 font-medium leading-none hover:bg-slate-50 border rounded"
                  key={id}
                >
                  <span> {text} </span>
                </Link>
              ))}
            </div>
          </div>

          {/* ------- */}
          <Tabs />

          {/* ------- gallery --------- */}
          <Gallery photos={feed} />
        </div>
      </div>
    </Layout>
  );
}

const Tabs = () => {
  const tabs = [
    {
      id: 1,
      text: "Photos",
    },
    {
      id: 2,
      text: "Collections",
    },
    {
      id: 3,
      text: "Users",
    },
  ];

  const [current, setCurrent] = useState(1);

  return (
    <div className="flex justify-between items-center mb-6 overflow-auto">
      <div className="flex items-center gap-3">
        {tabs.map(({ id, text }) => (
          <button
            key={id}
            className={`h-[48px] flex items-center gap-2  font-medium leading-none rounded-full ${
              current === id ? "bg-black px-5" : "bg-transparent px-2"
            }`}
            onClick={() => setCurrent(id)}
          >
            <span className={`${current === id ? "text-white" : "text-gray-800"}`}> {text} </span>
            <span className="text-sm text-gray-400"> 203K </span>
          </button>
        ))}
      </div>
      <button className={`h-[48px] flex items-center gap-2 px-4 border font-medium leading-none rounded-md`}>
        <Filter size={20} stroke="gray" strokeWidth={1.5} />
        <span className=""> Filters </span>
      </button>
    </div>
  );
};
