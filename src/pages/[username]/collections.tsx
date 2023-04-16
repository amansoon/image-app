import React, { ReactElement, useMemo, useState, useEffect } from "react";
import UserLayout from "@/components/UserLayout";
import type { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import PhotosGallery from "@/components/PhotosGallery";
import { unsplash } from "@/config";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import CollectionGallery from "@/components/CollectionsGallery";

type Props = {};

const Collections: NextPageWithLayout = () => {
  const router = useRouter();
  const username = useMemo(() => {
    const uname = router.query.username as string;
    if (uname.startsWith("@")) {
      return uname.substring(1);
    } else {
      return uname;
    }
  }, [router.query.username]);

  const [collections, setCollections] = useState<object[]>([]);
  const [isCollectionsLoading, setCollectionsLoading] = useState(false);
  const [currentCollectionPage, setCurrentCollectionPage] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);
  const perPage = 15;

  useEffect(() => {
    if (username) {
      fetchCollections(username);
    }
  }, [username]);

  useBottomScrollListener(() => {
    if (totalCollections > currentCollectionPage * perPage) {
      fetchCollections();
    }
  });

  // fetching photos
  const fetchCollections = async (newUsername?: string) => {
    if (!isCollectionsLoading) {
      setCollectionsLoading(true);
      const result = await unsplash.users.getCollections({
        username: newUsername || username,
        page: currentCollectionPage + 1,
        perPage,
      });
      if (result.type === "success") {
        console.log("collections = ", result);
        if (newUsername) {
          setTotalCollections(result.response.total);
        }
        if (result.response.total > currentCollectionPage * perPage) {
          setCollections(newUsername ? result.response.results : [...collections, ...result.response.results]);
          setCurrentCollectionPage(currentCollectionPage + 1);
        }
        setCollectionsLoading(false);
      } else {
        setCollectionsLoading(false);
        console.log(result.errors);
      }
    }
  };

  return (
    <div>
      <CollectionGallery collections={collections} />;
      {isCollectionsLoading && (
        <div>
          <h1 className="text-4xl"> </h1>
        </div>
      )}
    </div>
  );
};

Collections.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Collections;
