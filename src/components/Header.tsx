import { ActionType } from "@/@types/appglobal";
import { useAppContext } from "@/context/context";
import Logo from "@/icons/Logo";
import LogoSmall from "@/icons/LogoSmall";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { User, Bell, Search, Menu } from "react-feather";
import { useEffect } from "react";
import Searchbar from "./Searchbar";
import { authorizeUser } from "@/utils/authorize";

type Props = {};

function Header({}: Props) {

  const handleLogin = async () => {
    authorizeUser();
    // try {
    //   const res = await fetch('/api/login/')
    //   const data = await res.json()
    //   console.log("Response = ", data)
    // }
    // catch(error) {
    //   console.log(error)
    // }
  };

  return (
    <header className="h-[80px] sticky top-0 z-50  flex items-center px-[20px] min-[620px]:px-[30px] border bg-white">
      <div className="w-full flex items-center">
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
          <Searchbar />
        </div>

        {/* nav */}
        <div className="hidden min-[860px]:flex items-center gap-5 ml-auto">
          <button className="px-4 py-2 rounded bg-gray-50" onClick={handleLogin}>
            Login
          </button>
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

export default Header;
