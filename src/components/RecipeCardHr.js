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

function RecipeCardHr({
  id,
  image,
  title,
  aggregateLikes,
  readyInMinutes,
  servings,
}) {
  return (
    <Link
      id={id}
      href={`../recipe/${id}`}
    >
      <div className="flex bg-white  mb-10 lg:my-0 rounded-md cursor-pointer shadow-md hover:shadow-xl">
        <div
          className="flex max-h-[200px] max-w-[200px] justify-center content-center
          items-center object-contain shrink-0"
        >
          <Image
            className="rounded-l-md "
            src={image}
            loading="lazy"
            width={240}
            height={150}
            alt="Recipe mage"
          />
        </div>
        <div className="p-2">
          <Tooltip
            className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10"
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
            <h1 className="titleText line-clamp-2">{title}</h1>
          </Tooltip>

          <div className="justify-evenly pt-4 space-y-1 text-gray-600 ">
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
              <div className="flex space-x-1 items-center">
                <HandThumbUpIcon className="h-4 w-4 text-[#00B8E1] " />
                <p className="text-xs font-light">{aggregateLikes}</p>
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
                <p className="text-xs font-light">{readyInMinutes} min</p>
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
                <p className="text-xs font-light">{servings}</p>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCardHr;
