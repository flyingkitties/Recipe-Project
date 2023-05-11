import Image from 'next/image';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  ClockIcon,
  UserIcon,
  CurrencyPoundIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/splide/css';
import axios from 'axios';
import Link from 'next/link';

function Popular({ recipe }) {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    feedPopular();
  }, []);

  const feedPopular = async () => {
    const checkLocal = localStorage.getItem('popular');

    if (checkLocal) {
      setPopular(JSON.parse(checkLocal));
    } else {
      const api = await axios.get('api/search/', {
        params: {
          number: '20',
        },
      });

      const { data } = api;
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  return (
    <div className="p-5 px-5 sm:px-8 md:px-10 lg:px-20 group">
      <div className="flex items-center group-hover:text-[#00B8E1] group/item">
        <h1 className="text-gray-700 text-xl font-semibold link px-2">
          Popular Recipes
        </h1>
        <div className="hidden group-hover/item:block">
          <h3 className="text-xs pl-3 pr-1 cursor-pointer">Explore all</h3>
        </div>
        <ChevronRightIcon className="iconSmall" />
      </div>
      <div className="">
        <Splide
          options={{
            perPage: 1,
            gap: '1rem',
            drag: 'free',
            keyboard: 'global',
            autoWidth: true,
            autoHeight: true,
            arrows: { position: 'absolute' },
            pagination: false,
          }}>
          {popular?.map((recipe) => {
            if (recipe.image != null) {
              return (
                //Cards

                <SplideSlide
                  key={recipe.id}
                  className=" p-2 bg-white cursor-pointer max-w-[312px]
               hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl
                ">
                  <Link href={`/${recipe?.id}`}>
                    <div
                      className="flex justify-center content-center 
              items-center object-cover">
                      <Image
                        className="object-cover  rounded-md  "
                        loading="eager"
                        width={312}
                        height={150}
                        src={recipe.image}
                        alt="image"
                      />
                    </div>

                    <div className=" pt-2 text-gray-600">
                      {' '}
                      <p className=" text-md font-semibold capitalize hover:underline text-gray-700">
                        {recipe.title}
                      </p>
                      <div className="flex space-x-1 items-center ">
                        <ClockIcon className="h-3 w-3" />
                        <p className="text-sm font-light">
                          {recipe.readyInMinutes} min
                        </p>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <UserIcon className="h-3 w-3" />
                        <p className="text-sm font-light">{recipe.servings}</p>
                      </div>
                    </div>
                  </Link>
                </SplideSlide>
              );
            }
          })}
        </Splide>
      </div>
    </div>
  );
}

export default Popular;

//  {/* Right portion */}
//  <div className="relative space-y-4 w-full pt-2">
//  {" "}
//  <p className=" text-lg font-semibold capitalize hover:underline">
//    {recipe.title}
//  </p>
//  <div className="">
//    <div className="flex space-x-1 items-center">
//      <ClockIcon className="h-3 w-3" />
//      <p className="text-sm font-light">
//        {recipe.readyInMinutes} min
//      </p>
//    </div>
//    <div className="flex space-x-1 items-center">
//      <UserIcon className="h-3 w-3" />
//      <p className="text-sm font-light">{recipe.servings}</p>
//    </div>
//  </div>
//  <div className="absolute bottom-3 left-2 px-5  bg-[#62B6B7] text-white rounded-md text-center ">
//    <p className="capitalize">{recipe.diets[1]}</p>
//  </div>
// </div>

{
  /* <div
                className="flex  items-center justify-center  filter 
              contrast-[110%] brightness-[115%]   "></div> */
}
