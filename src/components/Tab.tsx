import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  id: number;
  text: string;
  url: string;
  count?: number;
};

function Tab({id, text, url, count}: Props) {
  const router = useRouter();

  return (
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
  );
}

export default Tab;
