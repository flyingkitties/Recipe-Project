import { ChevronUpIcon } from "@heroicons/react/24/outline";
import React from "react";
function BackTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "grid items-center justify-center text-center text-white py-[15%] "
  }, /*#__PURE__*/React.createElement("div", {
    onClick: scrollToTop,
    className: "cursor-pointer group shade "
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex text-center justify-center  "
  }, /*#__PURE__*/React.createElement(ChevronUpIcon, {
    className: "w-10 h-10 group-hover:w-12 group-hover:h-12"
  })), /*#__PURE__*/React.createElement("p", {
    className: "group-hover:underline group-hover:text-lg"
  }, "Back to Top")));
}
export default BackTop;
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
function Banner() {
  return /*#__PURE__*/React.createElement("div", {
    className: "text-center px-16 lg:px-40 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-[15%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-[0_0.9px_0.9px_rgba(0,0,0,0.5)]"
  }, /*#__PURE__*/React.createElement("h1", null, "Search recipes from all over the world!")), /*#__PURE__*/React.createElement("div", {
    className: "mt-[8%] text-xl md:text-2xl lg:text-3xl drop-shadow-[0_0.9px_0.9px_rgba(0,0,0,0.5)]"
  }, /*#__PURE__*/React.createElement("h2", null, "Choose a category or search for an ingredient")), /*#__PURE__*/React.createElement("div", {
    className: "flex-grid space-x-5 space-y-5 mt-[2%] text-sm md:text-base lg:text-lg "
  }, /*#__PURE__*/React.createElement("button", {
    className: "btnOrg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shade"
  }, "Sides"), " "), /*#__PURE__*/React.createElement("button", {
    className: "btnOrg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shade"
  }, "Dessert"), " "), /*#__PURE__*/React.createElement("button", {
    className: "btnOrg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shade"
  }, "Salad"), " "), /*#__PURE__*/React.createElement("button", {
    className: "btnOrg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shade"
  }, "Breakfast"), " "), /*#__PURE__*/React.createElement("button", {
    className: "btnOrg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shade"
  }, "Main Course"), " "), /*#__PURE__*/React.createElement("button", {
    className: "btnOrg"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shade"
  }, "Snacks"), " ")), /*#__PURE__*/React.createElement("form", {
    className: "flex mt-[5%] text-gray-600 items-center justify-center  ",
    onSubmit: e => {
      e.preventDefault();
      e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex  cursor-pointer h-10 items-center drop-shadow-xl rounded-2xl  bg-[#FF8F00] hover:bg-[#FF8200] max-w-[800px] flex-grow  "
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Ingredient, dish, keyword...",
    className: "flex-grow p-2 px-10 h-full rounded-l-2xl focus:outline-none"
  }), /*#__PURE__*/React.createElement("button", {
    className: " md:p-5 p-3 max-w-10"
  }, /*#__PURE__*/React.createElement(MagnifyingGlassIcon, {
    className: "md:h-6 md:w-6 h-5 w-5 text-white "
  })))));
}
export default Banner;
// [#00B8E1]
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import React from "react";
function Footer() {
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white z-10 shadow-md"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center p-4 text-sm text-gray-600  space-x-4 "
  }, /*#__PURE__*/React.createElement("p", {
    className: " link"
  }, "Privacy"), /*#__PURE__*/React.createElement("p", null, "\xB7"), /*#__PURE__*/React.createElement("p", {
    className: "link"
  }, "Terms"), /*#__PURE__*/React.createElement("p", null, "\xB7"), /*#__PURE__*/React.createElement("p", {
    className: "link"
  }, "Sitemap")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center text-gray-600 border-t py-2 text-xs"
  }, /*#__PURE__*/React.createElement("p", {
    className: " "
  }, "\xA9 2023 RG Buils")));
}
export default Footer;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon, UserIcon, CurrencyPoundIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/css";
function GlutenFree() {
  const [glutenFree, setGlutenFree] = useState([]);
  useEffect(() => {
    feedGlutenFree();
  }, []);
  const feedGlutenFree = async () => {
    const checkLocal = localStorage.getItem("glutenFree");
    if (checkLocal) {
      setGlutenFree(JSON.parse(checkLocal));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&tags=gluten-free&number=20`);
      const data = await api.json();
      localStorage.setItem("glutenFree", JSON.stringify(data.recipes));
      setGlutenFree(data.recipes);
      console.log(data);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-5 px-5 sm:px-8 md:px-10 lg:px-20 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center group-hover:text-[#00B8E1] group/item"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-700 text-xl font-semibold link px-2"
  }, "Gluten Free Recipes"), /*#__PURE__*/React.createElement("div", {
    className: "hidden group-hover/item:block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs pl-3 pr-1 cursor-pointer"
  }, "Explore all")), /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement(Splide, {
    options: {
      perPage: 1,
      gap: "1rem",
      drag: "free",
      keyboard: "global",
      autoWidth: true,
      autoHeight: true,
      arrows: {
        position: "absolute"
      },
      pagination: false
    }
  }, glutenFree?.map(recipe => {
    if (recipe.image != null) {
      return (
        /*#__PURE__*/
        //Cards
        React.createElement(SplideSlide, {
          key: recipe.id,
          className: " p-2 bg-white cursor-pointer  hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl max-w-[312px] "
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex justify-center content-center  items-center object-cover"
        }, /*#__PURE__*/React.createElement(Image, {
          className: "object-cover  rounded-md  ",
          loading: "eager",
          width: 312,
          height: 150,
          src: recipe.image,
          alt: "image"
        })), /*#__PURE__*/React.createElement("div", {
          className: " pt-2 text-gray-600"
        }, " ", /*#__PURE__*/React.createElement("p", {
          className: " text-md font-semibold capitalize hover:underline text-gray-700"
        }, recipe.title), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center "
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.readyInMinutes, " min")), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center"
        }, /*#__PURE__*/React.createElement(UserIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.servings))))
      );
    }
  }))));
}
export default GlutenFree;
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiChefToque } from "react-icons/gi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
function Header({
  data
}) {
  const [query, setQuery] = useState();
  const [cuisine, setCuisine] = useState();
  const [diet, setDiet] = useState();
  const [mealType, setMealType] = useState();
  function handleChange(e) {
    setQuery(e.target.value);
  }
  function getRecipeData() {
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`).then(response => response.json()).then(data => {
      setQuery(data);
      console.log(data);
    }).catch(() => {
      console.log("error");
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "flex  shadow-lg md:space-x-10 space-x-3 p-2 bg-white "
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center px-3 p-3 flex-shrink-0"
  }, /*#__PURE__*/React.createElement(GiChefToque, {
    className: "md:h-6 md:w-6 h-4 w-4 text-gray-600  "
  }), /*#__PURE__*/React.createElement("p", {
    className: "hidden sm:inline-flex font-semibold text-gray-700 pl-2 text-sm md:text-base"
  }, "Recipe Corner")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-grow cursor-pointer h-10 items-center border border-gray-300 rounded-2xl  bg-[#00B8E1]/70 hover:bg-[#00B8E1] mt-1"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "What would you like to search for?",
    className: "flex-grow p-2 px-4 h-full rounded-l-2xl focus:outline-none",
    onChange: handleChange
  }), /*#__PURE__*/React.createElement("button", {
    onClick: getRecipeData,
    className: " md:p-5 p-3 "
  }, /*#__PURE__*/React.createElement(MagnifyingGlassIcon, {
    className: "md:h-6 md:w-6 h-5 w-5 text-white "
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center px-2 md:px-5"
  }, /*#__PURE__*/React.createElement(RxHamburgerMenu, {
    className: "md:h-6 md:w-6 h-4 w-4"
  })));
}
export default Header;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon, UserIcon, CurrencyPoundIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/css";
function Keto() {
  const [keto, setKeto] = useState([]);
  useEffect(() => {
    feedKeto();
  }, []);
  const feedKeto = async () => {
    const checkLocal = localStorage.getItem("keto");
    if (checkLocal) {
      setKeto(JSON.parse(checkLocal));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&tags=ketogenic&number=20`);
      const dataK = await api.json();
      localStorage.setItem("keto", JSON.stringify(dataK.recipes));
      setKeto(dataK.recipes);
      console.log(dataK);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-5 px-5 sm:px-8 md:px-10 lg:px-20 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center group-hover:text-[#00B8E1] group/item"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-700 text-xl font-semibold link px-2"
  }, "Keto Recipes"), /*#__PURE__*/React.createElement("div", {
    className: "hidden group-hover/item:block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs pl-3 pr-1 cursor-pointer"
  }, "Explore all")), /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement(Splide, {
    options: {
      perPage: 1,
      gap: "1rem",
      drag: "free",
      keyboard: "global",
      autoWidth: true,
      autoHeight: true,
      arrows: {
        position: "absolute"
      },
      pagination: false
    }
  }, keto?.map(recipe => {
    if (recipe.image != null) {
      return (
        /*#__PURE__*/
        //Cards
        React.createElement(SplideSlide, {
          key: recipe.id,
          className: " p-2 bg-white cursor-pointer  hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl max-w-[312px] "
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex justify-center content-center  items-center object-cover"
        }, /*#__PURE__*/React.createElement(Image, {
          className: "object-cover  rounded-md  ",
          loading: "eager",
          width: 312,
          height: 150,
          src: recipe.image,
          alt: "image"
        })), /*#__PURE__*/React.createElement("div", {
          className: " pt-2 text-gray-600"
        }, " ", /*#__PURE__*/React.createElement("p", {
          className: " text-md font-semibold capitalize hover:underline text-gray-700"
        }, recipe.title), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center "
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.readyInMinutes, " min")), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center"
        }, /*#__PURE__*/React.createElement(UserIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.servings))))
      );
    }
  }))));
}
export default Keto;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon, UserIcon, CurrencyPoundIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/css";
function Paleo() {
  const [paleo, setPaleo] = useState([]);
  useEffect(() => {
    feedPaleo();
  }, []);
  const feedPaleo = async () => {
    const checkLocal = localStorage.getItem("paleo");
    if (checkLocal) {
      setPaleo(JSON.parse(checkLocal));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&tags=paleo&number=20`);
      const data = await api.json();
      localStorage.setItem("paleo", JSON.stringify(data.recipes));
      setPaleo(data.recipes);
      console.log(data);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-5 px-5 sm:px-8 md:px-10 lg:px-20 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center group-hover:text-[#00B8E1] group/item"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-700 text-xl font-semibold link px-2"
  }, "Paleo Recipes"), /*#__PURE__*/React.createElement("div", {
    className: "hidden group-hover/item:block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs pl-3 pr-1 cursor-pointer"
  }, "Explore all")), /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement(Splide, {
    options: {
      perPage: 1,
      gap: "1rem",
      drag: "free",
      keyboard: "global",
      autoWidth: true,
      autoHeight: true,
      arrows: {
        position: "absolute"
      },
      pagination: false
    }
  }, paleo?.map(recipe => {
    if (recipe.image != null) {
      return (
        /*#__PURE__*/
        //Cards
        React.createElement(SplideSlide, {
          key: recipe.id,
          className: " p-2 bg-white cursor-pointer  hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl max-w-[312px] "
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex justify-center content-center  items-center object-cover"
        }, /*#__PURE__*/React.createElement(Image, {
          className: "object-cover  rounded-md  ",
          loading: "eager",
          width: 312,
          height: 150,
          src: recipe.image,
          alt: "image"
        })), /*#__PURE__*/React.createElement("div", {
          className: " pt-2 text-gray-600"
        }, " ", /*#__PURE__*/React.createElement("p", {
          className: " text-md font-semibold capitalize hover:underline text-gray-700"
        }, recipe.title), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center "
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.readyInMinutes, " min")), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center"
        }, /*#__PURE__*/React.createElement(UserIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.servings))))
      );
    }
  }))));
}
export default Paleo;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon, UserIcon, CurrencyPoundIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/css";
function Pescetarian() {
  const [pescetarian, setPesceterian] = useState([]);
  useEffect(() => {
    feedPesceterian();
  }, []);
  const feedPesceterian = async () => {
    const checkLocal = localStorage.getItem("pescetarian");
    if (checkLocal) {
      setPesceterian(JSON.parse(checkLocal));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&tags=pescetarian&number=20`);
      const data = await api.json();
      localStorage.setItem("pescetarian", JSON.stringify(data.recipes));
      setPesceterian(data.recipes);
      console.log(data);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-5 px-5 sm:px-8 md:px-10 lg:px-20 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center group-hover:text-[#00B8E1] group/item"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-700 text-xl font-semibold link px-2"
  }, "Pescetarian Recipes"), /*#__PURE__*/React.createElement("div", {
    className: "hidden group-hover/item:block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs pl-3 pr-1 cursor-pointer"
  }, "Explore all")), /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement(Splide, {
    options: {
      perPage: 1,
      gap: "1rem",
      drag: "free",
      keyboard: "global",
      autoWidth: true,
      autoHeight: true,
      arrows: {
        position: "absolute"
      },
      pagination: false
    }
  }, pescetarian?.map(recipe => {
    if (recipe.image != null) {
      return (
        /*#__PURE__*/
        //Cards
        React.createElement(SplideSlide, {
          key: recipe.id,
          className: " p-2 bg-white cursor-pointer  hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl max-w-[312px] "
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex justify-center content-center  items-center object-cover"
        }, /*#__PURE__*/React.createElement(Image, {
          className: "object-cover  rounded-md  ",
          loading: "eager",
          width: 312,
          height: 150,
          src: recipe.image,
          alt: "image"
        })), /*#__PURE__*/React.createElement("div", {
          className: " pt-2 text-gray-600"
        }, " ", /*#__PURE__*/React.createElement("p", {
          className: " text-md font-semibold capitalize hover:underline text-gray-700"
        }, recipe.title), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center "
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.readyInMinutes, " min")), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center"
        }, /*#__PURE__*/React.createElement(UserIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.servings))))
      );
    }
  }))));
}
export default Pescetarian;
import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import { ClockIcon, UserIcon, CurrencyPoundIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/css";
function Popular({}) {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    feedPopular();
  }, []);
  const feedPopular = async () => {
    const checkLocal = localStorage.getItem("popular");
    if (checkLocal) {
      setPopular(JSON.parse(checkLocal));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=20`);
      const data = await api.json();
      localStorage.setItem("popular", JSON.stringify(data.recipes));
      setPopular(data.recipes);
      console.log(data);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-5 px-5 sm:px-8 md:px-10 lg:px-20 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center group-hover:text-[#00B8E1] group/item"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-700 text-xl font-semibold link px-2"
  }, "Popular Recipes"), /*#__PURE__*/React.createElement("div", {
    className: "hidden group-hover/item:block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs pl-3 pr-1 cursor-pointer"
  }, "Explore all")), /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement(Splide, {
    options: {
      perPage: 1,
      gap: "1rem",
      drag: "free",
      keyboard: "global",
      autoWidth: true,
      autoHeight: true,
      arrows: {
        position: "absolute"
      },
      pagination: false
    }
  }, popular?.map(recipe => {
    if (recipe.image != null) {
      return (
        /*#__PURE__*/
        //Cards
        React.createElement(SplideSlide, {
          key: recipe.id,
          className: " p-2 bg-white cursor-pointer max-w-[312px] hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl "
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex justify-center content-center  items-center object-cover"
        }, /*#__PURE__*/React.createElement(Image, {
          className: "object-cover  rounded-md  ",
          loading: "eager",
          width: 312,
          height: 150,
          src: recipe.image,
          alt: "image"
        })), /*#__PURE__*/React.createElement("div", {
          className: " pt-2 text-gray-600"
        }, " ", /*#__PURE__*/React.createElement("p", {
          className: " text-md font-semibold capitalize hover:underline text-gray-700"
        }, recipe.title), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center "
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.readyInMinutes, " min")), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center"
        }, /*#__PURE__*/React.createElement(UserIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.servings))))
      );
    }
  }))));
}
export default Popular;

//  {/* Right portion */}
//  <div className="relative space-y-4 w-full pt-2">
//  {" "}
//  <p className=" text-lg font-semibold capitalize hover:underline">
//    {recipe.title}
//  </p>
//  <div className="">
//    <div className="flex space-x-1 items-center">
//      <ClockIcon className="h-3 w-3" />
//      <p className="text-sm font-light">
//        {recipe.readyInMinutes} min
//      </p>
//    </div>
//    <div className="flex space-x-1 items-center">
//      <UserIcon className="h-3 w-3" />
//      <p className="text-sm font-light">{recipe.servings}</p>
//    </div>
//  </div>
//  <div className="absolute bottom-3 left-2 px-5  bg-[#62B6B7] text-white rounded-md text-center ">
//    <p className="capitalize">{recipe.diets[1]}</p>
//  </div>
// </div>

{
  /* <div
                className="flex  items-center justify-center  filter 
              contrast-[110%] brightness-[115%]   "></div> */
}
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon, UserIcon, CurrencyPoundIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/css";
function Vegan() {
  const [vegan, setVegan] = useState([]);
  useEffect(() => {
    feedVegan();
  }, []);
  const feedVegan = async () => {
    const checkLocal = localStorage.getItem("vegan");
    if (checkLocal) {
      setVegan(JSON.parse(checkLocal));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&tags=vegan&number=20`);
      const data = await api.json();
      localStorage.setItem("vegan", JSON.stringify(data.recipes));
      setVegan(data.recipes);
      console.log(data);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-5 px-5 sm:px-8 md:px-10 lg:px-20 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center group-hover:text-[#00B8E1] group/item"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-700 text-xl font-semibold link px-2"
  }, "Vegan Recipes"), /*#__PURE__*/React.createElement("div", {
    className: "hidden group-hover/item:block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs pl-3 pr-1 cursor-pointer"
  }, "Explore all")), /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement(Splide, {
    options: {
      perPage: 1,
      gap: "1rem",
      drag: "free",
      keyboard: "global",
      autoWidth: true,
      autoHeight: true,
      arrows: {
        position: "absolute"
      },
      pagination: false
    }
  }, vegan?.map(recipe => {
    if (recipe.image != null) {
      return (
        /*#__PURE__*/
        //Cards
        React.createElement(SplideSlide, {
          key: recipe.id,
          className: " p-2 bg-white cursor-pointer  hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl max-w-[312px] "
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex justify-center content-center  items-center object-cover"
        }, /*#__PURE__*/React.createElement(Image, {
          className: "object-cover  rounded-md  ",
          loading: "eager",
          width: 312,
          height: 150,
          src: recipe.image,
          alt: "image"
        })), /*#__PURE__*/React.createElement("div", {
          className: " pt-2 text-gray-600"
        }, " ", /*#__PURE__*/React.createElement("p", {
          className: " text-md font-semibold capitalize hover:underline text-gray-700"
        }, recipe.title), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center "
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.readyInMinutes, " min")), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center"
        }, /*#__PURE__*/React.createElement(UserIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.servings))))
      );
    }
  }))));
}
export default Vegan;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ClockIcon, UserIcon, CurrencyPoundIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/css";
function Vegetarian() {
  const [vegetarian, setVegetarian] = useState([]);
  useEffect(() => {
    feedVegerarian();
  }, []);
  const feedVegerarian = async () => {
    const checkLocal = localStorage.getItem("vegetarian");
    if (checkLocal) {
      setVegetarian(JSON.parse(checkLocal));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&tags=vegetarian&number=20`);
      const dataV = await api.json();
      localStorage.setItem("vegetarian", JSON.stringify(dataV.recipes));
      setVegetarian(dataV.recipes);
      console.log(dataV);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-5 px-5 sm:px-8 md:px-10 lg:px-20 group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center group-hover:text-[#00B8E1] group/item"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-gray-700 text-xl font-semibold link px-2"
  }, "Vegetarian Recipes"), /*#__PURE__*/React.createElement("div", {
    className: "hidden group-hover/item:block"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xs pl-3 pr-1 cursor-pointer"
  }, "Explore all")), /*#__PURE__*/React.createElement(ChevronRightIcon, {
    className: "icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: ""
  }, /*#__PURE__*/React.createElement(Splide, {
    options: {
      perPage: 1,
      gap: "1rem",
      drag: "free",
      keyboard: "global",
      autoWidth: true,
      autoHeight: true,
      arrows: {
        position: "absolute"
      },
      pagination: false
    }
  }, vegetarian?.map(recipe => {
    if (recipe.image != null) {
      return (
        /*#__PURE__*/
        //Cards
        React.createElement(SplideSlide, {
          key: recipe.id,
          className: " p-2 bg-white cursor-pointer  hover:border-2 hover:border-gray-200 hover:rounded-md hover:drop-shadow-2xl max-w-[312px] "
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex justify-center content-center  items-center object-cover"
        }, /*#__PURE__*/React.createElement(Image, {
          className: "object-cover  rounded-md  ",
          loading: "eager",
          width: 312,
          height: 150,
          src: recipe.image,
          alt: "image"
        })), /*#__PURE__*/React.createElement("div", {
          className: " pt-2 text-gray-600"
        }, " ", /*#__PURE__*/React.createElement("p", {
          className: " text-md font-semibold capitalize hover:underline text-gray-700"
        }, recipe.title), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center "
        }, /*#__PURE__*/React.createElement(ClockIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.readyInMinutes, " min")), /*#__PURE__*/React.createElement("div", {
          className: "flex space-x-1 items-center"
        }, /*#__PURE__*/React.createElement(UserIcon, {
          className: "h-3 w-3"
        }), /*#__PURE__*/React.createElement("p", {
          className: "text-sm font-light"
        }, recipe.servings))))
      );
    }
  }))));
}
export default Vegetarian;
import "@/styles/globals.css";
export default function App({
  Component,
  pageProps
}) {
  return /*#__PURE__*/React.createElement(Component, pageProps);
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    name: 'John Doe'
  });
}
import Header from "@/components/Header";
import Head from "next/head";
import { useRef, useState } from "react";
import Popular from "@/components/Popular";
import Banner from "@/components/Banner";
import Vegetarian from "@/components/Vegetarian";
import Keto from "@/components/Keto";
import GlutenFree from "@/components/GlutenFree";
import Pescetarian from "@/components/Pescetarian";
import Vegan from "@/components/Vegan";
import Paleo from "@/components/Paleo";
import Footer from "@/components/Footer";
import BackTop from "@/components/BackTop";
export default function Home({
  data
}) {
  const [keyword, setKeyword] = useState(null);
  const [exclude, setExclude] = useState(null);
  const [include, setInclude] = useState(null);
  const [diet, setDiet] = useState(null);
  const [type, setType] = useState(null);
  const [response, setResponse] = useState(null);
  const ref = useRef();

  // fetch(
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setQuery(data);
  //     console.log(data);
  //   })
  //   .catch(() => {
  //     console.log("error");
  //   });

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, null, /*#__PURE__*/React.createElement("title", null, "Create Next App")), /*#__PURE__*/React.createElement("main", {
    className: "bg-fixed bg-center bg-no-repeat bg-cover bg-orange"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Banner, null), /*#__PURE__*/React.createElement("section", {
    className: "mt-[10%]  px-5  bg-white "
  }, /*#__PURE__*/React.createElement(Popular, {
    className: ""
  }), /*#__PURE__*/React.createElement(Vegetarian, null), /*#__PURE__*/React.createElement(Keto, null), /*#__PURE__*/React.createElement(GlutenFree, null), /*#__PURE__*/React.createElement(Pescetarian, null), /*#__PURE__*/React.createElement(Vegan, null), /*#__PURE__*/React.createElement(Paleo, null)), /*#__PURE__*/React.createElement(BackTop, null), /*#__PURE__*/React.createElement(Footer, null)));
}

// drop shaddow on same colour text
// drop-shadow-[0_0.9px_0.9px_rgba(0,0,0,0.8)]
