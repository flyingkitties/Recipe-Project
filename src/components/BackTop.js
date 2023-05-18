import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { useScroll } from '@react-spring/web';
import React from 'react';
import ScrollToTop from 'react-scroll-to-top';

function BackTop() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      console.log('is it scrolling?');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="grid items-center justify-center text-center
       text-white py-[10%] mt-10">
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
