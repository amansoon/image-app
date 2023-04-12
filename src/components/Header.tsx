import Logo from "@/icons/Logo";
import LogoSmall from "@/icons/LogoSmall";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { User, Bell, Search, Menu } from "react-feather";

type Props = {};

function Header({}: Props) {
  return (
    <header className="sticky top-0 z-50 w-full px-[20px] min-[620px]:px-[30px] py-4 border bg-white">
      <div className="flex items-center">
        {/* logo */}
        <div className="mr-[15px] min-[620px]:mr-[30px]">
          <Link href={"/"}>
            <span className="hidden min-[620px]:block">
              {" "}
              <Logo />{" "}
            </span>
            <span className="block min-[620px]:hidden">
              {" "}
              <LogoSmall />{" "}
            </span>
          </Link>
        </div>
        {/* search */}
        <div className="grow max-w-[700px] mr-[20px]">
          <SearchBar />
        </div>
        {/* nav */}
        <div className="hidden min-[860px]:flex items-center gap-5 ml-auto">
          <button className="h-[40px] w-[40px] flex items-center justify-center">
            <Bell size={20} />
          </button>
          <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200">
            <User size={24} />
          </div>
          <button className="px-5 py-3 rounded bg-[#00a876] text-white">Upload</button>
        </div>
        {/*  */}
        <button className="min-w-[40px] h-[40px] flex min-[860px]:hidden items-center justify-center ">
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}

const SearchBar = () => {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      router.push({
        pathname: "/search/photos/[slug]",
        query: { slug: text.replaceAll(/\s{1,}/g, "-") },
      });
    } else {
      router.push("/");
    }
  };

  return (
    <form
      className="rounded-md border bg-slate-50 overflow-hidden focus-within:bg-white transition-all"
      onSubmit={handleSearch}
    >
      <div className="flex">
        <input
          type="text"
          placeholder="Search for free photos"
          className="w-full px-6 py-3 leading-none outline-none bg-transparent"
          value={text}
          onChange={(e: React.ChangeEvent) => setText((e.target as HTMLInputElement).value)}
        />
        <button type="submit" className="flex items-center px-4 border-l">
          <Search size={20} stroke="gray" strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
};

export default Header;
