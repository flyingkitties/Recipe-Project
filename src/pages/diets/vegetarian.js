/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-useless-return */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import RecipeCardHr from '../../components/RecipeCardHr';
import Footer from '../../components/Footer';

function vegetarianPage() {
  const [vegePage, setVegePage] = useState([]);
  const [page1, setPage1] = useState(true);
  const [page2, setPage2] = useState(false);
  const [page3, setPage3] = useState(false);
  const [page4, setPage4] = useState(false);
  const [active, setActive] = useState(1);

  const handlePage1 = () => {
    setPage1(true);
    setPage2(false);
    setPage3(false);
    setPage4(false);
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  };

  const handlePage2 = () => {
    setPage1(false);
    setPage2(true);
    setPage3(false);
    setPage4(false);
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  };
  const handlePage3 = () => {
    setPage1(false);
    setPage2(false);
    setPage3(true);
    setPage4(false);
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  };
  const handlePage4 = () => {
    setPage1(false);
    setPage2(false);
    setPage3(false);
    setPage4(true);
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
  };

  const getItemProps = (index) => ({
    variant: active === index ? 'filled' : 'text',
    color: active === index ? 'orange' : 'blue-gray',
    onClick: () => {
      setActive(index);
      if (index === 1) {
        handlePage1();
      } else if (index === 2) {
        handlePage2();
      } else if (index === 3) {
        handlePage3();
      } else if (index === 4) {
        handlePage4();
      }
    },
    className: ' rounded-full',
  });

  const next = () => {
    setActive(active + 1);

    if (active === 0) {
      handlePage1();
    }
    if (active === 1) {
      handlePage2();
    }
    if (active === 2) {
      handlePage3();
    }
    if (active === 3) {
      handlePage4();
    }
    if (active === 4) {
      return;
    }
  };

  const prev = () => {
    setActive(active - 1);
    if (active === 0) {
      handlePage1();
    }
    if (active === 1) {
      return;
    }
    if (active === 2) {
      handlePage1();
    }
    if (active === 3) {
      handlePage2();
    }
    if (active === 4) {
      handlePage3();
    }
  };

  const feedVegetarian = async () => {
    const checkLocal = localStorage.getItem('Vegetarian40');

    if (checkLocal) {
      setVegePage(JSON.parse(checkLocal));
    } else {
      const api = await axios.get('../api/search/', {
        params: {
          tags: 'vegetarian',
          number: '40',
        },
      });
      const { data } = api;
      localStorage.setItem('Vegetarian40', JSON.stringify(data.recipes));
      setVegePage(data.recipes);
    }
  };
  useEffect(() => {
    feedVegetarian();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* title */}
      <div className="pt-[10%] pb-[10%] text-center ">
        <h1 className="text-4xl sm:text-[50px] md:text-[60px] lg:text-[80px] font-bold titleFont ">
          Vegetarian Recipes
        </h1>
      </div>

      {/* Main */}
      <div className="px-5 sm:px-20 md:px-32  lg:grid lg:grid-cols-2 lg:gap-5 pb-10">
        {/* Cards */}
        {vegePage?.map((recipe, i) => {
          if (recipe.image != null && i < 10 && page1) {
            return (
              <RecipeCardHr
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
          if (recipe.image != null && i >= 10 && i < 20 && page2) {
            return (
              <RecipeCardHr
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
          if (recipe.image != null && i >= 20 && i < 30 && page3) {
            return (
              <RecipeCardHr
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
          if (recipe.image != null && i >= 30 && page4) {
            return (
              <RecipeCardHr
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
      <div className="flex items-center justify-center text-justify gap-4">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={active === 1}
          aria-label="Previous Page Button"
        >
          <ArrowLeftIcon
            strokeWidth={2}
            className="h-4 w-4"
          />{' '}
          <span className="hidden sm:inline-flex">Previous</span>
        </Button>
        <div className="flex items-center gap-2">
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={active === 4}
          aria-label="Next Page Button"
        >
          <span className="hidden sm:inline-flex">Next</span>
          <ArrowRightIcon
            strokeWidth={2}
            className="h-4 w-4"
          />
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default vegetarianPage;
