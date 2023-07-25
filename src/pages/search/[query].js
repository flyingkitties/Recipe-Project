/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@mui/material/Skeleton';
import Footer from '../../components/Footer';
import RecipePolaroid from '../../components/RecipePolaroid';

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
      toast.error('Oops, there was an error here! Try again!', { id: e });
    },
  });

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
          {isLoading // eslint-disable-next-line no-unused-vars
            ? Array.from({ length: 12 }).map((_) => (
                <Skeleton
                  // Don't forget to add a unique key for each component in the loop
                  variant="rounded"
                  className="max-w-[312px]"
                  width={265}
                  height={230}
                />
              ))
            : data2?.results?.map((recipe) => {
                if (recipe.image != null) {
                  return (
                    <RecipePolaroid
                      id={recipe.id}
                      key={recipe.id}
                      image={recipe.image}
                      title={recipe.title}
                      aggregateLikes={recipe.aggregateLikes}
                      readyInMinutes={recipe.readyInMinutes}
                      servings={recipe.servings}
                    />
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
