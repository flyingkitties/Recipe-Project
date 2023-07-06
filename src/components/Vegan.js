/* eslint-disable indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Splide } from '@splidejs/react-splide';

import axios from 'axios';
import Link from 'next/link';
import RecipeCardVertical from './RecipeCardVertical';

function Vegan() {
  const [vegan, setVegan] = useState([]);

  const feedVegan = async () => {
    const checkLocal = localStorage.getItem('vegan');

    if (checkLocal) {
      setVegan(JSON.parse(checkLocal));
    } else {
      const api = await axios.get('api/search/', {
        params: {
          tags: 'vegan',
          number: '5',
        },
      });

      const { data } = api;
      localStorage.setItem('vegan', JSON.stringify(data.recipes));
      setVegan(data.recipes);
    }
  };

  useEffect(() => {
    feedVegan();
  }, []);

  return (
    <div className="p-5 px-5 sm:px-8 md:px-10 lg:px-20 group">
      <Link
        href="/diet/vegan"
        className="flex items-center group-hover:text-[#00B8E1] group/item"
      >
        <h1 className="text-gray-700 text-xl font-semibold link px-2">
          Vegan Recipes
        </h1>
        <div className="hidden group-hover/item:block">
          <h3 className="text-xs pl-3 pr-1 cursor-pointer">Explore all</h3>
        </div>
        <ChevronRightIcon className="iconSmall" />
      </Link>
      <div className="pt-2">
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
          }}
        >
          {vegan?.map((recipe) => {
            if (recipe.image != null) {
              return (
                <RecipeCardVertical
                  id={recipe.id}
                  key={recipe.id}
                  image={recipe.image}
                  title={recipe.title}
                  aggregateLikes={recipe.aggregateLikes}
                  readyInMinutes={recipe.readyInMinutes}
                  servings={recipe.readyInMinutes}
                />
              );
            }
            return null;
          })}
        </Splide>
      </div>
    </div>
  );
}

export default Vegan;
