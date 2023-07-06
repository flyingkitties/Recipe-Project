/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, Fragment } from 'react';
import { RxGlobe } from 'react-icons/rx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { signIn, signOut, useSession } from 'next-auth/react';
import {
  UserIcon,
  ChevronDownIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
  ChevronUpIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { GiCookingPot, GiCookingGlove, GiForkKnifeSpoon } from 'react-icons/gi';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import {
  BsFacebook,
  BsInstagram,
  BsPinterest,
  BsTiktok,
  BsTwitter,
} from 'react-icons/bs';
import { Button, Tooltip, Typography } from '@material-tailwind/react';
// import LogoRC from '../../public/images/logoRC.png';
import Logo from '../../public/logo.png';

function Header() {
  const [query, setQuery] = useState([]);
  const [userDrop, setUserDrop] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [searchDrop, setSearchDrop] = useState(false);
  const [recipesDrop, setRecipesDrop] = useState(false);
  const [dietDrop, setDietDrop] = useState(false);
  const [categoryDrop, setCategoryDrop] = useState(false);

  const { data: session } = useSession();

  // const router = useRouter();

  // Burger Menu Styles
  const styles = {
    bmBurgerButton: {
      position: 'relative',
      width: '35px',
      height: '35px',
    },
    bmBurgerBars: {
      color: 'rgb(75 85 99)',
    },
    bmBurgerBarsHover: {
      background: 'rgb(31 41 55)',
    },
    bmCrossButton: {
      height: '35px',
      width: '35px',
      right: '14px',
      top: '12px',
    },
    bmCross: {
      color: 'rgb(75 85 99)',
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      top: 0,
    },
    bmMenu: {
      background: 'rgb(255 255 255)',
      padding: '2em 1em 0',
      fontSize: '1.15em',
    },
    bmMorphShape: {
      fill: '#373a47',
    },

    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
    },
  };

  // Handle query
  function handleChange(e) {
    setQuery(e.target.value);
  }

  // Menu Drops
  // const triggers = {
  //   onMouseEnter: () => setOpenMenu(true),
  //   onMouseLeave: () => setOpenMenu(false),
  // };

  const handleSearchDrop = () => {
    setSearchDrop(!searchDrop);
  };

  const handleUserDrop = () => {
    setUserDrop(!userDrop);
  };

  const handleBurgerOpen = () => {
    setBurgerOpen(!burgerOpen);
  };

  const closeBurger = () => {
    setBurgerOpen(!burgerOpen);
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

  return (
    <div>
      <div
        className="relative sm:flex top-0  z-10 shadow-lg space-x-2
      sm:space-x-3 md:space-x-5 lg:space-x-5  p-1 bg-white"
      >
        {/* Logo */}
        <Tooltip
          className="bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
          content={
            <div className="">
              <Typography
                color="gray"
                className="font-medium"
              >
                Recipe Corner
              </Typography>
            </div>
          }
        >
          <Link
            href="/"
            className="flex z-20 items-center justify-center lg:ml-5 ml-3 flex-shrink-0
            md:w-14 md:h-14 h-12 w-12 md:pt-1"
          >
            <Image
              width={100}
              height={100}
              src={Logo}
              alt="Logo"
            />
          </Link>
        </Tooltip>

        {/* Search Bar */}
        <form
          className="hidden sm:inline-flex static sm:flex-grow text-gray-600 items-center justify-center px-5 sm:px-0 "
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            className="flex flex-grow sm:mx-5 lg:mx-15 cursor-pointer h-10
      items-center border border-gray-300 rounded-2xl
       bg-[#00B8E1]/70 hover:bg-[#00B8E1] mt-1"
          >
            <input
              type="text"
              placeholder="What would you like to search for?"
              className="flex-grow p-2 px-4 h-full rounded-l-2xl focus:outline-none truncate"
              onChange={handleChange}
            />
            <Tooltip
              className="bg-white border border-blue-gray-50 shadow-xl shadow-black/10  "
              content={
                <div className="">
                  <Typography
                    color="gray"
                    className="font-medium"
                  >
                    Search
                  </Typography>
                </div>
              }
            >
              <Link href={`/search/${query}`}>
                <button
                  className=" md:px-5 p-[0.85rem]"
                  type="button"
                >
                  <MagnifyingGlassIcon className="md:h-6 md:w-6 h-5 w-5 text-white " />
                </button>
              </Link>
            </Tooltip>
          </div>
        </form>
        {/* Handle Search drop on small screen */}
        {searchDrop && (
          <div className="sm:hidden absolute flex top-1 -left-2 pb-1  w-screen z-50 bg-white">
            <button
              onClick={handleSearchDrop}
              onKeyDown={handleSearchDrop}
              type="button"
              className="flex items-center pt-1 px-1 space-x-1 text-gray-700 hover:text-gray-800"
            >
              <ChevronLeftIcon className="iconSmall hover:shadow-2xl hover:w-5 hover:h-5" />
              <p className="hover:shadow-2xl ">Back</p>
            </button>
            <form
              className=" flex-grow text-gray-600 items-center justify-center pl-5 pr-20 "
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div
                className="flex flex-grow sm:mx-5 lg:mx-15 cursor-pointer h-10
                items-center border border-gray-300 rounded-2xl
                 bg-[#00B8E1]/70 hover:bg-[#00B8E1] mt-1"
              >
                <input
                  type="text"
                  placeholder="What would you like to search for?"
                  className="flex-grow p-2 px-4 h-full rounded-l-2xl focus:outline-none truncate"
                  onChange={handleChange}
                />
                <Link href={`/search/${query}`}>
                  <button
                    className=" md:p-5 p-3 "
                    type="button"
                  >
                    <MagnifyingGlassIcon className="md:h-6 md:w-6 h-5 w-5 text-white " />
                  </button>
                </Link>
              </div>
            </form>
          </div>
        )}
        {/* Search bar drop on small screen  */}

        <div className="flex absolute sm:static right-2 top-3 items-center space-x-4 lg:pr-5 pr-3 ">
          <Tooltip
            className="bg-white border border-blue-gray-50 shadow-xl shadow-black/10 mt-2"
            content={
              <div className="">
                <Typography
                  color="gray"
                  className="font-medium"
                >
                  Search
                </Typography>
              </div>
            }
          >
            <button
              className="sm:hidden hoverGray"
              onClick={handleSearchDrop}
              onKeyDown={handleSearchDrop}
              type="button"
            >
              <MagnifyingGlassIcon className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] items-center justify-center object-center cursor-pointer " />
            </button>
          </Tooltip>
          <div className="flex relative">
            {session ? (
              <div
                className="flex items-center link "
                onClick={handleUserDrop}
                onKeyDown={handleUserDrop}
                role="button"
                tabIndex="0"
              >
                <Image
                  src={session.user.image}
                  width={35}
                  height={35}
                  className="rounded-full cursor-pointer h-[30px] w-[30px] sm:h-[35px] sm:w-[35px]"
                  alt="User Image"
                />
                <div className="absolute bottom-0 right-[40%] bg-green-500 h-[8px] w-[8px] rounded-full" />

                <ChevronDownIcon
                  className={`iconSmall hoverGray transition-transform ${
                    userDrop ? 'rotate-180' : ''
                  }`}
                />

                {userDrop && (
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
                    <div
                      className=" absolute top-11 right-0 w-44 md:w-52 p-1 bg-white
                    rounded-md shadow-2xl border-[0.01px] border-gray-200 z-20 "
                    >
                      <div className="menuDrop">
                        <Cog6ToothIcon className="iconMed hoverGray" />
                        <p className="menuDropText">Settings & Privacy</p>
                      </div>
                      <div className="menuDrop">
                        <QuestionMarkCircleIcon className="iconMed hoverGray" />
                        <p className="menuDropText">Help & Support</p>
                      </div>
                      <div className="menuDrop">
                        <ChatBubbleLeftRightIcon className="iconMed hoverGray" />
                        <p className="menuDropText">Give us Feedback</p>
                      </div>
                      <div className="menuDrop">
                        <InformationCircleIcon className="iconMed hoverGray" />
                        <p className="menuDropText">Help and Support</p>
                      </div>
                      <div
                        className="menuDrop "
                        onClick={() => signOut()}
                        onKeyDown={() => signOut()}
                        role="button"
                        tabIndex="0"
                      >
                        <ArrowRightOnRectangleIcon className="iconMed  hoverGray " />
                        <p className="menuDropText">Sign Out</p>
                      </div>
                    </div>
                  </Transition>
                )}
              </div>
            ) : (
              <div
                className="flex  items-center text-center
           text-gray-700  sm:px-2 link "
                onClick={handleUserDrop}
                onKeyDown={handleUserDrop}
                role="button"
                tabIndex="0"
              >
                <UserIcon className="iconXM  hoverGray " />
                <div className="absolute bottom-0 right-[40%] bg-red-600 h-[8px] w-[8px] rounded-full " />

                <ChevronDownIcon
                  className={`iconSmall hoverGray transition-transform ${
                    userDrop ? 'rotate-180' : ''
                  }`}
                />

                {userDrop && (
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
                    <div
                      className=" absolute top-10 right-0 w-44 md:w-52 p-2
                     bg-white border-[0.01px] border-gray-200 rounded-md shadow-2xl z-20"
                    >
                      <div
                        className="menuDrop "
                        onClick={() => signIn()}
                        onKeyDown={() => signIn()}
                        role="button"
                        tabIndex="0"
                      >
                        <ArrowRightOnRectangleIcon className="iconMed hoverGray " />
                        <p className="menuDropText">Sign In</p>
                      </div>
                      <div className="menuDrop">
                        <InformationCircleIcon className="iconMed hoverGray" />
                        <p className="menuDropText">Help and Support</p>
                      </div>
                    </div>
                  </Transition>
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
            onClose={handleBurgerOpen}
            customBurgerIcon={
              <Button
                variant="text"
                size="sm"
                className="p-0 "
              >
                <Bars3Icon className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] text-gray-800" />
              </Button>
            }
            customCrossIcon={
              <XMarkIcon className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px]" />
            }
          >
            <div className="block space-y-2 relative">
              {/* Menu Header */}
              <div>
                {session ? (
                  <div className="w-full text-gray-800 ">
                    <div className="py-5 px-2">
                      <h1 className="text-2xl">
                        Hello,
                        <span className="">{session?.user.name}!</span>
                      </h1>
                      <p className="text-xs mt-3 hoverGray">Sign Out</p>
                    </div>
                    <hr />
                  </div>
                ) : (
                  <div className=" w-full ">
                    <div className="flex items-center justify-center p-5 space-x-5">
                      <button
                        className="btnBMenu "
                        onClick={!session ? signIn : signOut}
                        onKeyDown={!session ? signIn : signOut}
                        type="button"
                      >
                        Sign In
                      </button>
                      <button
                        className="btnBMenu"
                        onClick={!session ? signIn : signOut}
                        onKeyDown={!session ? signIn : signOut}
                        type="button"
                      >
                        Log In
                      </button>
                    </div>
                    <hr />
                  </div>
                )}
              </div>
              {/* Home Tab */}
              <div className="py-2">
                <Link
                  className="flex space-x-2 hoverGray "
                  onClick={handleBurgerOpen}
                  href="/"
                >
                  <AiOutlineHome className="iconSM" />
                  <p>Home</p>
                </Link>
              </div>

              {/* Recipes Tab */}
              <div className="flex py-2 space-x-2 hoverGray ">
                {!recipesDrop ? (
                  // Recipes Tab unclicked
                  <div
                    onClick={handleRecipesDrop}
                    onKeyDown={handleRecipesDrop}
                    className="flex space-x-2 hoverGray "
                    role="button"
                    tabIndex="0"
                  >
                    <GiCookingPot className="iconSM" />
                    <p className="">Recipes</p>
                    <div className="flex items-center">
                      <ChevronDownIcon className="iconSmall" />
                    </div>
                  </div>
                ) : (
                  // Recipes Tab clicked
                  <div className=" w-full ">
                    <hr className="-mt-2" />
                    <div
                      className="flex space-x-2 hoverGray py-2 "
                      onClick={handleRecipesDrop}
                      onKeyDown={handleRecipesDrop}
                      role="button"
                      tabIndex="0"
                    >
                      <GiCookingPot className="iconSM" />
                      <p className="">Recipes</p>
                      <div className="flex items-center">
                        <ChevronUpIcon className="iconSmall" />
                      </div>
                    </div>
                    <div className=" relative ">
                      <hr
                        className="absolute bottom-0 h-full border left-3
                     border-[#FF8F00]/70"
                      />

                      {!categoryDrop ? (
                        // Category Tab
                        <div
                          className="flex mt-2 mb-1 space-x-2 hoverGray py-2"
                          onClick={handleCategoryDrop}
                          onKeyDown={handleCategoryDrop}
                          role="button"
                          tabIndex="0"
                        >
                          <p className="ml-8">By Category</p>
                          <div className="flex items-center">
                            <ChevronDownIcon className="iconSmall" />
                          </div>
                        </div>
                      ) : (
                        // Category Tab clicked
                        <div className=" w-full ">
                          <hr className="" />
                          <div
                            className="flex mt-2 mb-1 space-x-2 hoverGray"
                            onClick={handleCategoryDrop}
                            onKeyDown={handleCategoryDrop}
                            role="button"
                            tabIndex="0"
                          >
                            <p className="ml-8">By Category</p>
                            <div className="flex items-center">
                              <ChevronUpIcon className="iconSmall" />
                            </div>
                          </div>
                          <div className="relative pl-5 space-y-2 pb-2">
                            <hr className="absolute bottom-0  h-full border left-10 z-0 border-[#FF8F00]/70" />
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className=" hoverGray "
                                href="/category/popular"
                              >
                                <p className="ml-10">Popular Recipes</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className=" hoverGray "
                                href="/category/breakfast"
                              >
                                <p className="ml-10">Breakfast</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/category/salad"
                              >
                                <p className="ml-10">Salad</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/category/sides"
                              >
                                <p className="ml-10">Sides</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/category/mainCourse"
                              >
                                <p className="ml-10">Main Course</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/category/dessert"
                              >
                                <p className="ml-10">Dessert</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/category/snacks"
                              >
                                <p className="ml-10">Snacks</p>
                              </Link>
                            </div>
                          </div>
                          <hr className="" />
                        </div>
                      )}

                      {!dietDrop ? (
                        // Diet Tab
                        <div>
                          <div
                            className="flex mt-2 mb-1 space-x-2 hoverGray  py-2"
                            onClick={handleDietDrop}
                            onKeyDown={handleDietDrop}
                            role="button"
                            tabIndex="0"
                          >
                            <p className="ml-8">By Diet</p>
                            <div className="flex items-center">
                              <ChevronDownIcon className="iconSmall" />
                            </div>
                          </div>
                          <hr className="" />
                        </div>
                      ) : (
                        // Diet Tab Clicked
                        <div className=" w-full  ">
                          <hr className="" />
                          <div
                            className="flex mt-2 mb-1 space-x-2 hoverGray  py-2 "
                            onClick={handleDietDrop}
                            onKeyDown={handleDietDrop}
                            role="button"
                            tabIndex="0"
                          >
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
                                className="space-x-2 hoverGray "
                                href="/diet/vegetarian"
                              >
                                <p className="ml-10">Vegetarian</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/diet/keto"
                              >
                                <p className="ml-10">Keto</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/diet/glutenFree"
                              >
                                <p className="ml-10">Gluten Free</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/diet/pescetarian"
                              >
                                <p className="ml-10">Pescetarian</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/diet/vegan"
                              >
                                <p className="ml-10">Vegan</p>
                              </Link>
                            </div>
                            <div className="py-2">
                              <Link
                                onClick={handleBurgerOpen}
                                className="space-x-2 hoverGray "
                                href="/diet/paleo"
                              >
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
              <div className="py-2">
                <Link
                  className="flex space-x-2 hoverGray "
                  href="/recipe/create"
                  onClick={closeBurger}
                >
                  <GiForkKnifeSpoon className="iconSM" />
                  <p>Add a Recipe</p>
                </Link>
              </div>
              <div className="py-2">
                <Link
                  className="flex space-x-2 hoverGray"
                  href="/"
                  onClick={closeBurger}
                >
                  <AiOutlineHeart className="iconSM hover:text-red-500" />
                  <p>My Favourite Recipes</p>
                </Link>
              </div>
              <div className="py-2">
                <Link
                  className="flex space-x-2 hoverGray"
                  href="/"
                  onClick={closeBurger}
                >
                  <GiCookingGlove className="iconSM" />
                  <p> My Recipes</p>
                </Link>
              </div>
              <div className="text-center pt-48 text-gray-600">
                <p className=" text-sm ">Follow Us!!</p>
                <div className="flex space-x-5 p-2 py-5 justify-evenly ">
                  <BsFacebook className="followUs" />
                  <BsInstagram className="followUs" />
                  <BsTiktok className="followUs" />
                  <BsPinterest className="followUs" />
                  <BsTwitter className="followUs" />
                </div>
              </div>

              <div className="flex items-center justify-center space-x-1 hoverGray py-2 pt-12">
                <RxGlobe className="iconSmall" />
                <p className="text-xs">United Kingdom</p>
              </div>
              <div className="flex items-center justify-evenly text-xs py-2 text-gray-600">
                <p className="hoverGray">Privacy</p>
                <p>·</p>
                <p className="hoverGray">Terms of Use</p>
                <p>·</p>
                <p className="hoverGray">Sitemap</p>
              </div>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Header;
