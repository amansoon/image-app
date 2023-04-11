import Logo from "@/icons/Logo";
import Link from "next/link";
import React from "react";
import { User, Bell, Search } from "react-feather";

type Props = {};

function Header({}: Props) {
  return (
    <header className="sticky top-0 w-full px-[30px] py-4 border bg-white">
      <div className="flex items-center">
        {/* logo */}
        <div className="mr-[80px]">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        {/* search */}
        <div className="grow max-w-[700px]">
          <form className="rounded-md border bg-slate-50 overflow-hidden focus-within:bg-white transition-all">
            <div className="flex">
              <input
                type="text"
                placeholder="Search for free photos"
                className="w-full px-6 py-3 leading-none outline-none bg-transparent"
              />
              <button className="flex items-center px-4 border-l">
                <Search size={20} stroke="gray" strokeWidth={1.5} />
              </button>
            </div>
          </form>
        </div>
        {/* profile */}
        <div className="flex items-center gap-5 ml-auto">
          <button className="h-[40px] w-[40px] flex items-center justify-center">
            <Bell size={20} />
          </button>
          <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200">
            <User size={24} />
          </div>
          <button className="px-5 py-3 rounded bg-[#00a876] text-white">Upload</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
