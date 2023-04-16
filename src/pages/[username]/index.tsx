import React, { ReactElement, useMemo, useState } from "react";
import UserLayout from "@/components/UserLayout";
import type { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import PhotosGallery from "@/components/PhotosGallery";
import { unsplash } from "@/config";

type Props = {};

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const username = useMemo(() => {
    const uname = router.query.username as string;
    if (uname.startsWith("@")) {
      return uname.substring(1);
    } else {
      return uname;
    }
  }, [router.query.username]);

  const [photos, setPhotos] = useState([]);
  const [isPhotosLoading, setPhotosLoading] = useState(false);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(0);
  const [totalPhotoPages, setTotalPhotoPages] = useState(0);

  
  // fetching photos
  const fetchPhotos = async () => {
    if (!isPhotosLoading) {
      setPhotosLoading(true);
      const result = await unsplash.users.getPhotos({
        query: newQuery || query,
        page: currentPhotoPage + 1,
        perPage,
      });

      if (result.type === "success") {
        console.log(result);
        if (newQuery) {
          setTotalPhotoPages(result.response.total_pages);
        }
        if (result.response.total_pages > currentPhotoPage) {
          setPhotos(newQuery ? result.response.results : [...photos, ...result.response.results]);
          setCurrentPhotoPage(currentPhotoPage + 1);
        }
        setPhotosLoading(false);
      } else {
        setPhotosLoading(false);
        console.log(result.errors);
      }
    }
  };




  return <PhotosGallery photos={[]} />;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;
