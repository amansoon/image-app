import PhotosGallery from "@/components/PhotosGallery";
import { unsplash } from "@/config";
import { useRouter } from "next/router";
import React, { useState, useMemo, useEffect } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

type Props = {};

function Collection({}: Props) {
  const router = useRouter();
  const [collection, setCollection] = useState<object>();
  const [isCollectionLoading, setCollectionLoading] = useState(false);

  const [photos, setPhotos] = useState<object[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 15;
  const collectionId = useMemo(() => {
    return router.query.slug as string;
  }, [router.query.slug]);

  useEffect(() => {
    if (collectionId) {
      fetchCollection();
      fetchPhotos(collectionId);
    }
  }, [collectionId]);

  useBottomScrollListener(() => {
    if (total > page * perPage) {
      fetchPhotos();
    }
  });

  const fetchCollection = async () => {
    if (!isCollectionLoading) {
      setCollectionLoading(true);
      try {
        const result = await unsplash.collections.get({ collectionId: collectionId });
        if (result.type === "success") {
          setCollection(result.response);
        }
        setCollectionLoading(false);
      } catch (error) {
        setCollectionLoading(false);
        console.log(error);
      }
    }
  };

  const fetchPhotos = async (newCollectionId?: string) => {
    if (!isLoading) {
      setLoading(true);
      try {
        const result = await unsplash.collections.getPhotos({
          collectionId: newCollectionId || collectionId,
          page: page + 1,
          perPage,
        });
        console.log(result);
        if (result.type === "success") {
          setPhotos(newCollectionId ? result.response.results : [...photos, ...result.response.results]);
          setTotal(result.response.total);
          setPage(page + 1);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  if (isLoading) {
    return <h1> Loading... </h1>;
  }

  if (!collection) {
    return <div> Collection is null</div>;
  }

  return (
    <div className="">
      <CollectionInfo collection={collection} />
      <PhotosGallery photos={photos} />
    </div>
  );
}

const CollectionInfo = ({ collection }: { collection: object }) => {
  console.log("collection =", collection);
  const { id, title, cover_photo, total_photos, user, tags } = collection;
  return (
    <div className="pt-8 pb-6">
      <div>
        <h1 className="text-6xl font-semibold my-6"> {title} </h1>
      </div>
    </div>
  );
};

export default Collection;
