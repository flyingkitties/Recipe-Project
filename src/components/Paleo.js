import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ClockIcon,
  UserIcon,
  CurrencyPoundIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/splide/css';
import axios from 'axios';
import Link from 'next/link';

function Paleo() {
  const [paleo, setPaleo] = useState([]);

  useEffect(() => {
    feedPaleo();
  }, []);

  const feedPaleo = async () => {
    const checkLocal = localStorage.getItem('paleo');

    if (checkLocal) {
      setPaleo(JSON.parse(checkLocal));
    } else {
      const api = await axios.get('api/search/', {
        params: {
          tags: 'paleo',
          number: '5',
        },
      });

      const { data } = api;
      localStorage.setItem('paleo', JSON.stringify(data.recipes));
      setPaleo(data.recipes);
    }
  };

  return (
    <div className="p-5 px-5 sm:px-8 md:px-10 lg:px-20 group">
      <Link
        href="/diet/paleo"
        className="flex items-center group-hover:text-[#00B8E1] group/item">
        <h1 className="text-gray-700 text-xl font-semibold link px-2">
          Paleo Recipes
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
            arrows: { position: 'absolute' },
            pagination: false,
          }}>
          {paleo?.map((recipe) => {
            if (recipe.image != null) {
              return (
                //Cards

                <SplideSlide
                  key={recipe.id}
                  className=" p-2 bg-white cursor-pointer 
              hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl
              max-w-[312px]
            ">
                  <Link href={`recipe/${recipe?.id}`}>
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
          })}
        </Splide>
      </div>
    </div>
  );
}

export default Paleo;
