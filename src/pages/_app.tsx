import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppProvider from "@/context/context";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={jakarta.className}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </div>
  );
}
