/* eslint-disable camelcase */
import { prisma } from '../../../utils/db';

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { username, post_id, liked } = req.body.data;

      if (post_id) {
        const createLike = await prisma.like.upsert({
          where: {
            postAndUser: {
              post_id,
              username,
            },
          },
          create: {
            post_id,
            username,
            liked,
          },
          update: {
            post_id,
            username,
            liked,
          },
        });
        return res.json(createLike);
      }
    }
    if (req.method === 'GET') {
      const { post_id, username } = req.query;
      if (post_id && username) {
        const getLikes = await prisma.like.findUnique({
          where: {
            postAndUser: {
              post_id,
              username,
            },
          },
        });

        // const isLiked = getLikes.some((like) => like.username === email);
        // cannot use this in findUnique
        // console.log('req. query log', req.query);
        // console.log('Getting list of likes', getLikes, isLiked);
        // const isLiked = getLikes !== null && getLikes.username === email;
        if (getLikes && getLikes.liked) {
          return res.status(200).send(getLikes.liked);
        }
        return res.status(200).send(false);
      }
      return null;
    }
    return null;
  } catch (error) {
    console.log('🚀 ~ Likes Get error', error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(500).json({ message: 'Oops an error has occurred!', error });
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    res.status(500).json({ message: 'Oops an error has occurred!', error });
    console.log(error.config);
  }
  return null;
}
