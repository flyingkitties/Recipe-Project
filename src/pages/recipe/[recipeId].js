/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-one-expression-per-line */
import { useRouter } from 'next/router';
import React, { Fragment, useRef, useState } from 'react';
import axios from 'axios';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Tooltip, Typography } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';
import { MdLabelOutline } from 'react-icons/md';
import { FaRegCommentDots } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import {
  AiOutlineSend,
  AiOutlineLike,
  AiOutlineHeart,
  AiFillLike,
  AiFillHeart,
} from 'react-icons/ai';
import { Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import ReactTimeago from 'react-timeago';
import Footer from '../../components/Footer';

function recipeById() {
  const router = useRouter();
  const { data: session } = useSession();

  const ref = useRef(null);

  const [userDrop, setUserDrop] = useState(false);
  const [recipeByID, setRecipeById] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [diets, setdiets] = useState([]);
  const [similarRecipeById, setSimilarRecipeById] = useState([]);
  const [recipeDb, setRecipeDb] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(false);
  const [favourites, setFavourites] = useState(false);

  const handleUserDrop = () => {
    setUserDrop(!userDrop);
  };

  const handleScroll = () => {
    ref.current?.scrollIntoView({ behaviour: 'smooth' });
  };

  // Get Comments
  const {
    data: commentListData,
    isLoading: commentIsLoading,
    error: commentError,
    refetch,
  } = useQuery({
    queryKey: ['getCommentList', recipeDb.id],
    enabled: !!recipeDb?.id,
    queryFn: () =>
      axios
        .get('../api/postDB/comment/', {
          params: {
            post_id: recipeDb?.id,
          },
        })
        .then((res) => res.data),
    retry: 3,
    onSuccess: (commentListData) => {
      setComments(commentListData);
    },
  });

  // Get Likes
  const {
    data: likedData,
    isLoading: likesIsLoading,
    error: likesError,
    // refetch,
  } = useQuery({
    queryKey: ['getLiked', recipeDb.id],
    enabled: !!router.query.recipeId && !!session?.user?.email,
    queryFn: () =>
      axios
        .get('../api/postDB/like/', {
          params: {
            post_id: recipeDb.id,
            email: session?.user?.email,
          },
        })
        .then((res) => res.data),
    retry: 3,
    keepPreviousData: true, // to keep data boxes until new data is fetched
    onSuccess: (likedData) => {
      setLikes(likedData);
      console.log('🚀 ~ likedData when getting', likedData);
    },
  });

  // Get Favourites
  const {
    data: favouriteData,
    isLoading: favouriteIsLoading,
    error: favouriteError,
    // refetch,
  } = useQuery({
    queryKey: ['getFavourite', recipeDb.id],
    enabled: !!router.query.recipeId && !!session?.user?.email,
    queryFn: () =>
      axios
        .get('../api/postDB/favourite/', {
          params: {
            post_id: recipeDb.id,
            email: session?.user?.email,
          },
        })
        .then((res) => res.data),
    retry: 3,
    keepPreviousData: true, // to keep data boxes until new data is fetched
    onSuccess: (favouriteData) => {
      setFavourites(favouriteData);
      console.log('🚀 ~ Favourite Data when getting', favouriteData);
    },
  });

  const addPostToDb = async (data) => {
    const database = await axios.post('../api/postDB/postPost/', {
      data: {
        external_id: data?.id,
        username: session?.user?.email,
        title: data?.title,
        image: data?.image,
        ingredients: data?.extendedIngredients,
        method: data?.instructions,
      },
    });
    const dbData = database.data;
    setRecipeDb(dbData);
    // await getCommentList(dbData);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['RecipeID', router.query.recipeId],
    queryFn: () =>
      axios
        .get('../api/recipeId/', {
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
      addPostToDb(data);
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
        .get('../api/similarRecipes/', {
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

  // Add Likes to the dataBase
  const handleLike = async () => {
    console.log('Likes before change', likes);
    setLikes((prev) => !prev); // faster way of getting previous value
    await axios
      .post('../api/postDB/like/', {
        data: {
          post_id: recipeDb.id,
          username: session?.user?.email,
          liked: likes,
        },
      })
      .then((res) => res.data)
      .catch((e) => setLikes((prev) => !prev));
  };

  // Add Favourites to the dataBase
  const handleFavourite = async () => {
    console.log('Favourites before change', favourites);
    setFavourites((prev) => !prev); // faster way of getting previous value
    await axios
      .post('../api/postDB/favourite/', {
        data: {
          post_id: recipeDb.id,
          username: session?.user?.email,
          favouriteSaved: favourites,
        },
      })
      .then((res) => res.data)
      .catch((e) => setFavourites((prev) => !prev), console.log('error Faves'));
  };

  // Add Comments to DataBase
  const AddComment = async (dataComment) => {
    await axios
      .post('../api/postDB/comment/', {
        data: {
          post_id: recipeDb.id,
          username: session?.user?.name,
          text: dataComment.comment,
        },
      })
      .then((res) => res.data);
  };

  // Handle Comment submit
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataComment) => {
    const notification = toast.loading('Posting your comment...');
    await AddComment(dataComment);
    setValue('comment', '');
    toast.success('comment sucessfully posted!', {
      id: notification,
    });
    refetch();
  };

  return (
    <div className="bg-gray-100">
      <div className="px-5 sm:px-8 md:px-10 lg:px-32 pt-10">
        <div className=" relative flex  bg-white rounded-md shadow-md">
          {/* Left Section */}
          <div
            className="flex object-cover w-[160px] h-[150px] sm:w-[240px] md:w-[312px]
          md:h-[231px] lg:w-[480px] lg:h-[360px] shrink-0 "
          >
            {recipeByID.image && (
              <Image
                className="rounded-l-md object-cover"
                src={recipeByID?.image}
                loading="eager"
                width={480}
                height={360}
                alt="Recipe Image"
                priority
              />
            )}
          </div>
          {/* Right Section */}
          <div
            className="flex flex-col pb-1 px-2 md:px-3 lg:px-5 w-full h-[150px]
          md:h-[231px] lg:h-[360px] place-content-evenly"
          >
            <Tooltip
              className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
              placement="top-end"
              content={
                recipeByID?.title ? (
                  <Typography
                    color="gray"
                    className="font-medium"
                  >
                    {recipeByID?.title}
                  </Typography>
                ) : null
              }
            >
              <h1
                className=" text-base sm:text-xl md:text-3xl lg:text-5xl
            titleFont tracking-wide line-clamp-2 pb-1 pl-1"
              >
                {recipeByID?.title}
              </h1>
            </Tooltip>
            <div
              className=" text-gray-600 space-y-1 md:space-y-2 lg:space-y-5
             "
            >
              <div className="flex space-x-1 items-center ">
                <ClockIcon className="h-3 w-3" />
                <p className="text-[10px]  md:text-sm lg:text-base font-light">
                  {' '}
                  Ready in:{' '}
                  <span className="font-semibold">
                    {recipeByID?.readyInMinutes} min
                  </span>
                </p>
              </div>

              <div className="flex space-x-1 items-center">
                <UserIcon className="h-3 w-3" />
                <p className="text-[10px] md:text-sm lg:text-base font-light">
                  Serves:{' '}
                  <span className="font-semibold">{recipeByID?.servings}</span>
                </p>
              </div>
              <div className="flex space-x-1 items-center">
                <MdLabelOutline className="h-3 w-3" />
                <p className="text-[10px] md:text-sm lg:text-base font-light">
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
              <div className="flex items-center space-x-1 lg:pt-4 md:pt-1">
                <div
                  className="flex btnRecipeFlat text-center items-center space-x-1 "
                  onClick={handleUserDrop}
                  onKeyDown={handleUserDrop}
                  role="button"
                  tabIndex="0"
                >
                  <p className="text-[10px] md:text-sm lg:text-base font-light ">
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
                    show
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className=" absolute top-[100%] right-0 -left-1 p-1 bg-white  rounded-md shadow-2xl border-[0.01px] border-gray-200 z-20 ">
                      <div className="grid grid-cols-3 grid-row-3 gap-2 sm:gap-3 md:gap-5 lg:gap-6 p-3 cursor-pointer ">
                        {nutrition?.map((nutrients, i) => {
                          if (i < 9) {
                            return (
                              <div
                                className=" space-y-2 p-2 items-center place-content-center bg-gray-200 text-center text-xs font-light"
                                key={nutrients?.name}
                              >
                                <p className="">{nutrients?.name}</p>
                                <p className="font-semibold">
                                  {nutrients?.amount}
                                  {nutrients?.unit}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </Transition>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons  */}
        <div className="flex pt-2 pb-2 space-x-10 mt-2 ">
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                {`${likes ? 'Unlike' : 'Like'}`}
              </Typography>
            }
          >
            <button
              onClick={handleLike}
              className={` ${likes ? 'btnRecipeWhite' : 'btnRecipe'}`}
              type="button"
            >
              {likes ? (
                <AiFillLike className="iconMed text-orange-800" />
              ) : (
                <AiOutlineLike className="iconMed" />
              )}
            </button>
          </Tooltip>
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                {`${
                  favourites ? 'Remove from Favourites' : 'Add to Favourites'
                }`}
              </Typography>
            }
          >
            <button
              onClick={handleFavourite}
              className={` ${favourites ? 'btnRecipeWhite' : 'btnRecipe'}`}
              type="button"
            >
              {favourites ? (
                <AiFillHeart className="iconMed text-orange-800" />
              ) : (
                <AiOutlineHeart className="iconMed" />
              )}
            </button>
          </Tooltip>

          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                Comment
              </Typography>
            }
          >
            <button
              onClick={handleScroll}
              className="btnRecipe"
              type="button"
            >
              <FaRegCommentDots className="iconMed" />
            </button>
          </Tooltip>
        </div>

        {/* Description */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white p-10 text-gray-600 rounded-md shadow-md my-2"
        >
          <div
            className="text-justify tracking-wide "
            dangerouslySetInnerHTML={{ __html: recipeByID.summary }}
          />
        </div>
        {/* This recipe is... */}
        {(!diets || diets !== undefined) && (
          <div
            className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-5 text-gray-600 rounded-md shadow-md my-2"
          >
            <div className="space-y-4 ">
              <h1
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
              font-semibold text-orange-400"
              >
                This Recipe Is...
              </h1>
              <div className="grid grid-rows-2 lg:grid-rows-1 grid-flow-col gap-1 ">
                {diets?.map((diet, i) => (
                  <Link
                    href={`/search/${diet}`}
                    key={diet}
                  >
                    <div className=" flex-grow lex space-x-1 text-center items-center btnRecipeGray capitalize tracking-wide">
                      <p>{diet}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ingredients */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2"
        >
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Ingredients
            </h1>
            <ul className="list-disc space-y-2 tracking-wide ">
              {ingredients?.map((ing) => (
                <div key={ing?.original}>
                  <li className="">{ing?.original}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
        {/* Method */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2 "
        >
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Method
            </h1>

            <div
              className="list-disc space-y-5 tracking-wide text-justify"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: recipeByID.instructions,
              }}
            />
          </div>
        </div>
        {/* Buttons  */}
        <div className="flex pt-2 pb-2 space-x-10 mt-2 ">
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                {`${likes ? 'Unlike' : 'Like'}`}
              </Typography>
            }
          >
            <button
              onClick={handleLike}
              className={` ${likes ? 'btnRecipeWhite' : 'btnRecipe'}`}
              type="button"
            >
              {likes ? (
                <AiFillLike className="iconMed text-orange-800" />
              ) : (
                <AiOutlineLike className="iconMed" />
              )}
            </button>
          </Tooltip>
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                {`${
                  favourites ? 'Remove from Favourites' : 'Add to Favourites'
                }`}
              </Typography>
            }
          >
            <button
              onClick={handleFavourite}
              className={` ${favourites ? 'btnRecipeWhite' : 'btnRecipe'}`}
              type="button"
            >
              {favourites ? (
                <AiFillHeart className="iconMed text-orange-800" />
              ) : (
                <AiOutlineHeart className="iconMed" />
              )}
            </button>
          </Tooltip>

          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                Comment
              </Typography>
            }
          >
            <button
              onClick={handleScroll}
              className="btnRecipe"
              type="button"
            >
              <FaRegCommentDots className="iconMed" />
            </button>
          </Tooltip>
        </div>

        {/* Similar Recipes */}
        <div
          className="text-xs sm:text-sm md:text-base
         font-light bg-white px-10 py-5 text-gray-600
         rounded-md shadow-md my-2 mt-2"
        >
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              You May Also Like
            </h1>

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
          </div>
        </div>
        {/* Comments */}
        <div
          ref={ref}
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 text-gray-600 rounded-md shadow-md my-2"
        >
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Comments
            </h1>
          </div>
          <div className=" relative text-gray-600 mt-5 mb-1">
            <p className="text-sm">
              Comment as{' '}
              <span className="text-orange-400 font-light">
                {' '}
                {session?.user.name}{' '}
              </span>
            </p>

            {/* Comment Form */}
            <form
              className="flex flex-col space-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <textarea
                {...register('comment', { maxLength: 500, required: true })}
                disabled={!session}
                className="h-24 rounded-lg bg-gray-100  p-2
          pl-4 outline-none text-gray-600 w-full font-light "
                placeholder={session ? 'Write a comment...' : 'Please sign in'}
              />

              <button
                type="submit"
                className="text-orange-400 disabled:text-gray-200
                 absolute top-16 right-1 group"
              >
                <AiOutlineSend className="iconMed group-hover:hidden" />
                <IoMdSend className="iconMed hidden group-hover:block" />
              </button>

              {errors.comment?.type === 'required' &&
                toast.error('Comment is required', {
                  id: 'comment required',
                })}
            </form>
          </div>
          {/* List of Comments */}
          <div className="mt-5">
            {comments.map((commentLine) => (
              <div
                className=" flex  space-x-2  m-2"
                key={commentLine?.id}
              >
                <div className="flex items-start pt-1 ">
                  <Image
                    src={`https://avatars.dicebear.com/api/open-peeps/ 
    ${commentLine?.username || 'placeholder'}.svg`}
                    width={30}
                    height={30}
                    className="rounded-full cursor-pointer "
                    alt="User Image"
                  />
                </div>
                <div className="flex flex-col px-3 pt-2 pb-3 rounded-lg bg-gray-100 flex-grow">
                  <p className="pb-2 text-xs text-gray-400">
                    <span className="font-semibold text-gray-600">
                      {commentLine?.username}
                    </span>{' '}
                    • <ReactTimeago date={commentLine?.created_at} />
                  </p>
                  <p className="text-gray-600">{commentLine?.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default recipeById;
