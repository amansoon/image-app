import React, { ReactElement, useMemo, useState, useEffect } from "react";
import UserLayout from "@/components/UserLayout";
import type { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import PhotosGallery from "@/components/PhotosGallery";
import { unsplash } from "@/config";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

type Props = {};

const Likes: NextPageWithLayout = () => {
  const router = useRouter();
  const username = useMemo(() => {
    const uname = router.query.username as string;
    if (uname.startsWith("@")) {
      return uname.substring(1);
    } else {
      return uname;
    }
  }, [router.query.username]);

  const [photos, setPhotos] = useState<object[]>([]);
  const [isPhotosLoading, setPhotosLoading] = useState(false);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(0);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const perPage = 15;

  useEffect(() => {
    if (username) {
      fetchPhotos(username);
    }
  }, [username]);

  useBottomScrollListener(() => {
    if (totalPhotos > currentPhotoPage * perPage) {
      fetchPhotos();
    }
  });

  // fetching photos
  const fetchPhotos = async (newUsername?: string) => {
    if (!isPhotosLoading) {
      setPhotosLoading(true);
      const result = await unsplash.users.getLikes({
        username: newUsername || username,
        page: currentPhotoPage + 1,
        perPage,
      });
      if (result.type === "success") {
        console.log(result);

        if (newUsername) {
          setTotalPhotos(result.response.total);
        }
        if (result.response.total > currentPhotoPage * perPage) {
          setPhotos(newUsername ? result.response.results : [...photos, ...result.response.results]);
          setCurrentPhotoPage(currentPhotoPage + 1);
        }
        setPhotosLoading(false);
      } else {
        setPhotosLoading(false);
        console.log(result.errors);
      }
    }
  };

  return (
    <div>
      <PhotosGallery photos={photos} />;
      {isPhotosLoading && (
        <div>
          <h1 className="text-4xl"> </h1>
        </div>
      )}
    </div>
  );
};

Likes.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Likes;
