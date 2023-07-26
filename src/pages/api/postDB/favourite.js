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
      const { username, post_id, favouriteSaved } = req.body.data;

      if (post_id) {
        const createFavourite = await prisma.favourite.upsert({
          where: {
            postAndUser: {
              post_id,
              username,
            },
          },
          create: {
            post_id,
            username,
            favouriteSaved,
          },
          update: {
            post_id,
            username,
            favouriteSaved,
          },
        });
        return res.json(createFavourite);
      }
    } else if (req.method === 'GET') {
      const { post_id, username } = req.query;
      if (post_id && username) {
        const getFavourite = await prisma.favourite.findUnique({
          where: {
            // post_id,
            postAndUser: {
              post_id,
              username,
            },
          },
          //   orderBy: {
          //     created_at: 'desc',
          //   },
        });

        // const isFavourite = getFavourite.some(
        //   (favourite) => favourite.username === email,
        // )
        if (getFavourite && getFavourite.favouriteSaved) {
          return res.status(200).send(getFavourite.favouriteSaved);
        }
        return res.status(200).send(false);
      }
      return null;
    }
    return null;
  } catch (error) {
    console.log('🚀 ~ Favourites Get error', error);

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
