import "@/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Layout from "@/components/Layout";
import AppProvider from "@/context/context";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div className={jakarta.className}>
      <AppProvider>
        {/* Layout :- Single Shared Layout with Custom App */}
        <Layout>
          {/* Per-Page Layouts */}
          {getLayout(<Component {...pageProps} />)}
        </Layout>
      </AppProvider>
    </div>
  );
}
