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
    unsplash.search.getPhotos({
      query: "dog",
      page,
      perPage,
    }).then((result) => {
      console.log(result)
      if(result.status === 200) {
        setPhotos([...photos, ...(result.response.results)]);
        setPage(page + 1);
      }
    }).catch((info) => {
      console.log(info)
    })
  };

  useBottomScrollListener(() => {
    fetchPhotos();
  });

  return (
    <Layout>
      <Gallery photos={photos} />
    </Layout>
  );
}
