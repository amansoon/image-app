import React, {useState} from "react";
import { Search } from "react-feather";
import { useAppContext } from "@/context/context";
import { useRouter } from "next/router";
import { ActionType } from "@/@types/appglobal";

type Props = {};

function Searchbar({}: Props) {
  const { state, dispatch } = useAppContext();
  const [text, setText] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      const query = text.replaceAll(/\s{1,}/g, "-");
      dispatch({ type: ActionType.RESET_QUERY, payload: { photosPage: 0, photos: [], lastQuery: query } });
      router.push({
        pathname: "/search/photos/[slug]",
        query: { slug: query },
      });
    } else {
      router.push("/");
    }
  };

  return (
    <form
      className="rounded-md border bg-slate-50 overflow-hidden focus-within:bg-white transition-all"
      onSubmit={handleSearch}
    >
      <div className="flex">
        <input
          type="text"
          placeholder="Search for free photos"
          className="w-full px-6 py-4 leading-none outline-none bg-transparent"
          value={text}
          onChange={(e: React.ChangeEvent) => setText((e.target as HTMLInputElement).value)}
        />
        <button type="submit" className="flex items-center px-4 border-l">
          <Search size={20} stroke="gray" strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;