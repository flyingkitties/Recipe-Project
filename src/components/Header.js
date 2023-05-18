import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GiChefToque } from 'react-icons/gi';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  UserIcon,
  ChevronDownIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  InformationCircleIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';

function Header({ data }) {
  const [query, setQuery] = useState([]);

  const [userDrop, setUserDrop] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  const handleUserDrop = () => {
    setUserDrop(!userDrop);
  };

  function handleChange(e) {
    setQuery(e.target.value);
  }

  // const getRecipeData = async () => {
  //   const api = await axios.get("api/search/", {
  //     params: {
  //       tags: query,
  //       number: "20",
  //     },
  //   });

  //   const { data } = api;
  //   setQuery(data.recipes);
  //   console.log(data.recipes);
  // };

  return (
    <div className="flex  shadow-lg space-x-2 sm:space-x-3 md:space-x-5 lg:space-x-5  p-2 bg-white  ">
      {/* Logo */}

      <Link href="/" className="flex items-center p-1 flex-shrink-0">
        <GiChefToque className="md:h-6 md:w-6 h-4 w-4 text-gray-600  " />
        <p className="hidden sm:inline-flex font-semibold titleFont text-gray-700 lg:text-xl pl-2 ">
          Recipe Corner
        </p>
        <p className="flex sm:hidden text-gray-700 titleFont font-semibold">
          RC
        </p>
      </Link>

      {/* Search Bar */}
      <form
        className="flex text-gray-600 items-center justify-center  "
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}>
        <div
          className="flex flex-grow sm:mx-5 lg:mx-15 cursor-pointer h-10
      items-center border border-gray-300 rounded-2xl 
       bg-[#00B8E1]/70 hover:bg-[#00B8E1] mt-1">
          <input
            type="text"
            placeholder="What would you like to search for?"
            className="flex-grow p-2 px-4 h-full rounded-l-2xl focus:outline-none"
            onChange={handleChange}
          />
          <Link href={`/search/${query}`}>
            <button className=" md:p-5 p-3 ">
              <MagnifyingGlassIcon className="md:h-6 md:w-6 h-5 w-5 text-white " />
            </button>
          </Link>
        </div>
      </form>

      {/* User  */}
      <div className="flex relative">
        {session ? (
          <div className="flex items-center  link" onClick={handleUserDrop}>
            <Image
              src={session.user.image}
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
              alt="Session Image"
            />
            <div className="absolute bottom-2 right-[40%] bg-green-500 h-[8px] w-[8px] rounded-full "></div>
            {userDrop ? (
              <ChevronUpIcon className="iconSmall" />
            ) : (
              <ChevronDownIcon className="iconSmall" />
            )}

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
                <div className=" absolute top-12 right-0 w-56 p-1 bg-white  rounded-md shadow-2xl border-[0.01px] border-gray-200 z-20 ">
                  <div className="menuDrop">
                    <Cog6ToothIcon className="iconLarge" />
                    <p>Settings & Privacy</p>
                  </div>
                  <div className="menuDrop">
                    <QuestionMarkCircleIcon className="iconLarge" />
                    <p>Help & Support</p>
                  </div>
                  <div className="menuDrop">
                    <ChatBubbleLeftRightIcon className="iconLarge" />
                    <p>Give us Feedback</p>
                  </div>
                  <div className="menuDrop">
                    <InformationCircleIcon className="iconLarge" />
                    <p>Help and Support</p>
                  </div>
                  <div className="menuDrop ">
                    <ArrowRightOnRectangleIcon className="iconLarge  " />
                    <p className=" " onClick={!session ? signIn : signOut}>
                      Sign Out
                    </p>
                  </div>
                </div>
              </Transition>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center text-center 
           text-gray-700  px-2 link "
            onClick={handleUserDrop}>
            <UserIcon className="iconMed" />
            <div className="absolute bottom-2 right-[40%] bg-red-600 h-[8px] w-[8px] rounded-full "></div>

            {userDrop ? (
              <ChevronUpIcon className="iconSmall" />
            ) : (
              <ChevronDownIcon className="iconSmall" />
            )}
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
                <div className=" absolute top-12 right-0 w-56 p-2 bg-white border-[0.01px] border-gray-200 rounded-md shadow-2xl z-20 ">
                  <div className="menuDrop ">
                    <ArrowRightOnRectangleIcon className="iconLarge  " />
                    <p className=" " onClick={!session ? signIn : signOut}>
                      Sign In
                    </p>
                  </div>
                  <div className="menuDrop">
                    <InformationCircleIcon className="iconLarge" />
                    <p>Help and Support</p>
                  </div>
                </div>
              </Transition>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
      {/* Menu */}
      <div className="flex flex-shrink items-center px-1  text-gray-700">
        <RxHamburgerMenu className="iconSmall sm:iconMed md:p-1" />
      </div>
    </div>
  );
}

export default Header;
