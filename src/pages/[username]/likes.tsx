import React, {ReactElement} from "react";
import UserLayout from "@/components/UserLayout";
import type { NextPageWithLayout } from "../_app";

type Props = {};

const Likes: NextPageWithLayout = () => {
  return <p className="text-3xl"> Likes </p>
}

Likes.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
}


export default Likes;
