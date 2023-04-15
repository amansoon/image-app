import React, { ReactElement } from "react";
import UserLayout from "@/components/UserLayout";
import type { NextPageWithLayout } from "../_app";

type Props = {};

const Index: NextPageWithLayout = () => {
  return <p> PHotos </p>;
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};

export default Index;
