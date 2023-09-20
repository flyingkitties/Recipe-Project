/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import ReactTimeago from 'react-timeago';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import PropTypes from 'prop-types';

function CommentSection({ id }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);

  const recipeDb = { id };

  // Get Comments
  const {
    data: commentListData,
    isLoading: commentIsLoading,
    error: commentError,
    refetch,
  } = useQuery({
    queryKey: ['getCommentList', recipeDb.id],
    enabled: !!recipeDb?.id,
    queryFn: () =>
      axios
        .get('../api/postDB/comment/', {
          params: {
            post_id: recipeDb?.id,
          },
        })
        .then((res) => res.data),
    retry: 3,
    onSuccess: (commentListData1) => {
      setComments(commentListData1);
    },
  });

  // Add Comments to DataBase
  const AddComment = async (dataComment) => {
    await axios
      .post('../api/postDB/comment/', {
        data: {
          post_id: recipeDb.id,
          username: session?.user?.name,
          text: dataComment.comment,
        },
      })
      .then((res) => res.data);
  };

  // Handle Comment submit
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataComment) => {
    const notification = toast.loading('Posting your comment...');
    await AddComment(dataComment);
    setValue('comment', '');
    toast.success('comment sucessfully posted!', {
      id: notification,
    });
    refetch();
  };

  return (
    <div>
      <div className=" relative text-gray-600 mt-5 mb-1">
        <p className="text-sm">
          Comment as{' '}
          <span className="text-orange-400 font-light">
            {' '}
            {session?.user.name}{' '}
          </span>
        </p>
        {/* Comment Form */}
        <form
          className="flex flex-col space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register('comment', { maxLength: 500, required: true })}
            disabled={!session}
            className="h-24 rounded-lg bg-gray-100  p-2
pl-4 outline-none text-gray-600 w-full font-light "
            placeholder={session ? 'Write a comment...' : 'Please sign in'}
          />

          <button
            type="submit"
            aria-label="Submit Comment"
            className="text-orange-400 disabled:text-gray-200
       absolute top-16 right-1 group"
          >
            <AiOutlineSend className="iconMed group-hover:hidden" />
            <IoMdSend className="iconMed hidden group-hover:block" />
          </button>

          {errors.comment?.type === 'required' &&
            toast.error('Comment is required', {
              id: 'comment required',
            })}
        </form>
      </div>
      {/* List of Comments */}
      <div className="mt-5">
        {comments.map((commentLine) => (
          <div
            className=" flex  space-x-2  m-2"
            key={commentLine?.id}
          >
            <div className="flex items-start pt-1 ">
              <Image
                src={`https://avatars.dicebear.com/api/open-peeps/ 
${commentLine?.username || 'placeholder'}.svg`}
                width={30}
                height={30}
                className="rounded-full cursor-pointer "
                alt="User Image"
              />
            </div>
            <div className="flex flex-col px-3 pt-2 pb-3 rounded-lg bg-gray-100 flex-grow">
              <p className="pb-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">
                  {commentLine?.username}
                </span>{' '}
                • <ReactTimeago date={commentLine?.created_at} />
              </p>
              <p className="text-gray-600">{commentLine?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
CommentSection.propTypes = {
  id: PropTypes.string,
};

export default CommentSection;
