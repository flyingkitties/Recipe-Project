/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import { Tooltip, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Skeleton } from '@mui/material';

function FavouriteButton({ id }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [favourites, setFavourites] = useState();

  const recipeDb = { id };

  // Get Favourites
  const {
    data: favouriteData,
    isLoading: favouriteIsLoading,
    error: favouriteError,
    // refetch,
  } = useQuery({
    queryKey: ['getFavourite', recipeDb.id],
    enabled: !!recipeDb?.id && !!session?.user?.email,
    queryFn: () =>
      axios
        .get('../api/postDB/favourite/', {
          params: {
            post_id: recipeDb.id,
            username: session?.user?.email,
          },
        })
        .then((res) => res.data),
    retry: 3,
    // keepPreviousData: true, // to keep data boxes until new data is fetched
    onSuccess: (favouriteData1) => {
      setFavourites(favouriteData1);
    },
  });

  // Add Favourites to the dataBase
  const handleFavourite = async (valueFave) => {
    setFavourites(valueFave); // faster way of getting previous value
    await axios
      .post('../api/postDB/favourite/', {
        data: {
          post_id: recipeDb.id,
          username: session?.user?.email,
          favouriteSaved: valueFave,
        },
      })
      .then((res) => res.data)
      .catch((e) => null);
    // Log the error to the console for debugging purposes
  };
  return (
    <Tooltip
      className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
      placement="top-start"
      content={
        <Typography
          color="gray"
          className="font-medium"
        >
          {favourites ? 'Remove from Favourites' : 'Add to Favourites'}
        </Typography>
      }
    >
      {favouriteIsLoading ? (
        <Skeleton
          animation="wave"
          variant="circular"
          className=" relative"
          width={57}
          height={57}
        />
      ) : (
        <button
          onClick={() => handleFavourite(!favourites)}
          disabled={!session}
          width={57}
          height={57}
          className={`h-[57px] w-[57px]${
            !session && 'btnRecipe border-white text-white bg-gray-300'
          }  ${favourites ? 'btnRecipeWhite' : 'btnRecipe'}`}
          type="button"
          aria-label="Favourites Button"
        >
          {favourites ? (
            <AiFillHeart
              className={
                session
                  ? 'iconMed text-orange-800'
                  : 'iconMed text-white border-white'
              }
            />
          ) : (
            <AiOutlineHeart className={session ? 'iconMed' : 'text-white'} />
          )}
        </button>
      )}
    </Tooltip>
  );
}
FavouriteButton.propTypes = {
  id: PropTypes.string,
};
export default FavouriteButton;
