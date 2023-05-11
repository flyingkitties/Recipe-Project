import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  HandThumbUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { MdLabelOutline } from 'react-icons/md';
import { GiCookingPot } from 'react-icons/gi';
import { IoNutritionOutline } from 'react-icons/io';
import { FaRegCommentDots } from 'react-icons/fa';
import { AiOutlineFire, AiOutlineLike, AiOutlineHeart } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

function recipeById() {
  // if (typeof window !== 'undefined') {
  //   let pathname = window.location.pathname;
  // }

  const router = useRouter();

  const [recipeByID, setRecipeById] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [userDrop, setUserDrop] = useState(false);

  const handleUserDrop = () => {
    setUserDrop(!userDrop);
  };

  useEffect(() => {
    let ignore = false;
    if (
      !router.query.recipeId ||
      router.query.recipeId != 'undefined' ||
      ignore === 'false'
    ) {
      getRecipeData();
      return () => {
        ignore = true;
      };
    }
  }, [router.query.recipeId]);

  // useEffect(() => {
  //   setCurrentUrl(typeof pathname);

  //   if (!router.query.recipeId || router.query.recipeId != undefined) {
  //     getRecipeData();
  //   }
  // }, [typeof pathname]);

  // useEffect(() => {
  //   if (!recipeByID.length) {
  //     console.log(recipeByID.length);
  //     console.log('No recipe found');
  //     toast.error('Oops, no recipes found! Try again!');
  //   }
  // }, [recipeByID]);

  const getRecipeData = async () => {
    const value = router.query.recipeId;
    const checkLocal = localStorage.getItem(value);

    if (checkLocal) {
      console.log('inside check local');
      setRecipeById(checkLocal);
      setNutrition(checkLocal.nutrition.nutrients);
      setIngredients(checkLocal.extendedIngredients);
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/${router.query.recipeId}/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&includeNutrition=true`
      )
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem(value, JSON.stringify(data));
          setRecipeById(data);
          setNutrition(data.nutrition.nutrients);
          setIngredients(data.extendedIngredients);

          console.log(data);
        })
        .catch(() => {
          console.log('error');
        });
    }
  };

  return (
    <div className="px-5 sm:px-8 md:px-10 lg:px-32 bg-gray-100 pt-10">
      <div className=" relative flex  bg-white rounded-md shadow-md">
        {/* Left Section */}
        <div className="flex object-cover w-[240px] h-[150px] md:w-[312px] md:h-[231px] lg:w-[480px] lg:h-[360px] shrink-0 ">
          <Image
            className="rounded-l-md"
            src={recipeByID.image}
            loading="eager"
            width={480}
            height={360}
            alt="Breakfast image"
          />
        </div>
        {/* Right Section */}
        <div className=" px-5 w-full ">
          <h1 className=" text-xl sm:text-2xl md:text-3xl lg:text-5xl titleFont sm:py-2 md:py-5 ">
            {recipeByID.title}
          </h1>

          <div className="text-gray-600 space-y-1 md:space-y-2 lg:space-y-5 sm:pt-2 p-1 md:pt-5">
            <div className="flex space-x-1 items-center ">
              <ClockIcon className="h-3 w-3" />
              <p className="text-xs md:text-sm lg:text-base font-light">
                {' '}
                Ready in:{' '}
                <span className="font-semibold">
                  {recipeByID.readyInMinutes} min
                </span>
              </p>
            </div>

            <div className="flex space-x-1 items-center">
              <UserIcon className="h-3 w-3" />
              <p className="text-xs md:text-sm lg:text-base font-light">
                Serves:{' '}
                <span className="font-semibold">{recipeByID.servings}</span>
              </p>
            </div>
            <div className="flex space-x-1 items-center">
              <MdLabelOutline className="h-3 w-3" />
              <p className="text-xs md:text-sm lg:text-base font-light">
                Source:{' '}
                <span className="font-semibold link">
                  {recipeByID.sourceName}
                </span>
              </p>
            </div>

            {/* Drop Nutrition */}
            <div
              className="flex items-center space-x-1 lg:pt-5"
              onClick={handleUserDrop}>
              <div className="flex btnRecipe text-center items-center space-x-1 ">
                <p className="text-xs md:text-sm lg:text-base font-light ">
                  Nutrition per serving
                </p>
                {userDrop ? (
                  <ChevronUpIcon className="iconSmall " />
                ) : (
                  <ChevronDownIcon className="iconSmall" />
                )}
              </div>
              {userDrop ? (
                <Transition
                  as={Fragment}
                  show={true}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <div className=" absolute top-[100%] right-0 -left-1 p-1 bg-white  rounded-md shadow-2xl border-[0.01px] border-gray-200 z-20 ">
                    <div className="grid grid-cols-3 grid-row-3 gap-2 sm:gap-3 md:gap-5 lg:gap-6 p-3 ">
                      {nutrition?.map((nutrients, i) => {
                        if (i < 9) {
                          return (
                            <div className=" space-y-2 p-2 items-center place-content-center bg-gray-200 text-center text-xs font-light">
                              <p className="">{nutrients.name} </p>
                              <p className="font-semibold">
                                {recipe.amount} {nutrients.unit}
                              </p>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </Transition>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Buttons  */}
      <div className="flex p-3 space-x-10 ">
        <div className="btnRecipe ">
          <AiOutlineLike className="iconMed" />
        </div>
        <div className="btnRecipe">
          <AiOutlineHeart className="iconMed" />
        </div>
        <div className="btnRecipe">
          <FaRegCommentDots className="iconMed" />
        </div>

        {recipeByID.vegetarian == 'false' && (
          <div className="btnRecipe">
            <p>Veg</p>
          </div>
        )}
      </div>
      <div
        className="text-xs sm:text-sm md:text-base font-light
       bg-white p-10 text-gray-600 rounded-md shadow-md space-y-3">
        {/* Description */}
        <div
          className="text-center"
          dangerouslySetInnerHTML={{ __html: recipeByID.summary }}></div>

        {/* Ingredients */}
        <div className="space-y-4 pt-5">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
            Ingredients
          </h1>
          <ul className="list-disc space-y-2">
            {ingredients?.map((ing) => {
              return (
                <div>
                  <li className="">{ing.original}</li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default recipeById;
