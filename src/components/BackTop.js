import { ChevronUpIcon } from "@heroicons/react/24/outline";
import React from "react";

function BackTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className="grid items-center justify-center text-center
       text-white py-[15%] ">
      <div onClick={scrollToTop} className="cursor-pointer group shade ">
        <div className="flex text-center justify-center  ">
          <ChevronUpIcon className="w-10 h-10 group-hover:w-12 group-hover:h-12" />
        </div>
        <p className="group-hover:underline group-hover:text-lg">Back to Top</p>
      </div>
    </div>
  );
}

export default BackTop;
