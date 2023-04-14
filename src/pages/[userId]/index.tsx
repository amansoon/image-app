import Layout from "@/components/Layout";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Filter } from "react-feather";
import Tabs from "@/components/Tabs";

type Props = {};

function User({}: Props) {
  const tabs = [
    {
      id: 1,
      text: "Photos",
      url: "/@user/",
    },
    {
      id: 2,
      text: "Likes",
      url: "/@user/likes",
    },
    {
      id: 3,
      text: "Collections",
      url: "/@user/collections/",
    },
    {
      id: 4,
      text: "Statistics",
      url: "/@user/stats/",
    },
  ];

  return (
    <Layout>
      <Tabs query={"user"} tabs={tabs} />
    </Layout>
  );
}

export default User;
