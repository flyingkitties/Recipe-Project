/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-wrap-multilines */
import { Tooltip, Typography } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import PropTypes from 'prop-types';

function CommentButton({ handleScroll }) {
  const { data: session } = useSession();
  return (
    <Tooltip
      className="hidden sm:inline-block bg-white border border-blue-gray-50 shadow-xl shadow-black/10 "
      placement="top-start"
      content={
        <Typography
          color="gray"
          className="font-medium"
        >
          Comment
        </Typography>
      }
    >
      <button
        onClick={handleScroll}
        disabled={!session}
        className={`${
          !session
            ? 'btnRecipe border-white text-white bg-gray-300'
            : 'btnRecipe'
        }`}
        type="button"
      >
        <FaRegCommentDots className="iconMed" />
      </button>
    </Tooltip>
  );
}
CommentButton.propTypes = {
  handleScroll: PropTypes.func,
};
export default CommentButton;
