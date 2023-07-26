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
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

function LikeButton({ id }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [likes, setLikes] = useState('');

  const recipeDb = { id };

  // Get Likes
  const {
    data: likedData,
    isLoading: likesIsLoading,
    error: likesError,
    // refetch: refetchLikes,
  } = useQuery({
    queryKey: ['getLiked', recipeDb.id],
    enabled: !!recipeDb.id && !!session?.user?.email,
    queryFn: () =>
      axios
        .get('../api/postDB/like/', {
          params: {
            post_id: recipeDb.id,
            username: session?.user?.email,
          },
        })
        .then((res) => res.data),
    retry: 3,
    keepPreviousData: true, // to keep data boxes until new data is fetched
    onSuccess: (likedData1) => {
      setLikes(likedData1);
      console.log('🚀 ~ likedData1', likedData1);
    },
  });

  //   // Add Likes to the dataBase
  const handleLike = async (valueLike) => {
    console.log('Likes before change', valueLike);
    setLikes(valueLike); // faster way of getting previous value
    await axios
      .post('../api/postDB/like/', {
        data: {
          post_id: recipeDb.id,
          username: session?.user?.email,
          liked: valueLike,
        },
      })
      .then((res) => res.data)
      .catch((e) => {
        console.log('Error Likes', e);
      });
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
          {`${likes ? 'Unlike' : 'Like'}`}
        </Typography>
      }
    >
      <button
        onClick={() => handleLike(!likes)}
        disabled={!session}
        className={`${
          !session && 'btnRecipe border-white text-white bg-gray-300'
        }  ${likes ? 'btnRecipeWhite' : 'btnRecipe'}`}
        type="button"
      >
        {likes ? (
          <AiFillLike
            className={
              session
                ? 'iconMed text-orange-800'
                : 'iconMed text-white border-white'
            }
          />
        ) : (
          <AiOutlineLike className={session ? 'iconMed' : 'text-white'} />
        )}
      </button>
    </Tooltip>
  );
}

LikeButton.propTypes = {
  id: PropTypes.string,
};
export default LikeButton;
