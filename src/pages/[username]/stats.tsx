import React, {ReactElement} from "react";
import UserLayout from "@/components/UserLayout";
import type { NextPageWithLayout } from "../_app";

type Props = {};

const Stats: NextPageWithLayout = () => {
  return <p> Stats </p>
}

Stats.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
}


export default Stats;
