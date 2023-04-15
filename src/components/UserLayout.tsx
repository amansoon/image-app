import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import PageNotFound from "./PageNotFound";
import Tabs from "./Tabs";

type Props = {
  children: React.ReactNode;
};

const users = ["@aman", "@meena", "@guru", "@radha"];

const tabs = [
  {
    id: 1,
    text: "photos",
    url: "/@aman",
  },
  {
    id: 2,
    text: "likes",
    url: "/@aman/likes",
  },
  {
    id: 3,
    text: "collections",
    url: "/@aman/collections",
  },
  {
    id: 4,
    text: "statistics",
    url: "/@aman/stats",
  },
];

function UserLayout({ children }: Props) {
  const [isUserExists, setUserExists] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("User Layout Mount");
  }, []);

  useEffect(() => {
    const username = router.query.username as string;
    if (users.find((user) => username === user)) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  }, [router]);

  if (!isUserExists) {
    return <PageNotFound />;
  } else {
    return (
      <div>
        <UserDetail />
        <Tabs query="" tabs={tabs} />
        {children}
      </div>
    );
  }
}

const UserDetail = () => {
  return (
    <div className="">
      <h1 className="text-4xl"> User Information </h1>
      <p>
        {" "}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, nulla quam saepe corporis sapiente dolorum,
        aliquid eveniet eligendi nostrum assumenda consectetur esse debitis dicta nesciunt pariatur ratione est
        perspiciatis ipsum.
      </p>
    </div>
  );
};

export default UserLayout;
