/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable implicit-arrow-linebreak */
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SimilarRecipes({ id }) {
  const [similarRecipeById, setSimilarRecipeById] = useState([]);
  const {
    data: similarRecipes,
    isLoading: loadingSimilar,
    error: errorSimilar,
  } = useQuery({
    queryKey: ['SimilarByID', id],
    queryFn: () =>
      axios
        .get('../api/similarRecipes/', {
          params: {
            number: '4',
            recipeId: id,
            limitLicense: 'true',
          },
        })
        .then((res) => res.data),
    onSuccess: (similarRecipes1) => {
      setSimilarRecipeById(similarRecipes1);
    },
  });
  return (
    <div
      className="flex overflow-x-scroll  space-x-4 lg:place-content-evenly
 scrollbar-thin scrollbar-track-gray-600/20  scrollbar-thumb-[#f7ab0a]/70
"
    >
      {similarRecipeById?.map((recipe) => (
        <Link
          href={`${recipe?.id}`}
          key={recipe?.id}
        >
          <div
            className=" bg-white p-2 cursor-pointer w-[250px]
   hover:border-2 hover:border-gray-200 hover:rounded-md
    hover:shadow-lg
    "
          >
            <div
              className="flex justify-center content-center
  items-center object-cover"
            >
              <Image
                className="object-cover rounded-md  "
                loading="eager"
                width={312}
                height={150}
                src={recipe?.image}
                alt="Recipe Image"
              />
            </div>

            <div className=" pt-2 text-gray-600">
              {' '}
              <p className=" text-sm lg:text-md font-semibold capitalize hover:underline text-gray-700 line-clamp-2">
                {recipe?.title}
              </p>
              <div className="flex space-x-1 items-center ">
                <ClockIcon className="h-3 w-3" />
                <p className="text-sm font-light">
                  {recipe?.readyInMinutes} min
                </p>
              </div>
              <div className="flex space-x-1 items-center">
                <UserIcon className="h-3 w-3" />
                <p className="text-sm font-light">{recipe?.servings}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
SimilarRecipes.propTypes = {
  id: PropTypes.string,
};

export default SimilarRecipes;
