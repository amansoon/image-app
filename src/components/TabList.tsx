import React, {ReactNode} from "react";

type Props = {
    children: ReactNode,
};

function TabList({children}: Props) {
  return (
    <div className="sticky top-[79px] z-10 flex justify-between items-center pt-2 pb-3 mb-6 overflow-auto bg-white">
      <div className="flex items-center gap-3">
        {children}
      </div>
    </div>
  );
}

export default TabList;
