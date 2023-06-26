/* eslint-disable react/jsx-one-expression-per-line */
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  ClockIcon,
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import axios from 'axios';
import Link from 'next/link';

function Popular() {
  const [popular, setPopular] = useState([]);

  const feedPopular = async () => {
    const checkLocal = localStorage.getItem('popular');

    if (checkLocal) {
      setPopular(JSON.parse(checkLocal));
    } else {
      const api = await axios.get('api/search/', {
        params: {
          number: '5',
        },
      });

      const { data } = api;
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  useEffect(() => {
    feedPopular();
  }, []);

  return (
    <div className="p-5 px-5 sm:px-8 md:px-10 lg:px-20 group">
      <Link
        href="/category/popular"
        className="flex items-center group-hover:text-[#00B8E1] group/item"
      >
        <h1 className="text-gray-700 text-xl font-semibold link px-2">
          Popular Recipes
        </h1>
        <div className="hidden group-hover/item:block">
          <h3 className="text-xs pl-3 pr-1 cursor-pointer">Explore all</h3>
        </div>
        <ChevronRightIcon className="iconSmall" />
      </Link>
      <div className="">
        <Splide
          options={{
            perPage: 1,
            gap: '1rem',
            drag: 'free',
            keyboard: 'global',
            autoWidth: true,
            autoHeight: true,
            pagination: false,
          }}
        >
          {popular?.map((recipe) => {
            if (recipe.image != null) {
              return (
                // Cards
                <SplideSlide
                  key={recipe.id}
                  className=" p-2 bg-white cursor-pointer max-w-[312px]
               hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl
                "
                >
                  <Link href={`recipe/${recipe?.id}`}>
                    <div
                      className="flex justify-center content-center
              items-center object-cover"
                    >
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
                      <p className=" text-md font-semibold capitalize hover:underline text-gray-700 line-clamp-2">
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
            return console.log('error');
          })}
        </Splide>
      </div>
    </div>
  );
}

export default Popular;
