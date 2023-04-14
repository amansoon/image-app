import Layout from "@/components/Layout";
import Gallery from "@/components/Gallery";
import { use, useEffect, useMemo, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { Filter } from "react-feather";
import Link from "next/link";
import { useRouter } from "next/router";
import { unsplash } from "@/config";

function Photos() {
  const [isPhotosLoading, setPhotosLoading] = useState(false);
  const [photos, setPhotos] = useState<object[]>([]);
  const [totalPhotoPages, setTotalPhotoPages] = useState(0);
  const [currentPhotoPage, setCurrentPhotoPage] = useState(0);
  const [totalPhotos, setTotalPhotos] = useState(0);

  const [isCollectionsLoading, setCollectionsLoading] = useState(false);
  const [collections, setCollections] = useState<object[]>([]);
  const [totalCollectionPages, setTotalCollectionPages] = useState(0);
  const [currentCollectionPage, setCurrentCollectionPage] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);

  const [isUsersLoading, setUsersLoading] = useState(false);
  const [users, setUsers] = useState<object[]>([]);
  const [totalUserPages, setTotalUserPages] = useState(0);
  const [currentUserPage, setCurrentUserPage] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number>();

  const perPage = 15;

  const router = useRouter();

  const category = useMemo(() => {
    return router.query.category as string;
  }, [router.query.category]);

  const query = useMemo(() => {
    const slug = router.query.slug as string;
    return slug ? slug.replaceAll(/\s{1,}/g, " ") : slug;
  }, [router.query.slug]);

  useEffect(() => {
    if (router.isReady && query) {
      setPhotos([]);
      setCollections([]);
      setUsers([]);

      setCurrentPhotoPage(0);
      setCurrentCollectionPage(0);
      setCurrentUserPage(0);

      fetchPhotos(query as string);
      fetchCollections(query as string);
      fetchUsers(query as string);
    }
  }, [query]);

  useBottomScrollListener(() => {
    if (query) {
      if (totalPhotoPages > currentPhotoPage) {
        fetchPhotos();
      }
    }
  });

  const fetchPhotos = async (newQuery?: string) => {
    if (!isPhotosLoading) {
      setPhotosLoading(true);
      const result = await unsplash.search.getPhotos({
        query: newQuery || query,
        page: currentPhotoPage + 1,
        perPage,
      });

      if (result.type === "success") {
        console.log(result);
        if (newQuery) {
          setTotalPhotoPages(result.response.total_pages);
          setTotalPhotos(result.response.total);
        }
        if (result.response.total_pages > currentPhotoPage) {
          setPhotos(newQuery ? result.response.results : [...photos, ...result.response.results]);
          setCurrentPhotoPage(currentPhotoPage + 1);
        }
        setPhotosLoading(false);
      } else {
        console.log(result.errors);
      }
    }
  };

  const fetchCollections = async (newQuery?: string) => {
    if (!isCollectionsLoading) {
      setCollectionsLoading(true);
      const result = await unsplash.search.getPhotos({
        query: newQuery || query,
        page: currentCollectionPage + 1,
        perPage,
      });

      if (result.type === "success") {
        console.log(result);
        if (newQuery) {
          setTotalCollectionPages(result.response.total_pages);
          setTotalCollections(result.response.total);
        }
        if (result.response.total_pages > currentCollectionPage) {
          setCollections(newQuery ? result.response.results : [...collections, ...result.response.results]);
          setCurrentCollectionPage(currentCollectionPage + 1);
        }
        setCollectionsLoading(false);
      } else {
        console.log(result.errors);
      }
    }
  };

  const fetchUsers = async (newQuery?: string) => {
    if (!isUsersLoading) {
      setUsersLoading(true);
      const result = await unsplash.search.getPhotos({
        query: newQuery || query,
        page: currentUserPage + 1,
        perPage,
      });

      if (result.type === "success") {
        console.log(result);
        if (newQuery) {
          setTotalUserPages(result.response.total_pages);
          setTotalUsers(result.response.total);
        }
        if (result.response.total_pages > currentUserPage) {
          setUsers(newQuery ? result.response.results : [...users, ...result.response.results]);
          setCurrentUserPage(currentUserPage + 1);
        }
        setUsersLoading(false);
      } else {
        console.log(result.errors);
      }
    }
  };

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
            <Tabs query={query} />

            {/* ------- gallery --------- */}
            <Gallery list={photos} category={category} />

            {(isUsersLoading || isCollectionsLoading || isPhotosLoading) && (
              <div className="py-8 mb-8">
                <h1 className="text-4xl"> Loading.... </h1>
              </div>
            )}

            {totalPages === page && (
              <div className="py-8 mb-8">
                <h1 className="text-4xl"> All Image fetched </h1>
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
      <div className="relative h-[80px] w-[1280px] flex items-center mx-auto">
        <div className="absolute left-0 w-[20px] h-full z-10 grow bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-full overflow-auto flex items-center flex-nowrap gap-2">
          {topics.map(({ id, text }) => (
            <Link
              href={""}
              className="h-[42px] flex items-center px-4 bg-slate-50/50 hover:bg-slate-50 border rounded"
              key={id}
            >
              <span className="whitespace-nowrap font-normal leading-none"> {text} </span>
            </Link>
          ))}
        </div>
        <div className="absolute right-0 w-[20px] h-full z-10 grow bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </div>
  );
};

const Tabs = ({ query }: { query: string }) => {
  const tabs = [
    {
      id: 1,
      text: "photos",
      url: `/search/photos/${query}`,
    },
    {
      id: 2,
      text: "collections",
      url: `/search/collections/${query}`,
    },
    {
      id: 3,
      text: "users",
      url: `/search/users/${query}`,
    },
  ];

  const [current, setCurrent] = useState(1);

  return (
    <div className="sticky top-[79px] z-10 flex justify-between items-center pt-2 pb-3 mb-6 overflow-auto bg-white">
      <div className="flex items-center gap-3">
        {tabs.map(({ id, text, url }) => (
          <Link
            href={url}
            key={id}
            className={`h-[48px] flex items-center gap-2  font-medium leading-none rounded-full ${
              current === id ? "bg-black px-5" : "bg-transparent px-2"
            }`}
            onClick={() => setCurrent(id)}
          >
            <span className={`${current === id ? "text-white" : "text-gray-800"}`}> {text} </span>
            <span className="text-sm text-gray-400 leading-none mt-1"> 203K </span>
          </Link>
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