import React from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="">
      <Header />
      <main>
        <div className="px-[20px] lg:px-[30px]">
          <div className="w-full max-w-[1280px] mx-auto"> {children} </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
