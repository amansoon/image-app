import { useState } from "react";
import Link from "next/link";
import { Filter } from "react-feather";
import { useRouter } from "next/router";

type TabType = {
  id: number;
  text: string;
  url: string;
};

type props = {
  query: string;
  tabs: TabType[];
};

export default function Tabs({ query, tabs }: props) {
  const router = useRouter();

  return (
    <div className="sticky top-[79px] z-10 flex justify-between items-center pt-2 pb-3 mb-6 overflow-auto bg-white">
      <div className="flex items-center gap-3">
        {tabs.map(({ id, text, url }) => (
          <Link
            href={url}
            key={id}
            className={`h-[48px] flex items-center gap-2  font-medium leading-none rounded-full ${
              router.asPath === url ? "bg-black px-5" : "bg-transparent px-2"
            }`}
          >
            <span className={`${router.asPath === url ? "text-white" : "text-gray-800"}`}> {text} </span>
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
}
