/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-closing-bracket-location */
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Tooltip, Typography } from '@material-tailwind/react';
import Link from 'next/link';
import React, { useState } from 'react';

function Banner() {
  const [query, setQuery] = useState([]);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="text-center pt-[1%] px-7 sm:px-16 lg:px-40 text-white">
      <div className="mt-[15%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_0.9px_0.9px_rgba(0,0,0,0.5)]">
        <h1>Search recipes from all over the world!</h1>
      </div>
      <div className="mt-[8%] text-xl md:text-2xl lg:text-3xl drop-shadow-[0_0.9px_0.9px_rgba(0,0,0,0.5)]">
        <h2>Choose a category or search for an ingredient</h2>
      </div>
      <div className="flex-grid space-x-5 mt-[2%] text-sm md:text-base lg:text-lg ">
        <Link href="/category/sides">
          <button
            className="btnOrg"
            type="button"
          >
            <p className="shade">Sides</p>
          </button>
        </Link>
        <Link href="/category/dessert">
          <button
            className="btnOrg"
            type="button"
          >
            <p className="shade">Dessert</p>
          </button>
        </Link>
        <Link href="/category/salad">
          <button
            className="btnOrg"
            type="button"
          >
            <p className="shade">Salad</p>
          </button>
        </Link>
        <Link href="/category/breakfast">
          <button
            className="btnOrg"
            type="button"
          >
            <p className="shade">Breakfast</p>
          </button>
        </Link>
        <Link href="/category/mainCourse">
          <button
            className="btnOrg"
            type="button"
          >
            <p className="shade">Main Course</p>
          </button>
        </Link>
        <Link href="/category/snacks">
          <button
            className="btnOrg"
            type="button"
          >
            <p className="shade">Snacks</p>
          </button>
        </Link>
      </div>
      <form
        className="flex mt-[5%] text-gray-600 items-center justify-center  "
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div
          className="flex  cursor-pointer h-10
      items-center drop-shadow-xl rounded-2xl
       bg-[#FF8F00] hover:bg-[#FF8200] max-w-[800px] flex-grow  "
        >
          <input
            type="text"
            onChange={handleChange}
            placeholder="Ingredient, dish, keyword..."
            className="flex-grow p-2 px-10 h-full rounded-l-2xl focus:outline-none"
          />
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10  "
            content={
              <div className="">
                <Typography
                  color="gray"
                  className="font-medium"
                >
                  Search
                </Typography>
              </div>
            }
          >
            <Link href={`/search/${query}`}>
              <button
                className=" md:p-5 p-3 max-w-10"
                type="button"
              >
                <MagnifyingGlassIcon className="md:h-6 md:w-6 h-5 w-5 text-white " />
              </button>
            </Link>
          </Tooltip>
        </div>
      </form>
    </div>
  );
}

export default Banner;
// [#00B8E1]
