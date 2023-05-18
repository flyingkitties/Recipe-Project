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
import { BsDot } from 'react-icons/bs';
import { AiOutlineFire, AiOutlineLike, AiOutlineHeart } from 'react-icons/ai';
import { Transition } from '@headlessui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Footer from '@/components/Footer';

function recipeById() {
  const router = useRouter();

  const [recipeByID, setRecipeById] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [diets, setdiets] = useState([]);
  const [similarRecipeById, setSimilarRecipeById] = useState([]);
  const [imageId, setimageId] = useState([]);

  const [userDrop, setUserDrop] = useState(false);

  const handleUserDrop = () => {
    setUserDrop(!userDrop);
  };

  useEffect(() => {
    console.log('going to the top');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const getRecipeById = async (id) => {
    const recipeId = router.query.recipeId;
    const api = await axios.get(`../api/recipeId/`, {
      params: {
        number: '20',
        addRecipeInformation: 'true',
        recipeId: id,
      },
    });
    setimageId(api.data);
    console.log(api.data);
    return api.data;
  };

  const {
    data: data,
    isLoading: isLoading,
    error: error,
  } = useQuery({
    queryKey: ['RecipeID', router.query.recipeId],
    queryFn: () =>
      axios
        .get(`../api/recipeId/`, {
          params: {
            number: '20',
            addRecipeInformation: 'true',
            recipeId: router.query.recipeId,
          },
        })
        .then((res) => res.data),
    onSuccess: (data) => {
      setRecipeById(data);
      setNutrition(data.nutrition.nutrients);
      setIngredients(data.extendedIngredients);
      setdiets(data.diets);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  });

  const {
    data: similarRecipes,
    isLoading: loadingSimilar,
    error: errorSimilar,
  } = useQuery({
    queryKey: ['SimilarByID', router.query.recipeId],
    queryFn: () =>
      axios
        .get(`../api/similarRecipes/`, {
          params: {
            number: '4',
            recipeId: router.query.recipeId,
            limitLicense: 'true',
          },
        })
        .then((res) => res.data),
    onSuccess: (similarRecipes) => {
      setSimilarRecipeById(similarRecipes);
    },
  });

  // const recipeId = similarRecipes?.id;
  // console.log('array of ids', recipeId);

  // function useImage(imageId) {
  //   console.log(imageId);
  //   return useQuery(['Image Id', imageId], () => getRecipeData(imageId), {
  //     enabled: !!imageId,
  //   });
  // }

  // const recipeId = similarRecipes?.map((id, i) => {
  //   console.log(id.id);

  //   return useQuery(['Image Id', imageId], () => getRecipeData(id.id), {
  //     enabled: !!imageId,
  //   });
  // });

  // const {data: idsData}

  // const {
  //   status,
  //   fetchStatus,
  //   data: dataImageId,
  // } = useQueries({
  //   queries: recipeId?.map((id, i) => {
  //     return {
  //       queryKey: ['ImagesId', id],
  //       queryFn: () =>
  //         axios
  //           .get(`../api/recipeId/`, {
  //             params: {
  //               number: '20',
  //               addRecipeInformation: 'true',
  //               recipeId: id,
  //             },
  //           })
  //           .then((res) => res.data),
  //       onSuccess: (data) => {
  //         setRecipeImageById(data);
  //         console.log('log data image by id:', data);
  //       },
  //       enabled: !!recipeId,
  //     };
  //   }),
  // });

  // if (isLoading) return 'loading Data';
  // if (loadingSimilar) return 'Loading Similar Recipes';

  // if (data.error) return 'an error has occurred:' + data.error.message;
  // if (errorSimilar) return 'an error has occurred:' + errorSimilar.message;

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['RecipeID', router.query.recipeId],
  //   queryFn: getRecipeData,
  //   onSuccess: (data) => {
  //     setRecipeById(data);
  //     setNutrition(data.nutrition.nutrients);
  //     setIngredients(data.extendedIngredients);
  //     setdiets(data.diets);

  //     if (data?.length === 0) {
  //       toast.error('Oops, no recipes found! Try again!');
  //     }
  //   },
  //   onError: (e) => {
  //     console.log('error', e);
  //   },
  // });

  // const { similar } = useQuery({
  //   queryKey: ['SimilarByID', router.query.recipeId],
  //   queryFn: getSimilarRecipes,
  //   onSuccess: (similar) => {
  //     console.log('success');
  //     setSimilarRecipeById(similar);
  //     console.log('similar:', similar);

  //     // console.log(data.analyzedInstructions);

  //     if (similar?.length === 0) {
  //       toast.error('Oops, no recipes found! Try again!');
  //     }
  //   },
  //   onError: (e) => {
  //     console.log('error', e);
  //   },
  // });

  // if (isLoading) {
  //   return <p>Loading ...</p>;
  // }

  return (
    <div className="bg-gray-100">
      <div className="px-5 sm:px-8 md:px-10 lg:px-32 pt-10">
        <div className=" relative flex  bg-white rounded-md shadow-md">
          {/* Left Section */}
          <div className="flex object-cover w-[240px] h-[150px] md:w-[312px] md:h-[231px] lg:w-[480px] lg:h-[360px] shrink-0 ">
            {recipeByID.image ? (
              <Image
                className="rounded-l-md"
                src={recipeByID?.image}
                loading="eager"
                width={480}
                height={360}
                alt="Breakfast image"
              />
            ) : (
              <div></div>
            )}
          </div>
          {/* Right Section */}
          <div className="sm:px-2 md:px-3 lg:px-5 w-full ">
            <h1 className=" text-xl sm:text-2xl md:text-3xl lg:text-5xl titleFont my-2 lg:my-5 tracking-wide line-clamp-2">
              {recipeByID?.title}
            </h1>

            <div className="text-gray-600 space-y-1 md:space-y-2 lg:space-y-5 sm:pt-2 p-1 md:pt-3 lg:pt-5">
              <div className="flex space-x-1 items-center ">
                <ClockIcon className="h-3 w-3" />
                <p className="text-xs md:text-sm lg:text-base font-light">
                  {' '}
                  Ready in:{' '}
                  <span className="font-semibold">
                    {recipeByID?.readyInMinutes} min
                  </span>
                </p>
              </div>

              <div className="flex space-x-1 items-center">
                <UserIcon className="h-3 w-3" />
                <p className="text-xs md:text-sm lg:text-base font-light">
                  Serves:{' '}
                  <span className="font-semibold">{recipeByID?.servings}</span>
                </p>
              </div>
              <div className="flex space-x-1 items-center">
                <MdLabelOutline className="h-3 w-3" />
                <p className="text-xs md:text-sm lg:text-base font-light">
                  Source:{' '}
                  {recipeByID?.sourceUrl ? (
                    <Link href={recipeByID?.sourceUrl}>
                      <span className="font-semibold link">
                        {recipeByID?.sourceName}
                      </span>
                    </Link>
                  ) : (
                    <span className="font-semibold link">
                      {recipeByID?.sourceName}
                    </span>
                  )}
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
                      <div className="grid grid-cols-3 grid-row-3 gap-2 sm:gap-3 md:gap-5 lg:gap-6 p-3 cursor-pointer ">
                        {nutrition?.map((nutrients, i) => {
                          if (i < 9) {
                            return (
                              <div
                                className=" space-y-2 p-2 items-center place-content-center bg-gray-200 text-center text-xs font-light"
                                key={nutrients.name}>
                                <p className="">{nutrients.name} </p>
                                <p className="font-semibold">
                                  {nutrients.amount} {nutrients.unit}
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
        <div className="flex pt-4 pb-2 space-x-10 ">
          <div className="btnRecipe ">
            <AiOutlineLike className="iconMed" />
          </div>
          <div className="btnRecipe">
            <AiOutlineHeart className="iconMed" />
          </div>
          <div className="btnRecipe">
            <FaRegCommentDots className="iconMed" />
          </div>
        </div>
        {/* This recipe is... */}
        {!diets || diets != undefined ? (
          <div
            className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 text-gray-600 rounded-md shadow-md my-2">
            <div className="space-y-4 ">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
                This Recipe Is...
              </h1>
              <div className="grid grid-rows-2 grid-flow-col gap-1 ">
                {diets.map((diet, i) => {
                  return (
                    <Link href={`/search/${diet}`}>
                      <div
                        key={diet}
                        className=" flex-grow lex space-x-1 text-center items-center btnRecipeGray capitalize tracking-wide">
                        <p>{diet}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {/* Description */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white p-10 text-gray-600 rounded-md shadow-md my-2">
          <div
            className="text-center tracking-wide"
            dangerouslySetInnerHTML={{ __html: recipeByID.summary }}></div>
        </div>

        {/* Ingredients */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 text-gray-600 rounded-md shadow-md my-2">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Ingredients
            </h1>
            <ul className="list-disc space-y-2 tracking-wide ">
              {ingredients?.map((ing) => {
                return (
                  <div>
                    <li key={ing.id} className="">
                      {ing.original}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Method */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 text-gray-600 rounded-md shadow-md my-2 mt-5">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Method
            </h1>

            <div
              className="list-disc space-y-5 tracking-wide"
              dangerouslySetInnerHTML={{
                __html: recipeByID.instructions,
              }}></div>
          </div>
        </div>
        {/* Buttons  */}
        <div className="flex py-2 space-x-10 ">
          <div className="btnRecipe ">
            <AiOutlineLike className="iconMed" />
          </div>
          <div className="btnRecipe">
            <AiOutlineHeart className="iconMed" />
          </div>
          <div className="btnRecipe">
            <FaRegCommentDots className="iconMed" />
          </div>
        </div>

        {/* Similar Recipes */}
        <div
          className="text-xs sm:text-sm md:text-base
         font-light bg-white px-10 py-5 text-gray-600 
         rounded-md shadow-md my-2 mt-2">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              You May Also Like
            </h1>

            <div
              className="flex overflow-x-scroll  space-x-4 
             scrollbar-thin scrollbar-track-gray-600/20  scrollbar-thumb-[#f7ab0a]/70  
">
              {similarRecipeById?.map((recipe) => {
                return (
                  <Link href={`recipe/${recipe?.id}`}>
                    <div
                      key={recipe.id}
                      className=" bg-white p-2 cursor-pointer w-[250px]
               hover:border-2 hover:border-gray-200 hover:rounded-md
                hover:shadow-lg flex-grow
                ">
                      <div
                        className="flex justify-center content-center 
              items-center object-cover">
                        <Image
                          className="object-cover rounded-md  "
                          loading="eager"
                          width={312}
                          height={150}
                          src={recipe.image}
                          alt="image"
                        />
                      </div>

                      <div className=" pt-2 text-gray-600">
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
                          <p className="text-sm font-light">
                            {recipe.servings}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        {/* Comments */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 text-gray-600 rounded-md shadow-md my-2">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Comments
            </h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default recipeById;
