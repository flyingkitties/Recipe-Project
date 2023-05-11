import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ClockIcon,
  HandThumbUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

function SearchParams() {
  let pathname = window.location.pathname;

  const {
    query: { query },
  } = useRouter([]);

  const [queryWord, setQueryWord] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(pathname);

  useEffect(() => {
    setCurrentUrl(pathname);
    if (!query || query != undefined) {
      getRecipeData();
    }
  }, [pathname]);

  useEffect(() => {
    if (!queryWord.length) {
      console.log(queryWord.length);
      console.log('No recipe found');
      toast.error('Oops, no recipes found! Try again!');
    }
  }, [queryWord]);

  const getRecipeData = async () => {
    const api = await axios.get(`../api/complexSearch/`, {
      params: {
        query: query,
        number: '20',
        addRecipeInformation: true,
      },
    });

    const { data } = api;
    setQueryWord(data.results);
    console.log(data.results);
  };

  return (
    <div className="px-20 md:px-32 ">
      <div className="py-10 text-xl">
        <h1>
          You searched for <span className="font-bold">{query}</span>...
        </h1>
      </div>

      <div className="  lg:grid lg:grid-cols-2 lg:gap-5 pb-10">
        {queryWord?.map((recipe) => {
          if (recipe.image != null) {
            return (
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
                  <h1 className="titleText ">{recipe.title}</h1>
                  <div className="justify-evenly pt-4 space-y-1 text-gray-600 ">
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
            );
          }
        })}
      </div>
    </div>
  );
}

export default SearchParams;
