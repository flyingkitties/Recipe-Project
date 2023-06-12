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
import { useForm } from 'react-hook-form';
import { comment } from 'postcss';
import TimeAgo from 'react-timeago';
import ReactTimeago from 'react-timeago';

function create() {
  const [imageBoxOpen, setImageBoxOpen] = useState(false);
  const { data: session, status } = useSession();
  return (
    <div className="bg-gray-100">
      {/* Page title */}
      <div className="pt-[10%] pb-[10%] text-center ">
        <h1 className="text-4xl sm:text-[50px] md:text-[60px] lg:text-[80px] font-bold titleFont ">
          Create a Recipe
        </h1>
      </div>
      {/* Body */}
      <form className="px-5 sm:px-8 md:px-10 lg:px-32">
        <div className=" relative flex bg-white rounded-md shadow-md">
          {/* Left Section */}
          {/* Image */}
          <div
            className="flex object-cover w-[100px] sm:w-[240px] h-[150px] md:w-[270px] 
          md:h-[231px] lg:h-[360px] shrink-0 items-center 
          justify-center space-x-1 ">
            <div
              className="flex group items-center 
          justify-center hoverGray">
              {!imageBoxOpen ? (
                <div
                  className="flex items-center 
          justify-center"
                  onClick={() => setImageBoxOpen(!imageBoxOpen)}>
                  {' '}
                  <PlusIcon
                    className="iconSmall group-hover:transition-transform 
                    group-hover:rotate-90 "
                  />
                  <p>Image</p>
                </div>
              ) : (
                <div>
                  <div
                    className="flex items-center 
          justify-center"
                    onClick={() => setImageBoxOpen(!imageBoxOpen)}>
                    <MinusIcon
                      className="iconSmall  group-hover:transition-transform 
 group-hover:rotate-180 "
                    />
                    <p>Image</p>
                  </div>

                  <div
                    className="flex absolute top-0 right-0 left-[100px] sm:left-[240px]  md:left-[270px]
          h-full bg-white items-center 
          justify-center">
                    <div className="w-full px-3">
                      <div
                        className="flex w-full items-center 
          justify-center">
                        <input
                          className="m-2 bg-gray-100 w-full rounded-3xl lg:p-3 md:p-2  p-1 outline-none"
                          type="text"
                          placeholder="Add an Image URL"
                        />
                      </div>
                      <div
                        className="flex w-full items-center 
          justify-center px-10 md:px-20 lg:px-28 xl:px-36">
                        <button
                          onClick={() => setImageBoxOpen(!imageBoxOpen)}
                          className="btnRecipe w-full ">
                          Submit Image
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* {!imageBoxOpen ? (
              <div
                className="flex group items-center 
          justify-center hoverGray"
                onClick={() => setImageBoxOpen(!imageBoxOpen)}>
                <PlusIcon className="iconSmall  group-hover:transition-transform group-hover:rotate-90 " />
                <p>Image</p>
              </div>
            ) : (
              <div>
               
                <div
                  className="flex group items-center 
          justify-center hoverGray"
                  onClick={() => setImageBoxOpen(!imageBoxOpen)}>
                  <MinusIcon className="iconSmall  group-hover:transition-transform group-hover:rotate-90 " />
                  <p>Image</p>
                </div>

                <div>
                  <p>Image URL:</p>

                  <input
                    className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                    type="text"
                    placeholder="Add an Image URL"
                  />
                </div>
              </div>
            )} */}
            </div>
          </div>

          {/* Right Section */}
          <div
            className="flex flex-col px-1 sm:px-2 md:px-3 lg:px-5 w-full h-[150px]  
          md:h-[231px] lg:h-[360px] place-content-evenly">
            <h1
              className=" text-base sm:text-xl md:text-3xl lg:text-5xl 
            titleFont tracking-wide line-clamp-2">
              {/* TODO */}
              Title here
            </h1>

            <div
              className=" text-gray-600 space-y-1 md:space-y-2 lg:space-y-5
             ">
              <div className="flex space-x-1 items-center ">
                <ClockIcon className="h-3 w-3" />
                <p className="text-[10px]  md:text-sm lg:text-base font-light">
                  {' '}
                  Ready in:{' '}
                  <span className="font-semibold">
                    {/* Ready in how many min TODO */}
                    min
                  </span>
                </p>
              </div>

              <div className="flex space-x-1 items-center">
                <UserIcon className="h-3 w-3" />
                <p className="text-[10px] md:text-sm lg:text-base font-light">
                  Serves:{' '}
                  <span className="font-semibold">
                    {/* Serves how many TODO */}
                  </span>
                </p>
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
            {/* Description TODO */}
            description
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
            <div className="grid grid-rows-2 lg:grid-rows-1 grid-flow-col gap-1 ">
              {/* Diet option to choose from TODO */}
              <Link href={`/`}>
                <div
                  // key={}
                  className=" flex-grow lex space-x-1 text-center items-center btnRecipeGray capitalize tracking-wide">
                  <p>Choose type of diets</p>
                </div>
              </Link>
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
            <ul className="list-disc space-y-2 tracking-wide ">
              {/* List of ingredients TODO */}

              <li
                //  key={ing.id}
                className="">
                List of ingredients
              </li>
            </ul>
          </div>
        </div>
        {/* Method */}
        <div
          className="text-xs sm:text-sm md:text-base font-light
       bg-white px-10 py-5 pb-10 text-gray-600 rounded-md shadow-md my-2 mt-5">
          <div className="space-y-4 ">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-400">
              Method
            </h1>
            {/* Add method by steps TODO */}
            <div className="list-disc space-y-5 tracking-wide text-justify">
              Method by steps{' '}
            </div>
          </div>
        </div>
        <div className="">
          <button className="btnRecipe w-full">Create Recipe</button>
        </div>
      </form>
    </div>
  );
}

export default create;
