import Footer from '@/components/Footer';
import Header from '@/components/Header';
import {
  ClockIcon,
  HandThumbUpIcon,
  StarIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import saladImage from '../../../public/images/salad.jpg';
import Link from 'next/link';

function salad() {
  const [salad, setSalad] = useState([]);

  useEffect(() => {
    feedSalad();
  }, []);

  const feedSalad = async () => {
    const checkLocal = localStorage.getItem('salad');

    if (checkLocal) {
      setSalad(JSON.parse(checkLocal));
    } else {
      const api = await axios.get('../api/search/', {
        params: {
          tags: 'salad',
          number: '20',
        },
      });
      const { data } = api;
      localStorage.setItem('salad', JSON.stringify(data.recipes));
      setSalad(data.recipes);
    }
  };
  return (
    <div className="">
      {/* top */}
      <div>
        <div className=" h-[100px] md:h-[150px] lg:h-[200px]  object-fill overflow-hidden ">
          <Image src={saladImage} width={2000} height={200} className="" />
        </div>
        <div className="pt-[2%] pb-[7%] text-center ">
          <h1 className="text-4xl sm:text-[50px] md:text-[60px] lg:text-[80px] font-bold titleFont ">
            Salad Recipes
          </h1>
          <div className="text-gray-600 mt-[5%] text-sm sm:text-base px-10 md:px-32 lg:px-56">
            <p className=" ">
              Try our best ever healthy salads, bursting with nutritious
              ingredients, delicious flavours and plenty of texture, with meat,
              fish, veggie and vegan options.
            </p>
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="px-20 md:px-32  lg:grid lg:grid-cols-2 lg:gap-5 pb-10">
        {salad?.map((recipe) => {
          if (recipe.image != null) {
            return (
              <Link href={`/${recipe?.id}`}>
                <div
                  key={recipe.id}
                  className="flex hover:drop-shadow-2xl border-2 mb-10 lg:my-0 rounded-md cursor-pointer ">
                  <div
                    className="flex max-h-[200px] max-w-[200px] justify-center content-center 
        items-center object-contain shrink-0">
                    <Image
                      className="rounded-l-md "
                      src={recipe.image}
                      loading="eager"
                      width={240}
                      height={150}
                      alt="Breakfast image"
                    />
                  </div>
                  <div className="p-2">
                    <h1 className="titleText line-clamp-2">{recipe.title}</h1>
                    <div className="justify-evenly pt-4 space-y-1  text-gray-600 ">
                      <div className="flex space-x-1 items-center">
                        <HandThumbUpIcon className="h-4 w-4 text-[#00B8E1] " />
                        <p className="text-xs font-light">
                          {recipe.aggregateLikes}
                        </p>
                      </div>
                      <div className="flex space-x-1 items-center ">
                        <ClockIcon className="h-3 w-3" />
                        <p className="text-xs font-light">
                          {recipe.readyInMinutes} min
                        </p>
                      </div>
                      <div className="flex space-x-1 items-center">
                        <UserIcon className="h-3 w-3" />
                        <p className="text-xs font-light">{recipe.servings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <Footer />
    </div>
  );
}

export default salad;