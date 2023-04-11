import { Inter } from "next/font/google";
import { createApi } from "unsplash-js";
import Layout from "@/components/Layout";
import Gallery from "@/components/Gallery";
import { useEffect, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_API_KEY as string,
    // apiUrl: 'https://mywebsite.com/unsplash-proxy',
  });
  const [photos, setPhotos] = useState<object[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 15;

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = () => {
    unsplash.search
      .getPhotos({
        query: "dog",
        page,
        perPage,
      })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setPhotos([...photos, ...result.response.results]);
          setPage(page + 1);
        }
      })
      .catch((info) => {
        console.log(info);
      });
  };

  useBottomScrollListener(() => {
    fetchPhotos();
  });

  return (
    <Layout>
      <div className="px-[20px] lg:px-[30px] py-[30px]">
        <div className="w-full max-w-[1280px] mx-auto">
          <div className="flex mb-8">
            <Tabs />
          </div>
          <Gallery photos={photos} />
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

  const [current, setCurrent] = useState(1)

  return (
    <div className="flex">
      {tabs.map(({id, text}) => (
        <button key={id} className={`px-5 py-4 leading-none rounded-full ${current === id ? "bg-black" : "bg-transparent"}`} onClick={() => setCurrent(id)} >
          <span className={`mr-2 ${current === id ? "text-white" : "text-gray-800"}`}> {text} </span>
          <span className="text-gray-400"> 203K </span>
        </button>
      ))}
    </div>
  );
};
