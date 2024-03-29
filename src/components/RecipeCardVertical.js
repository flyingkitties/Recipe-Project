/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import {
  ClockIcon,
  HandThumbUpIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Tooltip, Typography } from '@material-tailwind/react';
import { SplideSlide } from '@splidejs/react-splide';

function RecipeCardVertical({
  id,
  image,
  title,
  aggregateLikes,
  readyInMinutes,
  servings,
}) {
  return (
    <SplideSlide
      key={id}
      className="mt-2 bg-white cursor-pointer
                hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-xl
                max-w-[312px]
              "
    >
      <Link href={`../recipe/${id}`}>
        <div
          className="flex justify-center content-center
            items-center object-cover "
        >
          <Image
            className="w-auto h-auto rounded-t-md"
            loading="lazy"
            width={312}
            height={150}
            src={image}
            alt="image"
          />
        </div>

        <div className="flex flex-col space-y-1 justify-center p-2 text-gray-600">
          <div className="">
            <Tooltip
              className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
              placement="top-start"
              content={
                <Typography
                  color="gray"
                  className="font-medium"
                >
                  {title}
                </Typography>
              }
            >
              <p className=" text-md font-semibold capitalize hover:underline text-gray-700 line-clamp-1 ">
                {title}
              </p>
            </Tooltip>
          </div>
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10"
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                {aggregateLikes} likes
              </Typography>
            }
          >
            <div className="flex space-x-1 items-center ">
              <HandThumbUpIcon className="h-4 w-4 text-[#00B8E1] " />
              <p className="text-sm font-light">{aggregateLikes}</p>
            </div>
          </Tooltip>
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10"
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                Ready in {readyInMinutes} min
              </Typography>
            }
          >
            <div className="flex space-x-1 items-center ">
              <ClockIcon className="h-3 w-3" />
              <p className="text-sm font-light">{readyInMinutes} min</p>
            </div>
          </Tooltip>
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10"
            placement="top-start"
            content={
              <Typography
                color="gray"
                className="font-medium"
              >
                {servings} servings
              </Typography>
            }
          >
            <div className="flex space-x-1 items-center">
              <UserIcon className="h-3 w-3" />
              <p className="text-sm font-light">{servings}</p>
            </div>
          </Tooltip>
        </div>
      </Link>
    </SplideSlide>
  );
}

export default RecipeCardVertical;
