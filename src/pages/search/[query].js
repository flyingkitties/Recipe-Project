/* eslint-disable react/jsx-one-expression-per-line */
import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
// import { fetchData } from 'next-auth/client/_utils';
import Link from 'next/link';
import Footer from '../../components/Footer';

function SearchParams() {
  const {
    query: { query },
  } = useRouter();

  const getRecipeData = async () => {
    const api = await axios.get('../api/complexSearch/', {
      params: {
        query,
        number: '20',
        addRecipeInformation: true,
      },
    });
    return api.data;
  };

  const {
    data: data2,
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ['searchBar', query],
    queryFn: getRecipeData,
    onSuccess: (datum) => {
      if (datum?.results?.length === 0) {
        toast.error('Oops, no recipes found! Try again!');
      }
    },
    onError: (e) => {
      console.log('error', e);
    },
  });
  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="bg-gray-100">
      <div className="px-5 sm:px-8 md:px-10 lg:px-32 py-5 ">
        {/* Title */}
        <div className="bg-white p-5 text-gray-600 rounded-md shadow-md mb-5 ">
          <div className="space-y-4 ">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold
             text-orange-400 capitalize"
            >
              <span className="font-bold ">&quot;{query}&quot;</span> recipes
            </h1>
          </div>
        </div>

        {/* Grid of recipes */}
        <div
          className="grid gap-5 sm:grid-cols-2 sm:gap-8
           md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-12 pb-5  place-content-evenly

       "
        >
          {data2?.results?.map((recipe) => {
            if (recipe.image != null) {
              return (
                <div
                  key={recipe.id}
                  className=" bg-white rounded-md shadow-md cursor-pointer max-w-[312px]
               hover:shadow-xl
                "
                >
                  <Link href={`../recipe/${recipe?.id}`}>
                    <div
                      className="flex justify-center content-center
              items-center object-cover"
                    >
                      <Image
                        className="object-cover rounded-t-md  "
                        loading="eager"
                        width={312}
                        height={150}
                        src={recipe.image}
                        alt="image"
                      />
                    </div>
                    <div className=" p-2  text-gray-600">
                      {' '}
                      <p className=" text-sm lg:text-md font-semibold capitalize hover:underline text-gray-700 line-clamp-2">
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
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchParams;
