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
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { GiCookingPot, GiCookingGlove, GiForkKnifeSpoon } from 'react-icons/gi';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';

function Header({ data }) {
  const [query, setQuery] = useState([]);
  const [userDrop, setUserDrop] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [searchDrop, setSearchDrop] = useState(false);
  const [recipesDrop, setRecipesDrop] = useState(false);
  const [dietDrop, setDietDrop] = useState(false);
  const [categoryDrop, setCategoryDrop] = useState(false);

  const { data: session, status } = useSession();

  const router = useRouter();

  const handleSearchDrop = () => {
    setSearchDrop(!searchDrop);
  };

  const handleUserDrop = () => {
    setUserDrop(!userDrop);
  };

  function handleChange(e) {
    setQuery(e.target.value);
  }

  const handleBurgerOpen = () => {
    setBurgerOpen(!burgerOpen);
  };

  const closeBurger = () => {
    SetBurgerOpen(!burgerOpen);
  };

  const handleRecipesDrop = () => {
    setRecipesDrop(!recipesDrop);
  };

  const handleDietDrop = () => {
    setDietDrop(!dietDrop);
  };
  const handleCategoryDrop = () => {
    setCategoryDrop(!categoryDrop);
  };

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

  var styles = {
    bmBurgerButton: {
      position: 'relative',
      width: '25px',
      height: '25px',
      right: '3px',
      marginLeft: '5px',
    },
    bmBurgerBars: {
      background: 'rgb(75 85 99)',
      zindex: 0,
    },
    bmBurgerBarsHover: {
      background: 'rgb(31 41 55)',
    },
    bmCrossButton: {
      height: '35px',
      width: '35px',
    },
    bmCross: {
      background: 'rgb(75 85 99)',
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      top: 0,
    },
    bmMenu: {
      background: 'rgb(255 255 255)',
      padding: '2em 0.5em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47',
    },
    bmItemList: {
      color: 'rgb(107 114 128)',
      padding: '0.8em 0 ',
    },
    bmItem: {
      display: 'flex',
      padding: '0.5em 0em 0.5em',
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <div>
      <div className="sm:flex sticky top-0  z-10 shadow-lg space-x-2 sm:space-x-3 md:space-x-5 lg:space-x-5  p-2 bg-white  ">
        {/* Logo */}

        <Link href="/" className="flex items-center p-1 flex-shrink-0">
          <GiChefToque className="iconLarge sm:iconMed text-gray-600  " />
          <p className="hidden sm:inline-flex font-semibold titleFont text-gray-700 lg:text-xl pl-2 ">
            Recipe Corner
          </p>
          <p className="flex sm:hidden text-gray-700 titleFont font-semibold text-lg">
            RC
          </p>
        </Link>

        {/* Search Bar */}
        <form
          className="hidden sm:inline-flex static sm:flex-grow text-gray-600 items-center justify-center px-5 sm:px-0 "
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
              className="flex-grow p-2 px-4 h-full rounded-l-2xl focus:outline-none truncate"
              onChange={handleChange}
            />
            <Link href={`/search/${query}`}>
              <button className=" md:p-5 p-3 ">
                <MagnifyingGlassIcon className="md:h-6 md:w-6 h-5 w-5 text-white " />
              </button>
            </Link>
          </div>
        </form>
        {searchDrop ? (
          <div className="sm:hidden absolute flex top-1 w-screen z-50 bg-white">
            <button
              onClick={handleSearchDrop}
              className="flex items-center pt-1 px-1 space-x-1 text-gray-700 hover:text-gray-800">
              <ChevronLeftIcon className="iconSmall hover:shadow-2xl hover:w-5 hover:h-5" />
              <p className="hover:shadow-2xl ">Back</p>
            </button>
            <form
              className=" flex-grow text-gray-600 items-center justify-center pl-5 pr-20 sm:px-0 "
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
                  className="flex-grow p-2 px-4 h-full rounded-l-2xl focus:outline-none truncate"
                  onChange={handleChange}
                />
                <Link href={`/search/${query}`}>
                  <button className=" md:p-5 p-3 ">
                    <MagnifyingGlassIcon className="md:h-6 md:w-6 h-5 w-5 text-white " />
                  </button>
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div></div>
        )}
        {/* User  */}
        <div className="flex absolute sm:static right-2 top-3 items-center space-x-4 pr-2 ">
          <button className="sm:hidden hoverGray" onClick={handleSearchDrop}>
            <MagnifyingGlassIcon className="iconXM" />
          </button>
          <div className="flex relative">
            {session ? (
              <div className="flex items-center link" onClick={handleUserDrop}>
                <Image
                  src={session.user.image}
                  width={30}
                  height={30}
                  className="rounded-full cursor-pointer"
                  alt="Session Image"
                />
                <div className="absolute bottom-0 right-[40%] bg-green-500 h-[8px] w-[8px] rounded-full "></div>
                {userDrop ? (
                  <ChevronUpIcon className="iconSmall hoverGray" />
                ) : (
                  <ChevronDownIcon className="iconSmall hoverGray" />
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
                    <div className=" absolute top-12 right-0 w-44 md:w-52 p-1 bg-white  rounded-md shadow-2xl border-[0.01px] border-gray-200 z-20 ">
                      <div className="menuDrop">
                        <Cog6ToothIcon className="iconLarge hoverGray" />
                        <p className="menuDropText">Settings & Privacy</p>
                      </div>
                      <div className="menuDrop">
                        <QuestionMarkCircleIcon className="iconLarge hoverGray" />
                        <p className="menuDropText">Help & Support</p>
                      </div>
                      <div className="menuDrop">
                        <ChatBubbleLeftRightIcon className="iconLarge hoverGray" />
                        <p className="menuDropText">Give us Feedback</p>
                      </div>
                      <div className="menuDrop">
                        <InformationCircleIcon className="iconLarge hoverGray" />
                        <p className="menuDropText">Help and Support</p>
                      </div>
                      <div className="menuDrop ">
                        <ArrowRightOnRectangleIcon className="iconLarge  hoverGray " />
                        <p
                          className="menuDropText"
                          onClick={!session ? signIn : signOut}>
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
                className="flex  items-center text-center 
           text-gray-700  sm:px-2 link "
                onClick={handleUserDrop}>
                <UserIcon className="iconXM hoverGray " />
                <div className="absolute bottom-0 right-[40%] bg-red-600 h-[8px] w-[8px] rounded-full "></div>

                {userDrop ? (
                  <ChevronUpIcon className="iconSmall hoverGray" />
                ) : (
                  <ChevronDownIcon className="iconSmall hoverGray" />
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
                    <div className=" absolute top-10 right-0 w-44 md:w-52 p-2 bg-white border-[0.01px] border-gray-200 rounded-md shadow-2xl z-20 ">
                      <div className="menuDrop ">
                        <ArrowRightOnRectangleIcon className="iconMed hoverGray " />
                        <p
                          className="menuDropText"
                          onClick={!session ? signIn : signOut}>
                          Sign In
                        </p>
                      </div>
                      <div className="menuDrop">
                        <InformationCircleIcon className="iconMed hoverGray" />
                        <p className="menuDropText">Help and Support</p>
                      </div>
                    </div>
                  </Transition>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>

          <Menu
            right
            styles={styles}
            className=""
            isOpen={burgerOpen}
            onOpen={handleBurgerOpen}
            onClose={handleBurgerOpen}>
            {/* Home Tab */}
            <div className="">
              <Link
                className="space-x-2 hoverGray flex"
                onClick={handleBurgerOpen}
                href="/">
                <AiOutlineHome className="iconSM" />
                <p>Home</p>
              </Link>
            </div>

            {/* Recipes Tab */}
            <div className="flex space-x-2 hoverGray ">
              {!recipesDrop ? (
                // Recipes Tab unclicked
                <div
                  onClick={handleRecipesDrop}
                  className="flex space-x-2 hoverGray ">
                  <GiCookingPot className="iconSM" />
                  <p className="">Recipes</p>
                  <div className="flex items-center">
                    <ChevronDownIcon className="iconSmall" />
                  </div>
                </div>
              ) : (
                // Recipes Tab clicked
                <div className="bg-gray-50 w-full ">
                  <hr className="" />
                  <div
                    className="flex space-x-2 hoverGray py-2"
                    onClick={handleRecipesDrop}>
                    <GiCookingPot className="iconSM" />
                    <p className="">Recipes</p>
                    <div className="flex items-center">
                      <ChevronUpIcon className="iconSmall" />
                    </div>
                  </div>
                  <div className=" relative ">
                    <hr className="absolute bottom-0 h-full border left-3 md:left-4 z-0 border-[#FF8200]/30" />
                    {!categoryDrop ? (
                      //Category Tab
                      <div
                        className="flex mt-2 mb-1 space-x-2 hoverGray  py-2"
                        onClick={handleCategoryDrop}>
                        <p className="ml-8">By Category</p>
                        <div className="flex items-center">
                          <ChevronDownIcon className="iconSmall" />
                        </div>
                      </div>
                    ) : (
                      //Category Tab clicked
                      <div className="bg-gray-100 w-full ">
                        <hr className="" />
                        <div
                          className="flex mt-2 mb-1 space-x-2 hoverGray  py-2"
                          onClick={handleCategoryDrop}>
                          <p className="ml-8">By Category</p>
                          <div className="flex items-center">
                            <ChevronUpIcon className="iconSmall" />
                          </div>
                        </div>
                        <div className="relative pl-5 space-y-2 pb-2">
                          <hr className="absolute bottom-0  h-full border left-10 z-0 border-[#FF8F00]/50 " />
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className=" hoverGray "
                              href="/category/breakfast">
                              <p className="ml-10">Breakfast</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/salad">
                              <p className="ml-10">Salad</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/sides">
                              <p className="ml-10">Sides</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/mainCourse">
                              <p className="ml-10">Main Course</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/dessert">
                              <p className="ml-10">Dessert</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/snacks">
                              <p className="ml-10">Snacks</p>
                            </Link>
                          </div>
                        </div>
                        <hr className="" />
                      </div>
                    )}

                    {!dietDrop ? (
                      //Diet Tab
                      <div>
                        <div
                          className="flex mt-2 mb-1 space-x-2 hoverGray  py-2"
                          onClick={handleDietDrop}>
                          <p className="ml-8">By Diet</p>
                          <div className="flex items-center">
                            <ChevronDownIcon className="iconSmall" />
                          </div>
                        </div>
                        <hr className="" />
                      </div>
                    ) : (
                      //Diet Tab Clicked
                      <div className="bg-gray-100 w-full  ">
                        <hr className="" />
                        <div
                          className="flex mt-2 mb-1 space-x-2 hoverGray  py-2 "
                          onClick={handleDietDrop}>
                          <p className="ml-8">By Diet</p>
                          <div className="flex items-center">
                            <ChevronDownIcon className="iconSmall" />
                          </div>
                        </div>
                        <div className="relative pl-5 space-y-2 pb-2">
                          <hr className="absolute bottom-0  h-full border left-10 z-0 border-[#FF8F00]/50 " />
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className=" hoverGray "
                              href="/">
                              <p className="ml-10">Popular Recipes</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/salad">
                              <p className="ml-10">Vegetarian</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/sides">
                              <p className="ml-10">Keto</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/mainCourse">
                              <p className="ml-10">Gluten Free</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/dessert">
                              <p className="ml-10">Pescetarian</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/snacks">
                              <p className="ml-10">Vegan</p>
                            </Link>
                          </div>
                          <div className="py-2">
                            <Link
                              onClick={handleBurgerOpen}
                              className="space-x-2 hoverGray "
                              href="/category/snacks">
                              <p className="ml-10">Paleo</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              className="space-x-2 hoverGray "
              href="/"
              onClick={closeBurger}>
              <GiForkKnifeSpoon className="iconSM" />
              <p>Add a Recipe</p>
            </Link>
            <Link
              className="space-x-2 hoverGray"
              href="/"
              onClick={closeBurger}>
              <AiOutlineHeart className="iconSM hover:text-red-500" />
              <p>My Favourite Recipes</p>
            </Link>
            <Link
              className="space-x-2 hoverGray"
              href="/"
              onClick={closeBurger}>
              <GiCookingGlove className="iconSM" />
              <p> My Recipes</p>
            </Link>
          </Menu>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Header;
