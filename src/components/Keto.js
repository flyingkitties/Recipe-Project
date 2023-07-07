/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Splide } from '@splidejs/react-splide';
import axios from 'axios';
import Link from 'next/link';
import RecipeCardVertical from './RecipeCardVertical';

function Keto() {
  const [keto, setKeto] = useState([]);

  const feedKeto = async () => {
    const checkLocal = localStorage.getItem('keto');

    if (checkLocal) {
      setKeto(JSON.parse(checkLocal));
    } else {
      const api = await axios.get('api/search/', {
        params: {
          tags: 'keto',
          number: '5',
        },
      });

      const { data } = api;
      setKeto(data.recipes);
      localStorage.setItem('keto', JSON.stringify(data.recipes));
    }
  };

  useEffect(() => {
    feedKeto();
  }, []);

  return (
    <div className="p-5 px-5 sm:px-8 md:px-10 lg:px-20 group">
      <Link
        href="/diets/keto"
        className="flex items-center group-hover:text-[#00B8E1] group/item"
      >
        <h1 className="text-gray-700 text-xl font-semibold link px-2">
          Keto Recipes
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
          {keto?.map((recipe) => {
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

export default Keto;
