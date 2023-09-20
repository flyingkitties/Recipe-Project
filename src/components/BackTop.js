/* eslint-disable react/jsx-closing-bracket-location */
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import React from 'react';

function BackTop() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="grid items-center justify-center text-center text-white py-[10%] mt-10">
      <div
        onClick={scrollToTop}
        onKeyDown={scrollToTop}
        role="button"
        aria-label="Back To Top Button"
        tabIndex="0"
        className="cursor-pointer group shade "
      >
        <div className="flex text-center justify-center  ">
          <ChevronUpIcon className="w-10 h-10 group-hover:w-12 group-hover:h-12" />
        </div>
        <p className="group-hover:underline group-hover:text-lg">Back to Top</p>
      </div>
    </div>
  );
}

export default BackTop;
