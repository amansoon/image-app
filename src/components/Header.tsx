import Logo from "@/icons/Logo";
import Link from "next/link";
import React from "react";

type Props = {};

function Header({}: Props) {
  return (
    <header className="sticky top-0 w-full px-6 py-4 border bg-white">
      <div className="flex items-center">
        {/* logo */}
        <div className="mr-[80px]">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        {/* search */}
        <div className="grow max-w-[500px]">
          <form className="rounded-full overflow-hidden border bg-slate-50 focus-within:bg-white transition-all">
            <input type="text" placeholder="Search for free photos" className="w-full px-6 py-3 leading-none outline-none bg-transparent"  />
          </form>
        </div>
        {/* profile */}
        <div className="ml-auto">
          <div className="h-[36px] w-[36px] rounded-full bg-slate-50"> </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
