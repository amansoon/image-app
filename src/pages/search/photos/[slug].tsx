import { Inter } from "next/font/google";
import { createApi } from "unsplash-js";
import Layout from "@/components/Layout";
import Gallery from "@/components/Gallery";
import { use, useEffect, useMemo, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { Filter } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/context";
import { ActionType } from "@/@types/appglobal";

import { withRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

function Photos() {
  // const { state, dispatch } = useAppContext();
  // const { photos, isFetchingPhotos, photosPage } = state;
  const [isFetchingPhotos, setIsFetchingPhotos] = useState<boolean>(false);
  const [photos, setPhotos] = useState<object[]>([]);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const query = useMemo(() => {
    const slug = router.query.slug as string;
    return slug ? slug.replaceAll(/\s{1,}/g, " ") : slug;
  }, [router.query.slug]);

  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_API_KEY as string,
  });

  const perPage = 15;

  useEffect(() => {
    if (router.isReady && query) {
      setPhotos([]);
      setPage(1);
      fetchPhotos(query);
    }
  }, [query]);

  useBottomScrollListener(() => {
    if (router.isReady && query) {
      fetchPhotos();
    }
  });

  const fetchPhotos = (newQuery? : string) => {
    if (!isFetchingPhotos) {
      console.log("fetching for =", query);
      // dispatch({ type: ActionType.SET_FETCHING_PHOTOS, payload: true });
      setIsFetchingPhotos(true);
      unsplash.search
        .getPhotos({
          query: (newQuery ? newQuery : query),
          page: (newQuery ? 1 : page),
          perPage,
        })
        .then((result) => {
          console.log(result);
          if (result.status === 200 && result.type === "success") {
            // const payload = photosPage === 0 ? result.response.results : [...photos, ...result.response.results];
            // dispatch({ type: ActionType.SET_PHOTOS, payload: payload });
            const newPhotos = newQuery ? result.response.results : [...photos, ...result.response.results];
            setPhotos(newPhotos);
            setPage(newQuery ? 2 : page + 1);
            setIsFetchingPhotos(false);
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
    console.log("Photos : ", photos);
  }, [photos]);

  return (
    <Layout>
      <>
        <SimilarKeywords />

        <div className="px-[20px] lg:px-[30px]">
          <div className="w-full max-w-[1280px] mx-auto">
            {/* ---------- */}
            <div className="mt-12 mb-12">
              <h1 className="text-5xl font-semibold capitalize"> {query} </h1>
            </div>

            {/* ------- */}
            <Tabs />

            {/* ------- gallery --------- */}
            <Gallery photos={photos} />

            {isFetchingPhotos && (
              <div className="py-8 mb-8">
                <h1 className="text-4xl"> Loading.... </h1>
              </div>
            )}
          </div>
        </div>
      </>
    </Layout>
  );
}

const SimilarKeywords = () => {
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

    {
      id: 11,
      text: "monsoon",
    },
    {
      id: 13,
      text: "natural things",
    },
    {
      id: 14,
      text: "heavy rainfall",
    },
    {
      id: 15,
      text: "grass",
    },
    {
      id: 16,
      text: "summer",
    },
    {
      id: 17,
      text: "beauty",
    },
    {
      id: 18,
      text: "grass",
    },
    {
      id: 19,
      text: "summer",
    },
    {
      id: 20,
      text: "beauty",
    },
  ];

  return (
    <div className="w-full">
      <div className="relative w-full flex bg-gray-100">
        <div className="absolute h-full grow bg-gradient-to-r from-gray-100 to-transparent"></div>
        <div className="w-full max-w-[1280px] flex gap-2 py-[10px]">
          {topics.map(({ id, text }) => (
            <Link
              href={""}
              className="h-[42px] flex items-center px-4 font-medium leading-none bg-white hover:bg-slate-50 border rounded"
              key={id}
            >
              <span className=""> {text} </span>
            </Link>
          ))}
        </div>
        <div className="absolute h-full grow bg-gradient-to-l from-gray-100 to-transparent"></div>
      </div>
    </div>
  );
};

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

export default Photos;
