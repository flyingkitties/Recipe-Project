import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  HandThumbUpIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import classNames from 'classnames';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { MdLabelOutline, MdOutlineSend, MdSend } from 'react-icons/md';
import { RiSendPlaneFill, RiSendPlaneLine } from 'react-icons/ri';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsSendFill, BsSend } from 'react-icons/bs';
import { IoMdSend, IoSend, IoNutritionOutline } from 'react-icons/io';
import {
  AiOutlineFire,
  AiOutlineSend,
  AiOutlineLike,
  AiOutlineHeart,
} from 'react-icons/ai';
import { Transition } from '@headlessui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useSession } from 'next-auth/react';
import { comment } from 'postcss';
import TimeAgo from 'react-timeago';
import ReactTimeago from 'react-timeago';
import { useForm } from 'react-hook-form';

function create() {
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const [ingredientsInput, setIngredientsInput] = useState([
    { ingredient: '' },
  ]);
  const { data: session, status } = useSession();

  const dietOptions = [
    { value: 'Vegetarian', label: 'Vegetarian' },
    { value: 'Keto', label: 'Keto' },
    { value: 'Gluten Free', label: 'Gluten Free' },
    { value: 'Pescetarian', label: 'Pescetarian' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Paleo', label: 'Paleo' },
  ];
  const animatedComponents = makeAnimated();

  const handleIngredientChange = (i, e) => {
    let newIngredientInput = [...ingredientsInput];
    newIngredientInput[i][e.target.name] = e.target.value;
    setIngredientsInput(newIngredientInput);
  };

  let handleAddIngredient = () => {
    setIngredientsInput([...ingredientsInput, { ingredient: '' }]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="bg-gray-100">
      {/* Page title */}
      <div className="py-[10%] lg:py-[7%] text-center ">
        <h1 className="text-4xl sm:text-[50px] md:text-[60px] lg:text-[80px] font-bold titleFont ">
          Create a Recipe
        </h1>
      </div>
      {/* Body */}
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="px-5 sm:px-10 md:px-14 lg:px-36">
        <div className=" relative flex bg-white rounded-md shadow-md">
          {/* Left Section */}
          {/* Image */}
          <div
            className="flex object-cover w-[100px] sm:w-[240px] h-[150px] md:w-[270px] 
          md:h-[231px] lg:h-[360px] lg:w-[390px] xl:w-[480px] shrink-0 items-center 
          justify-center space-x-1 ">
            <div
              className="flex group items-center 
          justify-center hoverGray">
              <div>
                <div
                  className="flex items-center justify-center"
                  onClick={() => setImageBoxOpen(!imageBoxOpen)}>
                  {imageBoxOpen ? (
                    <MinusIcon
                      className="iconSmall  group-hover:transition-transform 
                      group-hover:rotate-180 "
                    />
                  ) : (
                    <PlusIcon
                      className="iconSmall  group-hover:transition-transform 
                      group-hover:rotate-180 "
                    />
                  )}
                  <p className="lg:text-lg">Image</p>
                </div>
                {/* Image URL */}
                <div
                  className={`flex absolute top-0 right-0 left-[100px] sm:left-[240px] md:left-[270px]
                  lg:left-[390px] xl:left-[480px]
          h-full bg-white items-center justify-center ${
            imageBoxOpen === false && 'hidden'
          }`}>
                  <div className={`w-full mr-10`}>
                    <div
                      className="flex w-full items-center mb-2
          justify-center text-xs sm:text-sm md:text-base font-light ">
                      <input
                        {...register('image', { required: true })}
                        className="pl-3 w-full rounded-md shadow-sm 
                        lg:p-3 md:p-2 p-1 border border-gray-600 hover:border-gray-500 
                 outline-none  text-gray-800  focus:border-orange-400 "
                        type="text"
                        placeholder="Add an Image URL"
                      />
                      {errors.image && <p>Image is required</p>}
                    </div>
                    <div
                      className="flex items-center justify-center  "
                      onClick={() => {
                        setImageBoxOpen(false);
                        event.preventDefault();
                      }}>
                      <button className="btnRecipe px-5">Submit Image</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div
            className="flex flex-col mr-10 pl-1 sm:pl-2 md:pl-3 lg:pl-5 w-full h-[150px]  
          md:h-[231px] lg:h-[360px] place-content-evenly">
            {/* Title */}
            <div className="">
              <input
                {...register('title', { required: true })}
                className=" w-full rounded-md lg:p-3 md:p-2 p-1 pl-3
                text-base sm:text-xl md:text-2xl lg:text-3xl
                 titleFont tracking-wide border border-gray-600 hover:border-gray-500 
                 outline-none  text-gray-800  focus:border-orange-400"
                type="text"
                placeholder="Title..."
              />
              {errors.title && <p>Title is required</p>}
            </div>
            <div
              className=" text-gray-600 space-y-1 md:space-y-2 lg:space-y-5
             ">
              {/* Ready In */}
              <div className="flex space-x-1 items-center ">
                <ClockIcon className="h-3 w-3" />
                <p className="text-[10px]  md:text-sm lg:text-base font-light">
                  Ready in:{' '}
                </p>
                <div className="text-[10px] md:text-sm lg:text-base font-light">
                  <input
                    {...register('readyInMinutes', { required: true })}
                    className="md:p-1 p-[2px] text-center 
                    border border-gray-600 hover:border-gray-500 
                 outline-none text-gray-800 rounded-md focus:border-orange-400
                 required:border-red-400"
                    type="text"
                    placeholder="Preparation Time..."
                  />
                  {errors.readyInMinutes && <p>Ready in is required</p>} min
                </div>
              </div>
              {/* Servings  */}
              <div className="flex space-x-1 items-center">
                <UserIcon className="h-3 w-3" />
                <p className="text-[10px] md:text-sm lg:text-base font-light">
                  Serves:{' '}
                </p>
                <div className="text-[10px] md:text-sm lg:text-base font-light">
                  <input
                    {...register('servings', { required: true })}
                    className=" md:p-1 p-[2px] text-center 
                    border border-gray-600 hover:border-gray-500 
                 outline-none text-gray-800 rounded-md  focus:border-orange-400 "
                    type="text"
                    placeholder="Number of people..."
                  />
                  {errors.servings && <p>Servings is required</p>}
                </div>
              </div>
              <div className="flex space-x-1 items-center">
                <MdLabelOutline className="h-3 w-3" />
                <p className="text-[10px] md:text-sm lg:text-base font-light">
                  Source: {session?.user.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Description */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white p-10 text-gray-600 rounded-md shadow-md my-2">
          <div className="text-justify tracking-wide ">
            <div className=" ">
              <textarea
                {...register('summary', { required: true })}
                className="h-24  border border-gray-600 hover:border-gray-500 
                 outline-none text-gray-800 rounded-md  p-2
          pl-4 w-full font-light  focus:border-orange-400"
                placeholder="Write a description..."
              />
              {errors.summary && <p>Description is required</p>}
            </div>
          </div>
        </div>
        {/* This recipe is... */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2">
          <div className="space-y-4 ">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 
              font-semibold text-orange-400">
              This Recipe Is...
            </h1>
            <div className="">
              <Select
                {...register('diets')}
                classNames="rounded-md"
                options={dietOptions}
                components={animatedComponents}
                isMulti
                o
                name="diets"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? 'orange' : 'gray',
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: '0.375rem',
                  colors: {
                    ...theme.colors,
                    primary25: 'orange-300',
                    primary: 'gray-600',
                    primary75: '',
                  },
                })}
              />
              {errors.diets && <p>Error</p>}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Ingredients
            </h1>
            <div className="grid grid-rows-2 lg:grid-rows-1 grid-flow-col gap-1 ">
              {/* List of ingredients TODO */}
              <button type="button" onClick={() => handleAddIngredient()}>
                <PlusCircleIcon className="iconMed" />
              </button>

              {ingredientsInput.map((ingredient, i) => {
                <div>
                  <input
                    {...register('ingredients', { required: true })}
                    onChange={(e) => handleIngredientChange(index, e)}
                    className="pl-3 rounded-md shadow-sm lg:p-3 md:p-2 p-1 border
                border-gray-600 hover:border-gray-500 outline-none 
                text-gray-800  focus:border-orange-400"
                    type="text"
                    placeholder="Add an ingrediet (e.g. 1 cup Flour)"
                    value={ingredient.ingredient}
                    name="ingredient"
                  />
                  {errors.ingredients && <p>Ingredient is required</p>}
                </div>;
              })}
            </div>
          </div>
        </div>
        {/* Method */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2 ">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Method
            </h1>

            <div className="list-disc space-y-5 tracking-wide text-justify">
              <textarea
                {...register('instructions', { required: true })}
                className="h-24  border border-gray-600 hover:border-gray-500 
                 outline-none text-gray-800 rounded-md  p-2
          pl-4 w-full font-light  focus:border-orange-400 "
                placeholder="Write the method step by step..."
              />
              {errors.instructions && <p>Method is required</p>}
            </div>
          </div>
        </div>
        <div className="pb-10">
          <button className="btnRecipe w-full">Create Recipe</button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default create;
