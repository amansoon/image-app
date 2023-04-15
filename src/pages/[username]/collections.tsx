import React, {ReactElement} from "react";
import UserLayout from "@/components/UserLayout";
import type { NextPageWithLayout } from "../_app";

type Props = {};

const Collection: NextPageWithLayout = () => {
  return <p> Collection </p>
}

Collection.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
}


export default Collection;
